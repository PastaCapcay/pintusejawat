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
import { useRouter, useParams, useSearchParams } from 'next/navigation';

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
    name: string;
  }>;
  label?: string;
}

const chartConfig = {
  score: {
    label: 'Nilai',
    color: 'hsl(var(--chart-1))'
  },
  time: {
    label: 'Waktu (menit)',
    color: 'hsl(var(--chart-2))'
  }
};

const formatTimeForChart = (seconds: number): number => {
  // Konversi ke menit dengan maksimal 2 desimal, tanpa trailing zeros
  return Number((seconds / 60).toFixed(2));
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background rounded-lg border p-3 shadow-lg'>
        <p className='font-medium'>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.stroke }}>
            {entry.name === 'Waktu'
              ? `${entry.name}: ${
                  entry.value < 1
                    ? `${Math.round(entry.value * 60)} detik`
                    : `${Number(entry.value)} menit`
                }`
              : `${entry.name}: ${Number(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const calculateScore = (
  correctAnswers: number,
  totalQuestions: number
): number => {
  const score = (correctAnswers / totalQuestions) * 100;
  return Math.round(score * 100) / 100;
};

const getGrade = (score: number) => {
  if (score >= 80) return { text: 'Sangat Baik', color: 'bg-green-500' };
  if (score >= 70) return { text: 'Baik', color: 'bg-blue-500' };
  if (score >= 60) return { text: 'Cukup', color: 'bg-yellow-500' };
  return { text: 'Perlu Ditingkatkan', color: 'bg-red-500' };
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
    const scores = attempts.map((a) => a.score);
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
  const paketSoal = history[0].paketSoal;

  return (
    <div className='bg-background h-screen overflow-y-auto'>
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

          {history.length > 0 ? (
            <div className='space-y-6'>
              <div className='grid gap-4 md:grid-cols-3'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Nilai Tertinggi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-green-600'>
                      {calculateScore(
                        Math.max(...history.map((h) => h.score)),
                        history[0].paketSoal.soal.length
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Nilai Terendah
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-red-600'>
                      {calculateScore(
                        Math.min(...history.map((h) => h.score)),
                        history[0].paketSoal.soal.length
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Rata-rata Nilai
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {calculateScore(
                        Math.round(
                          history.reduce((acc, h) => acc + h.score, 0) /
                            history.length
                        ),
                        history[0].paketSoal.soal.length
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Grafik Perkembangan</CardTitle>
                  <CardDescription>
                    Menampilkan nilai dan waktu pengerjaan untuk setiap
                    percobaan
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
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: 'hsl(var(--foreground))' }}
                          tickMargin={10}
                        />
                        <YAxis
                          yAxisId='left'
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: 'hsl(var(--foreground))' }}
                        />
                        <YAxis
                          yAxisId='right'
                          orientation='right'
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: 'hsl(var(--foreground))' }}
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
                              <Badge className={grade.color}>
                                {grade.text}
                              </Badge>
                              <span className='font-medium'>
                                Nilai: {nilai}
                              </span>
                            </div>
                            <div className='text-muted-foreground flex items-center gap-4 text-sm'>
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
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className='py-8'>
                <div className='flex flex-col items-center justify-center text-center'>
                  <p className='text-muted-foreground mt-2 text-sm'>
                    Belum ada history tryout untuk paket soal ini
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
