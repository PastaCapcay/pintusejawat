'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft, CheckCircle2, Instagram } from 'lucide-react';

const calculateScore = (
  correctAnswers: number,
  totalQuestions: number
): number => {
  const score = (correctAnswers / totalQuestions) * 100;
  return Math.round(score * 100) / 100;
};

const getGrade = (score: number) => {
  if (score >= 80) return { text: 'Sangat Baik', color: 'text-green-500' };
  if (score >= 70) return { text: 'Baik', color: 'text-blue-500' };
  if (score >= 60) return { text: 'Cukup', color: 'text-yellow-500' };
  return { text: 'Perlu Ditingkatkan', color: 'text-red-500' };
};

export default function TryoutResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = searchParams.get('score');
  const totalQuestions = searchParams.get('total');

  if (!score || !totalQuestions) {
    router.push('/dashboarduser/tryoutfree');
    return null;
  }

  const finalScore = calculateScore(parseInt(score), parseInt(totalQuestions));
  const grade = getGrade(finalScore);

  return (
    <div className='h-screen overflow-y-auto'>
      <div className='p-8'>
        <div className='mx-auto max-w-2xl space-y-8 pb-8'>
          <Card className='text-center'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center gap-2'>
                <Trophy className='h-8 w-8 text-yellow-500' />
                Hasil Tryout Gratis
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='py-8'>
                <div className='mb-2 text-6xl font-bold'>{finalScore}</div>
                <div className={`text-xl font-medium ${grade.color}`}>
                  {grade.text}
                </div>
              </div>

              <div className='space-y-4 text-left'>
                <div className='border-t pt-4'>
                  <h3 className='mb-2 font-semibold'>Catatan:</h3>
                  <ul className='list-inside list-disc space-y-2 text-muted-foreground'>
                    <li>
                      Skor di atas merupakan persentase jawaban benar dari total{' '}
                      {totalQuestions} soal
                    </li>
                    <li>
                      Untuk mendapatkan hasil yang lebih akurat, upgrade ke
                      paket premium
                    </li>
                    <li>
                      Paket premium menyediakan pembahasan lengkap dan analisis
                      kemampuan
                    </li>
                  </ul>
                </div>
              </div>

              <div className='flex flex-col gap-2 pt-4'>
                <Button
                  className='mt-4 w-full'
                  onClick={() =>
                    window.open(
                      'https://www.instagram.com/iq.sejawat/',
                      '_blank'
                    )
                  }
                >
                  <Instagram className='mr-2 h-4 w-4' />
                  Follow Instagram Kami
                </Button>
                <Button
                  className='mt-2 w-full'
                  variant='outline'
                  onClick={() =>
                    window.open(
                      'https://docs.google.com/forms/d/1weVcxGDDsG6O3BWqOtbm6_r3c24MyQ6pH1qxKd_PnRk/viewform?edit_requested=true',
                      '_blank'
                    )
                  }
                >
                  Saran & Masukan
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => router.push('/dashboarduser')}
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Kembali ke Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upgrade ke Premium</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>
                Dapatkan pengalaman belajar yang lebih lengkap dengan fitur
                premium:
              </p>
              <div className='grid gap-3'>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Akses ke 1000+ soal terbaru dan terupdate</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Pembahasan lengkap untuk setiap soal</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Tryout tidak terbatas</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Analisis kemampuan mendalam</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Video pembelajaran eksklusif</span>
                </div>
                <div className='flex items-start gap-2'>
                  <CheckCircle2 className='mt-1 h-4 w-4 text-green-500' />
                  <span>Konsultasi dengan pengajar berpengalaman</span>
                </div>
              </div>
              <Button
                className='mt-6 w-full'
                variant='default'
                onClick={() => router.push('/dashboarduser/upgrade')}
              >
                Upgrade Sekarang
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
