'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

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

export default function TryoutResultPage({ 
  params 
}: { 
  params: { resultId: string } 
}) {
  const { data: session, status } = useSession()
  const [result, setResult] = useState<TryoutResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/tryout/results/${params.resultId}`)
        if (!response.ok) throw new Error('Failed to fetch result')
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat hasil...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Hasil tidak ditemukan</p>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{result.exam.title}</h1>
          <p className="text-gray-600 mb-6">{result.exam.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Skor Anda</p>
              <p className="text-3xl font-bold text-blue-900">{result.score.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Waktu Pengerjaan</p>
              <p className="text-3xl font-bold text-blue-900">{formatTime(result.timeSpent)}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Jumlah Soal</p>
              <p className="text-3xl font-bold text-blue-900">{result.exam.questions.length}</p>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {result.exam.questions.map((question, index) => {
            const userAnswer = result.answers[question.id]
            const isCorrect = userAnswer === question.answer
            
            return (
              <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-lg font-semibold text-gray-600">Soal {index + 1}</span>
                      {isCorrect ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Benar
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                          Salah
                        </span>
                      )}
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-900 mb-4">{question.question}</p>
                      
                      <div className="space-y-3">
                        {['A', 'B', 'C', 'D', 'E'].map((option) => {
                          const optionValue = question[`option${option}` as keyof Question]
                          const isUserAnswer = userAnswer === option
                          const isCorrectAnswer = question.answer === option
                          
                          let optionClass = "p-3 rounded-lg border-2 "
                          if (isUserAnswer && isCorrectAnswer) {
                            optionClass += "border-green-500 bg-green-50"
                          } else if (isUserAnswer && !isCorrectAnswer) {
                            optionClass += "border-red-500 bg-red-50"
                          } else if (isCorrectAnswer) {
                            optionClass += "border-green-500 bg-green-50"
                          } else {
                            optionClass += "border-gray-200"
                          }
                          
                          return (
                            <div key={option} className={optionClass}>
                              <div className="flex items-start">
                                <span className="font-medium mr-2">{option}.</span>
                                <span>{optionValue}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900 mb-2">Pembahasan:</p>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 