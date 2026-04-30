'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // `ready` only flips true once the video has enough data to be scrubbed
  // (readyState >= 2). Gating the ScrollTrigger prevents seeks against an
  // unloaded video from throwing and stuttering.
  const [ready, setReady] = useState(false);
  // Mobile-stall fallback: if 4s pass without the video reaching readyState 2
  // (common on iOS Safari with muted preloaded video), we drop the pin and
  // just play the video through once. Documented inline where it triggers.
  const [fallback, setFallback] = useState(false);

  /* ── Watch for the video to become scrubbable ── */
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      if (video.readyState >= 2) setReady(true);
    };

    markReady();
    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);

    // Desktop: give up to 4s for the video to buffer. Mobile: only 2s —
    // on cellular we'd rather drop into the fallback (video plays once,
    // no pin) than hang the hero.
    const isMobile =
      typeof window !== 'undefined' && window.innerWidth < 640;
    const stallTimer = window.setTimeout(
      () => {
        if (video.readyState < 2) setFallback(true);
      },
      isMobile ? 2000 : 4000,
    );

    return () => {
      video.removeEventListener('loadedmetadata', markReady);
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      window.clearTimeout(stallTimer);
    };
  }, []);

  /* ── Content intro animation (runs once on mount, independent of video) ── */
  useLayoutEffect(() => {
    const targets = [
      eyebrowRef.current,
      line1Ref.current,
      line2Ref.current,
      subRef.current,
      ctasRef.current,
    ].filter(Boolean);

    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 20 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll-scrub the video + hint fade ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const hint = hintRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: show the first frame, no pin, no scroll trap.
    // Setting currentTime to a small positive value forces a frame render
    // (0 can sometimes leave the <video> blank on Safari).
    if (reduced) {
      const park = () => {
        try { video.currentTime = 0.1; } catch { /* ignore */ }
      };
      if (video.readyState >= 1) park();
      else video.addEventListener('loadedmetadata', park, { once: true });
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }

    // Mobile-stall fallback path: play once, no pin, scroll stays free.
    if (fallback) {
      video.play().catch(() => {
        /* browser refused without a gesture — nothing to recover here */
      });
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }

    if (!ready) return;

    const ctx = gsap.context(() => {
      const duration = video.duration || 3.2;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=120%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5, // gentle ease so Lenis' lerp doesn't fight the seek
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!video.duration) return;
          const t = self.progress * duration;
          if (isFinite(t)) video.currentTime = t;
        },
      });

      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=30%',
            scrub: true,
          },
        });
      }

      // Important after Lenis bridge — recalculate positions once this
      // pinned section is registered.
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [ready, fallback]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#04050F]"
    >
      {/* Layer 0 — video */}
      <video
        ref={videoRef}
        src={asset('/videos/fundo-hero.mp4')}
        muted
        playsInline
        preload="auto"
        poster=""
        disablePictureInPicture
        disableRemotePlayback
        {...{ 'webkit-playsinline': 'true' } as Record<string, string>}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Layer 1 — vertical legibility gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,5,15,0.55) 0%, rgba(4,5,15,0.25) 40%, rgba(4,5,15,0.75) 100%)',
        }}
      />

      {/* Layer 2 — edge vignette (lighter on mobile to reduce perceived weight) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(4,5,15,0.6) 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 sm:hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(4,5,15,0.45) 100%)',
        }}
      />

      {/* Layer 3 — content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <span
          ref={eyebrowRef}
          className="font-body text-xs uppercase tracking-[0.35em] text-white/60"
          style={{ opacity: 0 }}
        >
          CLARION DIGITAL STUDIO
        </span>

        <h1
          className="font-display mt-6 font-bold text-white"
          style={{
            fontSize: 'clamp(2.25rem, 8vw, 6.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <span ref={line1Ref} className="block" style={{ opacity: 0 }}>
            Construímos experiências
          </span>
          <span ref={line2Ref} className="block" style={{ opacity: 0 }}>
            que comunicam.
          </span>
        </h1>

        <p
          ref={subRef}
          className="font-body mt-6 max-w-[560px] text-white/75"
          style={{
            opacity: 0,
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            lineHeight: 1.6,
          }}
        >
          Design e engenharia sob medida para marcas que não querem ser só mais
          uma aba no navegador.
        </p>

        <div
          ref={ctasRef}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="#portfolio"
            className="font-body inline-flex items-center justify-center rounded-full text-sm font-medium text-white transition-transform duration-200 will-change-transform hover:scale-[1.03]"
            style={{
              padding: '0.9rem 2rem',
              minHeight: '48px',
              background: '#0057FF',
              boxShadow: '0 6px 24px rgba(0,87,255,0.35)',
            }}
          >
            Ver projetos
          </a>

          <a
            href="#contato"
            className="font-body inline-flex items-center justify-center rounded-full text-sm font-medium text-white transition-all duration-200"
            style={{
              padding: '0.9rem 2rem',
              minHeight: '48px',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.35)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Entrar em contato
          </a>
        </div>
      </div>

      {/* Layer 4 — scroll hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/50">
          role para explorar
        </span>
        <span
          aria-hidden
          className="relative block h-8 w-px bg-white/25 overflow-hidden"
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-0 block h-2 w-px -translate-x-1/2 bg-white"
            style={{ animation: 'clarion-hero-hint 1.8s ease-in-out infinite' }}
          />
        </span>
      </div>

      <style jsx>{`
        @keyframes clarion-hero-hint {
          0% {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 400%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
