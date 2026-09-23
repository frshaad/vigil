export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3">
        <span className="border-muted-foreground/30 border-t-primary size-4 animate-spin rounded-full border-2" />
        <span className="text-muted-foreground text-sm">Loading…</span>
      </div>
    </div>
  );
}
