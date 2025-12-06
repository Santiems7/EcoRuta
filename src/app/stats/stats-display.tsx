'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

const chartData = [
  { week: 'Semana 1', organic: 18, recyclable: 12 },
  { week: 'Semana 2', organic: 30, recyclable: 19 },
  { week: 'Semana 3', organic: 25, recyclable: 15 },
  { week: 'Esta Semana', organic: 35, recyclable: 20 },
];

const chartConfig = {
  organic: {
    label: 'Orgánico',
    color: 'hsl(var(--primary))',
  },
  recyclable: {
    label: 'Reciclable',
    color: 'hsl(var(--secondary-foreground))',
  },
} satisfies ChartConfig;

export function StatsDisplay() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 12)}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="organic" fill="var(--color-organic)" radius={4} />
          <Bar dataKey="recyclable" fill="var(--color-recyclable)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
