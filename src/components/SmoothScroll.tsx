'use client';

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LenisGSAPSync() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    gsap.ticker.lagSmoothing(0);

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);

    // Ensure ScrollTriggers use the native scroller (window) with Lenis
    ScrollTrigger.defaults({ scroller: undefined });

    // One-time refresh after Lenis + GSAP sync is established
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickHandler);
    };
  }, [lenis]);

  return null;
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}
