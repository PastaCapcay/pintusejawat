'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
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

export default function LatSoalDetailPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showPembahasan, setShowPembahasan] = useState<Record<string, boolean>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/paket-soal/${params.paketId}/soal`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        if (!data.soal || !Array.isArray(data.soal)) {
          throw new Error('Invalid question data');
        }
        setQuestions(data.soal);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [params.paketId]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const togglePembahasan = (questionId: string) => {
    setShowPembahasan((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle className='text-center'>Memuat Soal...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-center'>Mohon tunggu sebentar...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion?.id];
  const isCorrect =
    isAnswered &&
    answers[currentQuestion?.id] === currentQuestion?.jawabanBenar;

  return (
    <div className='h-screen overflow-y-auto'>
      <div className='p-8'>
        <div className='mx-auto max-w-4xl space-y-8'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' onClick={() => router.back()} size='sm'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Kembali
            </Button>
            <h2 className='text-3xl font-bold tracking-tight'>Latihan Soal</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Soal {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='prose max-w-none'>
                <TextWithImage content={currentQuestion.pertanyaan} />
              </div>

              {['A', 'B', 'C', 'D', 'E'].map((option) => {
                const isSelected = answers[currentQuestion.id] === option;
                const isCorrectAnswer = currentQuestion.jawabanBenar === option;
                const optionContent =
                  currentQuestion[`opsi${option}` as keyof Question];

                return (
                  <Button
                    key={option}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full justify-start text-left font-normal ${
                      isAnswered && isCorrectAnswer
                        ? 'border-green-500 bg-green-100 text-green-900 hover:bg-green-200'
                        : isAnswered && isSelected
                          ? 'border-red-500 bg-red-100 text-red-900 hover:bg-red-200'
                          : 'text-gray-900 hover:bg-gray-100 dark:text-gray-100'
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                  >
                    <span className='mr-2 font-medium'>{option}.</span>
                    <TextWithImage content={optionContent} isOption={true} />
                  </Button>
                );
              })}

              <div className='mt-4'>
                <Button
                  variant='outline'
                  onClick={() => togglePembahasan(currentQuestion.id)}
                  className='mb-2'
                >
                  {showPembahasan[currentQuestion.id] ? (
                    <>
                      <EyeOff className='mr-2 h-4 w-4' />
                      Sembunyikan Pembahasan
                    </>
                  ) : (
                    <>
                      <Eye className='mr-2 h-4 w-4' />
                      Lihat Pembahasan
                    </>
                  )}
                </Button>

                {showPembahasan[currentQuestion.id] &&
                  currentQuestion.pembahasan && (
                    <div className='bg-muted rounded-lg p-4'>
                      <h4 className='mb-2 font-medium'>Pembahasan:</h4>
                      <TextWithImage content={currentQuestion.pembahasan} />
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-between'>
            <Button
              variant='outline'
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
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

          <div className='grid grid-cols-10 gap-2'>
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestionIndex === index ? 'default' : 'outline'}
                className={`relative ${currentQuestionIndex === index ? 'ring-primary ring-2' : ''}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
