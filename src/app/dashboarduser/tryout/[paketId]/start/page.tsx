'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Flag, CheckCircle2, HelpCircle, Menu } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useRouter, useParams } from 'next/navigation';
import { TextWithImage } from '@/components/ui/text-with-image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

interface Question {
  id: string;
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
  pembahasan: string | null;
  jawabanBenar: string;
}

export default function TryoutStartPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({
    answered: 0,
    flagged: 0,
    unanswered: 0
  });

  const router = useRouter();
  const params = useParams();
  const paketId = params.paketId as string;

  // Update stats setiap kali ada perubahan pada answers atau flagged
  useEffect(() => {
    if (!questions.length) return;

    const answeredCount = Object.keys(answers).length;
    const flaggedCount = Object.values(flagged).filter(Boolean).length;

    setStats({
      answered: answeredCount,
      flagged: flaggedCount,
      unanswered: questions.length - answeredCount
    });
  }, [answers, flagged, questions.length]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/paket-soal/${paketId}/soal`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        if (!data.soal || !Array.isArray(data.soal)) {
          throw new Error('Invalid question data');
        }
        setQuestions(data.soal);
        setTimeLeft(data.durasi * 60); // Konversi menit ke detik
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [paketId]);

  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          confirmFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isStarted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    if (!isStarted) return;
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
    if (!isStarted) return;
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

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleFinish = () => {
    if (isSubmitting || isFinished) return;
    setShowFinishDialog(true);
  };

  const confirmFinish = async () => {
    if (isSubmitting || isFinished) return;

    try {
      setIsSubmitting(true);

      // Hitung jumlah jawaban benar
      const correctAnswers = questions.reduce((acc, question) => {
        return acc + (answers[question.id] === question.jawabanBenar ? 1 : 0);
      }, 0);

      // Data untuk disimpan
      const resultData = {
        paketSoalId: params.paketId,
        score: correctAnswers,
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

      const savedResult = await response.json();
      setIsFinished(true);

      // Redirect ke halaman result dengan ID history
      router.push(
        `/dashboarduser/tryout/${params.paketId}/result?historyId=${savedResult.id}`
      );
    } catch (error) {
      console.error('Error saving tryout result:', error);
      // Tampilkan error ke user dan tetap redirect ke halaman result
      alert(
        'Terjadi kesalahan saat menyimpan hasil, tapi jawaban Anda sudah tercatat.'
      );
      router.push(`/dashboarduser/tryout/${params.paketId}/result`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Loading...
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle>Mulai Tryout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>Klik tombol di bawah untuk memulai tryout.</p>
            <Button onClick={handleStart} className='w-full'>
              Mulai
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='flex h-screen flex-col md:flex-row'>
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
          {/* Menu untuk mobile */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] p-0'>
                <SheetHeader className='border-b p-4'>
                  <SheetTitle>Navigasi Soal</SheetTitle>
                </SheetHeader>
                <div className='h-full overflow-y-auto p-4'>
                  <div className='grid grid-cols-5 gap-2'>
                    {questions.map((_, index) => {
                      const status = getQuestionStatus(questions[index].id);
                      return (
                        <Button
                          key={index}
                          variant={
                            currentQuestionIndex === index
                              ? 'default'
                              : 'outline'
                          }
                          className={`h-10 w-full ${
                            status === 'answered'
                              ? 'bg-green-500 hover:bg-green-600'
                              : status === 'flagged'
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : ''
                          }`}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          {index + 1}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-lg md:text-xl'>
              Soal {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='prose max-w-none text-base md:text-lg'>
              <TextWithImage content={currentQuestion.pertanyaan} />
            </div>
            <div className='space-y-3'>
              {['A', 'B', 'C', 'D', 'E'].map((option) => (
                <Button
                  key={option}
                  variant={
                    answers[currentQuestion.id] === option
                      ? 'default'
                      : 'outline'
                  }
                  className='h-auto w-full justify-start p-4 text-left'
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                >
                  <span className='mr-2'>{option}.</span>
                  <TextWithImage
                    content={currentQuestion[`opsi${option}` as keyof Question]}
                  />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons - Desktop */}
        <div className='mb-4 hidden justify-between gap-2 md:flex'>
          <Button
            variant='outline'
            onClick={() =>
              setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
            }
            disabled={currentQuestionIndex === 0}
          >
            Sebelumnya
          </Button>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => toggleFlag(currentQuestion.id)}
            >
              <Flag
                className={`mr-2 h-4 w-4 ${
                  flagged[currentQuestion.id] ? 'fill-current' : ''
                }`}
              />
              Ragu-ragu
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isSubmitting || isFinished}
            >
              Selesai
            </Button>
          </div>
          <Button
            variant='outline'
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                prev < questions.length - 1 ? prev + 1 : prev
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Selanjutnya
          </Button>
        </div>

        {/* Navigation buttons - Mobile */}
        <div className='mb-4 space-y-2 md:hidden'>
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='outline'
              onClick={() =>
                setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
              }
              disabled={currentQuestionIndex === 0}
              className='w-full'
            >
              Sebelumnya
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                setCurrentQuestionIndex((prev) =>
                  prev < questions.length - 1 ? prev + 1 : prev
                )
              }
              disabled={currentQuestionIndex === questions.length - 1}
              className='w-full'
            >
              Selanjutnya
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='outline'
              onClick={() => toggleFlag(currentQuestion.id)}
              className='w-full'
            >
              <Flag
                className={`mr-2 h-4 w-4 ${
                  flagged[currentQuestion.id] ? 'fill-current' : ''
                }`}
              />
              Ragu-ragu
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isSubmitting || isFinished}
            >
              Selesai
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Sidebar - Hanya tampil di desktop */}
      <div className='hidden w-[300px] overflow-y-auto border-l p-4 md:block'>
        <div className='mb-4'>
          <h3 className='mb-2 font-semibold'>Status</h3>
          <div className='grid grid-cols-3 gap-2 text-sm'>
            <div className='flex items-center gap-1'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>{stats.answered}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Flag className='h-4 w-4 text-yellow-500' />
              <span>{stats.flagged}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HelpCircle className='h-4 w-4 text-gray-500' />
              <span>{stats.unanswered}</span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-5 gap-2'>
          {questions.map((_, index) => {
            const status = getQuestionStatus(questions[index].id);
            return (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? 'default' : 'outline'}
                className={`h-10 w-full ${
                  status === 'answered'
                    ? 'bg-green-500 hover:bg-green-600'
                    : status === 'flagged'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : ''
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            );
          })}
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
              disabled={isSubmitting || isFinished}
            >
              Kembali
            </Button>
            <Button
              onClick={confirmFinish}
              disabled={isSubmitting || isFinished}
            >
              {isSubmitting ? 'Menyimpan...' : 'Ya, Selesaikan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
