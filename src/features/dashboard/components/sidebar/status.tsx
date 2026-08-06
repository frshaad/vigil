export default function SidebarStatus() {
  return (
    <div className="border-border bg-muted/40 flex items-center gap-2.5 rounded-md border px-3 py-2">
      <span className="relative flex size-2 shrink-0">
        <span className="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-60" />
        <span className="bg-success relative inline-flex size-2 rounded-full" />
      </span>
      <span className="text-muted-foreground text-xs font-medium">All systems operational</span>
    </div>
  );
}
