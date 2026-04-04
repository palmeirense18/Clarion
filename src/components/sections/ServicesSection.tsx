'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: '01',
    title: 'Desenvolvimento Web',
    tag: 'Desenvolvimento',
    description:
      'Sites, apps e plataformas digitais construídos com performance e escalabilidade em mente.',
    gradient: 'linear-gradient(135deg, #0057FF, #0040CC)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="7" width="32" height="22" rx="2.5" stroke="white" strokeWidth="1.5" />
        <path d="M4 13h32" stroke="white" strokeWidth="1.5" />
        <path d="M15 22l-3 3.5 3 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 22l3 3.5-3 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 20l-4 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 36h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design de Produto',
    tag: 'Design',
    description:
      'Interfaces que as pessoas amam usar. Do wireframe ao produto final com UX pesquisado.',
    gradient: 'linear-gradient(135deg, #FF7A00, #CC4400)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="28" height="28" rx="2.5" stroke="white" strokeWidth="1.5" />
        <rect x="11" y="12" width="12" height="8" rx="1.5" stroke="white" strokeWidth="1.5" />
        <rect x="11" y="24" width="8" height="5" rx="1" stroke="white" strokeWidth="1.5" />
        <rect x="23" y="24" width="8" height="5" rx="1" stroke="white" strokeWidth="1.5" />
        <circle cx="29" cy="10" r="1.5" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Estratégia Digital',
    tag: 'Estratégia',
    description:
      'Planejamento, posicionamento e crescimento para marcas que querem se destacar online.',
    gradient: 'linear-gradient(135deg, #0057FF, #FF7A00)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M7 32l7-9 5 4 7-10 8-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="9" r="2.5" stroke="white" strokeWidth="1.5" />
        <path d="M7 36h28" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M7 7v29" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Branding & Identidade',
    tag: 'Branding',
    description:
      'Identidade visual que comunica, conecta e fica na memória do seu público.',
    gradient: 'linear-gradient(135deg, #0a0a0f, #1a1a2e)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="16" cy="17" r="8" stroke="white" strokeWidth="1.5" />
        <circle cx="25" cy="17" r="8" stroke="white" strokeWidth="1.5" />
        <circle cx="20.5" cy="24" r="8" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
];

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
  return (
    <div
      className="service-row gsap-hidden"
      style={{ borderBottom: isLast ? '1px solid #e0e0e8' : undefined }}
    >
      <div
        onClick={onToggle}
        onMouseEnter={onToggle}
        className="group cursor-pointer border-t border-[#e0e0e8] transition-colors duration-[400ms]"
        style={{ backgroundColor: isOpen ? '#f5f5f7' : 'transparent' }}
      >
        {/* Collapsed row */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-6">
          {/* Number */}
          <span
            className="hidden font-display text-sm transition-colors duration-[400ms] sm:block"
            style={{ color: isOpen ? '#0057FF' : 'rgba(10,10,15,0.30)' }}
          >
            {service.number}
          </span>

          {/* Title */}
          <h3
            className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-semibold leading-tight transition-colors duration-[400ms]"
            style={{ color: isOpen ? '#0057FF' : '#0a0a0f' }}
          >
            {service.title}
          </h3>

          {/* Tag + Arrow */}
          <div className="flex items-center gap-6">
            <span className="hidden font-body text-xs uppercase tracking-[0.1em] text-[rgba(10,10,15,0.40)] md:block">
              {service.tag}
            </span>
            <span
              className="inline-block text-lg transition-transform duration-[400ms]"
              style={{
                color: 'rgba(10,10,15,0.30)',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              →
            </span>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-8 sm:px-6 md:flex-row md:items-center">
                {/* Description — left 60% */}
                <div className="md:w-[60%]">
                  <p className="max-w-lg font-body text-base leading-relaxed text-[rgba(10,10,15,0.65)]">
                    {service.description}
                  </p>
                </div>

                {/* Visual — right 40% */}
                <div className="md:w-[40%]">
                  <div
                    className="flex h-40 w-full items-center justify-center rounded-2xl"
                    style={{ background: service.gradient }}
                  >
                    {service.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const words = titleRef.current?.querySelectorAll('.services-word');
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

      // Row stagger entrance
      const rows = listRef.current?.querySelectorAll('.service-row');
      if (rows?.length) {
        gsap.set(rows, { opacity: 0, x: -30, visibility: 'visible' });

        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.12,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const TITLE_WORDS = ['O', 'que', 'fazemos'];

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
      style={{ paddingTop: '4rem', paddingBottom: '8rem' }}
    >
      {/* Background decorations */}
      <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
      <div className="bg-glow-orange" style={{ top: '-150px', right: '-150px' }} />
      <div className="bg-glow-blue" style={{ bottom: '-100px', left: '-100px' }} />
      <div className="bg-diagonal-accent absolute inset-0" />

      <div className="relative z-[1] mx-auto max-w-7xl px-5 sm:px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.1] tracking-tight text-[#0a0a0f]"
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="services-word gsap-hidden inline-block">
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-[rgba(10,10,15,0.55)]">
          Soluções completas para cada etapa da sua presença digital.
        </p>
      </div>

      {/* Service rows */}
      <div ref={listRef} className="relative z-[1] mx-auto mt-16 max-w-7xl px-5 sm:px-6">
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
  );
}
