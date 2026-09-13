import { IconArrowLeft, IconActivity } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import CreateMonitorForm from '@/features/monitors/components/create-monitor-form';
import { getMonitorBackLabel, resolveMonitorBackUrl } from '@/features/monitors/navigation';

interface NewMonitorPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewMonitorPage({ searchParams }: NewMonitorPageProps) {
  const rawBackUrl = (await searchParams).backUrl;
  const backUrl = resolveMonitorBackUrl(rawBackUrl);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2"
        nativeButton={false}
        render={<Link href={backUrl} />}
      >
        <IconArrowLeft />
        {getMonitorBackLabel(backUrl)}
      </Button>

      <div className="mb-8">
        <div className="bg-primary/10 text-primary mb-4 flex size-10 items-center justify-center rounded-lg">
          <IconActivity className="size-5" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Add monitor</h1>

        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Tell Vigil what you want to monitor. You can change these settings later.
        </p>
      </div>

      <CreateMonitorForm />
    </>
  );
}
