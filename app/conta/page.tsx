'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Save, ChevronRight, CheckCircle, MessageCircle } from 'lucide-react';

export default function ContaPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status === 'authenticated') {
      // Busca dados reais do banco (não da sessão, que pode estar desatualizada)
      fetch('/api/user/profile')
        .then(r => r.json())
        .then(data => {
          setForm({ name: data.name ?? '', email: data.email ?? '', phone: data.phone ?? '' });
          setLoading(false);
        });
    }
  }, [status, router]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, phone: form.phone }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error); return; }
    // Atualiza a sessão com o novo nome
    await update({ name: form.name });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (status === 'loading' || loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px]">
      <div className="text-white/40">Carregando...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[900px] mx-auto px-[5%] py-10">
        <h1 className="font-display text-[40px] tracking-[2px] mb-2">MINHA CONTA</h1>
        <p className="text-white/40 text-[13px] mb-10">Olá, {session?.user?.name?.split(' ')[0]}!</p>

        {/* Nav rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link href="/conta/pedidos"
            className="bg-[#111] border border-white/[0.07] rounded-lg p-5 flex items-center justify-between hover:border-[rgba(245,196,0,0.3)] hover:bg-[rgba(245,196,0,0.03)] transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(0,140,58,0.1)] flex items-center justify-center">
                <Package size={20} className="text-[#008C3A]" />
              </div>
              <div>
                <p className="font-bold text-[15px]">Meus Pedidos</p>
                <p className="text-white/40 text-[12px]">Histórico e rastreamento</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-white/30 group-hover:text-[#F5C400] transition-colors" />
          </Link>

          <div className="bg-[#111] border border-[rgba(245,196,0,0.2)] rounded-lg p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(245,196,0,0.1)] flex items-center justify-center">
              <User size={20} className="text-[#F5C400]" />
            </div>
            <div>
              <p className="font-bold text-[15px]">Dados da Conta</p>
              <p className="text-white/40 text-[12px]">Editando abaixo</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#111] border border-white/[0.07] rounded-lg p-8">
          <h2 className="font-display text-[24px] tracking-[1px] mb-6">Dados Pessoais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">Nome completo</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-3 text-[14px] text-white focus:border-[#F5C400] focus:outline-none transition-colors"
              />
            </div>

            {/* E-mail — somente leitura */}
            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">E-mail</label>
              <input
                value={form.email}
                disabled
                className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-sm px-4 py-3 text-[14px] text-white/40 cursor-not-allowed"
              />
              <a
                href="https://wa.me/5551999999999?text=Olá, preciso alterar meu e-mail cadastrado na GG Peitas."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#008C3A] hover:text-white transition-colors mt-1.5"
              >
                <MessageCircle size={12} /> Para alterar o e-mail, fale conosco no WhatsApp
              </a>
            </div>

            {/* Celular */}
            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">Celular</label>
              <input
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-[12px] bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2 mt-4">{error}</p>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#F5C400] text-black px-6 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors disabled:opacity-50"
            >
              {saved ? <><CheckCircle size={16} /> SALVO!</> : <><Save size={16} /> {saving ? 'SALVANDO...' : 'SALVAR'}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
