'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const LINES: { words: string[] }[] = [
  { words: ['Suas', 'ideias.'] },
  { words: ['Seu', 'negócio.'] },
  { words: ['Sua', 'marca.'] },
  { words: ['Unidos', 'em', 'uma', 'só', 'experiência.'] },
];

export default function SobrePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const phraseRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const wordEls = phraseRef.current?.querySelectorAll<HTMLElement>('.reveal-word');

      if (wordEls?.length) {
        if (reduced) {
          gsap.set(wordEls, { opacity: 1, y: 0, filter: 'blur(0px)' });
        } else {
          gsap.set(wordEls, { opacity: 0, y: 40, filter: 'blur(8px)' });
          // Mostrar as 2 primeiras palavras já no load como gancho visual
          const visibleWords = Array.from(wordEls).slice(0, 2);
          const animatedWords = Array.from(wordEls).slice(2);
          gsap.set(visibleWords, { opacity: 1, y: 0, filter: 'blur(0px)' });

          const isMobile = window.matchMedia('(max-width: 767px)').matches;
          const endDistance = isMobile ? 600 : 1000;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${endDistance}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });

          tl.to(animatedWords, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.6,
            stagger: 0.18,
          });
        }
      }

      // Narrative section reveal
      if (narrativeRef.current) {
        const children = narrativeRef.current.querySelectorAll<HTMLElement>('.narrative-item');
        if (children.length) {
          if (reduced) {
            gsap.set(children, { opacity: 1, y: 0 });
          } else {
            gsap.set(children, { opacity: 0, y: 40 });
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: narrativeRef.current,
                start: 'top 75%',
                once: true,
              },
            });
          }
        }
      }

      // CTA reveal
      if (ctaRef.current) {
        if (reduced) {
          gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.set(ctaRef.current, { opacity: 0, y: 30 });
          gsap.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              once: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* ━━ SEÇÃO 1 — TEXT REVEAL PINNED ━━━━━━━━━━━━ */}
        <section
          id="sobre"
          ref={sectionRef}
          className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-white pt-24 sm:pt-32 lg:pt-0"
        >
          {/* Dot grid background */}
          <div className="about-dot-grid pointer-events-none absolute inset-0 z-0" />

          {/* Blue blob */}
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

          {/* Orange blob */}
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

          {/* Phrase */}
          <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 sm:px-6">
            <h1
              ref={phraseRef}
              className="font-display font-[700] leading-[1.05] tracking-tight text-[#0a0a0f] text-[clamp(1.8rem,8vw,3rem)] md:text-[clamp(2.5rem,6vw,6rem)]"
            >
              {LINES.map((line, li) => (
                <span key={li} className="block">
                  {line.words.map((word, wi) => {
                    const isHighlight = word.replace(/[.,]/g, '') === 'experiência';
                    return (
                      <span
                        key={`${li}-${wi}`}
                        className={`reveal-word inline-block will-change-[transform,opacity,filter] ${
                          isHighlight
                            ? 'bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent'
                            : ''
                        }`}
                      >
                        {word}
                        {wi < line.words.length - 1 && '\u00A0'}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>
        </section>

        {/* ━━ SEÇÃO 2 — NARRATIVA ━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={narrativeRef}
          className="relative overflow-hidden bg-white py-24 lg:py-40"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <span className="narrative-item block text-xs uppercase tracking-[0.3em] text-blue">
              QUEM SOMOS
            </span>
            <h2 className="narrative-item mt-4 font-display font-[700] leading-[1.1] text-[#0a0a0f] text-[clamp(2rem,4.5vw,3.5rem)]">
              Estúdio digital focado em <span className="text-orange">resultado real</span>.
            </h2>

            <p className="narrative-item mt-8 font-body leading-[1.7] text-[rgba(10,10,15,0.75)] text-[clamp(1rem,1.3vw,1.15rem)]">
              A Clarion nasceu da vontade de unir design, engenharia e estratégia em um único processo. Não entregamos apenas sites ou aplicativos — entregamos experiências completas que convertem, encantam e escalam junto com o seu negócio.
            </p>
            <p className="narrative-item mt-6 font-body leading-[1.7] text-[rgba(10,10,15,0.75)] text-[clamp(1rem,1.3vw,1.15rem)]">
              Trabalhamos lado a lado com founders, times de produto e marcas que não se contentam com o comum. Cada projeto é tratado como único, com atenção obsessiva aos detalhes e foco em fidelidade visual, performance e clareza de comunicação.
            </p>
            <p className="narrative-item mt-6 font-body leading-[1.7] text-[rgba(10,10,15,0.75)] text-[clamp(1rem,1.3vw,1.15rem)]">
              Nosso compromisso é simples: transformar ideia em produto de verdade, com qualidade premium e prazos reais.
            </p>

            <div className="narrative-item mt-16 grid grid-cols-3 gap-8">
              {[
                { num: '50+', label: 'PROJETOS ENTREGUES' },
                { num: '8', label: 'ANOS DE MERCADO' },
                { num: '100%', label: 'CLIENTES SATISFEITOS' },
              ].map((kpi) => (
                <div key={kpi.label}>
                  <div className="font-display font-[700] text-[clamp(2.5rem,5vw,4rem)] leading-none bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent">
                    {kpi.num}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[rgba(10,10,15,0.6)]">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ SEÇÃO 3 — CTA FINAL ━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative overflow-hidden bg-white px-5 py-20 text-center sm:px-8 lg:px-16 lg:py-32">
          {/* Dot grid */}
          <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
          {/* Blue glow */}
          <div
            className="pointer-events-none absolute z-0"
            style={{
              width: 600,
              height: 600,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(0,87,255,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(120px)',
            }}
          />

          <div ref={ctaRef} className="relative z-[1]">
            <h2
              className="font-display font-[700] leading-[1.05] text-[#0a0a0f] text-[clamp(2rem,4vw,3.5rem)]"
            >
              Pronto para criar algo incrível
              <span style={{ color: '#FF7A00' }}>?</span>
            </h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/portfolio"
                className="font-body rounded-pill bg-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-mid hover:bg-blue-dark hover:shadow-lg hover:shadow-blue-glow"
              >
                Ver nosso portfólio
              </Link>
              <Link
                href="/contato"
                className="font-body rounded-pill border-[1.5px] border-[#0a0a0f] px-8 py-3.5 text-sm font-medium text-[#0a0a0f] transition-all duration-mid hover:bg-[#0a0a0f]/[0.04]"
              >
                Falar com a equipe
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
