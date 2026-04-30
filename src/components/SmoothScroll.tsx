'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
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
  // Lenis adds perceptible lag to touch scrolling — native momentum-scroll
  // on mobile always feels more responsive. We gate Lenis to viewports ≥ 768px.
  // `null` during SSR / first paint: render children un-wrapped; the effect
  // below decides whether to re-mount with Lenis on hydration.
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!enabled) {
    // Mobile or pre-hydration: native scroll.
    return <>{children}</>;
  }

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
