'use client';

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import gsap from 'gsap';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { asset } from '@/lib/asset';

type Status = 'idle' | 'loading' | 'success' | 'error';

/* ── Floating label field (dark theme) ─────────────────── */

function FloatingField({
  label,
  type = 'text',
  name,
  required = false,
  textarea = false,
  rows = 5,
  autoComplete,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  const sharedClass =
    'w-full bg-transparent font-body text-white text-base outline-none border-0 border-b-[1.5px] transition-colors duration-300 px-0';
  const borderClass = focused ? 'border-[#FF7A00]' : 'border-white/20';

  return (
    <div className="form-field relative w-full pt-6">
      <label
        className={`font-body pointer-events-none absolute left-0 transition-all duration-300 ${
          active
            ? 'top-0 text-[11px] uppercase tracking-[0.18em] text-white'
            : 'top-7 text-sm text-white/40'
        }`}
      >
        {label}
        {required && <span className="ml-1 text-[#FF7A00]">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          value={value}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={`${sharedClass} ${borderClass} resize-none py-3`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={`${sharedClass} ${borderClass} py-3`}
        />
      )}
    </div>
  );
}

/* ── Select (dark theme) ───────────────────────────────── */

function FloatingSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  return (
    <div className="form-field relative w-full pt-6">
      <label
        className={`font-body pointer-events-none absolute left-0 transition-all duration-300 ${
          active
            ? 'top-0 text-[11px] uppercase tracking-[0.18em] text-white'
            : 'top-7 text-sm text-white/40'
        }`}
      >
        {label}
        {required && <span className="ml-1 text-[#FF7A00]">*</span>}
      </label>
      <select
        name={name}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full appearance-none bg-transparent font-body text-base text-white outline-none border-0 border-b-[1.5px] py-3 px-0 transition-colors duration-300 ${
          focused ? 'border-[#FF7A00]' : 'border-white/20'
        }`}
        style={{ colorScheme: 'dark' }}
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#04050F', color: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 top-9 text-white/40">▾</span>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function ContatoPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const tiltGroupRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formKey, setFormKey] = useState(0);

  const handleVideoError = useCallback(() => setVideoFailed(true), []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      projectType: String(fd.get('projectType') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
    };

    setStatus('loading');
    setErrorMsg('');

    const subject = `[Clarion] Nova mensagem de ${payload.name}`;
    const bodyLines = [
      `Nome: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Telefone: ${payload.phone}` : '',
      payload.projectType ? `Tipo de projeto: ${payload.projectType}` : '',
      '',
      'Mensagem:',
      payload.message,
    ].filter(Boolean);
    const mailto =
      'mailto:clarionwebmkt@gmail.com' +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;

    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setFormKey((k) => k + 1);
    }, 4000);
  };


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (tiltGroupRef.current) {
        if (reduced) {
          gsap.set(tiltGroupRef.current, {
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
          });
        } else {
          gsap.set(tiltGroupRef.current, {
            y: -500,
            rotateX: -35,
            rotateZ: -6,
            opacity: 0,
            scale: 0.85,
          });
          gsap.to(tiltGroupRef.current, {
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'bounce.out',
            delay: 0.3,
          });
        }
      }

      // Float infinito (drift + scale) — sem rotate, captado pelo ctx
      if (tiltGroupRef.current) {
        const floatTl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          defaults: { ease: 'sine.inOut', duration: 3.2 },
          delay: 2.0,
          paused: reduced,
        });
        floatTl
          .to(tiltGroupRef.current, { y: -45 }, 0)
          .to(tiltGroupRef.current, { x: 12 }, 0)
          .to(tiltGroupRef.current, { scale: 1.05 }, 0);
      }

      // Glow pulsante na moldura
      if (borderGlowRef.current) {
        gsap.to(borderGlowRef.current, {
          opacity: 0.35,
          boxShadow: '0 0 80px rgba(0,87,255,0.5)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.0,
          paused: reduced,
        });
      }

      if (formRef.current) {
        if (reduced) {
          gsap.set(formRef.current, { opacity: 1, x: 0 });
        } else {
          gsap.from(formRef.current, {
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.6,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section
          ref={sectionRef}
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#04050F]"
        >
          {/* Background video */}
          {!videoFailed && (
            <video
              ref={videoRef}
              src={asset('/videos/0403.mp4')}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onError={handleVideoError}
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            />
          )}

          {/* Fallback glows when video fails */}
          {videoFailed && (
            <>
              <div
                className="pointer-events-none absolute z-0"
                style={{
                  width: 700,
                  height: 700,
                  top: -150,
                  left: -150,
                  background: 'radial-gradient(circle, rgba(0,87,255,0.25) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                }}
              />
              <div
                className="pointer-events-none absolute z-0"
                style={{
                  width: 700,
                  height: 700,
                  bottom: -150,
                  right: -150,
                  background: 'radial-gradient(circle, rgba(255,122,0,0.22) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                }}
              />
            </>
          )}

          {/* Dark overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(135deg, rgba(4,5,15,0.88) 0%, rgba(4,5,15,0.65) 50%, rgba(4,5,15,0.88) 100%)',
            }}
          />

          {/* Content grid */}
          <div className="relative z-[2] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-12 lg:gap-20 lg:py-24 lg:pt-40">
            {/* ── Left column: title + wallet slot + 3D card ── */}
            <div className="flex flex-col gap-8">
              <div className="relative z-10">
                <h1 className="font-display font-[700] leading-[1.05] text-white text-[clamp(1.8rem,3.2vw,2.8rem)]">
                  Seu projeto, sua marca, seu resultado — em{' '}
                  <span className="bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent">
                    um só lugar
                  </span>
                  .
                </h1>
                <p className="mt-3 font-body text-white/60" style={{ fontSize: '0.95rem' }}>
                  Tudo o que você precisa para tirar a ideia do papel.
                </p>
              </div>

              {/* Float group: moldura + card flutuam juntos */}
              <div
                ref={cardWrapRef}
                className="relative z-0 mt-16 flex items-center justify-center lg:mt-24"
                style={{ perspective: '1400px' }}
              >
                <div
                  ref={tiltGroupRef}
                  className="relative w-full max-w-[420px]"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Moldura decorativa (border tracejada + glow pulsante) */}
                  <div
                    ref={borderGlowRef}
                    aria-hidden
                    className="pointer-events-none absolute -inset-6 rounded-3xl border border-dashed border-white/15 sm:-inset-8"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(0,87,255,0.10) 0%, transparent 70%)',
                      boxShadow: '0 0 0px rgba(0,87,255,0)',
                    }}
                  />
              <div
                ref={cardRef}
                className="contact-card relative w-full"
                style={{
                  aspectRatio: '1.6 / 1',
                  borderRadius: 20,
                  padding: 32,
                  background:
                    'linear-gradient(135deg, rgba(0,87,255,0.50) 0%, rgba(255,122,0,0.35) 100%)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow:
                    '0 30px 80px -20px rgba(0,87,255,0.4), 0 20px 50px -20px rgba(255,122,0,0.3)',
                  ['--mx' as never]: '50%',
                  ['--my' as never]: '50%',
                }}
              >
                {/* Cursor glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: 20,
                    background:
                      'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.18), transparent 40%)',
                  }}
                />

                {/* Chip */}
                <div className="relative" style={{ width: 40, height: 32 }}>
                  <svg viewBox="0 0 40 32" fill="none" className="h-full w-full">
                    <defs>
                      <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0057FF" />
                        <stop offset="100%" stopColor="#FF7A00" />
                      </linearGradient>
                    </defs>
                    <rect x="1" y="1" width="38" height="30" rx="5" fill="url(#chip)" opacity="0.9" />
                    <rect x="6" y="6" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="22" y="6" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="6" y="18" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="22" y="18" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.25)" />
                  </svg>
                </div>

                {/* Center brand */}
                <div className="relative mt-6">
                  <div className="font-display font-[700] text-white" style={{ fontSize: '2rem', letterSpacing: '0.05em' }}>
                    CLARION
                  </div>
                  <div className="font-body uppercase text-white/60" style={{ fontSize: 10, letterSpacing: '0.22em' }}>
                    Digital Studio
                  </div>
                </div>

                {/* Footer row */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-6">
                  <span className="font-body text-white/60" style={{ fontSize: 11 }}>
                    São Paulo · BR
                  </span>
                  <span className="font-body text-white/80" style={{ fontSize: 11 }}>
                    clarionwebmkt@gmail.com
                  </span>
                </div>
              </div>
                </div>
              </div>
            </div>

            {/* ── Form panel ── */}
            <div
              className="relative w-full max-w-[520px] justify-self-center lg:justify-self-end"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 20,
                padding: 32,
              }}
            >
              <h1
                className="font-display font-[700] leading-tight text-white"
                style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', marginBottom: 8 }}
              >
                Vamos criar algo incrível.
              </h1>
              <p className="font-body text-white/60" style={{ fontSize: '0.95rem', marginBottom: 32 }}>
                Conte sobre seu projeto. Respondemos em 24 horas.
              </p>

              <form
                key={formKey}
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-2"
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0 pointer-events-none"
                />
                <FloatingField label="Nome completo" name="name" required autoComplete="name" />
                <FloatingField label="Email profissional" type="email" name="email" required autoComplete="email" />
                <FloatingField label="Telefone / WhatsApp" type="tel" name="phone" autoComplete="tel" />
                <FloatingSelect
                  label="Tipo de projeto"
                  name="projectType"
                  required
                  options={['Sites', 'Apps', 'Automações', 'Dashboards', 'Outro']}
                />
                <FloatingField label="Mensagem" name="message" textarea rows={5} required />

                <div className="form-cta mt-6">
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    aria-busy={status === 'loading'}
                    className="font-display flex h-14 w-full items-center justify-center gap-2 rounded-pill text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
                    style={{
                      background: status === 'success' ? '#00C896' : '#0057FF',
                      boxShadow:
                        status === 'success'
                          ? '0 12px 30px -10px rgba(0,200,150,0.5)'
                          : '0 12px 30px -10px rgba(0,87,255,0.6)',
                    }}
                  >
                    {status === 'loading' && (
                      <svg className="contact-spinner h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    )}
                    {status === 'idle' && <>Enviar mensagem →</>}
                    {status === 'loading' && <>Enviando...</>}
                    {status === 'success' && <>Mensagem enviada ✓</>}
                    {status === 'error' && <>Tentar novamente</>}
                  </button>
                  {status === 'error' && errorMsg && (
                    <p role="alert" className="mt-3 text-center text-sm text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes contact-spin {
          to { transform: rotate(360deg); }
        }
        .contact-spinner {
          animation: contact-spin 0.9s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-spinner { animation: none; }
        }
      `}</style>
    </>
  );
}
