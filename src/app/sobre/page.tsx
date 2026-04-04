'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Stats data ───────────────────────────────────────── */

const STATS = [
  { value: 3, suffix: '+', label: 'anos de mercado' },
  { value: 50, suffix: '+', label: 'projetos entregues' },
  { value: 98, suffix: '%', label: 'clientes satisfeitos' },
  { value: 12, suffix: '', label: 'prêmios e menções' },
];

/* ── Timeline data ────────────────────────────────────── */

const TIMELINE = [
  {
    year: '2021',
    text: 'Fundamos a Clarion com 2 pessoas e um laptop. Nossa primeira missão: provar que pequenas agências entregam mais que grandes estruturas.',
  },
  {
    year: '2022',
    text: 'Crescemos para 6 pessoas. Entregamos nosso primeiro produto SaaS e conquistamos clientes em 3 estados.',
  },
  {
    year: '2024',
    text: 'Hoje somos uma equipe de 12 especialistas. Portfólio com mais de 50 projetos e uma missão clara: criar o digital que importa.',
  },
];

/* ── Values data ──────────────────────────────────────── */

const VALUES = [
  {
    number: '01',
    title: 'Clareza antes de código',
    text: 'Entendemos o problema antes de propor solução. Cada decisão técnica nasce de uma pergunta: isso resolve o que o usuário precisa?',
  },
  {
    number: '02',
    title: 'Design que converte',
    text: 'Beleza e resultado não são excludentes, são obrigatórios. Criamos interfaces que encantam e entregam métricas.',
  },
  {
    number: '03',
    title: 'Parceria real',
    text: 'Não somos fornecedores, somos parte do time do cliente. Mergulhamos no negócio para entregar o que realmente importa.',
  },
];

/* ── Component ────────────────────────────────────────── */

export default function SobrePage() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Manifesto title — word by word ── */
      const words = titleRef.current?.querySelectorAll('.manifesto-word');
      if (words?.length) {
        gsap.fromTo(words,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.06,
            ease: 'power3.out', delay: 0.3,
          }
        );
      }

      /* ── Manifesto paragraph ── */
      const para = manifestoRef.current?.querySelector('.manifesto-para');
      if (para) {
        gsap.fromTo(para,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
        );
      }

      /* ── Stats section ── */
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(statEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
          }
        );

        // CountUp
        const numberEls = statsRef.current.querySelectorAll('.stat-number');
        numberEls.forEach((el, i) => {
          const target = STATS[i].value;
          const suffix = STATS[i].suffix;
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
                  (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
                },
              });
            },
          });
        });
      }

      /* ── History section ── */
      if (historyRef.current) {
        const blocks = historyRef.current.querySelectorAll('.timeline-block');
        gsap.fromTo(blocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: historyRef.current, start: 'top 80%', once: true },
          }
        );

        const leftCol = historyRef.current.querySelector('.history-left');
        if (leftCol) {
          gsap.fromTo(leftCol,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: historyRef.current, start: 'top 80%', once: true },
            }
          );
        }
      }

      /* ── Values section ── */
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', once: true },
          }
        );
      }

      /* ── CTA section ── */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  /* ── Split title into words, highlight "criatividade" ── */
  const titleText = 'Acreditamos que tecnologia sem criatividade é só código. E criatividade sem tecnologia é só ideia.';
  const titleWords = titleText.split(' ');

  return (
    <>
      <Navbar />

      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

        {/* ━━ SEÇÃO 1 — MANIFESTO ━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={manifestoRef}
          className="px-5 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-40 pb-12 lg:pb-24 text-center relative overflow-hidden"
        >
          {/* Blue glow */}
          <div className="pointer-events-none absolute z-0" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0,87,255,0.04) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)' }} />

          <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Label */}
            <span
              className="font-body"
              style={{
                fontSize: '0.8rem', textTransform: 'uppercase',
                letterSpacing: '0.14em', color: '#FF7A00',
                display: 'block', marginBottom: '1.5rem',
              }}
            >
              Sobre a Clarion
            </span>

            {/* Title — word by word */}
            <h1
              ref={titleRef}
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 800, color: '#0a0a0f',
                lineHeight: 1.0,
              }}
            >
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className="manifesto-word"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    color: word.toLowerCase() === 'criatividade' ? '#0057FF' : '#0a0a0f',
                  }}
                >
                  {word}{i < titleWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </h1>

            {/* Paragraph */}
            <p
              className="manifesto-para font-body"
              style={{
                fontSize: '1.1rem', color: 'rgba(10,10,15,0.60)',
                lineHeight: 1.8, maxWidth: 640,
                margin: '2rem auto 0', opacity: 0,
              }}
            >
              A Clarion nasceu em 2021 da vontade de fazer diferente.
              Somos uma agência de soluções digitais que une estratégia,
              design e engenharia para criar produtos que as pessoas
              realmente querem usar.
            </p>
          </div>
        </section>

        {/* ━━ SEÇÃO 2 — NÚMEROS ━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={statsRef}
          className="px-5 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 relative overflow-hidden"
          style={{ background: '#f5f5f7' }}
        >
          <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
          <div
            className="relative z-[1] grid grid-cols-2 sm:grid-cols-4 max-w-[1100px] mx-auto"
            style={{ gap: 0 }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-item"
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  borderRight: i < STATS.length - 1 ? '1px solid #e0e0e8' : 'none',
                }}
              >
                <span
                  className="stat-number font-display"
                  style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: 800, color: '#0057FF',
                    lineHeight: 1,
                  }}
                >
                  0{stat.suffix}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.9rem', color: 'rgba(10,10,15,0.55)',
                    marginTop: '0.75rem',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ━━ SEÇÃO 3 — NOSSA HISTÓRIA ━━━━━━━━━━━━━━━ */}
        <section
          ref={historyRef}
          className="px-5 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-32 relative overflow-hidden"
          style={{ background: '#ffffff' }}
        >
          <div className="bg-glow-orange" style={{ top: '20%', right: '-150px' }} />
          <div className="bg-diagonal-accent absolute inset-0" />
          <div
            className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 max-w-[1100px] mx-auto"
          >
            {/* Left — sticky */}
            <div
              className="history-left lg:sticky lg:top-32 lg:self-start"
              style={{ opacity: 0 }}
            >
              <span
                className="font-body"
                style={{
                  fontSize: '0.8rem', textTransform: 'uppercase',
                  letterSpacing: '0.14em', color: '#FF7A00',
                  display: 'block', marginBottom: '1rem',
                }}
              >
                Nossa história
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: '2.5rem', fontWeight: 700,
                  color: '#0a0a0f', lineHeight: 1.1,
                }}
              >
                De uma ideia para dezenas de projetos
              </h2>
              <div
                style={{
                  width: 48, height: 2,
                  background: '#0057FF',
                  margin: '2rem 0',
                }}
              />
            </div>

            {/* Right — timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {TIMELINE.map((item) => (
                <div key={item.year} className="timeline-block">
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.5rem', fontWeight: 700,
                      color: '#0057FF', display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.year}
                  </span>
                  <p
                    className="font-body"
                    style={{
                      fontSize: '1rem', color: 'rgba(10,10,15,0.60)',
                      lineHeight: 1.7, maxWidth: 480,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ SEÇÃO 4 — VALORES ━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={valuesRef}
          className="px-5 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-32"
          style={{ background: '#0a0a0f' }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800, color: '#ffffff',
                textAlign: 'center', marginBottom: '5rem',
                lineHeight: 1.05,
              }}
            >
              O que nos guia
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            >
              {VALUES.map((val) => (
                <div
                  key={val.number}
                  className="value-card"
                  style={{ position: 'relative', padding: '2rem 0' }}
                >
                  {/* Background number */}
                  <span
                    className="font-display"
                    style={{
                      position: 'absolute', top: '-0.5rem', left: 0,
                      fontSize: '6rem', fontWeight: 800,
                      color: 'rgba(255,255,255,0.04)',
                      lineHeight: 1, pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {val.number}
                  </span>

                  {/* Blue top line */}
                  <div
                    style={{
                      width: 40, height: 2,
                      background: '#0057FF',
                      marginBottom: '1.5rem',
                    }}
                  />

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.5rem', fontWeight: 700,
                      color: '#ffffff', marginBottom: '1rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {val.title}
                  </h3>

                  <p
                    className="font-body"
                    style={{
                      fontSize: '1rem', color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.7,
                    }}
                  >
                    {val.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ SEÇÃO 5 — CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={ctaRef}
          className="px-5 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-32 text-center relative overflow-hidden"
          style={{ background: '#ffffff' }}
        >
          {/* Dot grid */}
          <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
          {/* Blue glow */}
          <div className="pointer-events-none absolute z-0" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0,87,255,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(120px)' }} />

          <h2
            className="font-display relative z-[1]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800, color: '#0a0a0f',
              lineHeight: 1.05, marginBottom: '2.5rem',
            }}
          >
            Pronto para criar algo incrível<span style={{ color: '#FF7A00' }}>?</span>
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/portfolio"
              className="font-body"
              style={{
                padding: '0.9rem 2.2rem', borderRadius: '99px',
                background: '#0057FF', color: '#ffffff',
                fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              Ver nosso portfólio
            </Link>
            <Link
              href="/contato"
              className="font-body"
              style={{
                padding: '0.9rem 2.2rem', borderRadius: '99px',
                border: '1.5px solid #0a0a0f', background: 'transparent',
                color: '#0a0a0f', fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              Falar com a equipe
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
