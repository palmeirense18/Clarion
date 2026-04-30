'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, CATEGORY_COLORS } from '@/lib/projects';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  // `isMobile` gates the pin+scrub. On <768px we render the cards as a
  // natural vertical list instead — touch scroll fights pins and the
  // stacked animation adds little value on a narrow viewport.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isMobile !== false) return; // only set up pin on confirmed desktop

    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');

      // Cards 2–6 start below the viewport
      gsap.set(cards.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: 'top top',
          end: `+=${cards.length * 65}%`,
          pin: true,
          pinSpacing: true,
          pinType: 'transform',
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      cards.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, duration: 1, ease: 'none' }, i);
      });
    }, sectionRef);

    const onWindowLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(section);

    return () => {
      window.removeEventListener('load', onWindowLoad);
      ro.disconnect();
      ctx.revert();
    };
  }, [isMobile]);

  const renderCard = (
    project: (typeof projects)[number],
    index: number,
    mobile: boolean,
  ) => {
    const accent = CATEGORY_COLORS[project.category];
    const hasUrl = !!project.url;

    const innerContent = (
      <div
        style={{
          display: 'flex',
          maxWidth: '1100px',
          width: '100%',
          alignItems: mobile ? 'flex-start' : 'center',
        }}
        className="flex-col lg:flex-row px-5 sm:px-8 lg:px-12 gap-6 lg:gap-16"
      >
        {/* Visual first on mobile, right-column on desktop */}
        <div
          className={`relative ${mobile ? 'block order-first w-full' : 'hidden lg:block order-last'}`}
          style={{
            width: mobile ? '100%' : '420px',
            height: mobile ? 'auto' : '320px',
            aspectRatio: mobile ? '16 / 10' : undefined,
            borderRadius: mobile ? '1rem' : '1.25rem',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 20px 60px rgba(10,10,15,0.15)',
            background: '#0a0a0f',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(project.image)}
            alt={project.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${accent}14, transparent 50%)`,
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <span
            className="font-body"
            style={{
              fontSize: '0.75rem',
              color: accent,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {project.category} — {project.client}
          </span>

          <h3
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: mobile
                ? 'clamp(1.75rem, 7vw, 2.5rem)'
                : 'clamp(2rem, 4vw, 3.5rem)',
              color: '#0a0a0f',
              margin: '0.75rem 0 1rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {project.name}
          </h3>

          <p
            className="font-body"
            style={{
              color: 'rgba(10,10,15,0.60)',
              fontSize: '1rem',
              maxWidth: mobile ? '100%' : '380px',
              lineHeight: 1.65,
            }}
          >
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-body"
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '99px',
                  border: '1px solid #e0e0e8',
                  fontSize: '0.75rem',
                  color: 'rgba(10,10,15,0.55)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {hasUrl && (
            <span
              className="font-body"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1.5rem',
                padding: '0.75rem 2rem',
                minHeight: '48px',
                borderRadius: '99px',
                border: `1.5px solid ${accent}`,
                background: 'transparent',
                color: accent,
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
              }}
            >
              Ver case →
            </span>
          )}
        </div>
      </div>
    );

    const desktopCardStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: index % 2 === 0 ? '#ffffff' : '#f5f5f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: index + 1,
      borderRadius: index > 0 ? '1.5rem 1.5rem 0 0' : undefined,
      boxShadow: index > 0 ? '0 -20px 60px rgba(0,0,0,0.10)' : undefined,
      textDecoration: 'none',
    };

    const mobileCardStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      background: index % 2 === 0 ? '#ffffff' : '#f5f5f7',
      padding: '3rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1.25rem',
      textDecoration: 'none',
    };

    const cardStyle = mobile ? mobileCardStyle : desktopCardStyle;

    const backgroundNumber = (
      <span
        className="font-display absolute bottom-4 sm:bottom-8 right-4 sm:right-8 lg:right-12 text-[4rem] sm:text-[6rem] lg:text-[8rem]"
        style={{
          fontWeight: 800,
          color: 'rgba(10,10,15,0.05)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {project.id}
      </span>
    );

    return hasUrl ? (
      <a
        key={project.id}
        href={project.url!}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-card"
        style={cardStyle}
      >
        {innerContent}
        {backgroundNumber}
      </a>
    ) : (
      <div key={project.id} className="portfolio-card" style={cardStyle}>
        {innerContent}
        {backgroundNumber}
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="portfolio" style={{ background: '#f5f5f7' }}>
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem 3.5rem',
          background: '#f5f5f7',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
        <div className="bg-glow-blue" style={{ top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <h2
          className="font-display relative z-[1]"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#0a0a0f',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Nosso trabalho
        </h2>
      </div>

      {isMobile ? (
        // Mobile: natural vertical list, no pin, no scrub.
        <div
          ref={stackRef}
          className="flex flex-col gap-4 px-5 pb-12"
          style={{ position: 'relative' }}
        >
          {projects.map((project, i) => renderCard(project, i, true))}
        </div>
      ) : (
        <div
          ref={stackRef}
          style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {projects.map((project, i) => renderCard(project, i, false))}
        </div>
      )}
    </section>
  );
}
