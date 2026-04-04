'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticles from './HeroParticles';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = [
  'Transformamos',
  'ideias',
  'em',
  'experiências',
  'digitais',
];

const SCROLL_PX_PER_SECOND = 250;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const videoFailedRef = useRef(false);

  const handleVideoError = useCallback(() => {
    videoFailedRef.current = true;
    if (videoRef.current) {
      videoRef.current.style.display = 'none';
    }
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let subtitleFallbackTimer: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      // --- Set initial hidden states BEFORE first paint ---
      const words = titleRef.current?.querySelectorAll('.hero-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, y: 60 });
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30, visibility: 'visible' });
      }
      if (ctaRef.current?.children) {
        gsap.set(ctaRef.current.children, { opacity: 0, y: 20 });
      }
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0 });
      }

      // --- Title word-by-word ---
      if (words?.length) {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.3,
        });
      }

      // --- Subtitle fade in ---
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9,
          onComplete: () => {
            if (subtitleRef.current) {
              subtitleRef.current.style.opacity = '1';
              subtitleRef.current.style.transform = 'none';
            }
          },
        });
      }

      subtitleFallbackTimer = setTimeout(() => {
        if (subtitleRef.current && getComputedStyle(subtitleRef.current).opacity === '0') {
          gsap.set(subtitleRef.current, { opacity: 1, y: 0, visibility: 'visible' });
        }
      }, 2500);

      // --- CTA buttons ---
      if (ctaRef.current) {
        gsap.to(ctaRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          delay: 1.2,
        });
      }

      // --- Scroll badge ---
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          opacity: 1,
          delay: 1.6,
          duration: 0.5,
        });
        gsap.to(badgeRef.current, {
          y: -8,
          duration: 1.2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2,
        });
      }
    }, sectionRef);

    // --- Video scrub with pin + exit effects ---
    const video = videoRef.current;
    let setupScrub: (() => void) | null = null;

    if (video && !videoFailedRef.current) {
      video.pause();

      setupScrub = () => {
        const duration = video.duration;
        if (!duration || !isFinite(duration) || videoFailedRef.current) return;

        const scrollDistance = duration * SCROLL_PX_PER_SECOND;

        ctx.add(() => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            scrub: 0.3,
            onUpdate: (self) => {
              const p = self.progress;

              // Video scrub
              const targetTime = p * duration;
              if (Math.abs(video.currentTime - targetTime) > 0.01) {
                video.currentTime = targetTime;
              }

              // Badge: fade out in first 20%
              if (badgeRef.current) {
                const badgeOpacity = p < 0.2 ? 1 - p / 0.2 : 0;
                gsap.set(badgeRef.current, { opacity: badgeOpacity });
              }

              // Content + overlay: fade out in last 30% (progress 0.7 → 1.0)
              if (p > 0.7) {
                const exitProgress = (p - 0.7) / 0.3; // 0 → 1
                if (contentRef.current) {
                  gsap.set(contentRef.current, {
                    opacity: 1 - exitProgress,
                    y: -60 * exitProgress,
                  });
                }
                if (overlayRef.current) {
                  gsap.set(overlayRef.current, { opacity: 0.6 + 0.4 * exitProgress });
                }
              } else {
                if (contentRef.current) {
                  gsap.set(contentRef.current, { opacity: 1, y: 0 });
                }
                if (overlayRef.current) {
                  gsap.set(overlayRef.current, { opacity: 0.6 });
                }
              }
            },
          });
        });
      };

      if (video.readyState >= 1) {
        setupScrub!();
      } else {
        video.addEventListener('loadedmetadata', setupScrub!, { once: true });
      }
    }

    // --- Fallback: if no video scrub, use simple parallax exit ---
    const setupFallbackExit = () => {
      if (videoFailedRef.current || !videoRef.current) {
        ctx.add(() => {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          if (overlayRef.current) {
            exitTl.to(overlayRef.current, { opacity: 1, ease: 'none' }, 0);
          }
          if (contentRef.current) {
            exitTl.to(contentRef.current, { opacity: 0, y: -60, ease: 'none' }, 0);
          }
          if (badgeRef.current) {
            exitTl.to(badgeRef.current, { opacity: 0, ease: 'none' }, 0);
          }
        });
      }
    };

    // Check fallback after a short delay to allow video error/metadata to resolve
    const fallbackTimer = setTimeout(setupFallbackExit, 2000);

    return () => {
      clearTimeout(subtitleFallbackTimer);
      clearTimeout(fallbackTimer);
      if (video && setupScrub) {
        video.removeEventListener('loadedmetadata', setupScrub);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-[#04050F]"
    >
      {/* Background video — scroll-scrubbed, purely decorative */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onError={handleVideoError}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#04050F]/80 via-[#04050F]/60 to-[#04050F]"
      />

      {/* Particles */}
      <HeroParticles />

      {/* Content — opacity + y animated by scroll */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(3rem,7vw,6.5rem)] font-[700] leading-[1.05] tracking-tight text-white"
        >
          {TITLE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block ${
                word === 'experiências'
                  ? 'bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent'
                  : ''
              }`}
              style={{ opacity: 0 }}
            >
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="hero-subtitle mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          style={{ opacity: 0 }}
        >
          Estratégia, design e tecnologia para marcas que querem crescer.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-pill bg-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-mid hover:bg-blue-dark hover:shadow-lg hover:shadow-blue-glow"
            style={{ opacity: 0 }}
          >
            Ver nosso trabalho
          </a>
          <a
            href="#sobre"
            className="rounded-pill border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-all duration-mid hover:border-white/40 hover:bg-white/[0.08]"
            style={{ opacity: 0 }}
          >
            Conheça a Clarion
          </a>
        </div>
      </div>

      {/* Scroll badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/50 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <span className="text-base leading-none">↓</span>
        scroll para explorar
      </div>
    </section>
  );
}