'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface MonitorResponseTimeChartProps {
  data: {
    checkedAt: string;
    responseTimeMs: number | null;
  }[];
}

const chartConfig = {
  responseTimeMs: {
    label: 'Response time',
  },
};

export default function MonitorResponseTimeChart({ data }: MonitorResponseTimeChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-65 w-full">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="checkedAt"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            new Date(value).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          }
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={45} />
        <ChartTooltip
          content={
            <ChartTooltipContent labelFormatter={(value) => new Date(value).toLocaleString()} />
          }
        />
        <Line
          type="monotone"
          dataKey="responseTimeMs"
          stroke="currentColor"
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
