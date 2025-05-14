'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';
import dynamic from 'next/dynamic';
import { ClientOnly } from '@/components/client-only';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';

const DynamicChartComponents = {
  ChartContainer: dynamic(
    () => import('@/components/ui/chart').then((mod) => mod.ChartContainer),
    {
      ssr: false,
      loading: () => <div className='bg-muted h-[250px] w-full animate-pulse' />
    }
  ),
  ChartTooltip: dynamic(
    () => import('@/components/ui/chart').then((mod) => mod.ChartTooltip),
    {
      ssr: false
    }
  ),
  ChartTooltipContent: dynamic(
    () =>
      import('@/components/ui/chart').then((mod) => mod.ChartTooltipContent),
    {
      ssr: false
    }
  )
};

const chartData = [
  { range: '90-100', count: 75, fill: 'var(--primary)' },
  { range: '80-89', count: 200, fill: 'var(--primary-light)' },
  { range: '70-79', count: 287, fill: 'var(--primary-lighter)' },
  { range: '60-69', count: 173, fill: 'var(--primary-dark)' },
  { range: '<60', count: 90, fill: 'var(--primary-darker)' }
];

const chartConfig = {
  count: {
    label: 'Jumlah Siswa'
  },
  '90-100': {
    label: '90-100',
    color: 'var(--primary)'
  },
  '80-89': {
    label: '80-89',
    color: 'var(--primary-light)'
  },
  '70-79': {
    label: '70-79',
    color: 'var(--primary-lighter)'
  },
  '60-69': {
    label: '60-69',
    color: 'var(--primary-dark)'
  },
  '<60': {
    label: '<60',
    color: 'var(--primary-darker)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalSiswa = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <ClientOnly>
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Nilai</CardTitle>
          <CardDescription>Sebaran nilai tryout siswa</CardDescription>
        </CardHeader>
        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
          <DynamicChartComponents.ChartContainer
            config={chartConfig}
            className='aspect-auto h-[250px] w-full'
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey='count'
                nameKey='range'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              />
            </PieChart>
          </DynamicChartComponents.ChartContainer>
        </CardContent>
        <CardFooter className='flex-col gap-2 text-sm'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            {((chartData[0].count / totalSiswa) * 100).toFixed(1)}% siswa
            mendapat nilai di atas 90 <IconTrendingUp className='h-4 w-4' />
          </div>
          <div className='text-muted-foreground leading-none'>
            Berdasarkan data tryout bulan ini
          </div>
        </CardFooter>
      </Card>
    </ClientOnly>
  );
}
