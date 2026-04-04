'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ['O', 'que', 'dizem', 'sobre', 'nós'];

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  gradientFrom: string;
  gradientTo: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marina Alves',
    role: 'CEO, NovaPay',
    text: 'A Clarion transformou completamente nossa presença digital. O dashboard que desenvolveram superou todas as expectativas em usabilidade e performance.',
    stars: 5,
    gradientFrom: '#0057FF',
    gradientTo: '#00AAFF',
  },
  {
    name: 'Rafael Torres',
    role: 'Fundador, Vértice Store',
    text: 'Profissionalismo e atenção aos detalhes fora do comum. O e-commerce ficou incrível e nossas conversões aumentaram 40% no primeiro mês.',
    stars: 5,
    gradientFrom: '#FF7A00',
    gradientTo: '#FFAA44',
  },
  {
    name: 'Camila Duarte',
    role: 'Head de Marketing, Atmos Health',
    text: 'A equipe da Clarion entendeu exatamente o que precisávamos. Desde a estratégia até a entrega final, o processo foi impecável.',
    stars: 5,
    gradientFrom: '#0057FF',
    gradientTo: '#FF7A00',
  },
  {
    name: 'Lucas Ferreira',
    role: 'Diretor, Onda Festival',
    text: 'A identidade visual que criaram para o festival foi um divisor de águas. Recebemos elogios de patrocinadores e do público em geral.',
    stars: 5,
    gradientFrom: '#FF7A00',
    gradientTo: '#FF5500',
  },
  {
    name: 'Beatriz Mendes',
    role: 'CPO, Loop Fitness',
    text: 'O app ficou extremamente intuitivo e bonito. Os usuários adoraram a experiência e nossa retenção aumentou significativamente.',
    stars: 5,
    gradientFrom: '#00AAFF',
    gradientTo: '#0057FF',
  },
  {
    name: 'André Costa',
    role: 'Fundador, Café Roost',
    text: 'Trabalhar com a Clarion foi uma experiência incrível. Captaram a essência da nossa marca e traduziram em algo visualmente poderoso.',
    stars: 4,
    gradientFrom: '#FF7A00',
    gradientTo: '#0057FF',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? '#FF7A00' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1L8.76 4.58L12.73 5.16L9.87 7.94L10.52 11.89L7 10.02L3.48 11.89L4.13 7.94L1.27 5.16L5.24 4.58L7 1Z"
            stroke={i < count ? '#FF7A00' : 'rgba(255,255,255,0.15)'}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 w-[85vw] sm:w-[380px] shrink-0 rounded-[1.5rem] border border-white/[0.10] bg-[rgba(255,255,255,0.06)] p-7">
      <Stars count={t.stars} />
      <p className="mt-5 text-sm leading-relaxed text-white/80">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar */}
        <div
          className="h-10 w-10 shrink-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
          }}
        />
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-white/55">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  speed: string;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="group relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#04050F] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#04050F] to-transparent" />

      <div
        className={`flex w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll('.testimonials-word');
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
              color: '#ffffff',
              duration: 0.5,
              stagger: 0.1,
              delay: 0.15,
              ease: 'power1.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split testimonials for two rows
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3);

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#04050F] py-16 sm:py-20 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2
          ref={titleRef}
          className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.1] tracking-tight text-white"
        >
          {TITLE_WORDS.map((word, i) => (
            <span key={i} className="testimonials-word inline-block">
              {word}
              {i < TITLE_WORDS.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-white/55">
          A confiança de quem já trabalhou com a gente.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="mt-16 flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" speed="45s" />
        <MarqueeRow items={row2} direction="right" speed="55s" />
      </div>
    </section>
  );
}
