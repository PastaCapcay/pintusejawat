'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  optionE: string
  answer: string
  explanation: string
}

interface Exam {
  id: string
  title: string
  description: string
  questions: Question[]
}

interface TryoutResult {
  id: string
  examId: string
  score: number
  answers: { [key: string]: string }
  timeSpent: number
  createdAt: string
  exam: Exam
}

export default function ReviewPage({ 
  params 
}: { 
  params: { id: string, resultId: string } 
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const [result, setResult] = useState<TryoutResult | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/tryout/results/${params.resultId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch result')
        }
        const data = await response.json()
        setResult(data)
      } catch (error) {
        console.error('Error:', error)
        toast.error('Gagal memuat hasil')
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchResult()
    }
  }, [session, params.resultId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hasil...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Hasil tidak ditemukan</h2>
        <button
          onClick={() => router.push('/dashboard/tryout')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Kembali ke Daftar Tryout
        </button>
      </div>
    )
  }

  const currentQuestion = result.exam.questions[currentQuestionIndex]
  const userAnswer = result.answers[currentQuestion.id]
  const isLastQuestion = currentQuestionIndex === result.exam.questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const options = [
    { key: 'A', value: currentQuestion.optionA },
    { key: 'B', value: currentQuestion.optionB },
    { key: 'C', value: currentQuestion.optionC },
    { key: 'D', value: currentQuestion.optionD },
    { key: 'E', value: currentQuestion.optionE },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{result.exam.title}</h1>
              <p className="text-gray-500 mt-1">{result.exam.description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{result.score}</div>
              <p className="text-gray-500">Nilai Anda</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {result.exam.questions.reduce((acc, question) => 
                  result.answers[question.id] === question.answer ? acc + 1 : acc, 0
                )}
              </div>
              <p className="text-sm text-green-700">Jawaban Benar</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">
                {result.exam.questions.reduce((acc, question) => 
                  result.answers[question.id] !== question.answer ? acc + 1 : acc, 0
                )}
              </div>
              <p className="text-sm text-red-700">Jawaban Salah</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h2>
              <div className="grid grid-cols-4 gap-2">
                {result.exam.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`p-2 text-center rounded-lg ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : result.answers[result.exam.questions[index].id] === result.exam.questions[index].answer
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    Soal {currentQuestionIndex + 1} dari {result.exam.questions.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevious}
                      disabled={isFirstQuestion}
                      className={`p-2 rounded-lg ${
                        isFirstQuestion
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={isLastQuestion}
                      className={`p-2 rounded-lg ${
                        isLastQuestion
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>

                <div className="space-y-3">
                  {options.map(({ key, value }) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border ${
                        result.answers[currentQuestion.id] === key
                          ? key === currentQuestion.answer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : key === currentQuestion.answer
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{key}.</span>
                        <span className={
                          result.answers[currentQuestion.id] === key
                            ? key === currentQuestion.answer
                              ? 'text-green-700'
                              : 'text-red-700'
                            : key === currentQuestion.answer
                            ? 'text-green-700'
                            : 'text-gray-700'
                        }>
                          {value}
                        </span>
                        {result.answers[currentQuestion.id] === key && (
                          <span className="ml-auto">
                            {key === currentQuestion.answer ? (
                              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Pembahasan:</h3>
                <p className="text-blue-800 mb-4">{currentQuestion.explanation}</p>
                <p className="font-semibold text-blue-900">
                  Jawaban benar: {currentQuestion.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/dashboard/tryout')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Tryout
          </button>
        </div>
      </div>
    </div>
  )
} 