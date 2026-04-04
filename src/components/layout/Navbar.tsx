'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const barRef = useRef<HTMLDivElement>(null);

  function isActive(href: string) {
    return pathname === href;
  }

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const target = docHeight > 0 ? scrollTop / docHeight : 0;

    progressRef.current += (target - progressRef.current) * 0.1;

    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progressRef.current})`;
    }

    setScrolled(scrollTop > 20);
    setProgress(progressRef.current);

    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-mid ${
          scrolled
            ? 'py-3 bg-white backdrop-blur-xl border-b border-[#e0e0e8]'
            : 'py-4 md:py-5 bg-gradient-to-b from-black/30 to-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
          {/* Logo */}
          <Link href="/" className="relative z-[60] shrink-0">
            <span className={`font-display text-lg font-[700] tracking-tight md:text-xl transition-colors duration-mid ${mobileOpen || !scrolled ? 'text-white' : 'text-[#0a0a0f]'}`}>
              CLAR
              <span className="text-[#FF7A00]">I</span>
              ON
            </span>
          </Link>

          {/* Central Pill — Desktop */}
          <div
            className={`absolute left-1/2 hidden -translate-x-1/2 rounded-pill px-1 py-1 transition-all duration-mid md:block ${
              scrolled
                ? 'bg-white shadow-lg shadow-black/[0.04] border border-[#e0e0e8]'
                : 'bg-white/70 backdrop-blur-sm border border-[#e0e0e8]/50'
            }`}
          >
            {/* Progress bar */}
            <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full bg-[rgba(10,10,15,0.08)]">
              <div
                ref={barRef}
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#0057FF] to-[#FF7A00]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative block rounded-pill px-4 py-2 text-sm font-[500] transition-colors duration-fast hover:text-[#0057FF] lg:px-5"
                    style={{ color: isActive(link.href) ? '#FF7A00' : '#0a0a0f' }}
                  >
                    {link.label}
                    {/* Active indicator dot */}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0.5 left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[#FF7A00]" />
                    )}
                    {/* Animated underline (non-active) */}
                    {!isActive(link.href) && (
                      <span className="absolute bottom-1 left-4 right-4 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#0057FF] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA — Desktop */}
          <Link
            href="/contato"
            className="group relative z-[60] hidden shrink-0 overflow-hidden rounded-pill bg-[#0057FF] px-5 py-2.5 text-sm font-[500] text-white transition-all duration-mid hover:bg-[#0040CC] hover:shadow-lg hover:shadow-[rgba(0,87,255,0.12)] md:block lg:px-6"
          >
            Fale conosco
          </Link>

          {/* Hamburger — Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Menu"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[4.5px] rotate-45 bg-white' : scrolled ? 'bg-[#0a0a0f]' : 'bg-white'
                }`}
              />
              <span
                className={`block h-[1.5px] w-full transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[4.5px] -rotate-45 bg-white' : scrolled ? 'bg-[#0a0a0f]' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay — sibling of header for correct stacking on iOS */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[#04050F] transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className="transition-all duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-[700] transition-colors hover:text-[#FF7A00]"
                style={{ color: isActive(link.href) ? '#FF7A00' : '#ffffff' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contato"
          onClick={() => setMobileOpen(false)}
          className="mt-12 rounded-pill bg-[#0057FF] px-8 py-3.5 text-sm font-[500] text-white transition-all duration-mid hover:bg-[#0040CC]"
          style={{
            transitionDelay: mobileOpen ? '240ms' : '0ms',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          Fale conosco
        </Link>
      </div>
    </>
  );
}
