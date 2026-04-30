'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

type Props = { variant?: 'hero' | 'final' };

const GLOW_BRIGHT =
  'drop-shadow(0 0 40px rgba(0,87,255,0.9)) drop-shadow(0 0 80px rgba(255,122,0,0.6))';
const GLOW_DIM =
  'drop-shadow(0 0 10px rgba(0,87,255,0.3)) drop-shadow(0 0 20px rgba(255,122,0,0.2))';
const GLOW_ZERO =
  'drop-shadow(0 0 0px rgba(0,87,255,0)) drop-shadow(0 0 0px rgba(255,122,0,0))';

export default function ScrollLogo({ variant = 'hero' }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const glowRef = useRef<SVGTextElement>(null);
  const finalImgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (variant === 'final') {
      const el = finalImgRef.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, {
          opacity: 1,
          scale: 1,
          z: 0,
          filter: 'blur(0px)',
          rotateY: 0,
        });
        return;
      }
      const ctx = gsap.context(() => {
        gsap.set(el, {
          opacity: 0,
          scale: 0.15,
          z: -1200,
          filter: 'blur(20px)',
          rotateY: 15,
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
        tl.to(el, {
          opacity: 1,
          scale: 1.15,
          z: 200,
          filter: 'blur(0px)',
          rotateY: 0,
          duration: 1.4,
          ease: 'power3.out',
        })
          .to(el, {
            scale: 0.95,
            z: -80,
            duration: 0.5,
            ease: 'power2.inOut',
          })
          .to(el, {
            scale: 1,
            z: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
      }, wrapperRef);
      return () => ctx.revert();
    }

    // ── HERO variant ──
    const img = imgRef.current;
    const el = textRef.current;
    const glow = glowRef.current;
    if (!img || !el || !glow) return;

    gsap.set(el, { strokeDasharray: 2000, strokeDashoffset: 2000, fillOpacity: 0 });
    gsap.set(img, { opacity: 0, y: -20, scale: 0.9 });
    gsap.set(glow, { opacity: 0, filter: GLOW_ZERO });

    if (reduced) {
      gsap.set(el, { strokeDashoffset: 0, fillOpacity: 1 });
      gsap.set(img, { opacity: 1, y: 0, scale: 1 });
      gsap.set(glow, { opacity: 1, filter: GLOW_DIM });
      return;
    }

    const ctx = gsap.context(() => {
      // Auto entry rápida + flash final único
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(img, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
        .to(el, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.15')
        .to(el, { fillOpacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to(
          glow,
          {
            opacity: 1,
            filter:
              'drop-shadow(0 0 60px rgba(0,87,255,1)) drop-shadow(0 0 120px rgba(255,122,0,0.9))',
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.05'
        )
        .to(glow, {
          filter:
            'drop-shadow(0 0 20px rgba(0,87,255,0.5)) drop-shadow(0 0 40px rgba(255,122,0,0.3))',
          duration: 0.6,
          ease: 'power2.inOut',
        });
    }, wrapperRef);

    return () => ctx.revert();
  }, [variant]);

  if (variant === 'final') {
    return (
      <div
        ref={wrapperRef}
        className="flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={finalImgRef}
          src={asset('/videos/logo-clarion.png')}
          alt="Clarion"
          className="h-auto w-[min(70vw,700px)] select-none"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[40] flex flex-col items-center justify-center gap-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={asset('/videos/logo-clarion.png')}
        alt="Clarion"
        className="h-auto w-[min(40vw,380px)] select-none opacity-0"
        draggable={false}
      />
      <svg
        viewBox="0 0 1200 300"
        className="h-auto w-[min(95vw,1400px)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          ref={textRef}
          x="600"
          y="200"
          textAnchor="middle"
          className="font-display"
          fontSize="260"
          fontWeight="800"
          letterSpacing="-6"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="2"
          style={{ paintOrder: 'stroke fill' }}
        >
          CLARION
        </text>
        <text
          ref={glowRef}
          aria-hidden
          x="600"
          y="200"
          textAnchor="middle"
          className="font-display"
          fontSize="260"
          fontWeight="800"
          letterSpacing="-6"
          fill="#ffffff"
        >
          CLARION
        </text>
      </svg>
    </div>
  );
}
