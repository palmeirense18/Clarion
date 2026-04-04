'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAT_ICONS = [
  // Calendar — anos de mercado
  <svg key="cal" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#0057FF" strokeWidth="1.5" />
    <path d="M3 10h18" stroke="#0057FF" strokeWidth="1.5" />
    <path d="M8 2v4M16 2v4" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Rocket — projetos entregues
  <svg key="rocket" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 6 7 6 14l2.5 2.5L12 15l3.5 1.5L18 14c0-7-6-12-6-12z" stroke="#0057FF" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2" stroke="#0057FF" strokeWidth="1.5" />
    <path d="M6 14l-2 4 4-2M18 14l2 4-4-2" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Star — satisfação
  <svg key="star" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.76 5.58L21 8.64l-4.5 4.38L17.52 19 12 16.21 6.48 19l1.02-5.98L3 8.64l6.24-.91L12 2z" stroke="#FF7A00" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
];

const STATS = [
  { value: 3, suffix: '+', label: 'anos de mercado', barColor: '#0057FF' },
  { value: 50, suffix: '+', label: 'projetos entregues', barColor: '#0057FF' },
  { value: 98, suffix: '%', label: 'satisfação dos clientes', barColor: '#FF7A00' },
];

const TITLE_WORDS = [
  'Criatividade',
  'e',
  'tecnologia,',
  'juntas.',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title word animation
      const words = titleRef.current?.querySelectorAll('.about-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, color: '#FF7A00', visibility: 'visible' });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(words, {
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
            });
            gsap.to(words, {
              color: '#0a0a0f',
              duration: 0.5,
              stagger: 0.1,
              delay: 0.15,
              ease: 'power1.out',
            });
          },
        });
      }

      // Gradient line animation
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center', visibility: 'visible' });
        ScrollTrigger.create({
          trigger: lineRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(lineRef.current, {
              scaleX: 1,
              duration: 1,
              ease: 'power3.inOut',
            });
          },
        });
      }

      // Stat counters + progress bars
      const statEls = statsRef.current?.querySelectorAll('.stat-value');
      const barEls = statsRef.current?.querySelectorAll('.stat-bar-fill');
      if (statEls?.length) {
        statEls.forEach((el, i) => {
          const target = STATS[i].value;
          const obj = { val: 0 };

          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  (el as HTMLElement).textContent =
                    Math.round(obj.val) + STATS[i].suffix;
                },
              });
              // Animate the progress bar
              if (barEls?.[i]) {
                gsap.to(barEls[i], {
                  scaleX: 1,
                  duration: 1.5,
                  delay: 0.3,
                  ease: 'power2.out',
                });
              }
            },
          });
        });
      }

      // Right column text fade
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 30, visibility: 'visible' });
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(textRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-0 pt-20 sm:pt-28 lg:pt-40 pb-16"
    >
      {/* --- Background layers (z-0) --- */}

      {/* Animated dot grid */}
      <div className="about-dot-grid pointer-events-none absolute inset-0 z-0" />

      {/* Blue blob — top right */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 600,
          height: 600,
          top: -100,
          right: -100,
          background: 'radial-gradient(circle, rgba(0,87,255,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      {/* Orange blob — bottom left */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 600,
          height: 600,
          bottom: -80,
          left: -80,
          background: 'radial-gradient(circle, rgba(255,122,0,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite 3s',
        }}
      />

      {/* --- Content (z-2) --- */}
      <div className="relative z-[2] mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.1] tracking-tight text-[#0a0a0f]"
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="about-word gsap-hidden inline-block">
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>

        {/* Animated gradient line */}
        <div
          ref={lineRef}
          className="gsap-hidden my-12 h-[1px] w-full"
          style={{ background: 'linear-gradient(to right, #0057FF, #FF7A00)' }}
        />

        {/* Two columns */}
        <div className="grid gap-8 lg:grid-cols-5 md:gap-16 lg:gap-24">
          {/* Left — Stats */}
          <div ref={statsRef} className="flex flex-col gap-12 lg:col-span-2">
            {STATS.map((stat, i) => (
              <div key={i}>
                <div className="mb-3">{STAT_ICONS[i]}</div>
                <span className="stat-value font-display text-[clamp(3rem,6vw,5rem)] font-[700] leading-none text-[#0057FF]">
                  0{stat.suffix}
                </span>
                <p className="mt-2 font-body text-sm font-[400] uppercase tracking-widest text-[rgba(10,10,15,0.60)]">
                  {stat.label}
                </p>
                {/* Progress bar */}
                <div className="mt-3 h-[3px] w-12 overflow-hidden rounded-full bg-[#e0e0e8]">
                  <div
                    className="stat-bar-fill h-full origin-left scale-x-0 rounded-full"
                    style={{ backgroundColor: stat.barColor }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right — Text */}
          <div ref={textRef} className="gsap-hidden lg:col-span-3">
            <p className="text-lg leading-relaxed text-[rgba(10,10,15,0.65)] md:text-xl">
              A Clarion nasceu da crença de que tecnologia e criatividade andam
              juntas. Somos especialistas em criar soluções digitais que
              conectam marcas às pessoas certas.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[rgba(10,10,15,0.65)] md:text-xl">
              Com um time multidisciplinar e uma abordagem centrada em
              resultados, transformamos desafios complexos em experiências
              digitais que geram impacto real — da estratégia ao código final.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-[#0057FF]" />
              <span className="text-sm font-[500] uppercase tracking-widest text-[rgba(10,10,15,0.30)]">
                Sobre nós
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
