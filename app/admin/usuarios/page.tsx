'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, ShoppingBag, User, Shield, Edit, X, Save, CheckCircle } from 'lucide-react';

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  _count: { orders: number };
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');
  const [editModal, setEditModal] = useState<UserRow | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/users').then(r => r.json()).then(d => setUsers(Array.isArray(d) ? d : []));
  }, []);

  const openEdit = (u: UserRow) => {
    setEditForm({ name: u.name, email: u.email, phone: u.phone ?? '' });
    setError('');
    setSaved(false);
    setEditModal(u);
  };

  const saveEdit = async () => {
    if (!editModal) return;
    setError('');
    setSaving(true);
    const res = await fetch(`/api/admin/users/${editModal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error); return; }
    setUsers(prev => prev.map(u => u.id === editModal.id ? { ...u, ...data } : u));
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditModal(null); }, 1200);
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[1000px] mx-auto px-[5%] py-10">
        <Link href="/admin" className="flex items-center gap-2 text-white/40 hover:text-white text-[12px] uppercase tracking-wide mb-6 transition-colors">
          <ChevronLeft size={16} /> Admin
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-[40px] tracking-[2px]">CLIENTES</h1>
          <div className="bg-[#111] border border-white/[0.07] rounded-lg px-5 py-3 text-center">
            <div className="font-display text-[28px] text-[#F5C400]">{users.length}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide">Cadastros</div>
          </div>
        </div>

        <div className="relative mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full bg-[#111] border border-white/10 rounded-sm pl-9 pr-4 py-2.5 text-[13px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.07] text-white/40 text-[10px] tracking-[2px] uppercase">
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-4 py-3">Contato</th>
                <th className="text-left px-4 py-3">Pedidos</th>
                <th className="text-left px-4 py-3">Função</th>
                <th className="text-left px-4 py-3">Cadastro</th>
                <th className="text-left px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[rgba(245,196,0,0.15)] flex items-center justify-center text-[#F5C400]">
                        {u.role === 'ADMIN' ? <Shield size={14} /> : <User size={14} />}
                      </div>
                      <span className="font-semibold">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-white/60">{u.email}</div>
                    {u.phone && <div className="text-white/30 text-[11px]">{u.phone}</div>}
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-[#F5C400]">
                      <ShoppingBag size={13} /> {u._count.orders}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${u.role === 'ADMIN' ? 'bg-[rgba(245,196,0,0.1)] text-[#F5C400]' : 'bg-white/[0.06] text-white/40'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/40">
                    {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openEdit(u)}
                      className="flex items-center gap-1.5 text-[11px] font-bold text-white/40 hover:text-[#F5C400] border border-white/10 hover:border-[rgba(245,196,0,0.3)] px-3 py-1.5 rounded-sm transition-all"
                    >
                      <Edit size={12} /> Editar
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-white/30">Nenhum usuário encontrado</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Editar Cliente */}
      {editModal && (
        <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setEditModal(null)}>
          <div className="bg-[#181818] border border-[rgba(245,196,0,0.2)] rounded-lg w-full max-w-[480px] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-[26px] tracking-[1px]">EDITAR CLIENTE</h2>
                <p className="text-[11px] text-white/30 mt-0.5">Alterações aplicadas imediatamente</p>
              </div>
              <button onClick={() => setEditModal(null)} className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">Nome completo</label>
                <input
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-2.5 text-[14px] text-white focus:border-[#F5C400] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">
                  E-mail <span className="text-[#F5C400] normal-case tracking-normal font-normal">(apenas admin pode alterar)</span>
                </label>
                <input
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-2.5 text-[14px] text-white focus:border-[#F5C400] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-1.5 block">Celular</label>
                <input
                  value={editForm.phone}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-2.5 text-[14px] text-white placeholder-white/20 focus:border-[#F5C400] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-[12px] bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2 mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={saveEdit}
                disabled={saving || saved}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F5C400] text-black py-3 font-display text-[18px] tracking-[1px] rounded-sm hover:bg-[#D9A300] transition-colors disabled:opacity-60"
              >
                {saved ? <><CheckCircle size={16} /> SALVO!</> : <><Save size={16} /> {saving ? 'SALVANDO...' : 'SALVAR'}</>}
              </button>
              <button onClick={() => setEditModal(null)}
                className="px-5 border border-white/20 text-white/50 rounded-sm hover:border-white hover:text-white transition-colors text-[13px]">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
