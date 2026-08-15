export default async function MonitorPage({
  params,
}: PageProps<'/dashboard/monitors/[monitorId]'>) {
  const { monitorId } = await params;

  return <div>Monitor with id: {monitorId}</div>;
}
