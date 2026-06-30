import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function PainelFinanceiroPage() {
  const jar = await cookies();
  if (!jar.has('ggpeitas_admin')) redirect('/painel/login');
  return <AdminDashboard />;
}
