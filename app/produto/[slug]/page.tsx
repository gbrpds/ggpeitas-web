import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { ProductPageClient } from './ProductPageClient';
import { sql } from '@/lib/neon';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.label} | GG Peitas`,
    description: product.desc,
  };
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fetch live stock from DB if this product has a stockModel mapping
  let liveStock: Record<string, number> | undefined;
  if (product.stockModel) {
    try {
      const rows = await sql`SELECT tamanho, quantidade FROM estoque WHERE modelo = ${product.stockModel}`;
      liveStock = Object.fromEntries(
        (rows as { tamanho: string; quantidade: number }[]).map((r) => [r.tamanho, r.quantidade])
      );
    } catch {
      // Fall back to static stock on DB error
    }
  }

  return <ProductPageClient product={product} related={related} liveStock={liveStock} />;
}
