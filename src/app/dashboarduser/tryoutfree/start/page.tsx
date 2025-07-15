'use client';

// Animasi shake untuk timer warning
const style = document?.createElement?.('style');
if (style && !document.getElementById('shake-keyframes')) {
  style.id = 'shake-keyframes';
  style.innerHTML = `
    @keyframes shake {
      0% { transform: translateX(0); }
      20% { transform: translateX(-2px); }
      40% { transform: translateX(2px); }
      60% { transform: translateX(-2px); }
      80% { transform: translateX(2px); }
      100% { transform: translateX(0); }
    }
    .animate-shake {
      animation: shake 0.5s linear 1;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
}

declare global {
  interface Window {
    __tryoutFreePushState?: boolean;
  }
}

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Flag, CheckCircle2, HelpCircle, Menu } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
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
import { useToast } from '@/components/ui/use-toast';

interface Question {
  id: string;
  pertanyaan: string;
  opsiA: string;
  opsiB: string;
  opsiC: string;
  opsiD: string;
  opsiE: string;
  jawabanBenar?: string; // Tambahkan opsional untuk kunci jawaban
}

export default function TryoutStartPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const isSubmittedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    answered: 0,
    flagged: 0,
    unanswered: 0
  });
  const router = useRouter();
  const { toast } = useToast();

  // --- Dialog keluar untuk navigasi internal (Link/router.push) ---
  const [showInternalLeaveDialog, setShowInternalLeaveDialog] = useState(false);
  const nextInternalRoute = useRef<string | null>(null);

  // Handler klik navigasi internal (dashboard, dsb)
  const handleInternalNav = (to: string) => {
    if (!isFinished && !isSubmitting) {
      nextInternalRoute.current = to;
      setShowInternalLeaveDialog(true);
    } else {
      router.push(to);
    }
  };

  // Handler konfirmasi keluar internal
  const handleInternalLeaveConfirm = () => {
    setShowInternalLeaveDialog(false);
    if (nextInternalRoute.current) {
      router.push(nextInternalRoute.current);
      nextInternalRoute.current = null;
    }
  };
  const handleInternalLeaveCancel = () => {
    setShowInternalLeaveDialog(false);
    nextInternalRoute.current = null;
  };

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

  // Restore progress dari localStorage saat halaman dimount
  // Flag untuk restore progres, agar fetchQuestions tidak overwrite timeLeft
  const restoredRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem('tryoutFreeProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.answers &&
          parsed.flagged &&
          parsed.timeLeft &&
          parsed.questions &&
          parsed.currentQuestionIndex !== undefined
        ) {
          setAnswers(parsed.answers);
          setFlagged(parsed.flagged);
          setTimeLeft(parsed.timeLeft);
          setCurrentQuestionIndex(parsed.currentQuestionIndex);
          setQuestions(parsed.questions);
          restoredRef.current = true;
        }
      } catch {}
    }
  }, []);

  // Setiap kali progress berubah, simpan ke localStorage
  useEffect(() => {
    if (isFinished || isSubmitting || loading || !questions.length) return;
    const progress = {
      answers,
      flagged,
      timeLeft,
      currentQuestionIndex,
      questions
    };
    localStorage.setItem('tryoutFreeProgress', JSON.stringify(progress));
  }, [
    answers,
    flagged,
    timeLeft,
    currentQuestionIndex,
    questions,
    isFinished,
    isSubmitting,
    loading
  ]);

  // Setelah submit, hapus progres dari localStorage
  useEffect(() => {
    if (isFinished) {
      localStorage.removeItem('tryoutFreeProgress');
    }
  }, [isFinished]);

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

        // Simpan soal dan juga kunci jawaban secara terpisah
        const soalWithKey = data.map((soal: any) => ({ ...soal }));
        setQuestions(soalWithKey);
        // Jangan reset timeLeft jika restore dari localStorage
        if (!restoredRef.current) {
          setTimeLeft(data.length * 60);
        }
        // tidak perlu reset flag submit, cukup andalkan state
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
    if (typeof timeLeft !== 'number' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (typeof prev === 'number' ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // --- Custom Dialog Keluar (Back/Popstate) ---
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const pendingPopState = useRef<PopStateEvent | null>(null);

  // Handler popstate untuk intercept tombol back
  // Ref untuk menandai apakah dialog sedang aktif (untuk cegah pushState saat back programatik)
  const isDialogActiveRef = useRef(false);

  const handlePopState = (e: PopStateEvent) => {
    setTimeout(() => {
      // Jika dialog sudah aktif, jangan lakukan apapun (cegah loop)
      if (isDialogActiveRef.current) return;
      if (!isFinished && !isSubmitting && !showLeaveDialog) {
        setShowLeaveDialog(true);
        isDialogActiveRef.current = true;
        pendingPopState.current = e;
      }
    }, 0);
  };

  // Handler aksi dialog keluar halaman (khusus back browser)
  const handleLeaveConfirm = () => {
    setShowLeaveDialog(false);
    isDialogActiveRef.current = false; // Reset flag agar tidak pushState lagi
    if (pendingPopState.current) {
      // Hapus listener dulu agar tidak trigger popstate lagi
      window.removeEventListener('popstate', handlePopState);
      window.history.back();
      pendingPopState.current = null;
    }
  };

  const handleLeaveCancel = () => {
    setShowLeaveDialog(false);
    isDialogActiveRef.current = false; // Reset flag dialog
    pendingPopState.current = null;
  };

  useEffect(() => {
    if (loading || isFinished || isSubmitting || !questions.length) return;

    const confirmationMessage =
      'Keluar dari halaman akan menyebabkan progres tryout hilang jika belum submit.';

    // Untuk refresh/close tab/navigasi internal: warning default browser
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFinished && !isSubmitting && !isSubmittedRef.current) {
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
      return;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    // pushState hanya sekali di mounting
    if (typeof window !== 'undefined' && !window.__tryoutFreePushState) {
      window.history.pushState(null, '', window.location.href);
      window.__tryoutFreePushState = true;
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loading, isFinished, isSubmitting, questions.length]);

  // Otomatis submit jika waktu habis (hanya jika soal sudah dimuat dan belum submit)
  useEffect(() => {
    if (
      !loading &&
      typeof timeLeft === 'number' &&
      timeLeft <= 0 &&
      !isFinished &&
      !isSubmitting
    ) {
      confirmFinish();
    }
  }, [timeLeft, isFinished, isSubmitting, loading]);

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
    // Jika flagged, apapun status jawaban tetap 'flagged'
    if (flagged[questionId]) return 'flagged';
    if (answers[questionId]) return 'answered';
    return 'unanswered';
  };

  const handleFinish = () => {
    if (isSubmitting || isFinished) return;
    setShowFinishDialog(true);
  };

  const confirmFinish = async () => {
    if (isSubmitting || isFinished) return;

    try {
      setIsSubmitting(true);

      // Hitung jumlah jawaban BENAR
      let correctCount = 0;
      questions.forEach((q) => {
        if (
          answers[q.id] &&
          q.jawabanBenar &&
          answers[q.id] === q.jawabanBenar
        ) {
          correctCount++;
        }
      });

      // Simpan hasil tryout gratis
      const resultData = {
        paketSoalId: 'TRYOUT_FREE',
        score: correctCount,
        timeSpent: questions.length * 60 - (timeLeft ?? 0),
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

      setIsFinished(true);

      // Redirect ke halaman result dengan data yang lengkap
      router.push(
        `/dashboarduser/tryoutfree/result?score=${correctCount}&total=${questions.length}&timeSpent=${questions.length * 60 - (timeLeft ?? 0)}`
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium'>Memuat soal...</div>
          <div className='text-sm text-muted-foreground'>
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
            onClick={() => handleInternalNav('/dashboarduser/tryoutfree')}
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
            <span
              className={`font-bold ${typeof timeLeft === 'number' && timeLeft <= 300 ? 'animate-shake text-red-600' : ''}`}
            >
              {formatTime(timeLeft ?? 0)}
            </span>
          </div>
          <Progress
            value={(Object.keys(answers).length / questions.length) * 100}
            className='w-32'
          />
        </div>

        {/* Edukasi autosave progres */}
        <div className='mb-4 rounded border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-900'>
          Progres jawaban dan waktu Anda akan <b>otomatis tersimpan</b> selama
          masih di perangkat ini.
          <br />
          Pastikan menekan tombol <b>Selesai</b> untuk mengirim hasil ke sistem.
        </div>

        {/* Dialog konfirmasi keluar halaman (back browser) */}
        {showLeaveDialog && (
          <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
            <DialogContent className='max-w-sm'>
              <DialogHeader>
                <DialogTitle>Keluar dari Tryout?</DialogTitle>
                <DialogDescription>
                  Progres tryout Anda akan <b>hilang</b> jika keluar sebelum
                  submit.
                  <br />
                  Apakah Anda yakin ingin keluar dari halaman ini?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline' onClick={handleLeaveCancel}>
                  Tidak, tetap di halaman
                </Button>
                <Button variant='destructive' onClick={handleLeaveConfirm}>
                  Ya, keluar halaman
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialog konfirmasi keluar navigasi internal */}
        {showInternalLeaveDialog && (
          <Dialog
            open={showInternalLeaveDialog}
            onOpenChange={setShowInternalLeaveDialog}
          >
            <DialogContent className='max-w-sm'>
              <DialogHeader>
                <DialogTitle>Keluar dari Tryout?</DialogTitle>
                <DialogDescription>
                  Progres tryout Anda akan <b>hilang</b> jika keluar sebelum
                  submit.
                  <br />
                  Apakah Anda yakin ingin keluar dari halaman ini?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline' onClick={handleInternalLeaveCancel}>
                  Tidak, tetap di halaman
                </Button>
                <Button
                  variant='destructive'
                  onClick={handleInternalLeaveConfirm}
                >
                  Ya, keluar halaman
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

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
                    className='flex min-h-[48px] w-full items-center justify-start gap-2 whitespace-normal break-words rounded-lg border px-3 py-3 text-left text-base sm:text-base md:text-base lg:text-base'
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                    style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    <span className='mr-2 font-bold'>{option}.</span>
                    <span className='min-w-0 flex-1 whitespace-normal break-words text-sm sm:text-base'>
                      <TextWithImage
                        content={
                          (currentQuestion[`opsi${option}` as keyof Question] ??
                            null) as string | null
                        }
                        isOption={true}
                      />
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigasi bawah soal - responsif */}
        {/* Mobile: pattern sama tryout berbayar, urutan tombol: Sebelumnya | Selanjutnya (atas), Ragu-ragu | Selesai (bawah), dan tombol navigasi soal */}
        <div className='mt-4 md:hidden'>
          {/* Toggle navigasi soal (Sheet) di dalam area soal, tidak overlap */}
          <div className='mb-2'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' className='w-full'>
                  Daftar Soal
                </Button>
              </SheetTrigger>
              <SheetContent
                side='bottom'
                className='max-h-[60vh] overflow-y-auto rounded-t-xl p-0'
              >
                <SheetHeader className='border-b p-4'>
                  <SheetTitle>Navigasi Soal</SheetTitle>
                </SheetHeader>
                <SheetDescription className='px-4 pb-2'>
                  Pilih nomor soal untuk navigasi cepat.
                </SheetDescription>
                <div className='h-full overflow-y-auto p-4'>
                  {/* Status pengerjaan */}
                  <div className='mb-4 space-y-2 text-sm'>
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
                  <div className='grid grid-cols-5 gap-2'>
                    {questions.map((q, index) => {
                      const status = getQuestionStatus(q.id);
                      return (
                        <Button
                          key={q.id}
                          variant='outline'
                          className={`relative ${index === currentQuestionIndex ? 'ring-2 ring-primary' : ''}`}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          {index + 1}
                          {status === 'answered' && (
                            <CheckCircle2 className='absolute -right-1 -top-1 h-3 w-3 text-green-500' />
                          )}
                          {status === 'flagged' && (
                            <Flag className='absolute -right-1 -top-1 h-3 w-3 text-red-500' />
                          )}
                          {status === 'unanswered' && (
                            <HelpCircle className='absolute -right-1 -top-1 h-3 w-3 text-gray-500' />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className='mb-2 grid grid-cols-2 gap-2'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
            >
              Sebelumnya
            </Button>
            <Button
              className='w-full'
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
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => toggleFlag(currentQuestion.id)}
            >
              <Flag
                className={`h-4 w-4 ${flagged[currentQuestion.id] ? 'text-red-500' : ''}`}
              />
              <span className='ml-2'>Ragu-ragu</span>
            </Button>
            <Button
              className='w-full'
              variant='default'
              onClick={handleFinish}
              disabled={isSubmitting || isFinished}
            >
              Selesai
            </Button>
          </div>
        </div>
        {/* Desktop: tetap seperti sebelumnya, tidak ada toggle soal Sheet di luar sidebar */}
        <div className='mt-4 hidden flex-row gap-2 md:flex md:justify-between'>
          <Button
            variant='outline'
            className='w-full md:w-auto'
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            Sebelumnya
          </Button>
          <Button
            variant='outline'
            className='w-full md:w-auto'
            onClick={() => toggleFlag(currentQuestion.id)}
          >
            <Flag
              className={`h-4 w-4 ${flagged[currentQuestion.id] ? 'text-red-500' : ''}`}
            />
            <span className='ml-2'>Ragu-ragu</span>
          </Button>
          <Button
            className='w-full md:w-auto'
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Selanjutnya
          </Button>
          <Button
            className='w-full md:w-auto'
            variant='default'
            onClick={handleFinish}
            disabled={isSubmitting || isFinished}
          >
            Selesai
          </Button>
        </div>
      </div>

      {/* Navigation Sidebar - Desktop Only */}
      <div className='hidden w-64 overflow-y-auto border-l bg-muted p-4 md:block'>
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
                        ? 'ring-2 ring-primary'
                        : ''
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                    {status === 'answered' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <CheckCircle2 className='absolute -right-1 -top-1 h-3 w-3 text-green-500' />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Sudah dijawab</TooltipContent>
                      </Tooltip>
                    )}
                    {status === 'flagged' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <Flag className='absolute -right-1 -top-1 h-3 w-3 text-red-500' />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Ragu-ragu</TooltipContent>
                      </Tooltip>
                    )}
                    {status === 'unanswered' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <HelpCircle className='absolute -right-1 -top-1 h-3 w-3 text-gray-500' />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Belum dijawab</TooltipContent>
                      </Tooltip>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog konfirmasi keluar navigasi internal */}
      <Dialog
        open={showInternalLeaveDialog}
        onOpenChange={setShowInternalLeaveDialog}
      >
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>Keluar dari Tryout?</DialogTitle>
            <DialogDescription>
              Progres tryout Anda akan <b>hilang</b> jika keluar sebelum submit.
              <br />
              Apakah Anda yakin ingin keluar dari halaman ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={handleInternalLeaveCancel}>
              Tidak, tetap di halaman
            </Button>
            <Button variant='destructive' onClick={handleInternalLeaveConfirm}>
              Ya, keluar halaman
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
