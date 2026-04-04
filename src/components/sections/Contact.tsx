'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
        });
      }

      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields?.length) {
        gsap.set(fields, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(fields, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative flex min-h-[60vh] lg:min-h-[80vh] items-center justify-center overflow-hidden bg-[#f5f5f7]"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(0,87,255,0.05)] blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 py-16 sm:py-20 lg:py-40 text-center sm:px-6">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[700] leading-[1.05] tracking-tight text-[#0a0a0f]"
        >
          Pronto para começar<span className="text-[#FF7A00]">?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-lg text-[rgba(10,10,15,0.60)]">
          Vamos construir algo incrível juntos.
        </p>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 flex flex-col gap-4 text-left"
        >
          <div className="form-field grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-[0.75rem] border border-[#d0d0d8] bg-white px-5 py-4 text-sm text-[#0a0a0f] placeholder-[rgba(10,10,15,0.35)] outline-none transition-all duration-fast focus:border-[#0057FF] focus:shadow-[0_0_0_3px_rgba(0,87,255,0.12)]"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full rounded-[0.75rem] border border-[#d0d0d8] bg-white px-5 py-4 text-sm text-[#0a0a0f] placeholder-[rgba(10,10,15,0.35)] outline-none transition-all duration-fast focus:border-[#0057FF] focus:shadow-[0_0_0_3px_rgba(0,87,255,0.12)]"
            />
          </div>
          <textarea
            rows={5}
            placeholder="Conte sobre seu projeto..."
            className="form-field w-full resize-none rounded-[0.75rem] border border-[#d0d0d8] bg-white px-5 py-4 text-sm text-[#0a0a0f] placeholder-[rgba(10,10,15,0.35)] outline-none transition-all duration-fast focus:border-[#0057FF] focus:shadow-[0_0_0_3px_rgba(0,87,255,0.12)]"
          />
          <button
            type="submit"
            className="form-field mt-2 w-full rounded-pill bg-[#0057FF] px-10 py-4 text-sm font-[500] text-white transition-all duration-mid hover:bg-[#0040CC] hover:shadow-lg hover:shadow-[rgba(0,87,255,0.12)] active:scale-[0.97] sm:mx-auto sm:w-auto"
          >
            Enviar mensagem
          </button>
        </form>

        {/* Alternative contact */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="form-field flex items-center gap-2 rounded-pill border border-[#e0e0e8] px-6 py-3 text-sm text-[rgba(10,10,15,0.64)] transition-all duration-mid hover:border-[#0057FF] hover:text-[#0057FF]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                fill="currentColor"
              />
              <path
                d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.29-1.24l-.31-.18-2.87.85.85-2.87-.2-.31A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z"
                fill="currentColor"
              />
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:contato@clarion.com.br"
            className="form-field flex items-center gap-2 rounded-pill border border-[#e0e0e8] px-6 py-3 text-sm text-[rgba(10,10,15,0.64)] transition-all duration-mid hover:border-[#0057FF] hover:text-[#0057FF]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 7l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            E-mail
          </a>
        </div>
      </div>
    </section>
  );
}
