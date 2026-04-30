'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  number: string;
  tag: string;
  shortTag: string;
  label: string;
  title: string;
  description: string;
  gradient: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    tag: 'Web',
    shortTag: 'WEB',
    label: 'Sites',
    title: 'Sites',
    description:
      'Sites institucionais e landing pages com foco em conversão, performance e visual premium.',
    gradient: 'linear-gradient(135deg, #04050F 0%, #0057FF 100%)',
  },
  {
    number: '02',
    tag: 'Mobile',
    shortTag: 'MOBILE',
    label: 'Apps',
    title: 'Apps',
    description:
      'Aplicativos mobile e web com UX cuidado, do wireframe ao deploy nas stores.',
    gradient: 'linear-gradient(135deg, #FF7A00 0%, #04050F 100%)',
  },
  {
    number: '03',
    tag: 'Workflow',
    shortTag: 'AUTOMAÇÃO',
    label: 'Automações',
    title: 'Automações',
    description:
      'Fluxos automatizados que conectam suas ferramentas e eliminam trabalho repetitivo.',
    gradient: 'linear-gradient(135deg, #0057FF 0%, #FF7A00 100%)',
  },
  {
    number: '04',
    tag: 'Data',
    shortTag: 'DATA',
    label: 'Dashboards',
    title: 'Dashboards',
    description:
      'Painéis interativos que transformam seus dados em decisões acionáveis em tempo real.',
    gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
  },
];

const AUTOPLAY_MS = 5000;

export default function ServicosPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % SERVICES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!ctaRef.current) return;
      if (isReduced) {
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }
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
    });
    return () => ctx.revert();
  }, []);

  const current = SERVICES[active];
  const slideTransition = reduced
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <>
      <Navbar />

      <main className="relative min-h-[100svh] overflow-hidden">
        {/* ━━ BACKGROUND ÚNICO FIXO (cobre toda a página) ━━ */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[#04050F]">
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              className="absolute inset-0"
              style={{ background: current.gradient }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduced ? 0.2 : 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </AnimatePresence>

          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Top-right glow */}
          <div
            className="absolute"
            style={{
              width: 700,
              height: 700,
              top: -160,
              right: -160,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* ━━ SEÇÃO ÚNICA — PALCO + CARROSSEL ━━━━━━━ */}
        <section
          ref={sectionRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative flex min-h-[100svh] flex-col"
        >
          {/* Vertical gradient line */}
          <div className="pointer-events-none absolute left-8 top-24 bottom-32 z-[2] w-px bg-gradient-to-b from-blue/60 via-white/10 to-orange/60" />

          {/* Giant decorative number */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 top-1/2 z-[2] -translate-y-1/2 select-none font-display font-[900] leading-none text-white/[0.04] text-[clamp(8rem,20vw,18rem)]"
          >
            {current.number}
          </div>

          {/* Centered content */}
          <div className="relative z-10 flex flex-1 items-center">
            <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-40 sm:px-6 sm:pt-32 md:pt-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={slideTransition}
                  className="flex flex-col"
                >
                  <span className="font-display font-[700] leading-none text-white/50 text-[clamp(1rem,2vw,1.5rem)]">
                    {current.number}
                  </span>
                  <span className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60 sm:text-sm">
                    {current.tag}
                  </span>
                  <h1 className="mt-3 font-display font-[700] leading-[1.02] text-white text-[clamp(3rem,7vw,7rem)]">
                    {current.title}
                  </h1>
                  <p className="mt-6 max-w-xl font-body text-white/80 text-[clamp(1rem,1.5vw,1.2rem)]">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel anchored at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-12 sm:px-8">
            <div className="relative">
              {/* Reference line */}
              <div className="absolute left-0 right-0 top-0 h-px bg-white/15" />
              {/* Active bar */}
              <div
                className="absolute top-0 h-px bg-white"
                style={{
                  width: '25%',
                  left: `${active * 25}%`,
                  transition: 'left 600ms cubic-bezier(0.22,1,0.36,1)',
                }}
              />

              <div className="grid grid-cols-4 gap-0">
                {SERVICES.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={`Selecionar serviço ${s.label}`}
                      className="group relative pt-6 text-left"
                    >
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {s.number} — 04
                      </span>
                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full bg-white transition-all duration-400 ${
                            isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                          }`}
                        />
                        <span
                          className={`font-display font-[700] text-[clamp(1rem,1.6vw,1.5rem)] transition-colors duration-400 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/40 group-hover:text-white/70'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <span className="mt-2 block text-[9px] uppercase tracking-[0.25em] text-white/30">
                        {s.shortTag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ━━ CTA FINAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative px-5 py-32 text-center sm:px-8 lg:px-16 lg:py-40">
          <div ref={ctaRef} className="relative z-[1]">
            <h2 className="font-display font-[700] leading-[1.05] text-white text-[clamp(2rem,4vw,3.5rem)]">
              Tem um projeto em mente
              <span style={{ color: '#FF7A00' }}>?</span>
            </h2>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Link
                href="/contato"
                className="font-body rounded-pill bg-white px-8 py-3.5 text-sm font-medium text-[#04050F] transition-all duration-mid hover:bg-white/90 hover:shadow-lg"
              >
                Solicitar orçamento gratuito
              </Link>
              <span className="font-body text-sm text-white/60">
                Respondemos em até 24 horas.
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
