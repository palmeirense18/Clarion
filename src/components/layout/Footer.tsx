'use client';

export default function Footer() {
  return (
    <footer className="px-5 sm:px-8 lg:px-16 pt-16 pb-8 mt-16 sm:mt-20 lg:mt-24" style={{
      background: '#04050F',
      borderRadius: '2rem 2rem 0 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Marca d'água CLARION — proporcional, não gigante */}
      <div className="font-display footer-watermark" style={{
        position: 'absolute',
        bottom: '-1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 800,
        fontSize: '13vw',
        color: 'rgba(255,255,255,0.05)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.02em',
        zIndex: 0,
      }}>
        CLARION
      </div>

      {/* Conteúdo */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Topo */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-12">
          <span className="font-display" style={{ fontWeight: 700, fontSize: '1.4rem', color: '#ffffff' }}>
            CLAR<span style={{ color: '#FF7A00' }}>I</span>ON
          </span>
          <span className="font-body" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.40)' }}>
            Soluções digitais que transformam.
          </span>
        </div>

        {/* Separador */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '3rem' }} />

        {/* Grid 4 colunas */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '2rem', marginBottom: '3rem' }}>
          {[
            { title: 'Navegação', links: [
              { label: 'Sobre', href: '#sobre' },
              { label: 'Serviços', href: '#servicos' },
              { label: 'Portfólio', href: '#portfolio' },
              { label: 'Contato', href: '#contato' },
            ]},
            { title: 'Serviços', links: [
              { label: 'Dev Web', href: '#servicos' },
              { label: 'Design de Produto', href: '#servicos' },
              { label: 'Estratégia', href: '#servicos' },
              { label: 'Branding', href: '#servicos' },
            ]},
            { title: 'Contato', links: [
              { label: 'contato@clarion.com.br', href: 'mailto:contato@clarion.com.br' },
              { label: '+55 (11) 99999-9999', href: 'tel:+5511999999999' },
              { label: 'São Paulo, Brasil', href: undefined },
            ]},
            { title: 'Redes', links: [
              { label: 'Instagram', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'Behance', href: '#' },
              { label: 'GitHub', href: '#' },
            ]},
          ].map(col => (
            <div key={col.title}>
              <p className="font-body" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
                {col.title}
              </p>
              {col.links.map(link => (
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body block transition-colors duration-200 hover:text-[#FF7A00]"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.60)', marginBottom: '0.6rem' }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <p key={link.label} className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.60)', marginBottom: '0.6rem' }}>
                    {link.label}
                  </p>
                )
              ))}
            </div>
          ))}
        </div>

        {/* Separador + rodapé */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
          <span className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2025 Clarion. Todos os direitos reservados.
          </span>
          <span className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>
            Feito com ♥ no Brasil
          </span>
        </div>
      </div>
    </footer>
  );
}
