import type { Metadata } from 'next';
import '../admin-globals.css';

export const metadata: Metadata = {
  title: 'Painel · GG Peitas',
  robots: 'noindex,nofollow',
};

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
