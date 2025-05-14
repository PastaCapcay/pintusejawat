'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TextWithImage } from '@/components/ui/text-with-image';

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

interface ResultData {
  answers: Record<string, string>;
  questions: Array<{ id: string; jawabanBenar: string }>;
  timeSpent: number;
}

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
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tryoutResult, setTryoutResult] = useState<{
    score: number;
    timeSpent: number;
    answers: Record<string, string>;
  } | null>(null);

  const historyId = searchParams.get('historyId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tryout history
        const historyResponse = await fetch(`/api/tryout-history/${historyId}`);
        if (!historyResponse.ok) {
          throw new Error('Failed to fetch tryout history');
        }
        const historyData = await historyResponse.json();

        // Fetch questions
        const questionsResponse = await fetch(
          `/api/paket-soal/${params.paketId}/soal`
        );
        if (!questionsResponse.ok) {
          throw new Error('Failed to fetch questions');
        }
        const questionsData = await questionsResponse.json();

        // Calculate score
        const score = calculateScore(
          historyData.score,
          questionsData.soal.length
        );
        setTryoutResult({
          ...historyData,
          score: score // Override score with calculated percentage
        });
        setQuestions(questionsData.soal);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (historyId) {
      fetchData();
    }
  }, [historyId, params.paketId]);

  // Pisahkan useEffect untuk save result
  useEffect(() => {
    const saveResult = async () => {
      console.log('Attempting to save result with data:', {
        hasData: !!tryoutResult,
        score: tryoutResult?.score,
        isLoading: loading,
        paketId: params.paketId
      });

      if (tryoutResult && tryoutResult.score !== undefined && !loading) {
        try {
          const savedKey = `tryout_saved_${params.paketId}`;
          const isSaved = sessionStorage.getItem(savedKey);

          console.log('Checking if already saved:', { savedKey, isSaved });

          if (!isSaved) {
            console.log('Sending POST request with data:', {
              paketSoalId: params.paketId,
              score: tryoutResult.score,
              timeSpent: tryoutResult.timeSpent,
              answersCount: Object.keys(tryoutResult.answers).length
            });

            const response = await fetch('/api/tryout-history', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                paketSoalId: params.paketId,
                score: tryoutResult.score,
                timeSpent: tryoutResult.timeSpent,
                answers: tryoutResult.answers
              })
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error('Failed to save tryout result:', {
                status: response.status,
                error: errorData
              });
              throw new Error('Failed to save tryout result');
            }

            console.log('Successfully saved tryout result');
            sessionStorage.setItem(savedKey, 'true');
          }
        } catch (error) {
          console.error('Error saving tryout result:', error);
        }
      }
    };

    saveResult();
  }, [tryoutResult, params.paketId, loading]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours} jam ` : ''}${minutes > 0 ? `${minutes} menit ` : ''}${secs} detik`;
  };

  if (loading || !tryoutResult) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>
              {loading ? 'Memuat Hasil...' : 'Data Tidak Valid'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4 text-center'>
              {loading
                ? 'Mohon tunggu sebentar...'
                : 'Maaf, data hasil tryout tidak valid.'}
            </p>
            {!loading && (
              <Button
                variant='default'
                className='w-full'
                onClick={() => router.push('/dashboarduser')}
              >
                Kembali ke Dashboard
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect =
    tryoutResult.answers[currentQuestion?.id] === currentQuestion?.jawabanBenar;
  const grade = getGrade(tryoutResult.score);

  return (
    <div className='h-screen overflow-y-auto'>
      <div className='p-8'>
        <div className='mx-auto max-w-4xl space-y-8 pb-8'>
          <Card className='text-center'>
            <CardHeader>
              <CardTitle className='flex items-center justify-center gap-2'>
                <Trophy className='h-8 w-8 text-yellow-500' />
                Hasil Tryout
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='py-8'>
                <div className='mb-2 text-6xl font-bold'>
                  {tryoutResult?.score}
                </div>
                <div className={`text-xl font-medium ${grade.color}`}>
                  {grade.text}
                </div>
                <div className='text-muted-foreground mt-2 text-sm'>
                  Waktu pengerjaan: {formatTime(tryoutResult?.timeSpent || 0)}
                </div>
              </div>

              {/* Navigasi Nomor Soal */}
              <div className='border-t pt-4'>
                <h3 className='mb-4 font-semibold'>Navigasi Soal</h3>
                <div className='grid grid-cols-10 gap-2'>
                  {questions.map((question, index) => {
                    const isAnswerCorrect =
                      tryoutResult.answers[question.id] ===
                      question.jawabanBenar;
                    return (
                      <Button
                        key={question.id}
                        variant={
                          currentQuestionIndex === index ? 'default' : 'outline'
                        }
                        className={`relative ${currentQuestionIndex === index ? 'ring-primary ring-2' : ''}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                        {tryoutResult.answers[question.id] ? (
                          isAnswerCorrect ? (
                            <CheckCircle className='absolute -top-1 -right-1 h-3 w-3 text-green-500' />
                          ) : (
                            <XCircle className='absolute -top-1 -right-1 h-3 w-3 text-red-500' />
                          )
                        ) : (
                          <XCircle className='absolute -top-1 -right-1 h-3 w-3 text-gray-500' />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Pembahasan Soal */}
              {currentQuestion && (
                <div className='border-t pt-4'>
                  <div className='space-y-4 text-left'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold'>
                        Pembahasan Soal {currentQuestionIndex + 1}
                      </h3>
                      <div className='flex items-center gap-2'>
                        {isCorrect ? (
                          <>
                            <CheckCircle className='h-5 w-5 text-green-500' />
                            <span className='text-green-500'>Benar</span>
                          </>
                        ) : (
                          <>
                            <XCircle className='h-5 w-5 text-red-500' />
                            <span className='text-red-500'>Salah</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className='space-y-4 rounded-lg border p-4'>
                      <div className='font-medium'>
                        <TextWithImage content={currentQuestion.pertanyaan} />
                      </div>

                      <div className='space-y-2'>
                        {['A', 'B', 'C', 'D', 'E'].map((option) => {
                          const isUserAnswer =
                            tryoutResult.answers[currentQuestion.id] === option;
                          const isCorrectAnswer =
                            currentQuestion.jawabanBenar === option;

                          return (
                            <div
                              key={option}
                              className={`rounded-lg border p-3 hover:border-gray-400 ${
                                isUserAnswer && isCorrectAnswer
                                  ? 'border-green-600 bg-green-50 text-green-800'
                                  : isUserAnswer
                                    ? 'border-red-600 bg-red-50 text-red-800'
                                    : isCorrectAnswer
                                      ? 'border-green-600 bg-green-50 text-green-800'
                                      : 'border-gray-200 bg-gray-50 text-gray-800'
                              }`}
                            >
                              <div className='flex items-center gap-2'>
                                {isUserAnswer && isCorrectAnswer && (
                                  <CheckCircle className='h-4 w-4 flex-shrink-0 text-green-700' />
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <XCircle className='h-4 w-4 flex-shrink-0 text-red-700' />
                                )}
                                {!isUserAnswer && isCorrectAnswer && (
                                  <CheckCircle className='h-4 w-4 flex-shrink-0 text-green-700' />
                                )}
                                <span className='text-sm'>
                                  {option}.{' '}
                                  <TextWithImage
                                    content={
                                      currentQuestion[
                                        `opsi${option}` as keyof Question
                                      ]
                                    }
                                    isOption={true}
                                  />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {currentQuestion.pembahasan && (
                        <div className='bg-muted mt-4 rounded-lg p-4'>
                          <h4 className='mb-2 font-medium'>Pembahasan:</h4>
                          <TextWithImage content={currentQuestion.pembahasan} />
                        </div>
                      )}
                    </div>

                    <div className='flex justify-between pt-4'>
                      <Button
                        variant='outline'
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.max(0, prev - 1)
                          )
                        }
                        disabled={currentQuestionIndex === 0}
                      >
                        Soal Sebelumnya
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(questions.length - 1, prev + 1)
                          )
                        }
                        disabled={currentQuestionIndex === questions.length - 1}
                      >
                        Soal Selanjutnya
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className='flex justify-center border-t pt-4'>
                <Button
                  variant='outline'
                  onClick={() => router.push('/dashboarduser')}
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Kembali ke Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
