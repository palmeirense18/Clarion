'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Util ─────────────────────────────────────────────── */

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
}

/* ── Data ─────────────────────────────────────────────── */

const projects = [
  { id: '01', name: 'NovaPay Dashboard', category: 'Web App', year: '2024',
    color: '#0057FF', gradient: 'linear-gradient(135deg,#0057FF,#003ACC)',
    stack: ['React','Next.js','TypeScript','Figma'],
    desc: 'Plataforma financeira com visualização de dados em tempo real e gestão de transações para +50k usuários.' },
  { id: '02', name: 'Virtus Store', category: 'E-commerce', year: '2024',
    color: '#FF7A00', gradient: 'linear-gradient(135deg,#FF7A00,#CC4400)',
    stack: ['Shopify','React','Figma','GSAP'],
    desc: 'Experiência de compra reimaginada com AR try-on e checkout em 3 segundos.' },
  { id: '03', name: 'AtmosHealth', category: 'Produto Digital', year: '2024',
    color: '#00C896', gradient: 'linear-gradient(135deg,#1a1a2e,#0a0a1a)',
    stack: ['React Native','Node.js','Firebase'],
    desc: 'App de saúde que monitora bem-estar com IA preditiva e integração com wearables.' },
  { id: '04', name: 'Drois Festival', category: 'Branding + Web', year: '2023',
    color: '#7B2FFF', gradient: 'linear-gradient(135deg,#7B2FFF,#0057FF)',
    stack: ['Next.js','GSAP','Figma','Framer'],
    desc: 'Identidade completa e site para festival de música eletrônica com 80k visitantes.' },
  { id: '05', name: 'Loop Fitness', category: 'Mobile App', year: '2023',
    color: '#FF3D6B', gradient: 'linear-gradient(135deg,#FF3D6B,#0057FF)',
    stack: ['React Native','Firebase','Figma'],
    desc: 'Aplicativo de treinos personalizados com gamificação e comunidade ativa.' },
  { id: '06', name: 'Café Roast', category: 'Branding', year: '2023',
    color: '#FF7A00', gradient: 'linear-gradient(135deg,#8B4513,#FF7A00)',
    stack: ['Figma','Illustrator','Webflow'],
    desc: 'Identidade visual completa para rede de cafeterias artesanais em São Paulo.' },
];

const CATEGORIES = ['Todos', 'Web App', 'E-commerce', 'Branding', 'Mobile App', 'Produto Digital'];

/* ── Component ────────────────────────────────────────── */

export default function PortfolioPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewNameRef = useRef<HTMLSpanElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [activeFilter, setActiveFilter] = useState('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<typeof projects[0] | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.category.includes(activeFilter));

  /* ── Custom cursor RAF loop ── */
  const tick = useCallback(() => {
    cursorPos.current.x += (mouse.current.x - cursorPos.current.x) * 0.15;
    cursorPos.current.y += (mouse.current.y - cursorPos.current.y) * 0.15;
    if (cursorOuterRef.current) {
      cursorOuterRef.current.style.transform =
        `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform =
        `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
    }
    previewPos.current.x += (mouse.current.x - previewPos.current.x) * 0.12;
    previewPos.current.y += (mouse.current.y - previewPos.current.y) * 0.12;
    if (previewRef.current) {
      previewRef.current.style.transform =
        `translate(${previewPos.current.x + 30}px, ${previewPos.current.y - 20}px)`;
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  }, []);

  /* ── Mount ── */
  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', handleMouseMove);

    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      });
    }

    const rows = document.querySelectorAll('.project-row');
    if (rows.length) {
      gsap.fromTo(rows, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.08, delay: 0.3,
      });
    }

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tick, handleMouseMove]);

  /* ── Filter animation ── */
  useEffect(() => {
    const rows = document.querySelectorAll('.project-row');
    gsap.fromTo(rows, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out',
    });
    if (counterRef.current) {
      gsap.fromTo(counterRef.current, { y: -10, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
      });
    }
  }, [activeFilter]);

  /* ── Expand/collapse ── */
  function toggleRow(id: string) {
    const row = document.querySelector(`[data-row-id="${id}"]`) as HTMLElement;
    const panel = row?.querySelector('.row-panel') as HTMLElement;
    if (!row || !panel) return;

    if (expandedId === id) {
      gsap.to(panel, { opacity: 0, y: 16, duration: 0.25, ease: 'power2.in' });
      gsap.to(row, { height: 88, duration: 0.5, ease: 'power3.inOut', delay: 0.1 });
      setExpandedId(null);
    } else {
      if (expandedId) {
        const prev = document.querySelector(`[data-row-id="${expandedId}"]`) as HTMLElement;
        const prevPanel = prev?.querySelector('.row-panel') as HTMLElement;
        if (prev && prevPanel) {
          gsap.to(prevPanel, { opacity: 0, y: 16, duration: 0.2 });
          gsap.to(prev, { height: 88, duration: 0.4, ease: 'power3.inOut' });
        }
      }
      gsap.to(row, { height: 340, duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo(panel,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.25 }
      );
      setExpandedId(id);
    }
  }

  /* ── Row hover — two-layer background system ── */
  function onRowEnter(project: typeof projects[0]) {
    setHoveredProject(project);

    // Overlay: tint of project color, max 0.15 opacity over permanent #0a0a0f base
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        backgroundColor: `rgba(${hexToRgb(project.color)}, 0.15)`,
        duration: 0.8, ease: 'power2.out',
      });
    }

    if (cursorOuterRef.current) {
      gsap.to(cursorOuterRef.current, {
        width: 80, height: 80, borderColor: project.color, duration: 0.3,
      });
    }
    if (cursorTextRef.current) {
      gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.2 });
    }

    if (expandedId !== project.id && previewRef.current && previewNameRef.current) {
      previewRef.current.style.background = project.gradient;
      previewNameRef.current.textContent = project.name;
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }

  function onRowLeave() {
    setHoveredProject(null);

    // Overlay fades back to transparent (base #0a0a0f shows through)
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(0,0,0,0)',
        duration: 0.6, ease: 'power2.out',
      });
    }

    if (cursorOuterRef.current) {
      gsap.to(cursorOuterRef.current, {
        width: 48, height: 48, borderColor: 'rgba(255,255,255,0.5)', duration: 0.3,
      });
    }
    if (cursorTextRef.current) {
      gsap.to(cursorTextRef.current, { opacity: 0, duration: 0.2 });
    }
    if (previewRef.current) {
      gsap.to(previewRef.current, { opacity: 0, scale: 0.85, duration: 0.3 });
    }
  }

  return (
    <div className="portfolio-page">
      <Navbar />

      {/* Layer 1 — permanent dark base (never changes) */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: -2,
          backgroundColor: '#0a0a0f',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 2 — reactive color overlay (max 0.15 opacity) */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0, zIndex: -1,
          backgroundColor: 'rgba(0,0,0,0)',
          pointerEvents: 'none',
        }}
      />

      {/* Custom cursor — outer ring */}
      <div
        ref={cursorOuterRef}
        className="hidden md:flex"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 48, height: 48,
          border: '1.5px solid rgba(255,255,255,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          alignItems: 'center', justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        <span
          ref={cursorTextRef}
          className="font-body"
          style={{
            fontSize: '10px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#ffffff', opacity: 0,
          }}
        >
          VER
        </span>
      </div>

      {/* Custom cursor — dot */}
      <div
        ref={cursorDotRef}
        className="hidden md:block"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          width: 6, height: 6,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Floating preview */}
      <div
        ref={previewRef}
        className="hidden md:flex"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 100,
          width: 280, height: 180,
          borderRadius: '1rem',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
          scale: 0.85,
          willChange: 'transform',
          alignItems: 'flex-end',
          padding: '1rem',
        }}
      >
        <span
          ref={previewNameRef}
          className="font-display"
          style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}
        />
      </div>

      <main className="min-h-screen md:cursor-none">
        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 sm:px-8 lg:px-16 pt-28 sm:pt-36 lg:pt-40 pb-8 lg:pb-16"
          style={{ opacity: 0 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span
                className="font-body"
                style={{
                  fontSize: '0.8rem', textTransform: 'uppercase',
                  letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)',
                }}
              >
                Portfólio
              </span>
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                  fontWeight: 800, color: '#ffffff',
                  lineHeight: 0.95, marginTop: '0.5rem',
                }}
              >
                Nosso trabalho
              </h1>
              <span
                ref={counterRef}
                className="font-body"
                style={{
                  fontSize: '1rem', color: 'rgba(255,255,255,0.30)',
                  display: 'inline-block', marginTop: '0.5rem',
                }}
              >
                ({String(filtered.length).padStart(2, '0')} projetos)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="font-body"
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'none',
                    transition: 'all 0.3s',
                    border: activeFilter === cat
                      ? '1px solid #FF7A00'
                      : '1px solid rgba(255,255,255,0.12)',
                    background: activeFilter === cat ? '#FF7A00' : 'transparent',
                    color: activeFilter === cat ? '#ffffff' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project list */}
        <div
          ref={listRef}
          className="px-5 sm:px-8 lg:px-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          onMouseLeave={onRowLeave}
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              data-row-id={project.id}
              className="project-row"
              onClick={() => toggleRow(project.id)}
              onMouseEnter={() => onRowEnter(project)}
              style={{
                height: 88,
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                cursor: 'none',
                overflow: 'hidden',
                transition: 'background-color 0.3s',
                backgroundColor: hoveredProject?.id === project.id
                  ? 'rgba(255,255,255,0.03)' : 'transparent',
              }}
            >
              {/* Row header */}
              <div
                className="px-2 sm:px-4"
                style={{
                  display: 'flex', alignItems: 'center',
                  height: 88, flexShrink: 0,
                }}
              >
                <span
                  className="font-display project-num"
                  style={{
                    fontSize: '0.8rem', width: '3rem',
                    color: hoveredProject?.id === project.id
                      ? project.color : 'rgba(255,255,255,0.20)',
                    transition: 'color 0.3s',
                  }}
                >
                  {project.id}
                </span>

                <span
                  className="font-display project-name"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    flex: 1,
                    color: (expandedId === project.id || hoveredProject?.id === project.id)
                      ? project.color : '#ffffff',
                    transition: 'color 0.3s',
                  }}
                >
                  {project.name}
                </span>

                <span
                  className="font-body project-category hidden md:block"
                  style={{
                    fontSize: '0.75rem', textTransform: 'uppercase',
                    letterSpacing: '0.1em', width: '10rem',
                    color: 'rgba(255,255,255,0.35)',
                    textAlign: 'right',
                  }}
                >
                  {project.category}
                </span>

                <span
                  className="font-body project-year hidden sm:block"
                  style={{
                    fontSize: '0.85rem', width: '4rem',
                    color: 'rgba(255,255,255,0.20)',
                    textAlign: 'right',
                  }}
                >
                  {project.year}
                </span>

                <span
                  style={{
                    marginLeft: '1.5rem',
                    color: 'rgba(255,255,255,0.25)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.4s',
                    transform: expandedId === project.id ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </div>

              {/* Expanded panel */}
              <div
                className="row-panel px-2 sm:px-4 pb-6 sm:pb-10 flex flex-wrap gap-4 sm:gap-8"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-full sm:w-[300px] h-[140px] sm:h-[180px]"
                  style={{
                    borderRadius: '1rem',
                    background: project.gradient,
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, minWidth: 260 }}>
                  <p
                    className="font-body"
                    style={{
                      color: 'rgba(255,255,255,0.60)',
                      fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 420,
                    }}
                  >
                    {project.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="font-body"
                        style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '99px',
                          border: '1px solid rgba(255,255,255,0.10)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    className="font-body"
                    style={{
                      marginTop: '1.5rem',
                      padding: '0.6rem 1.8rem',
                      borderRadius: '99px',
                      border: `1.5px solid ${project.color}`,
                      background: 'transparent',
                      color: project.color,
                      fontWeight: 500, fontSize: '0.875rem',
                      cursor: 'none',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = project.color;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = project.color;
                    }}
                  >
                    Ver projeto completo →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '6rem' }} />
      </main>

      <Footer />
    </div>
  );
}
