'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Timer, Calendar, ArrowLeft } from 'lucide-react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';

interface TryoutHistory {
  id: string;
  score: number;
  timeSpent: number;
  createdAt: string;
  paketSoalId: string;
  paketSoal: {
    id: string;
    judul: string;
    deskripsi: string | null;
    soal: {
      id: string;
    }[];
  };
}

interface PaketStats {
  highestScore: number;
  lowestScore: number;
  averageScore: number;
  fastestTime: number;
  slowestTime: number;
  averageTime: number;
  totalAttempts: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color?: string;
    payload: {
      date: string;
    };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded-lg border bg-background p-3 shadow-sm'>
        <p className='font-medium'>{label}</p>
        <p className='text-sm text-muted-foreground'>
          {payload[0]?.payload?.date}
        </p>
        {payload.map((item, index) => (
          <p key={index} className='text-sm' style={{ color: item.color }}>
            {item.dataKey}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const chartConfig = {
  score: {
    label: 'Nilai',
    color: '#10b981' // emerald-500
  },
  time: {
    label: 'Waktu (menit)',
    color: '#6366f1' // indigo-500
  }
};

const formatTimeForChart = (seconds: number): number => {
  return Number((seconds / 60).toFixed(2));
};

const getGrade = (score: number) => {
  if (score >= 80) return { text: 'Sangat Baik', color: 'text-green-500' };
  if (score >= 70) return { text: 'Baik', color: 'text-blue-500' };
  if (score >= 60) return { text: 'Cukup', color: 'text-yellow-500' };
  return { text: 'Perlu Ditingkatkan', color: 'text-red-500' };
};

const calculateScore = (
  correctAnswers: number,
  totalQuestions: number
): number => {
  const score = (correctAnswers / totalQuestions) * 100;
  return Math.round(score * 100) / 100;
};

export default function TryoutHistoryDetailPage() {
  const [history, setHistory] = useState<TryoutHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/tryout-history');
        const data = await response.json();
        // Fetch paket soal detail untuk mendapatkan jumlah soal
        const paketResponse = await fetch(
          `/api/paket-soal/${params.paketId}/soal`
        );
        const paketData = await paketResponse.json();

        const filteredHistory = data
          .filter(
            (item: TryoutHistory) =>
              item.paketSoal.id === params.paketId ||
              item.paketSoalId === params.paketId
          )
          .map((item: TryoutHistory) => ({
            ...item,
            paketSoal: {
              ...item.paketSoal,
              soal: paketData.soal
            }
          }));

        setHistory(filteredHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tryout history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [params.paketId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours} jam ` : ''}${minutes > 0 ? `${minutes} menit ` : ''}${secs} detik`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short'
    }).format(date);
  };

  const calculateStats = (attempts: TryoutHistory[]): PaketStats => {
    const scores = attempts.map((a) =>
      calculateScore(a.score, a.paketSoal.soal.length)
    );
    const times = attempts.map((a) => a.timeSpent);

    return {
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      averageScore: Math.round(
        scores.reduce((a, b) => a + b, 0) / scores.length
      ),
      fastestTime: Math.min(...times),
      slowestTime: Math.max(...times),
      averageTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
      totalAttempts: attempts.length
    };
  };

  const getChartData = (attempts: TryoutHistory[]) => {
    const sortedAttempts = [...attempts].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return sortedAttempts.map((attempt, index) => ({
      name: `Percobaan ${index + 1}`,
      Nilai: calculateScore(attempt.score, attempt.paketSoal.soal.length),
      Waktu: formatTimeForChart(attempt.timeSpent),
      date: formatDate(attempt.createdAt)
    }));
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Memuat History...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Data Tidak Ditemukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>
              History tryout untuk paket soal ini tidak ditemukan.
            </p>
            <Button className='mt-4 w-full' onClick={() => router.back()}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Kembali
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = calculateStats(history);
  const chartData = getChartData(history);

  return (
    <div className='h-screen overflow-y-auto bg-background'>
      <div className='p-8'>
        <div className='mx-auto max-w-7xl space-y-8 pb-16'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => router.back()} size='sm'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Kembali
            </Button>
            <div>
              <h2 className='text-3xl font-bold tracking-tight'>
                {history[0]?.paketSoal?.judul || 'Loading...'}
              </h2>
              <p className='text-muted-foreground'>
                {history[0]?.paketSoal?.deskripsi}
              </p>
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Nilai Tertinggi
                </CardTitle>
                <Trophy className='h-4 w-4 text-green-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-500'>
                  {stats.highestScore}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Nilai Terendah
                </CardTitle>
                <Trophy className='h-4 w-4 text-red-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-red-500'>
                  {stats.lowestScore}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Rata-rata Nilai
                </CardTitle>
                <Trophy className='h-4 w-4 text-blue-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-500'>
                  {stats.averageScore}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Percobaan
                </CardTitle>
                <Trophy className='h-4 w-4 text-purple-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-purple-500'>
                  {stats.totalAttempts}x
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grafik Perkembangan</CardTitle>
              <CardDescription>
                Menampilkan nilai dan waktu pengerjaan untuk setiap percobaan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[400px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted'
                    />
                    <XAxis
                      dataKey='name'
                      stroke='currentColor'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId='left'
                      stroke={chartConfig.score.color}
                      domain={[0, 100]}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      label={{
                        value: 'Nilai',
                        angle: -90,
                        position: 'insideLeft'
                      }}
                    />
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      stroke={chartConfig.time.color}
                      domain={['auto', 'auto']}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      label={{
                        value: 'Waktu (menit)',
                        angle: 90,
                        position: 'insideRight'
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId='left'
                      type='monotone'
                      dataKey='Nilai'
                      stroke={chartConfig.score.color}
                      strokeWidth={2}
                      dot={{ r: 4, fill: chartConfig.score.color }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId='right'
                      type='monotone'
                      dataKey='Waktu'
                      stroke={chartConfig.time.color}
                      strokeWidth={2}
                      dot={{ r: 4, fill: chartConfig.time.color }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pengerjaan</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[400px]'>
                <div className='space-y-4'>
                  {history.map((attempt) => {
                    const nilai = calculateScore(
                      attempt.score,
                      attempt.paketSoal.soal.length
                    );
                    const grade = getGrade(nilai);
                    return (
                      <div
                        key={attempt.id}
                        className='flex items-center justify-between rounded-lg border p-4'
                      >
                        <div className='space-y-1'>
                          <div className='flex items-center gap-2'>
                            <Badge
                              variant={
                                nilai >= 80
                                  ? 'secondary'
                                  : nilai >= 70
                                    ? 'outline'
                                    : nilai >= 60
                                      ? 'default'
                                      : 'destructive'
                              }
                            >
                              {grade.text}
                            </Badge>
                            <span className='font-medium'>Nilai: {nilai}</span>
                          </div>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                              <Timer className='h-4 w-4' />
                              {formatTime(attempt.timeSpent)}
                            </div>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              {formatDate(attempt.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
