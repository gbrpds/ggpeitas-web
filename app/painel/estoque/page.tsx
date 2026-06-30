import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminEstoque from '@/components/admin/AdminEstoque';

export default async function PainelEstoquePage() {
  const jar = await cookies();
  if (!jar.has('ggpeitas_admin')) redirect('/painel/login');
  return <AdminEstoque />;
}
