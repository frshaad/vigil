import { GridPatternDashed } from '@/components/grid-pattern-dashed';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <GridPatternDashed />
      <div className="z-10 w-full max-w-sm">{children}</div>
    </div>
  );
}
