'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from './ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ['O', 'que', 'fazemos'];

const SERVICES = [
  {
    tag: 'Desenvolvimento',
    title: 'Desenvolvimento Web',
    description:
      'Sites e aplicações web de alta performance com as tecnologias mais modernas do mercado. De landing pages a plataformas complexas.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 16H44" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="12" r="1.5" fill="#FF7A00" />
        <circle cx="15" cy="12" r="1.5" fill="#0057FF" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <path d="M18 27L14 31L18 35" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 27L34 31L30 35" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 25L22 37" stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 44H32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: 'Design',
    title: 'Design de Produto',
    description:
      'Interfaces intuitivas e experiências memoráveis. Do wireframe ao protótipo interativo, desenhamos cada pixel com propósito.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="14" width="16" height="10" rx="2" stroke="#0057FF" strokeWidth="1.5" />
        <rect x="12" y="28" width="10" height="6" rx="1.5" stroke="#FF7A00" strokeWidth="1.5" />
        <rect x="26" y="28" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="34" cy="12" r="2" stroke="#FF7A00" strokeWidth="1.5" />
        <path d="M32 19V14H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    tag: 'Estratégia',
    title: 'Estratégia Digital',
    description:
      'Planejamento baseado em dados para posicionar sua marca no digital com clareza e resultados mensuráveis.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 38L16 28L22 32L30 20L40 10" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="10" r="3" stroke="#FF7A00" strokeWidth="1.5" />
        <path d="M8 42H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M8 8V42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    tag: 'Branding',
    title: 'Branding & Identidade',
    description:
      'Construímos identidades visuais consistentes que comunicam a essência da sua marca em cada ponto de contato.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="10" stroke="#0057FF" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="10" stroke="#FF7A00" strokeWidth="1.5" />
        <circle cx="25" cy="28" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll('.services-word');
      if (words?.length) {
        gsap.set(words, { opacity: 0, color: '#FF7A00' });

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

      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.15,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative bg-white py-section"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.1] tracking-tight text-[#0a0a0f]"
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="services-word inline-block">
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>

        <p className="mt-6 max-w-xl text-lg text-[rgba(10,10,15,0.55)]">
          Soluções completas para cada etapa da sua presença digital.
        </p>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        >
          <div className="service-card lg:col-span-2 lg:row-span-2">
            <ServiceCard
              tag={SERVICES[0].tag}
              title={SERVICES[0].title}
              description={SERVICES[0].description}
              icon={SERVICES[0].icon}
              className="h-full"
            />
          </div>

          <div className="service-card lg:col-span-2">
            <ServiceCard
              tag={SERVICES[1].tag}
              title={SERVICES[1].title}
              description={SERVICES[1].description}
              icon={SERVICES[1].icon}
              className="h-full"
            />
          </div>

          <div className="service-card">
            <ServiceCard
              tag={SERVICES[2].tag}
              title={SERVICES[2].title}
              description={SERVICES[2].description}
              icon={SERVICES[2].icon}
              className="h-full"
            />
          </div>

          <div className="service-card">
            <ServiceCard
              tag={SERVICES[3].tag}
              title={SERVICES[3].title}
              description={SERVICES[3].description}
              icon={SERVICES[3].icon}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
