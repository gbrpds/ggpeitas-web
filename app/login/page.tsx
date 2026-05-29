'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('E-mail ou senha incorretos.');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 pt-[68px]">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/">
            <Image src="/logo.png" alt="GG Peitas" width={64} height={64} className="object-contain mb-4" />
          </Link>
          <h1 className="font-display text-[32px] tracking-[3px] text-white">
            GG <span className="text-[#F5C400]">Peitas</span>
          </h1>
          <p className="text-white/40 text-[12px] tracking-[2px] uppercase mt-1">Acesse sua conta</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-lg p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-[11px] font-bold tracking-[2px] uppercase text-white/40 mb-2 block">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="text-[11px] font-bold tracking-[2px] uppercase text-white/40 mb-2 block">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm pl-10 pr-10 py-3 text-[14px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
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
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>

          <div className="border-t border-white/[0.07] mt-6 pt-6 text-center">
            <p className="text-[13px] text-white/40">
              Não tem conta?{' '}
              <Link href="/registro" className="text-[#F5C400] hover:text-white transition-colors font-semibold">
                Criar conta grátis
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
