'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const PAGES: Record<string, string> = {
  '/painel/financeiro': 'Financeiro',
  '/painel/estoque': 'Estoque',
  '/painel/contatos': 'Contatos',
};

export default function AdminHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [nome, setNome] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const titulo = PAGES[pathname] ?? 'Admin';

  useEffect(() => {
    fetch('/api/painel/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.nome && setNome(d.nome))
      .catch(() => {});
  }, [pathname]);

  async function logout() {
    await fetch('/api/painel/auth/logout', { method: 'POST' });
    router.replace('/painel/login');
  }

  return (
    <header className="adm-header-root">
      <div className="adm-header-inner adm-page-container">
        <Link href="/painel/financeiro" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
          <Image src="/logo.png" alt="GG Peitas" width={34} height={34} className="object-contain" />
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.25em', color: '#555', textTransform: 'uppercase' }}>GG Peitas</p>
            <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', color: '#F5C400', textTransform: 'uppercase', lineHeight: 1 }}>{titulo}</p>
          </div>
        </Link>

        <div className="adm-header-nav" style={{ alignItems: 'center' }}>
          {nome && (
            <span className="adm-hide-mobile" style={{ fontSize: 11, color: '#555', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Olá, <span style={{ color: '#F5C400', fontWeight: 700 }}>{nome}</span>
            </span>
          )}

          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuAberto(!menuAberto)} className="adm-btn-nav" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              ☰ <span className="adm-hide-mobile">Menu</span>
            </button>

            {menuAberto && (
              <>
                <div onClick={() => setMenuAberto(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 20,
                  background: '#161616', border: '1px solid #252525', borderRadius: 12,
                  padding: 6, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 2,
                }}>
                  {Object.entries(PAGES).map(([href, label]) => {
                    const active = pathname === href;
                    return (
                      <Link key={href} href={href} onClick={() => setMenuAberto(false)} style={{
                        padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                        color: active ? '#F5C400' : '#ccc', textDecoration: 'none', display: 'block',
                        letterSpacing: '0.05em', background: active ? 'rgba(245,196,0,0.07)' : 'transparent',
                      }}>
                        {label === 'Financeiro' ? '💰' : label === 'Estoque' ? '👕' : '👥'} {label}
                      </Link>
                    );
                  })}
                  <Link href="/" onClick={() => setMenuAberto(false)} style={{
                    padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    color: '#555', textDecoration: 'none', display: 'block', letterSpacing: '0.05em',
                  }}>
                    🏪 Ver loja
                  </Link>
                  <div style={{ borderTop: '1px solid #222', margin: '4px 0' }} />
                  <button onClick={() => { setMenuAberto(false); logout(); }} style={{
                    padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    color: '#ef4444', display: 'block', width: '100%',
                    letterSpacing: '0.05em', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}>
                    🚪 Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
