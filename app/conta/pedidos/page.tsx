'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, QrCode, CreditCard, ExternalLink, ChevronLeft, Truck, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const fmt = (n: number) => `R$ ${(n / 100).toFixed(2).replace('.', ',')}`;

const statusConfig = {
  PENDING:    { label: 'Aguardando Pagamento', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  CONFIRMED:  { label: 'Pagamento Confirmado', color: 'text-[#008C3A] bg-[rgba(0,140,58,0.1)] border-[rgba(0,140,58,0.2)]', icon: CheckCircle },
  PROCESSING: { label: 'Em Preparação',        color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: Package },
  SHIPPED:    { label: 'Enviado',              color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', icon: Truck },
  DELIVERED:  { label: 'Entregue',             color: 'text-[#008C3A] bg-[rgba(0,140,58,0.1)] border-[rgba(0,140,58,0.2)]', icon: CheckCircle },
  CANCELLED:  { label: 'Cancelado',            color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: XCircle },
};

type OrderStatus = keyof typeof statusConfig;

interface Order {
  id: string;
  status: OrderStatus;
  paymentMethod: string;
  total: number;
  trackingCode: string | null;
  createdAt: string;
  items: { name: string; size: string; qty: number; price: number }[];
  address: { street: string; number: string; city: string; state: string } | null;
}

export default function PedidosPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status === 'authenticated') {
      fetch('/api/orders').then((r) => r.json()).then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [status, router]);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-[68px]">
      <div className="text-white/40">Carregando pedidos...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-[68px] pb-16">
      <div className="max-w-[900px] mx-auto px-[5%] py-10">
        <Link href="/conta" className="flex items-center gap-2 text-white/40 hover:text-white text-[12px] tracking-wide uppercase mb-6 transition-colors">
          <ChevronLeft size={16} /> Minha conta
        </Link>
        <h1 className="font-display text-[40px] tracking-[2px] mb-8">MEUS PEDIDOS</h1>

        {orders.length === 0 ? (
          <div className="bg-[#111] border border-white/[0.07] rounded-lg p-16 text-center">
            <AlertCircle size={48} className="text-white/20 mx-auto mb-4" />
            <p className="font-display text-[24px] mb-2 text-white/60">Nenhum pedido ainda</p>
            <p className="text-white/30 text-[13px] mb-6">Seus pedidos aparecerão aqui após a compra</p>
            <Link href="/" className="bg-[#F5C400] text-black px-8 py-3 font-display text-[18px] tracking-[2px] rounded-sm hover:bg-[#D9A300] transition-colors inline-block">
              IR PARA A LOJA
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const cfg = statusConfig[order.status];
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-white/[0.07]">
                    <div className="flex items-center gap-3">
                      {order.paymentMethod === 'PIX'
                        ? <QrCode size={18} className="text-[#008C3A]" />
                        : <CreditCard size={18} className="text-[#F5C400]" />
                      }
                      <div>
                        <p className="font-mono text-[13px] text-white/60">Pedido #{order.id.slice(-8).toUpperCase()}</p>
                        <p className="text-[11px] text-white/30">
                          {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1.5 text-[11px] font-bold tracking-wide border px-3 py-1 rounded-full ${cfg.color}`}>
                        <Icon size={12} /> {cfg.label}
                      </span>
                      <span className="font-bold text-[#F5C400]">{fmt(order.total)}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                        <div>
                          <p className="text-[14px] font-semibold">{item.name}</p>
                          <p className="text-[11px] text-white/40">Tam {item.size} · Qtd {item.qty}</p>
                        </div>
                        <p className="text-[13px] text-white/60">{fmt(item.price * item.qty)}</p>
                      </div>
                    ))}

                    {/* Endereço + Pagamento */}
                    <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-col sm:flex-row gap-4 text-[12px] text-white/40">
                      {order.address && (
                        <p className="flex items-center gap-1.5">
                          📍 {order.address.street}, {order.address.number} — {order.address.city}/{order.address.state}
                        </p>
                      )}
                      <p className="flex items-center gap-1.5">
                        {order.paymentMethod === 'PIX'
                          ? <><QrCode size={13} className="text-[#008C3A]" /> PIX</>
                          : <><CreditCard size={13} className="text-[#F5C400]" /> Cartão de Crédito</>
                        }
                      </p>
                    </div>

                    {/* Rastreamento */}
                    {order.trackingCode && (
                      <div className="mt-4 flex items-center justify-between bg-[rgba(0,140,58,0.08)] border border-[rgba(0,140,58,0.2)] rounded-sm px-4 py-3">
                        <div>
                          <p className="text-[11px] tracking-[2px] uppercase text-[#008C3A] font-bold mb-0.5">Código de rastreamento</p>
                          <p className="font-mono text-[15px] text-white">{order.trackingCode}</p>
                        </div>
                        <a
                          href={`https://rastreamento.correios.com.br/app/index.php?objeto=${order.trackingCode}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#008C3A] text-white text-[11px] font-bold tracking-wide uppercase px-4 py-2 rounded-sm hover:bg-[#006B2D] transition-colors"
                        >
                          Rastrear <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
