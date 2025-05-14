'use client';

import * as React from 'react';
import { Legend, Tooltip, ResponsiveContainer, LegendProps } from 'recharts';

import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = Record<
  string,
  {
    label: string;
    color?: string;
  }
>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
}

function ChartContainer({ config, children, ...props }: ChartContainerProps) {
  return (
    <div {...props}>
      <ResponsiveContainer width='100%' height='100%'>
        {children}
      </ResponsiveContainer>

      <style jsx global>{`
        :root {
          --chart-1: 222.2 84% 4.9%;
          --chart-2: 221.2 83.2% 53.3%;
          --chart-3: 217.2 91.2% 59.8%;
          --chart-4: 201.3 96.3% 72.1%;
          --chart-5: 142.1 76.2% 36.3%;
          --chart-6: 95.5 69.9% 46.5%;
          --chart-7: 29.3 67.2% 50%;
          --chart-8: 355.7 100% 74.7%;
          --chart-9: 100 50% 50%;
          --chart-10: 200 50% 50%;
          --color-score: ${config.score?.color ?? 'hsl(var(--chart-1))'};
          --color-time: ${config.time?.color ?? 'hsl(var(--chart-2))'};
        }
      `}</style>
    </div>
  );
}

interface ChartTooltipProps {
  content: React.ReactElement;
}

function ChartTooltip({ content }: ChartTooltipProps) {
  return (
    <Tooltip
      content={content}
      cursor={{ stroke: 'hsl(var(--muted))' }}
      wrapperStyle={{
        outline: 'none'
      }}
    />
  );
}

interface ChartTooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function ChartTooltipContent({
  active,
  payload,
  label,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className='bg-background rounded-lg border p-2 shadow-md' {...props}>
      <p className='text-sm font-medium'>{label}</p>
      <div className='mt-1 flex flex-col gap-1'>
        {payload.map((entry, index) => (
          <div key={index} className='flex items-center justify-between gap-2'>
            <span className='text-muted-foreground text-xs'>{entry.name}:</span>
            <span className='text-xs font-medium'>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ChartLegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: LegendProps['payload'];
  verticalAlign?: 'top' | 'bottom';
  hideIcon?: boolean;
  nameKey?: string;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey
}: ChartLegendContentProps) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item: any) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        return (
          <div
            key={item.value}
            className={cn(
              '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
            )}
          >
            <div
              className='h-2 w-2 shrink-0 rounded-[2px]'
              style={{
                backgroundColor: item.color
              }}
            />
            {item.value}
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Legend as ChartLegend,
  ChartLegendContent
};
