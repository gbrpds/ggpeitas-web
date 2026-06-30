import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminContatos from '@/components/admin/AdminContatos';

export default async function PainelContatosPage() {
  const jar = await cookies();
  if (!jar.has('ggpeitas_admin')) redirect('/painel/login');
  return <AdminContatos />;
}
