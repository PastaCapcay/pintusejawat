'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const chartConfig = {
  tryoutSelesai: {
    label: 'Tryout Selesai',
    color: 'hsl(var(--chart-1))'
  },
  rataRata: {
    label: 'Rata-rata Nilai',
    color: 'hsl(var(--chart-2))'
  }
};

export function BarGraph() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setChartData(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Tryout</CardTitle>
        <CardDescription>
          Jumlah tryout dan rata-rata nilai per bulan
        </CardDescription>
      </CardHeader>
      <CardContent className='pr-8 pl-2'>
        {isLoading && (
          <div className='flex h-[350px] items-center justify-center'>
            <div className='text-muted-foreground text-sm'>Memuat data...</div>
          </div>
        )}
        {error && (
          <div className='flex h-[350px] items-center justify-center'>
            <div className='text-sm text-red-500'>Error: {error}</div>
          </div>
        )}
        {!isLoading && !error && (
          <div className='h-[350px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray='3 3'
                  horizontal={true}
                  vertical={false}
                  className='stroke-muted'
                />
                <XAxis
                  dataKey='bulan'
                  tickLine={false}
                  axisLine={false}
                  className='text-muted-foreground text-sm'
                  tickMargin={8}
                />
                <YAxis
                  yAxisId='left'
                  tickLine={false}
                  axisLine={false}
                  className='text-muted-foreground text-sm'
                  tickMargin={8}
                />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                  tickLine={false}
                  axisLine={false}
                  className='text-muted-foreground text-sm'
                  tickMargin={8}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
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
                                  style={{
                                    background: chartConfig.tryoutSelesai.color
                                  }}
                                />
                                <span className='font-bold'>
                                  {payload[0].value} Tryout Selesai
                                </span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <div
                                  className='h-2 w-2 rounded-full'
                                  style={{
                                    background: chartConfig.rataRata.color
                                  }}
                                />
                                <span className='font-bold'>
                                  Rata-rata: {payload[1].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  yAxisId='left'
                  dataKey='tryoutSelesai'
                  fill={chartConfig.tryoutSelesai.color}
                  radius={[4, 4, 0, 0]}
                  name='Tryout Selesai'
                />
                <Bar
                  yAxisId='right'
                  dataKey='rataRata'
                  fill={chartConfig.rataRata.color}
                  radius={[4, 4, 0, 0]}
                  name='Rata-rata Nilai'
                />
                <Legend
                  wrapperStyle={{ paddingTop: '1rem' }}
                  formatter={(value) => {
                    return (
                      <span className='text-muted-foreground text-sm'>
                        {value}
                      </span>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
