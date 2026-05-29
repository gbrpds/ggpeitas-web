'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('As senhas não coincidem.'); return; }
    if (form.password.length < 6) { setError('A senha deve ter ao menos 6 caracteres.'); return; }

    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }

    // Login automático após registro
    await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    router.push('/');
    router.refresh();
  };

  const field = (
    label: string,
    icon: React.ReactNode,
    name: keyof typeof form,
    type = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="text-[11px] font-bold tracking-[2px] uppercase text-white/40 mb-2 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">{icon}</span>
        <input
          type={name === 'password' || name === 'confirm' ? (showPass ? 'text' : 'password') : type}
          required={name !== 'phone'}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          placeholder={placeholder}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 pt-[68px] pb-10">
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-10">
          <Link href="/">
            <Image src="/logo.png" alt="GG Peitas" width={64} height={64} className="object-contain mb-4" />
          </Link>
          <h1 className="font-display text-[32px] tracking-[3px] text-white">
            GG <span className="text-[#F5C400]">Peitas</span>
          </h1>
          <p className="text-white/40 text-[12px] tracking-[2px] uppercase mt-1">Criar conta</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-lg p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {field('Nome completo', <User size={16} />, 'name', 'text', 'João Silva')}
            {field('E-mail', <Mail size={16} />, 'email', 'email', 'seu@email.com')}
            {field('Celular (opcional)', <Phone size={16} />, 'phone', 'tel', '(11) 99999-9999')}

            <div>
              <label className="text-[11px] font-bold tracking-[2px] uppercase text-white/40 mb-2 block">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm pl-10 pr-10 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold tracking-[2px] uppercase text-white/40 mb-2 block">Confirmar senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repita a senha"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-[12px] bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5C400] text-black py-3.5 font-display text-[20px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
            </button>
          </form>

          <div className="border-t border-white/[0.07] mt-6 pt-6 text-center">
            <p className="text-[13px] text-white/40">
              Já tem conta?{' '}
              <Link href="/login" className="text-[#F5C400] hover:text-white transition-colors font-semibold">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-white/30 text-[12px] hover:text-white transition-colors">
            ← Voltar para a loja
          </Link>
        </p>
      </div>
    </div>
  );
}
