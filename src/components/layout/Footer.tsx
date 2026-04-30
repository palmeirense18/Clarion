'use client';

import Link from 'next/link';
import { asset } from '@/lib/asset';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative w-full border-t border-white/10 bg-[#04050F] px-5 pt-8 sm:px-8"
      style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/videos/logo-clarion.png')}
            alt="Clarion"
            className="h-6 w-auto opacity-80"
            draggable={false}
          />
          <span className="font-body text-xs uppercase tracking-[0.25em] text-white/40">
            Clarion Digital Studio
          </span>
        </div>
        <div className="flex items-center gap-2 font-body text-xs text-white/40 sm:gap-4">
          <Link
            href="/sobre"
            className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-white/80"
          >
            Sobre
          </Link>
          <Link
            href="/servicos"
            className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-white/80"
          >
            Serviços
          </Link>
          <Link
            href="/contato"
            className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-white/80"
          >
            Contato
          </Link>
        </div>
        <div className="font-body text-[11px] text-white/30">© {year} — São Paulo, BR</div>
      </div>
    </footer>
  );
}
