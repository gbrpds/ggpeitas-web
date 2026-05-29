'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, Truck, X, CheckCircle, Save } from 'lucide-react';

const fmt = (n: number) => `R$ ${(n / 100).toFixed(2).replace('.', ',')}`;

const STATUSES = [
  { value: 'PENDING',    label: 'Aguardando Pagamento', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { value: 'CONFIRMED',  label: 'Pagamento Confirmado', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  { value: 'PROCESSING', label: 'Em Preparação',        color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { value: 'SHIPPED',    label: 'Enviado',              color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  { value: 'DELIVERED',  label: 'Entregue',             color: 'text-[#008C3A] bg-[rgba(0,140,58,0.1)] border-[rgba(0,140,58,0.2)]' },
  { value: 'CANCELLED',  label: 'Cancelado',            color: 'text-red-400 bg-red-400/10 border-red-400/20' },
];

interface Order {
  id: string;
  status: string;
  total: number;
  paymentMethod: string;
  trackingCode: string | null;
  createdAt: string;
  user: { name: string; email: string; phone: string | null };
  items: { name: string; size: string; qty: number; price: number }[];
  address: { street: string; number: string; complement: string | null; district: string; city: string; state: string; cep: string } | null;
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Modal rastreio
  const [trackingModal, setTrackingModal] = useState<{ orderId: string; current: string } | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [savingTracking, setSavingTracking] = useState(false);

  useEffect(() => {
    fetch('/api/admin/orders').then(r => r.json()).then(d => {
      const list: Order[] = Array.isArray(d) ? d : [];
      setOrders(list);
      const init: Record<string, string> = {};
      list.forEach(o => { init[o.id] = o.status; });
      setStatuses(init);
    });
  }, []);

  const saveStatus = async (id: string) => {
    setSavingStatus(id);
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: statuses[id] }),
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: statuses[id] } : o));
    setSavingStatus(null);
    setSavedStatus(id);
    setTimeout(() => setSavedStatus(null), 2000);
  };

  const openTrackingModal = (order: Order) => {
    setTrackingInput(order.trackingCode ?? '');
    setTrackingModal({ orderId: order.id, current: order.trackingCode ?? '' });
  };

  const saveTracking = async () => {
    if (!trackingModal) return;
    setSavingTracking(true);
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: trackingModal.orderId, trackingCode: trackingInput, status: statuses[trackingModal.orderId] }),
    });
    setOrders(prev => prev.map(o => o.id === trackingModal.orderId ? { ...o, trackingCode: trackingInput } : o));
    setSavingTracking(false);
    setTrackingModal(null);
  };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.user.name.toLowerCase().includes(q) || o.user.email.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
    return matchSearch && (!filterStatus || o.status === filterStatus);
  });

  const statusCfg = (val: string) => STATUSES.find(s => s.value === val) ?? STATUSES[0];

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[1200px] mx-auto px-[5%] py-10">
        <Link href="/admin" className="flex items-center gap-2 text-white/40 hover:text-white text-[12px] uppercase tracking-wide mb-6 transition-colors">
          <ChevronLeft size={16} /> Admin
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-[40px] tracking-[2px]">PEDIDOS</h1>
          <div className="bg-[#111] border border-white/[0.07] rounded-lg px-5 py-3 text-center">
            <div className="font-display text-[28px] text-[#F5C400]">{orders.length}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide">Total</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail ou nº pedido..."
              className="w-full bg-[#111] border border-white/10 rounded-sm pl-9 pr-4 py-2.5 text-[13px] text-white placeholder-white/25 focus:border-[#F5C400] focus:outline-none transition-colors" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-sm px-4 py-2.5 text-[13px] text-white focus:border-[#F5C400] focus:outline-none transition-colors">
            <option value="">Todos os status</option>
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {filtered.map(o => {
            const cfg = statusCfg(o.status);
            return (
              <div key={o.id} className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 border-b border-white/[0.07] bg-[#161616]">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Pedido</p>
                    <p className="font-mono text-[#F5C400] font-bold">#{o.id.slice(-8).toUpperCase()}</p>
                    <p className="text-[11px] text-white/30">{new Date(o.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Cliente</p>
                    <p className="font-semibold text-[14px]">{o.user.name}</p>
                    <p className="text-[11px] text-white/40">{o.user.email}</p>
                    {o.user.phone && <p className="text-[11px] text-white/40">{o.user.phone}</p>}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Total</p>
                    <p className="font-display text-[22px] text-[#F5C400]">{fmt(o.total)}</p>
                    <span className={`text-[11px] font-bold ${o.paymentMethod === 'PIX' ? 'text-[#008C3A]' : 'text-[#F5C400]'}`}>
                      {o.paymentMethod === 'PIX' ? 'PIX' : 'Cartão'}
                    </span>
                  </div>
                  {o.address && (
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">Endereço</p>
                      <p className="text-[12px] text-white/70">{o.address.street}, {o.address.number}{o.address.complement ? ` - ${o.address.complement}` : ''}</p>
                      <p className="text-[12px] text-white/70">{o.address.district} · {o.address.city}/{o.address.state}</p>
                      <p className="text-[11px] text-white/40">CEP {o.address.cep}</p>
                    </div>
                  )}
                </div>

                {/* Itens */}
                <div className="px-6 py-3 border-b border-white/[0.07]">
                  <div className="flex flex-wrap gap-2">
                    {o.items.map((item, i) => (
                      <div key={i} className="bg-[#1a1a1a] rounded-sm px-3 py-1.5 text-[12px]">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-white/40 ml-2">Tam {item.size} · {item.qty}x · {fmt(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rastreio atual */}
                {o.trackingCode && (
                  <div className="px-6 py-3 border-b border-white/[0.07] bg-[rgba(0,140,58,0.05)]">
                    <div className="flex items-center gap-3">
                      <Truck size={14} className="text-[#008C3A]" />
                      <span className="text-[11px] text-white/40 uppercase tracking-wide">Código de rastreio:</span>
                      <span className="font-mono text-[14px] text-white font-bold">{o.trackingCode}</span>
                    </div>
                  </div>
                )}

                {/* Controles */}
                <div className="px-6 py-4 flex flex-wrap gap-3 items-center">
                  {/* Status */}
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <select
                      value={statuses[o.id] ?? o.status}
                      onChange={e => setStatuses(prev => ({ ...prev, [o.id]: e.target.value }))}
                      className="bg-[#1a1a1a] border border-white/10 rounded-sm px-3 py-1.5 text-[12px] text-white focus:border-[#F5C400] focus:outline-none transition-colors"
                    >
                      {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <button
                      onClick={() => saveStatus(o.id)}
                      disabled={savingStatus === o.id || statuses[o.id] === o.status}
                      className="flex items-center gap-1.5 bg-[#F5C400] text-black px-3 py-1.5 font-bold text-[12px] rounded-sm hover:bg-[#D9A300] transition-colors disabled:opacity-40"
                    >
                      {savedStatus === o.id ? <><CheckCircle size={13} /> Salvo</> : <><Save size={13} /> Salvar</>}
                    </button>
                  </div>

                  {/* Botão rastreio */}
                  <button
                    onClick={() => openTrackingModal(o)}
                    className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold rounded-sm border transition-all ${
                      o.trackingCode
                        ? 'border-[rgba(0,140,58,0.4)] text-[#008C3A] hover:bg-[rgba(0,140,58,0.1)]'
                        : 'border-white/20 text-white/60 hover:border-[#F5C400] hover:text-[#F5C400]'
                    }`}
                  >
                    <Truck size={13} />
                    {o.trackingCode ? 'Editar Rastreio' : 'Adicionar Rastreio'}
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="bg-[#111] border border-white/[0.07] rounded-lg p-16 text-center text-white/30">
              Nenhum pedido encontrado
            </div>
          )}
        </div>
      </div>

      {/* Modal Código de Rastreio */}
      {trackingModal && (
        <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setTrackingModal(null)}>
          <div className="bg-[#181818] border border-[rgba(245,196,0,0.2)] rounded-lg w-full max-w-[480px] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-[26px] tracking-[1px]">CÓDIGO DE RASTREIO</h2>
                <p className="text-[11px] text-white/30 mt-0.5">Pedido #{trackingModal.orderId.slice(-8).toUpperCase()}</p>
              </div>
              <button onClick={() => setTrackingModal(null)} className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="mb-6">
              <label className="text-[10px] tracking-[2px] uppercase text-white/40 mb-2 block">
                Código dos Correios / Transportadora
              </label>
              <input
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value.toUpperCase())}
                placeholder="Ex: BR123456789BR"
                autoFocus
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm px-4 py-3 text-[16px] font-mono text-white placeholder-white/20 focus:border-[#F5C400] focus:outline-none transition-colors uppercase tracking-widest"
              />
              <p className="text-[11px] text-white/30 mt-2">
                Quando salvo, o cliente verá o código e um botão para rastrear nos Correios.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveTracking}
                disabled={savingTracking || !trackingInput.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-[#008C3A] text-white py-3 font-display text-[18px] tracking-[1px] rounded-sm hover:bg-[#006B2D] transition-colors disabled:opacity-50"
              >
                <Truck size={16} />
                {savingTracking ? 'SALVANDO...' : 'SALVAR RASTREIO'}
              </button>
              {trackingInput && (
                <button
                  onClick={() => { setTrackingInput(''); }}
                  className="px-4 border border-red-400/30 text-red-400 rounded-sm hover:bg-red-400/10 transition-colors text-[12px] font-bold"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
