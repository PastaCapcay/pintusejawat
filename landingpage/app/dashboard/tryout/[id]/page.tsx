'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Clock, Home, Loader2, Timer } from 'lucide-react'
import { Card } from '@/components/ui/card'

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

export default function TryoutPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [timeSpent, setTimeSpent] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [startTime] = useState<number>(Date.now())

  useEffect(() => {
    if (session) {
      fetchExam()
    }
  }, [session])

  // Hapus useEffect timer yang lama
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Peringatan sebelum meninggalkan halaman
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const fetchExam = async () => {
    try {
      const response = await fetch(`/api/exams/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch exam')
      const data = await response.json()
      setExam(data)
      // Set waktu berdasarkan jumlah soal (1 menit per soal)
      setTimeLeft(data.questions.length * 60)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal memuat data ujian')
    }
  }

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = async () => {
    if (!exam) return

    setIsSubmitting(true)
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)

    try {
      const response = await fetch('/api/exams/submit-tryout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          examId: exam.id,
          answers,
          timeSpent
        })
      })

      if (!response.ok) throw new Error('Gagal mengirim jawaban')
      
      const { resultId } = await response.json()
      router.push(`/dashboard/tryout/${exam.id}/results/${resultId}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal mengirim jawaban. Silakan coba lagi')
      setIsSubmitting(false)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestion(index)
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const pad = (num: number): string => num.toString().padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
  }

  if (status === 'loading' || !exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat soal...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  const currentQuestionData = exam.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Timer dan Progress */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-900">
            <Timer className="w-5 h-5" />
            <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-gray-600">
            Soal {currentQuestion + 1} dari {exam.questions.length}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Minimap Navigasi */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Navigasi Soal</h3>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((question, index) => {
                // Tentukan status soal
                const isActive = currentQuestion === index
                const isAnswered = answers[question.id] !== undefined
                
                let buttonStyle = ''
                if (isActive) {
                  buttonStyle = 'bg-blue-600 text-white ring-2 ring-blue-300'
                } else if (isAnswered) {
                  buttonStyle = 'bg-green-500 text-white hover:bg-green-600'
                } else {
                  buttonStyle = 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                      ${buttonStyle}`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Soal dan Opsi Jawaban */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="prose max-w-none mb-6">
                <p className="text-lg text-gray-900">{currentQuestionData.question}</p>
              </div>

              <div className="space-y-3">
                {['A', 'B', 'C', 'D', 'E'].map((option) => {
                  const optionValue = currentQuestionData[`option${option}` as keyof Question]
                  const isSelected = answers[currentQuestionData.id] === option

                  return (
                    <label
                      key={option}
                      className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestionData.id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswer(currentQuestionData.id, option)}
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <span className="font-medium mr-2">{option}.</span>
                        <span>{optionValue}</span>
                      </div>
                    </label>
                  )
                })}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </Button>
                <Button
                  onClick={() => router.push('/dashboard/tryout')}
                  className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Kembali
                </Button>
                {currentQuestion === exam.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Selesai'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(prev => Math.min(exam.questions.length - 1, prev + 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 