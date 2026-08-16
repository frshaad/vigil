export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border rounded-xl border p-5">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
