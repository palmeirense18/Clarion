'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/layout/Navbar';

/* ── Floating label input ─────────────────────────────── */

function FloatingField({
  label,
  type = 'text',
  name,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  return (
    <div className="form-field" style={{ position: 'relative', width: '100%' }}>
      <label
        className="font-body"
        style={{
          position: 'absolute', left: 0,
          top: active ? '-0.5rem' : '50%',
          transform: active ? 'none' : 'translateY(-50%)',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#0057FF' : 'rgba(10,10,15,0.40)',
          background: active ? '#ffffff' : 'transparent',
          padding: active ? '0 4px' : '0',
          transition: 'all 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="font-body"
        style={{
          width: '100%', border: 'none',
          borderBottom: `1.5px solid ${focused ? '#0057FF' : '#e0e0e8'}`,
          borderRadius: 0, background: 'transparent',
          padding: '1.25rem 0 0.75rem',
          fontSize: '1rem', color: '#0a0a0f',
          outline: 'none',
          transition: 'border-color 0.25s',
        }}
      />
    </div>
  );
}

/* ── Floating label textarea ──────────────────────────── */

function FloatingTextarea({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  return (
    <div className="form-field" style={{ position: 'relative', width: '100%' }}>
      <label
        className="font-body"
        style={{
          position: 'absolute', left: 0,
          top: active ? '-0.5rem' : '1.25rem',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#0057FF' : 'rgba(10,10,15,0.40)',
          background: active ? '#ffffff' : 'transparent',
          padding: active ? '0 4px' : '0',
          transition: 'all 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="font-body"
        style={{
          width: '100%', border: 'none',
          borderBottom: `1.5px solid ${focused ? '#0057FF' : '#e0e0e8'}`,
          borderRadius: 0, background: 'transparent',
          padding: '1.25rem 0 0.75rem',
          fontSize: '1rem', color: '#0a0a0f',
          outline: 'none', resize: 'vertical',
          minHeight: 140,
          transition: 'border-color 0.25s',
        }}
      />
    </div>
  );
}

/* ── Floating label select ────────────────────────────── */

function FloatingSelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const active = focused || value.length > 0;

  return (
    <div className="form-field" style={{ position: 'relative', width: '100%' }}>
      <label
        className="font-body"
        style={{
          position: 'absolute', left: 0,
          top: active ? '-0.5rem' : '50%',
          transform: active ? 'none' : 'translateY(-50%)',
          fontSize: active ? '0.75rem' : '0.95rem',
          color: active ? '#0057FF' : 'rgba(10,10,15,0.40)',
          background: active ? '#ffffff' : 'transparent',
          padding: active ? '0 4px' : '0',
          transition: 'all 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="font-body"
        style={{
          width: '100%', border: 'none',
          borderBottom: `1.5px solid ${focused ? '#0057FF' : '#e0e0e8'}`,
          borderRadius: 0, background: 'transparent',
          padding: '1.25rem 0 0.75rem',
          fontSize: '1rem',
          color: value ? '#0a0a0f' : 'transparent',
          outline: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230a0a0f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0 center',
          transition: 'border-color 0.25s',
        }}
      >
        <option value="" disabled>Selecione o tipo de projeto</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* ── Contact info item ────────────────────────────────── */

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div
        style={{
          width: 40, height: 40,
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '0.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <span
          className="font-body"
          style={{
            fontSize: '0.75rem', textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)',
            display: 'block',
          }}
        >
          {label}
        </span>
        <span
          className="font-body"
          style={{ fontSize: '0.95rem', fontWeight: 500, color: '#ffffff' }}
        >
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }
  return content;
}

/* ── Social icon button ───────────────────────────────── */

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="transition-all duration-[250ms] hover:border-[#FF7A00]"
      style={{
        width: 40, height: 40,
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '0.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.50)',
        transition: 'all 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#FF7A00';
        e.currentTarget.style.color = '#FF7A00';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.50)';
      }}
    >
      {children}
    </a>
  );
}

/* ── Main page ────────────────────────────────────────── */

const BUDGET_OPTIONS = [
  'Até R$ 5.000',
  'R$ 5.000 – R$ 15.000',
  'R$ 15.000 – R$ 50.000',
  'Acima de R$ 50.000',
];

const PROJECT_TYPES = [
  'Desenvolvimento Web',
  'Design de Produto',
  'Estratégia Digital',
  'Branding & Identidade',
  'Outro',
];

export default function ContatoPage() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [budget, setBudget] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    // Left column entrance
    if (leftRef.current) {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }

    // Form fields stagger entrance
    const fields = document.querySelectorAll('.form-field, .budget-card, .submit-area');
    if (fields.length) {
      gsap.fromTo(fields,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.4 }
      );
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState('loading');
    setTimeout(() => setSubmitState('success'), 1500);
    setTimeout(() => setSubmitState('idle'), 4000);
  }

  return (
    <>
      <Navbar />

      <main
        className="flex flex-col lg:flex-row"
        style={{ minHeight: '100vh', paddingTop: 0 }}
      >
        {/* ── Left column (dark, sticky) ── */}
        <div
          ref={leftRef}
          className="w-full lg:w-[45%] lg:sticky lg:top-0 lg:min-h-screen px-5 sm:px-8 lg:px-16 pt-24 sm:pt-32 lg:pt-40 pb-8 lg:pb-16"
          style={{
            background: '#0a0a0f',
            opacity: 0,
          }}
        >
          <span
            className="font-body"
            style={{
              fontSize: '0.8rem', textTransform: 'uppercase',
              letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)',
              display: 'block',
            }}
          >
            Contato
          </span>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 800, color: '#ffffff',
              lineHeight: 1.0, marginTop: '1rem',
            }}
          >
            Vamos construir algo incrível <span style={{ color: '#FF7A00' }}>juntos.</span>
          </h1>

          <p
            className="font-body"
            style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.50)',
              lineHeight: 1.7, marginTop: '1.5rem', maxWidth: 360,
            }}
          >
            Conte-nos sobre seu projeto. Respondemos em até 24 horas com uma proposta personalizada.
          </p>

          {/* Separator */}
          <div className="my-6 sm:my-8 lg:my-12" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

          {/* Contact items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ContactItem
              label="Email"
              value="contato@clarion.com.br"
              href="mailto:contato@clarion.com.br"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 6 10-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <ContactItem
              label="WhatsApp"
              value="+55 (11) 99999-9999"
              href="https://wa.me/5511999999999"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <ContactItem
              label="Localização"
              value="São Paulo, SP — Brasil"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
          </div>

          {/* Separator */}
          <div className="my-6 sm:my-8 lg:my-12" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <SocialIcon label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 114 0v4M11 10v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Behance">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12h6a3 3 0 100-6H3v12h7a3.5 3.5 0 100-7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 6h6M15 15a4 4 0 108 0h-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
            <SocialIcon label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* ── Right column (form) ── */}
        <div
          ref={rightRef}
          className="w-full lg:w-[55%] px-5 sm:px-8 lg:px-20 pt-8 sm:pt-12 lg:pt-40 pb-12 lg:pb-24 relative overflow-hidden"
          style={{ background: '#ffffff' }}
        >
          <div className="cta-dot-grid pointer-events-none absolute inset-0 z-0" />
          <div className="bg-glow-blue" style={{ top: '-100px', right: '-100px' }} />
          <form onSubmit={handleSubmit} className="relative z-[1]">
            {/* Row 1: Nome + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              <FloatingField label="Nome completo" name="name" required />
              <FloatingField label="Email profissional" name="email" type="email" required />
            </div>

            {/* Row 2: Telefone + Empresa */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
              <FloatingField label="Telefone / WhatsApp" name="phone" type="tel" />
              <FloatingField label="Nome da empresa (opcional)" name="company" />
            </div>

            {/* Row 3: Tipo de projeto */}
            <div style={{ marginBottom: '2rem' }}>
              <FloatingSelect
                label="Tipo de projeto"
                name="projectType"
                options={PROJECT_TYPES}
              />
            </div>

            {/* Row 4: Mensagem */}
            <div style={{ marginBottom: '2.5rem' }}>
              <FloatingTextarea
                label="Conte-nos sobre seu projeto, prazo e orçamento estimado..."
                name="message"
              />
            </div>

            {/* Budget radio cards */}
            <div className="form-field" style={{ marginBottom: '2.5rem' }}>
              <span
                className="font-body"
                style={{
                  fontSize: '0.75rem', textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: 'rgba(10,10,15,0.40)',
                  display: 'block', marginBottom: '1rem',
                }}
              >
                Faixa de investimento
              </span>
              <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="budget-card font-body text-left transition-all duration-200"
                    onClick={() => setBudget(opt)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: budget === opt
                        ? '1.5px solid #0057FF'
                        : '1px solid #e0e0e8',
                      background: budget === opt
                        ? 'rgba(0,87,255,0.04)' : 'transparent',
                      color: budget === opt
                        ? '#0057FF' : 'rgba(10,10,15,0.55)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="submit-area">
              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="font-display transition-all duration-300"
                style={{
                  width: '100%',
                  padding: '1rem 3rem',
                  borderRadius: '99px',
                  border: 'none',
                  background: submitState === 'success' ? '#00C896' : '#0057FF',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: submitState === 'loading' ? 'wait' : 'pointer',
                  marginTop: '0.5rem',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  if (submitState === 'idle') {
                    e.currentTarget.style.background = '#0040CC';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (submitState === 'idle') {
                    e.currentTarget.style.background = '#0057FF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {submitState === 'loading' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" opacity="0.3" />
                      <path d="M12 2a10 10 0 019.95 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Enviando...
                  </span>
                )}
                {submitState === 'success' && 'Mensagem enviada! ✓'}
                {submitState === 'idle' && 'Enviar mensagem →'}
              </button>

              <p
                className="font-body"
                style={{
                  fontSize: '0.8rem', color: 'rgba(10,10,15,0.35)',
                  textAlign: 'center', marginTop: '1rem',
                }}
              >
                Respondemos em até 24 horas. Sem spam, prometemos.
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Spinner keyframe */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
