'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────── */

const SERVICES = [
  {
    number: '01',
    title: 'Desenvolvimento Web',
    tag: 'Desenvolvimento',
    gradient: 'linear-gradient(135deg, #0057FF, #0040CC)',
    desc: 'Criamos sites e aplicações web com performance, acessibilidade e escalabilidade. Do MVP ao produto completo, usando as melhores tecnologias do mercado.',
    deliverables: [
      'Site institucional ou landing page',
      'Aplicação web completa (SaaS, plataforma, portal)',
      'Integração com APIs e sistemas externos',
      'Otimização de performance e SEO técnico',
    ],
    time: '4 a 16 semanas',
    price: 'A partir de R$ 8.000',
  },
  {
    number: '02',
    title: 'Design de Produto (UX/UI)',
    tag: 'Design',
    gradient: 'linear-gradient(135deg, #FF7A00, #CC4400)',
    desc: 'Design centrado no usuário que equilibra estética e funcionalidade. Criamos interfaces que as pessoas amam usar e que entregam resultados reais para o negócio.',
    deliverables: [
      'Pesquisa com usuários e mapeamento de jornada',
      'Wireframes e protótipos interativos',
      'Design system completo e documentado',
      'Handoff para desenvolvimento',
    ],
    time: '3 a 10 semanas',
    price: 'A partir de R$ 5.000',
  },
  {
    number: '03',
    title: 'Estratégia Digital',
    tag: 'Estratégia',
    gradient: 'linear-gradient(135deg, #0057FF, #FF7A00)',
    desc: 'Antes de construir, precisamos entender. Analisamos seu mercado, seus concorrentes e seu público para criar uma estratégia que faça sentido para o seu negócio.',
    deliverables: [
      'Auditoria digital completa',
      'Posicionamento e proposta de valor',
      'Roadmap de produto e crescimento',
      'KPIs e métricas de sucesso',
    ],
    time: '2 a 6 semanas',
    price: 'A partir de R$ 3.500',
  },
  {
    number: '04',
    title: 'Branding & Identidade Visual',
    tag: 'Branding',
    gradient: 'linear-gradient(135deg, #0a0a0f, #1a1a2e)',
    desc: 'Uma marca forte começa com uma identidade visual consistente. Criamos marcas que comunicam, conectam e ficam na memória — do logo ao brand book completo.',
    deliverables: [
      'Naming e posicionamento de marca',
      'Logo e identidade visual completa',
      'Brand book e manual de uso',
      'Aplicações em materiais digitais e impressos',
    ],
    time: '3 a 8 semanas',
    price: 'A partir de R$ 4.500',
  },
];

const PROCESS = [
  { number: '01', title: 'Descoberta', text: 'Entendemos seu negócio, seus usuários e seus objetivos antes de qualquer proposta.' },
  { number: '02', title: 'Estratégia', text: 'Definimos escopo, tecnologias, prazos e métricas de sucesso em conjunto.' },
  { number: '03', title: 'Criação', text: 'Design e desenvolvimento em ciclos curtos com apresentações semanais para você.' },
  { number: '04', title: 'Lançamento', text: 'Deploy, testes, treinamento e suporte pós-lançamento incluídos.' },
];

/* ── Service Row ──────────────────────────────────────── */

function ServiceRow({
  service,
  isOpen,
  onToggle,
  isLast,
}: {
  service: (typeof SERVICES)[number];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const panel = panelRef.current;
    if (!row || !panel) return;

    if (isOpen) {
      gsap.to(row, { height: 'auto', duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo(panel,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(panel, { opacity: 0, y: 16, duration: 0.2 });
      gsap.to(row, { height: 88, duration: 0.4, ease: 'power3.inOut', delay: 0.1 });
    }
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className="service-row"
      style={{
        height: 88,
        overflow: 'hidden',
        borderBottom: isLast ? '1px solid #e0e0e8' : undefined,
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <div
        className="group border-t border-[#e0e0e8] transition-colors duration-[400ms]"
        style={{ backgroundColor: isOpen ? '#f5f5f7' : 'transparent' }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: 88, padding: '0 1rem',
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: '0.875rem', width: '3rem',
              color: isOpen ? '#0057FF' : 'rgba(10,10,15,0.30)',
              transition: 'color 0.4s',
            }}
          >
            {service.number}
          </span>

          <h3
            className="font-display"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              flex: 1, textAlign: 'center',
              color: isOpen ? '#0057FF' : '#0a0a0f',
              transition: 'color 0.4s',
            }}
          >
            {service.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              className="font-body hidden md:block"
              style={{
                fontSize: '0.75rem', textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'rgba(10,10,15,0.40)',
              }}
            >
              {service.tag}
            </span>
            <span
              style={{
                color: 'rgba(10,10,15,0.30)', fontSize: '1.1rem',
                display: 'inline-block',
                transition: 'transform 0.4s',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              →
            </span>
          </div>
        </div>

        {/* Expanded panel */}
        <div
          ref={panelRef}
          style={{ padding: '0 1rem 2.5rem', opacity: 0 }}
        >
          <div
            style={{
              display: 'flex', gap: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Visual */}
            <div
              style={{
                width: 280, height: 170,
                borderRadius: '1rem',
                background: service.gradient,
                flexShrink: 0,
              }}
            />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <p
                className="font-body"
                style={{
                  fontSize: '0.95rem', color: 'rgba(10,10,15,0.65)',
                  lineHeight: 1.7, maxWidth: 480, marginBottom: '1.5rem',
                }}
              >
                {service.desc}
              </p>

              {/* Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {service.deliverables.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#0057FF', fontWeight: 600, flexShrink: 0 }}>→</span>
                    <span
                      className="font-body"
                      style={{ fontSize: '0.9rem', color: 'rgba(10,10,15,0.60)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(10,10,15,0.45)' }}>
                  ⏱ {service.time}
                </span>
                <span className="font-body" style={{ fontSize: '0.85rem', color: 'rgba(10,10,15,0.45)' }}>
                  💰 {service.price}
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/contato"
                className="font-body inline-block transition-all duration-300 hover:bg-[#0057FF] hover:text-white"
                style={{
                  padding: '0.6rem 1.8rem', borderRadius: '99px',
                  border: '1.5px solid #0057FF', color: '#0057FF',
                  fontSize: '0.875rem', fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Solicitar orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────── */

export default function ServicosPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header entrance */
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      }

      /* Service rows entrance */
      const rows = document.querySelectorAll('.service-row');
      if (rows.length) {
        gsap.fromTo(rows,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.1,
            ease: 'power3.out', delay: 0.4,
          }
        );
      }

      /* Process section */
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll('.process-step');
        gsap.fromTo(steps,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: processRef.current, start: 'top 80%', once: true },
          }
        );

        // Connecting line
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1, ease: 'none',
              scrollTrigger: {
                trigger: processRef.current,
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: true,
              },
            }
          );
        }
      }

      /* CTA */
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

  return (
    <>
      <Navbar />

      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

        {/* ━━ SEÇÃO 1 — ENTRADA ━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={headerRef}
          className="px-5 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-40 pb-12 lg:pb-24 relative overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Orange blob — top right */}
          <div className="pointer-events-none absolute z-0" style={{ width: 400, height: 400, top: -100, right: -100, background: 'radial-gradient(circle, rgba(255,122,0,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />

          <div style={{ maxWidth: 860, position: 'relative', zIndex: 1 }}>
            <span
              className="font-body"
              style={{
                fontSize: '0.8rem', textTransform: 'uppercase',
                letterSpacing: '0.14em', color: '#FF7A00',
                display: 'block', marginBottom: '1.5rem',
              }}
            >
              O que fazemos
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 800, color: '#0a0a0f',
                lineHeight: 1.0,
              }}
            >
              Soluções digitais do começo ao <span style={{ color: '#0057FF' }}>fim.</span>
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: '1.1rem', color: 'rgba(10,10,15,0.55)',
                maxWidth: 560, marginTop: '1.5rem', lineHeight: 1.7,
              }}
            >
              Cada projeto é único. Nossa abordagem também.
            </p>
          </div>
        </section>

        {/* ━━ SEÇÃO 2 — LISTA DE SERVIÇOS ━━━━━━━━━━━━ */}
        <section ref={listRef} className="px-5 sm:px-8 lg:px-16 pb-12 lg:pb-24 relative overflow-hidden">
          <div className="bg-diagonal-accent absolute inset-0" />
          <div className="bg-glow-blue" style={{ bottom: '-100px', right: '-100px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {SERVICES.map((service, i) => (
              <ServiceRow
                key={service.number}
                service={service}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                isLast={i === SERVICES.length - 1}
              />
            ))}
          </div>
        </section>

        {/* ━━ SEÇÃO 3 — PROCESSO ━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={processRef}
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
              Como trabalhamos
            </h2>

            {/* Process grid with connecting line */}
            <div style={{ position: 'relative' }}>
              {/* Connecting line */}
              <div
                ref={lineRef}
                className="hidden lg:block"
                style={{
                  position: 'absolute',
                  top: '2.2rem',
                  left: '5%', right: '5%',
                  height: 2,
                  background: 'linear-gradient(to right, #0057FF, #FF7A00)',
                  transformOrigin: 'left center',
                  zIndex: 0,
                }}
              />

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-[1]"
              >
                {PROCESS.map((step) => (
                  <div
                    key={step.number}
                    className="process-step"
                    style={{ textAlign: 'center' }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: '3rem', fontWeight: 800,
                        color: '#0057FF', display: 'block',
                        marginBottom: '1rem',
                        background: '#0a0a0f',
                        width: 'fit-content',
                        margin: '0 auto 1rem',
                        padding: '0 0.5rem',
                        position: 'relative',
                      }}
                    >
                      {step.number}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.2rem', fontWeight: 700,
                        color: '#ffffff', marginBottom: '0.75rem',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body"
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.6,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━ SEÇÃO 4 — CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
            Tem um projeto em mente<span style={{ color: '#FF7A00' }}>?</span>
          </h2>

          <Link
            href="/contato"
            className="font-display relative z-[1] inline-block transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(0,87,255,0.15)]"
            style={{
              padding: '1rem 3rem', borderRadius: '99px',
              background: '#0057FF', color: '#ffffff',
              fontSize: '1rem', fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Solicitar orçamento gratuito
          </Link>

          <p
            className="font-body"
            style={{
              fontSize: '0.875rem', color: 'rgba(10,10,15,0.40)',
              marginTop: '1.25rem',
            }}
          >
            Respondemos em até 24 horas.
          </p>
        </section>

      </main>

      <Footer />
    </>
  );
}
