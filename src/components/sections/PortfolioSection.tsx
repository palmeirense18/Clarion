'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'NovaPay Dashboard',
    category: 'Fintech',
    type: 'Web App',
    desc: 'Dashboard financeiro de alta performance com visualização de dados em tempo real, gestão de transações e relatórios automatizados.',
    techs: ['React', 'Next.js', 'TypeScript'],
    gradient: 'linear-gradient(135deg, #0057FF, #0040CC)',
  },
  {
    id: '02',
    name: 'Virtus Store',
    category: 'E-commerce',
    type: 'Design + Dev',
    desc: 'Loja virtual premium com experiência de compra fluida, checkout otimizado e integração completa com gestão de estoque.',
    techs: ['Shopify', 'Figma'],
    gradient: 'linear-gradient(135deg, #FF7A00, #CC4400)',
  },
  {
    id: '03',
    name: 'AtmosHealth',
    category: 'Saúde Digital',
    type: 'Produto Digital',
    desc: 'Plataforma de saúde digital com agendamento inteligente, prontuário eletrônico e telemedicina integrada.',
    techs: ['React Native', 'Node'],
    gradient: 'linear-gradient(135deg, #0a0a0f, #1a1a2e)',
  },
  {
    id: '04',
    name: 'Drois Festival',
    category: 'Eventos',
    type: 'Branding + Web',
    desc: 'Identidade visual vibrante e site imersivo para festival de música independente com 15 mil participantes.',
    techs: ['Next.js', 'GSAP'],
    gradient: 'linear-gradient(135deg, #0057FF 0%, #FF7A00 100%)',
  },
  {
    id: '05',
    name: 'Loop Fitness',
    category: 'Fitness',
    type: 'App',
    desc: 'Aplicativo de treino personalizado com tracking de progresso, planos adaptativos e comunidade integrada.',
    techs: ['React Native', 'Firebase'],
    gradient: 'linear-gradient(135deg, #1a1a2e, #0057FF)',
  },
  {
    id: '06',
    name: 'Café Roast',
    category: 'Branding',
    type: 'Identidade Visual',
    desc: 'Identidade visual completa para marca de cafés especiais — do logo à embalagem, passando por cardápio e sinalização.',
    techs: ['Figma', 'Illustrator'],
    gradient: 'linear-gradient(135deg, #2a0a0a, #FF7A00)',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');

      // Cards 2–6 start below the viewport
      gsap.set(cards.slice(1), { yPercent: 100 });

      // Timeline pinned to the stack — scroll locks here
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cards.length * 65}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          refreshPriority: -1,
        },
      });

      // Each card (except the first) animates yPercent 100 → 0
      cards.slice(1).forEach((card, i) => {
        tl.to(card, {
          yPercent: 0,
          duration: 1,
          ease: 'none',
        }, i);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio">
      {/* Title — outside the pinned stack */}
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 2rem 2rem',
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

      {/* Stack — this element gets PINNED */}
      <div
        ref={stackRef}
        style={{
          position: 'relative',
          height: 'calc(100vh - 7rem)',
          overflow: 'hidden',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="portfolio-card"
            style={{
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
            }}
          >
            <div
              style={{
                display: 'flex',
                maxWidth: '1100px',
                width: '100%',
                alignItems: 'center',
              }}
              className="flex-col lg:flex-row px-5 sm:px-8 lg:px-12 gap-6 lg:gap-16"
            >
              {/* Info — left */}
              <div style={{ flex: 1 }}>
                <span
                  className="font-body"
                  style={{
                    fontSize: '0.75rem',
                    color: '#FF7A00',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {project.category} — {project.type}
                </span>

                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: '#0a0a0f',
                    margin: '0.75rem 0 1.25rem',
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
                    maxWidth: '380px',
                    lineHeight: 1.65,
                  }}
                >
                  {project.desc}
                </p>

                {/* Tech pills */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                  {project.techs.map((tech) => (
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

                <button
                  className="font-body"
                  style={{
                    marginTop: '2rem',
                    padding: '0.75rem 2rem',
                    borderRadius: '99px',
                    border: '1.5px solid #0057FF',
                    background: 'transparent',
                    color: '#0057FF',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0057FF';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#0057FF';
                  }}
                >
                  Ver projeto →
                </button>
              </div>

              {/* Visual — right */}
              <div
                className="hidden lg:block"
                style={{
                  width: '420px',
                  height: '320px',
                  borderRadius: '1.25rem',
                  background: project.gradient,
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Background number */}
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
          </div>
        ))}
      </div>
    </section>
  );
}
