'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Flag, CheckCircle2, HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { TextWithImage } from '@/components/ui/text-with-image';
import { toast } from '@/components/ui/use-toast';

interface Question {
  id: string;
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
}

export default function TryoutStartPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    answered: 0,
    flagged: 0,
    unanswered: 0
  });
  const router = useRouter();

  // Update stats setiap kali ada perubahan pada answers atau flagged
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const flaggedCount = Object.values(flagged).filter(Boolean).length;

    setStats({
      answered: answeredCount,
      flagged: flaggedCount,
      unanswered: questions.length - answeredCount
    });
  }, [answers, flagged, questions.length]);

  useEffect(() => {
    // Fetch questions from API
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/soal/random');
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 403 && data.alreadyTaken) {
            router.push('/dashboarduser/tryoutfree/already-taken');
            return;
          }
          throw new Error(data.error || 'Gagal memuat soal');
        }

        if (!data.length) {
          throw new Error('Tidak ada soal yang tersedia');
        }

        setQuestions(data);
        setTimeLeft(data.length * 60);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'Terjadi kesalahan saat memuat soal',
          duration: 5000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [router]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    // Hapus flag jika soal sudah dijawab
    if (flagged[questionId]) {
      setFlagged((prev) => {
        const newFlagged = { ...prev };
        delete newFlagged[questionId];
        return newFlagged;
      });
    }
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => {
      const newFlagged = { ...prev };
      if (newFlagged[questionId]) {
        delete newFlagged[questionId];
      } else {
        newFlagged[questionId] = true;
      }
      return newFlagged;
    });
  };

  const getQuestionStatus = (questionId: string) => {
    // Prioritaskan status answered di atas flagged
    if (answers[questionId]) return 'answered';
    if (flagged[questionId]) return 'flagged';
    return 'unanswered';
  };

  const handleFinish = () => {
    setShowFinishDialog(true);
  };

  const confirmFinish = () => {
    // Hitung jumlah jawaban yang benar
    const answeredCount = Object.keys(answers).length;

    // Simpan hasil tryout gratis
    const saveResult = async () => {
      try {
        const resultData = {
          paketSoalId: 'TRYOUT_FREE',
          score: answeredCount,
          timeSpent: questions.length * 60 - timeLeft,
          answers
        };

        const response = await fetch('/api/tryout-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resultData)
        });

        if (!response.ok) {
          throw new Error('Gagal menyimpan hasil tryout');
        }

        // Redirect ke halaman result dengan data yang lengkap
        router.push(
          `/dashboarduser/tryoutfree/result?score=${answeredCount}&total=${questions.length}`
        );
      } catch (error) {
        console.error('Error saving tryout result:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            'Terjadi kesalahan saat menyimpan hasil. Silakan coba lagi.',
          duration: 5000
        });
      }
    };

    saveResult();
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium'>Memuat soal...</div>
          <div className='text-muted-foreground text-sm'>
            Mohon tunggu sebentar
          </div>
        </div>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium text-red-500'>
            {error || 'Tidak ada soal tersedia'}
          </div>
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => router.push('/dashboarduser/tryoutfree')}
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='flex h-screen'>
      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Timer className='h-5 w-5' />
            <span className='font-bold'>{formatTime(timeLeft)}</span>
          </div>
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            className='w-32'
          />
        </div>

        {currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>Soal {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='prose max-w-none'>
                <TextWithImage content={currentQuestion.pertanyaan} />
              </div>
              <div className='space-y-2'>
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <Button
                    key={option}
                    variant={
                      answers[currentQuestion.id] === option
                        ? 'default'
                        : 'outline'
                    }
                    className='w-full justify-start text-left'
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                  >
                    <span className='mr-2 font-medium'>{option}.</span>
                    <TextWithImage
                      content={
                        currentQuestion[`opsi${option}` as keyof Question]
                      }
                      isOption={true}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className='mt-4 flex justify-between'>
          <Button
            variant='outline'
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            Sebelumnya
          </Button>
          <Button
            variant='outline'
            onClick={() => toggleFlag(currentQuestion.id)}
          >
            <Flag
              className={`h-4 w-4 ${flagged[currentQuestion.id] ? 'text-red-500' : ''}`}
            />
            <span className='ml-2'>Ragu-ragu</span>
          </Button>
          <Button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Selanjutnya
          </Button>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className='bg-muted w-64 overflow-y-auto border-l p-4'>
        <div className='space-y-4'>
          <h3 className='font-semibold'>Status Pengerjaan</h3>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Sudah Dijawab:</span>
              <span className='font-medium'>{stats.answered}</span>
            </div>
            <div className='flex justify-between'>
              <span>Belum Dijawab:</span>
              <span className='font-medium'>{stats.unanswered}</span>
            </div>
            <div className='flex justify-between'>
              <span>Ragu-ragu:</span>
              <span className='font-medium'>{stats.flagged}</span>
            </div>
          </div>

          <div className='border-t pt-4'>
            <h3 className='mb-4 font-semibold'>Navigasi Soal</h3>
            <div className='grid grid-cols-5 gap-2'>
              {questions.map((q, index) => {
                const status = getQuestionStatus(q.id);
                return (
                  <Button
                    key={q.id}
                    variant='outline'
                    className={`relative ${
                      index === currentQuestionIndex
                        ? 'ring-primary ring-2'
                        : ''
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                    {status === 'answered' && (
                      <CheckCircle2 className='absolute -top-1 -right-1 h-3 w-3 text-green-500' />
                    )}
                    {status === 'flagged' && (
                      <Flag className='absolute -top-1 -right-1 h-3 w-3 text-red-500' />
                    )}
                    {status === 'unanswered' && (
                      <HelpCircle className='absolute -top-1 -right-1 h-3 w-3 text-gray-500' />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className='border-t pt-4'>
            <Button className='w-full' variant='default' onClick={handleFinish}>
              Selesai
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Konfirmasi Selesai */}
      <Dialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Konfirmasi Selesai</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menyelesaikan tryout?
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Soal Dijawab:</span>
                <span className='font-medium'>{stats.answered}</span>
              </div>
              <div className='flex justify-between'>
                <span>Soal Belum Dijawab:</span>
                <span className='font-medium'>{stats.unanswered}</span>
              </div>
              <div className='flex justify-between'>
                <span>Soal Ragu-ragu:</span>
                <span className='font-medium'>{stats.flagged}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowFinishDialog(false)}
            >
              Kembali
            </Button>
            <Button onClick={confirmFinish}>Ya, Selesaikan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
