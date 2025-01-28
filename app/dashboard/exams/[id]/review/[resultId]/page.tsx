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

interface ExamResult {
  id: string
  examId: string
  score: number
  answers: { [key: string]: string }
  createdAt: string
  exam: Exam
}

export default function ExamReviewPage({ 
  params 
}: { 
  params: { id: string, resultId: string } 
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const [result, setResult] = useState<ExamResult | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/exams/results/${params.resultId}`)
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
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat pembahasan...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Hasil tidak ditemukan</h2>
        <button
          onClick={() => router.push('/dashboard/exams')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Kembali ke Daftar Soal
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{result.exam.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Dikerjakan pada: {new Date(result.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">{result.score}</div>
            <p className="text-sm text-gray-500">Nilai Anda</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-gray-800">{currentQuestion.question}</p>
            <span className="text-sm text-gray-500">
              Soal {currentQuestionIndex + 1} dari {result.exam.questions.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {options.map(({ key, value }) => {
              const isUserAnswer = userAnswer === key
              const isCorrectAnswer = key === currentQuestion.answer
              
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg border ${
                    isUserAnswer && isCorrectAnswer
                      ? 'border-green-500 bg-green-50'
                      : isUserAnswer
                      ? 'border-red-500 bg-red-50'
                      : isCorrectAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <span className="font-semibold mr-2">{key}.</span>
                      <span>{value}</span>
                    </div>
                    {isUserAnswer && (
                      <span className={`text-sm font-medium ${
                        isCorrectAnswer ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Jawaban Anda
                      </span>
                    )}
                    {!isUserAnswer && isCorrectAnswer && (
                      <span className="text-sm font-medium text-green-600">
                        Jawaban Benar
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2">Penjelasan:</h3>
            <p className="text-orange-700">{currentQuestion.explanation}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`px-4 py-2 rounded-lg ${
                isFirstQuestion
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sebelumnya
            </button>
            <button
              onClick={handleNext}
              disabled={isLastQuestion}
              className={`px-4 py-2 rounded-lg ${
                isLastQuestion
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Selanjutnya
            </button>
          </div>

          <button
            onClick={() => router.push('/dashboard/exams')}
            className="px-4 py-2 text-orange-500 hover:text-orange-600"
          >
            Kembali ke Daftar Soal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h2>
        <div className="grid grid-cols-8 gap-2">
          {result.exam.questions.map((_, index) => {
            const questionId = result.exam.questions[index].id
            const isCorrect = result.answers[questionId] === result.exam.questions[index].answer
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`p-2 text-center rounded-lg ${
                  index === currentQuestionIndex
                    ? 'bg-orange-500 text-white'
                    : isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
} 