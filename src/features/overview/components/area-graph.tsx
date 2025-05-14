'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  TooltipProps
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ClientOnly } from '@/components/client-only';
import { useState, useEffect } from 'react';

const chartData = [
  { month: 'January', siswa: 186, guru: 80 },
  { month: 'February', siswa: 305, guru: 120 },
  { month: 'March', siswa: 437, guru: 150 },
  { month: 'April', siswa: 573, guru: 190 },
  { month: 'May', siswa: 709, guru: 230 },
  { month: 'June', siswa: 814, guru: 280 }
];

const chartConfig = {
  pengguna: {
    label: 'Total Pengguna',
    color: 'var(--primary)'
  },
  siswa: {
    label: 'Siswa',
    color: 'var(--primary)'
  },
  guru: {
    label: 'Guru',
    color: 'var(--primary-light)'
  }
} satisfies ChartConfig;

const CustomTooltip = ({
  active,
  payload,
  label
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background rounded-lg border p-2 shadow-sm'>
        <div className='grid gap-2'>
          <div className='flex flex-col'>
            <span className='text-muted-foreground text-[0.70rem] uppercase'>
              {label}
            </span>
            <div className='flex items-center gap-2'>
              <div
                className='h-2 w-2 rounded-full'
                style={{ background: chartConfig.pengguna.color }}
              />
              <span className='font-bold'>{payload[0].value} Pengguna</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

interface AreaGraphProps {
  loading: boolean;
  userGrowth?: Record<string, { total: number }>;
}

export function AreaGraph({ loading, userGrowth }: AreaGraphProps) {
  const data = userGrowth
    ? Object.entries(userGrowth).map(([month, data]) => ({
        month,
        total: data.total
      }))
    : [];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pertumbuhan Pengguna</CardTitle>
          <CardDescription>Memuat data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pertumbuhan Pengguna</CardTitle>
          <CardDescription>Tidak ada data tersedia</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <ClientOnly>
      <Card>
        <CardHeader>
          <CardTitle>Pertumbuhan Pengguna</CardTitle>
          <CardDescription>Jumlah pengguna aktif per bulan</CardDescription>
        </CardHeader>
        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[250px] w-full'
          >
            <AreaChart
              data={data}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <defs>
                <linearGradient id='fillTotal' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='var(--primary)'
                    stopOpacity={0.2}
                  />
                  <stop
                    offset='100%'
                    stopColor='var(--primary)'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey='total'
                type='monotone'
                fill='url(#fillTotal)'
                stroke='var(--primary)'
                stackId='1'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 leading-none font-medium'>
                {data.length > 0 &&
                  `Total ${data[data.length - 1].total} pengguna`}{' '}
                <IconTrendingUp className='h-4 w-4' />
              </div>
              <div className='text-muted-foreground flex items-center gap-2 leading-none'>
                Data 6 bulan terakhir
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </ClientOnly>
  );
}
