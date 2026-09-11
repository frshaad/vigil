export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="bg-muted h-12 w-64 animate-pulse rounded-md" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-muted h-28 animate-pulse rounded-xl" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="bg-muted h-80 animate-pulse rounded-xl" />
        <div className="bg-muted h-80 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
