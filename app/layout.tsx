import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartSidebar } from '@/components/layout/CartSidebar';
import { ProductModal } from '@/components/layout/ProductModal';
import { Toast } from '@/components/ui/Toast';
import { AuthSessionProvider } from '@/components/layout/SessionProvider';

export const metadata: Metadata = {
  title: 'GG Peitas — Futebol, Estilo e Presença',
  description: 'Camisetas de futebol importadas premium. Modelo jogador original. Brasil 2026, clubes europeus e seleções.',
  keywords: 'camiseta futebol, modelo jogador, brasil 2026, importada, premium',
  openGraph: {
    title: 'GG Peitas — Futebol, Estilo e Presença',
    description: 'Camisetas de futebol importadas premium. Modelo jogador original.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthSessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <ProductModal />
          <Toast />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
