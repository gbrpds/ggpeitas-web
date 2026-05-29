'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Users, TrendingUp, Clock, Truck, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const fmt = (n: number) => `R$ ${(n / 100).toFixed(2).replace('.', ',')}`;

interface Order {
  id: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  user: { name: string; email: string };
  items: { name: string; qty: number }[];
}

const statusIcon: Record<string, React.ReactNode> = {
  PENDING: <Clock size={14} className="text-yellow-400" />,
  CONFIRMED: <CheckCircle size={14} className="text-green-400" />,
  PROCESSING: <Package size={14} className="text-blue-400" />,
  SHIPPED: <Truck size={14} className="text-purple-400" />,
  DELIVERED: <CheckCircle size={14} className="text-[#008C3A]" />,
  CANCELLED: <XCircle size={14} className="text-red-400" />,
};

const statusLabel: Record<string, string> = {
  PENDING: 'Aguardando', CONFIRMED: 'Confirmado', PROCESSING: 'Preparando',
  SHIPPED: 'Enviado', DELIVERED: 'Entregue', CANCELLED: 'Cancelado',
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<{ id: string }[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders').then(r => r.json()).then(d => setOrders(Array.isArray(d) ? d : []));
    fetch('/api/admin/users').then(r => r.json()).then(d => setUsers(Array.isArray(d) ? d : []));
  }, []);

  const confirmedStatuses = ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const totalRevenue = orders.filter(o => confirmedStatuses.includes(o.status)).reduce((s, o) => s + o.total, 0);
  const pendingRevenue = orders.filter(o => o.status === 'PENDING').reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const shipped = orders.filter(o => o.status === 'SHIPPED').length;
  const cancelled = orders.filter(o => o.status === 'CANCELLED').length;

  const stats: { label: string; value: string | number; icon: React.ReactNode; color: string; filter: string | null; sub?: string | null }[] = [
    { label: 'Total de Pedidos',  value: orders.length,    icon: <ShoppingBag size={20} />, color: 'text-[#F5C400]',    filter: null },
    { label: 'Receita Total',     value: fmt(totalRevenue),icon: <TrendingUp size={20} />,  color: 'text-[#008C3A]',    filter: null, sub: pendingRevenue > 0 ? `+ ${fmt(pendingRevenue)} pendente` : null },
    { label: 'Aguardando Pgto.',  value: pending,          icon: <Clock size={20} />,       color: 'text-yellow-400',   filter: 'PENDING' },
    { label: 'Clientes',          value: users.length,     icon: <Users size={20} />,       color: 'text-blue-400',     filter: null },
    { label: 'A Caminho',         value: shipped,          icon: <Truck size={20} />,       color: 'text-purple-400',   filter: 'SHIPPED' },
    { label: 'Cancelados',        value: cancelled,        icon: <XCircle size={20} />,     color: 'text-red-400',      filter: 'CANCELLED' },
  ];

  const filteredOrders = activeFilter
    ? orders.filter(o => o.status === activeFilter)
    : orders;

  const tableTitle = activeFilter
    ? `${statusLabel[activeFilter]?.toUpperCase() ?? activeFilter} (${filteredOrders.length})`
    : `ÚLTIMOS PEDIDOS`;

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[1200px] mx-auto px-[5%] py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[3px] uppercase text-[#008C3A] mb-1">Painel Administrativo</p>
            <h1 className="font-display text-[40px] tracking-[2px]">GG PEITAS · ADMIN</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/pedidos" className="bg-[#F5C400] text-black px-5 py-2.5 font-display text-[16px] tracking-[1px] rounded-sm hover:bg-[#D9A300] transition-colors flex items-center gap-2">
              <Package size={16} /> Pedidos
            </Link>
            <Link href="/admin/usuarios" className="border border-white/20 text-white px-5 py-2.5 font-display text-[16px] tracking-[1px] rounded-sm hover:border-white transition-colors flex items-center gap-2">
              <Users size={16} /> Usuários
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((s) => {
            const isActive = activeFilter === s.filter && s.filter !== null;
            const isClickable = s.filter !== null;
            return (
              <div
                key={s.label}
                onClick={() => isClickable && setActiveFilter(activeFilter === s.filter ? null : s.filter)}
                className={`bg-[#111] border rounded-lg p-5 transition-all ${
                  isClickable ? 'cursor-pointer hover:border-white/20' : ''
                } ${isActive ? 'border-white/30 ring-1 ring-white/20 scale-[1.03]' : 'border-white/[0.07]'}`}
              >
                <div className={`mb-3 ${s.color}`}>{s.icon}</div>
                <div className={`font-display text-[28px] leading-none mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-white/40 tracking-wide">{s.label}</div>
                {s.sub && <div className="text-[11px] text-yellow-400 mt-1.5 font-semibold">{s.sub}</div>}
                {isClickable && (
                  <div className={`text-[10px] mt-2 tracking-wide ${isActive ? 'text-white/60' : 'text-white/20'}`}>
                    {isActive ? '✕ limpar filtro' : 'clique para filtrar'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tabela */}
        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-[20px] tracking-[1px]">{tableTitle}</h2>
              {activeFilter && (
                <button onClick={() => setActiveFilter(null)} className="text-[11px] text-white/30 hover:text-white border border-white/10 px-2 py-0.5 rounded-sm transition-colors">
                  limpar
                </button>
              )}
            </div>
            <Link href="/admin/pedidos" className="text-[#F5C400] text-[12px] hover:text-white transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.07] text-white/40 text-[10px] tracking-[2px] uppercase">
                  <th className="text-left px-6 py-3">Pedido</th>
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Produtos</th>
                  <th className="text-left px-4 py-3">Pagamento</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {(activeFilter ? filteredOrders : filteredOrders.slice(0, 10)).map((o) => (
                  <tr key={o.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <Link href="/admin/pedidos" className="font-mono text-[#F5C400] hover:text-white transition-colors">
                        #{o.id.slice(-8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{o.user.name}</div>
                      <div className="text-white/30 text-[11px]">{o.user.email}</div>
                    </td>
                    <td className="px-4 py-4 text-white/60">
                      {o.items.map(i => `${i.name} (${i.qty}x)`).join(', ')}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${o.paymentMethod === 'PIX' ? 'bg-[rgba(0,140,58,0.15)] text-[#008C3A]' : 'bg-[rgba(245,196,0,0.1)] text-[#F5C400]'}`}>
                        {o.paymentMethod === 'PIX' ? 'PIX' : 'Cartão'}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-[#F5C400]">{fmt(o.total)}</td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5">
                        {statusIcon[o.status]} {statusLabel[o.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white/40">
                      {new Date(o.createdAt).toLocaleDateString('pt-BR')} · {new Date(o.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-white/30">Nenhum pedido encontrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
