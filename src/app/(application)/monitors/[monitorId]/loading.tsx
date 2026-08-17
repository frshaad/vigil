import { IconActivity, IconClock, IconExternalLink, IconWorld } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import MonitorBreadcrumbs from '@/features/monitors/components/monitor-breadcrumbs';

function MonitorHeaderSkeleton() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
          <IconActivity className="size-6" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Skeleton className="h-5 w-7" />
            <span aria-hidden>·</span>
            <Skeleton className="h-5 w-45" />
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" disabled>
        Open URL
        <IconExternalLink />
      </Button>
    </header>
  );
}

function MoniotrOverveiwSkeleton() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Current health and performance of your monitor.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Status</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <Skeleton className="size-5" />
              <Skeleton className="h-6 w-22.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Response time
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Skeleton className="h-7 w-16" />
            <p className="text-muted-foreground mt-1 text-xs">Latest check</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">HTTP status</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-7 w-16" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">Last check</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <IconClock className="text-muted-foreground size-4" />
              <Skeleton className="h-6 w-13" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function MonitorEndpointCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Endpoint</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center">
            <IconWorld className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-6 w-9.5" />
              <Skeleton className="h-5 w-50" />
            </div>
          </div>
        </div>

        <Separator />

        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Host</dt>
            <Skeleton className="h-5 w-50" />
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Path</dt>
            <Skeleton className="h-5 w-20" />
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function MonitorActivityCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Incident history</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-15 w-70" />
        <Skeleton className="h-15 w-70" />
      </CardContent>
    </Card>
  );
}

function MonitorDetailsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monitor details</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground text-sm">Created</dt>
            <Skeleton className="h-5 w-45" />
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Last updated</dt>
            <Skeleton className="h-5 w-45" />
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Monitor ID</dt>
            <Skeleton className="h-5 w-45" />
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">Check interval</dt>
            <Skeleton className="h-5 w-45" />
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function UpdateMonitorFormSkeleton() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel>Monitor name</FieldLabel>
          <Input placeholder="Production API" disabled />
        </Field>

        <Field>
          <FieldLabel>URL</FieldLabel>
          <Input placeholder="https://api.example.com/health" disabled />
        </Field>

        <Field orientation="responsive">
          <FieldContent>
            <FieldLabel htmlFor="update-monitor-method">HTTP method</FieldLabel>
          </FieldContent>

          <Select disabled>
            <SelectTrigger className="min-w-30">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
          </Select>
        </Field>
      </FieldGroup>

      <div className="mt-6 flex justify-end">
        <Button disabled>Save changes</Button>
      </div>
    </form>
  );
}

export default function MonitorPageLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <MonitorBreadcrumbs />
      <MonitorHeaderSkeleton />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-8">
          <MoniotrOverveiwSkeleton />

          <MonitorEndpointCardSkeleton />

          <MonitorActivityCardSkeleton />

          <MonitorDetailsCardSkeleton />
        </main>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <UpdateMonitorFormSkeleton />
        </aside>
      </div>
    </div>
  );
}
