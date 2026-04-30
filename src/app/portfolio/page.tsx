'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { projects, CATEGORY_COLORS, type Project, type ProjectCategory } from '@/lib/projects';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

/* ── Util ─────────────────────────────────────────────── */

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
}

function accentOf(project: Project) {
  return CATEGORY_COLORS[project.category];
}

/* ── Data ─────────────────────────────────────────────── */

const CATEGORIES: Array<'Todos' | ProjectCategory> = ['Todos', 'SaaS', 'Site'];

/* ── Component ────────────────────────────────────────── */

export default function PortfolioPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const previewNameRef = useRef<HTMLSpanElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [activeFilter, setActiveFilter] = useState<'Todos' | ProjectCategory>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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
      // Mobile: measure the actual content so long descriptions don't clip.
      const isMobile = window.matchMedia('(max-width: 639px)').matches;
      let targetHeight: number = 340;
      if (isMobile) {
        panel.style.opacity = '0';
        panel.style.position = 'static';
        // Force layout so we can measure the panel's natural height.
        const panelHeight = panel.scrollHeight;
        targetHeight = 88 + panelHeight + 16;
      }
      gsap.to(row, { height: targetHeight, duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo(panel,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.25 }
      );
      setExpandedId(id);
    }
  }

  /* ── Row hover ── */
  function onRowEnter(project: Project) {
    setHoveredProject(project);
    const accent = accentOf(project);

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        backgroundColor: `rgba(${hexToRgb(accent)}, 0.15)`,
        duration: 0.8, ease: 'power2.out',
      });
    }

    if (cursorOuterRef.current) {
      gsap.to(cursorOuterRef.current, {
        width: 80, height: 80,
        borderColor: accent,
        duration: 0.3,
      });
    }
    if (cursorTextRef.current) {
      // Every row now toggles the in-page panel — single "VER" label.
      cursorTextRef.current.textContent = 'VER';
      gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.2 });
    }

    if (expandedId !== project.id && previewRef.current && previewNameRef.current && previewImgRef.current) {
      previewImgRef.current.src = asset(project.image);
      previewNameRef.current.textContent = project.name;
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }

  function onRowLeave() {
    setHoveredProject(null);

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

  function handleRowClick(project: Project) {
    // Every row toggles the in-page expansion. External URLs live exclusively
    // on the "Visitar site" CTA inside the expanded panel.
    toggleRow(project.id);
  }

  return (
    <div className="portfolio-page">
      <Navbar />

      {/* Layer 1 — permanent dark base */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: -2,
          backgroundColor: '#0a0a0f',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 2 — reactive tint */}
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
          background: '#0a0a0f',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)',
          }}
        />
        <span
          ref={previewNameRef}
          className="font-display relative"
          style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', zIndex: 1 }}
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
                  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
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
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="font-body"
                  style={{
                    padding: '0.55rem 1.1rem',
                    minHeight: '40px',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
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
          {filtered.map((project) => {
            const accent = accentOf(project);
            const hasUrl = !!project.url;

            return (
              <div
                key={project.id}
                data-row-id={project.id}
                className="project-row"
                onClick={() => handleRowClick(project)}
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
                        ? accent : 'rgba(255,255,255,0.20)',
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
                        ? accent : '#ffffff',
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
                    className="w-full sm:w-[300px] h-[140px] sm:h-[180px] relative"
                    style={{
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#0a0a0f',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(project.image)}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, ${accent}22, transparent 55%)`,
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 260 }}>
                    <span
                      className="font-body"
                      style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.40)',
                      }}
                    >
                      {project.client}
                    </span>
                    <p
                      className="font-body"
                      style={{
                        color: 'rgba(255,255,255,0.60)',
                        fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 420,
                        marginTop: '0.5rem',
                      }}
                    >
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                      {project.stack.map((tech) => (
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

                    {hasUrl && (
                      <a
                        href={project.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-body"
                        style={{
                          display: 'inline-block',
                          marginTop: '1.5rem',
                          padding: '0.6rem 1.8rem',
                          borderRadius: '99px',
                          border: `1.5px solid ${accent}`,
                          background: 'transparent',
                          color: accent,
                          fontWeight: 500, fontSize: '0.875rem',
                          cursor: 'none',
                          textDecoration: 'none',
                          transition: 'all 0.25s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = accent;
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = accent;
                        }}
                      >
                        Visitar site →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: '6rem' }} />
      </main>

      <Footer />
    </div>
  );
}
