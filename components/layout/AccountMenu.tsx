'use client';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, Package, LogOut, LogIn, UserPlus } from 'lucide-react';

export function AccountMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!session) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Link href="/login"
          className="flex items-center gap-1.5 text-white/50 text-[11px] font-semibold tracking-[1.5px] uppercase hover:text-white transition-colors">
          <LogIn size={14} /> Entrar
        </Link>
        <span className="text-white/20">|</span>
        <Link href="/registro"
          className="flex items-center gap-1.5 border border-[rgba(245,196,0,0.3)] text-[#F5C400] px-3 py-1.5 text-[10px] font-bold tracking-[1.5px] uppercase rounded-sm hover:bg-[#F5C400] hover:text-black transition-all">
          <UserPlus size={12} /> Cadastrar
        </Link>
      </div>
    );
  }

  const initials = session.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '??';

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 group"
        title={session.user?.name ?? ''}
      >
        <div className="w-8 h-8 rounded-full bg-[#F5C400] text-black flex items-center justify-center text-[12px] font-bold tracking-wide">
          {initials}
        </div>
        <span className="text-[11px] text-white/50 group-hover:text-white transition-colors max-w-[80px] truncate">
          {session.user?.name?.split(' ')[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-[220px] bg-[#181818] border border-[rgba(245,196,0,0.15)] rounded-lg shadow-2xl overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/[0.07]">
            <p className="text-[13px] font-bold text-white truncate">{session.user?.name}</p>
            <p className="text-[11px] text-white/30 truncate">{session.user?.email}</p>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link href="/conta" onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/70 hover:bg-white/[0.05] hover:text-white transition-colors">
              <User size={15} className="text-[#F5C400]" /> Minha Conta
            </Link>
            <Link href="/conta/pedidos" onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[13px] text-white/70 hover:bg-white/[0.05] hover:text-white transition-colors">
              <Package size={15} className="text-[#008C3A]" /> Meus Pedidos
            </Link>
          </div>

          {/* Sair */}
          <div className="border-t border-white/[0.07] py-1">
            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-red-400 hover:bg-red-400/[0.06] transition-colors"
            >
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
