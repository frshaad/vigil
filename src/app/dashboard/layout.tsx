import { requireAuthOrRedirect } from '@/lib/auth/session';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthOrRedirect({ callbackURL: '/dashboard' });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">{children}</div>
  );
}
