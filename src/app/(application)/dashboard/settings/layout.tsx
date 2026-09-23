import SettingsNavigation from '@/features/settings/components/settings-navigation';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

        <p className="text-muted-foreground text-sm">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <SettingsNavigation />

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
