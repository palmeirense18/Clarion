'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PortfolioCard from './PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ['Nosso', 'trabalho'];

const CASES = [
  {
    title: 'NovaPay — Fintech Dashboard',
    tag: 'Web App',
    gradient:
      'linear-gradient(135deg, rgba(0,87,255,0.15) 0%, rgba(240,240,245,1) 60%)',
    videoSrc: '/videos/case1.mp4',
    span2: true,
  },
  {
    title: 'Vértice Store',
    tag: 'E-commerce',
    gradient:
      'linear-gradient(135deg, rgba(255,122,0,0.12) 0%, rgba(240,240,245,1) 70%)',
  },
  {
    title: 'Atmos Health',
    tag: 'Web App',
    gradient:
      'linear-gradient(135deg, rgba(0,87,255,0.10) 0%, rgba(255,122,0,0.06) 50%, rgba(240,240,245,1) 100%)',
  },
  {
    title: 'Onda Festival',
    tag: 'Branding',
    gradient:
      'linear-gradient(135deg, rgba(255,122,0,0.15) 0%, rgba(240,240,245,1) 60%)',
  },
  {
    title: 'Loop Fitness',
    tag: 'Aplicativo',
    gradient:
      'linear-gradient(135deg, rgba(0,87,255,0.12) 0%, rgba(240,240,245,1) 70%)',
  },
  {
    title: 'Café Roost — Identidade Visual',
    tag: 'Branding',
    gradient:
      'linear-gradient(135deg, rgba(255,122,0,0.10) 0%, rgba(0,87,255,0.06) 50%, rgba(240,240,245,1) 100%)',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Title flash text ---
      const words = titleRef.current?.querySelectorAll('.portfolio-word');
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

      // --- Cards stagger ---
      const cards = gridRef.current?.querySelectorAll('.portfolio-item');
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
              stagger: 0.12,
            });
          },
        });
      }

      // --- Button fade ---
      if (btnRef.current) {
        gsap.set(btnRef.current, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: btnRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(btnRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
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
      id="portfolio"
      ref={sectionRef}
      className="relative bg-bg-alt py-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.1] tracking-tight text-text-100"
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="portfolio-word inline-block">
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>

        <p className="mt-6 max-w-xl text-lg text-text-50">
          Projetos que mostram como transformamos visão em resultado.
        </p>

        {/* Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-4 md:grid-cols-2"
        >
          {CASES.map((c, i) => (
            <div key={i} className={`portfolio-item ${c.span2 ? 'md:col-span-2' : ''}`}>
              <PortfolioCard
                title={c.title}
                tag={c.tag}
                gradient={c.gradient}
                videoSrc={c.videoSrc}
                span2={c.span2}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={btnRef} className="mt-16 flex justify-center">
          <a
            href="#"
            className="rounded-pill border border-blue px-8 py-3.5 text-sm font-medium text-blue transition-all duration-mid hover:bg-blue hover:text-white"
          >
            Ver todos os projetos
          </a>
        </div>
      </div>
    </section>
  );
}
