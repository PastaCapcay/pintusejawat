'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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
}

export default function ExamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [existingResult, setExistingResult] = useState<ExamResult | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({})
  const [showHint, setShowHint] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Effect untuk fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examResponse, resultsResponse] = await Promise.all([
          fetch(`/api/exams/${params.id}`),
          fetch(`/api/exams/results/user`)
        ])

        if (!examResponse.ok) {
          throw new Error('Failed to fetch exam')
        }

        const examData = await examResponse.json()
        setExam(examData)

        // Hanya ambil hasil jika response OK
        if (resultsResponse.ok) {
          const resultsData = await resultsResponse.json()
          
          // Cek apakah ada sesi review aktif
          const isReviewing = sessionStorage.getItem(`exam_${params.id}_reviewing`)
          if (isReviewing) {
            // Jika sedang dalam mode review, cari hasil terakhir
            const lastResult = resultsData
              .filter((result: ExamResult) => result.examId === params.id)
              .sort((a: ExamResult, b: ExamResult) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )[0]

            if (lastResult) {
              setExistingResult(lastResult)
              router.push(`/dashboard/exams/${params.id}/review/${lastResult.id}`)
              return
            }
          }
        } else {
          console.error('Failed to fetch results:', await resultsResponse.text())
        }

      } catch (error) {
        console.error('Error:', error)
        toast.error('Gagal memuat soal')
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchData()
    }
  }, [session, params.id, router])

  // Effect untuk menyimpan sesi pengerjaan
  useEffect(() => {
    if (exam) {
      sessionStorage.setItem(`exam_${params.id}_session`, 'active')
    }
    return () => {
      if (!showResult) {
        sessionStorage.removeItem(`exam_${params.id}_session`)
      }
    }
  }, [exam, params.id, showResult])

  const handleAnswerSelect = (answer: string) => {
    if (!exam?.questions[currentQuestionIndex]) return
    
    setSelectedAnswers(prev => ({
      ...prev,
      [exam.questions[currentQuestionIndex].id]: answer
    }))
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowHint(false)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1)
      setShowHint(false)
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const calculateScore = () => {
    if (!exam) return 0
    
    const totalQuestions = exam.questions.length
    const correctAnswers = exam.questions.reduce((acc, question) => {
      return selectedAnswers[question.id] === question.answer ? acc + 1 : acc
    }, 0)
    
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  const handleSubmit = async () => {
    if (!exam) return

    const totalAnswered = Object.keys(selectedAnswers).length
    const totalQuestions = exam.questions.length

    if (totalAnswered < totalQuestions) {
      setShowConfirmDialog(true)
      return
    }

    await submitAnswers()
  }

  const submitAnswers = async () => {
    if (!exam) return
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/exams/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          examId: exam.id,
          answers: selectedAnswers
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal mengirim jawaban')
      }
      
      const { resultId } = await response.json()
      
      // Hapus sesi pengerjaan
      sessionStorage.removeItem(`exam_${params.id}_session`)
      
      // Redirect ke halaman hasil
      router.push(`/dashboard/exams/${exam.id}/review/${resultId}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal mengirim jawaban')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat soal...</p>
        </div>
      </div>
    )
  }

  if (existingResult) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Mengalihkan ke halaman pembahasan...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Paket soal tidak ditemukan</h2>
        <button
          onClick={() => router.push('/dashboard/exams')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Kembali ke Daftar Soal
        </button>
      </div>
    )
  }

  const currentQuestion = exam.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0
  const options = [
    { key: 'A', value: currentQuestion.optionA },
    { key: 'B', value: currentQuestion.optionB },
    { key: 'C', value: currentQuestion.optionC },
    { key: 'D', value: currentQuestion.optionD },
    { key: 'E', value: currentQuestion.optionE },
  ]

  if (showResult) {
    // Set mode review saat user melihat hasil
    sessionStorage.setItem(`exam_${params.id}_reviewing`, 'true')

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Hasil Latihan Soal</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-orange-500 mb-2">{score}</div>
            <p className="text-gray-600">Nilai Anda</p>
          </div>
          <div className="mb-8">
            <p className="text-gray-600">
              Anda menjawab benar {exam?.questions.reduce((acc, question) => 
                selectedAnswers[question.id] === question.answer ? acc + 1 : acc, 0
              )} dari {exam?.questions.length} soal
            </p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => {
                // Hapus semua sesi saat kembali ke daftar soal
                sessionStorage.removeItem(`exam_${params.id}_session`)
                sessionStorage.removeItem(`exam_${params.id}_reviewing`)
                router.push('/dashboard/exams')
              }}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Kembali ke Daftar Soal
            </button>
            <button
              onClick={() => setShowResult(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Lihat Pembahasan
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Sidebar dengan minimap */}
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h2>
              <div className="grid grid-cols-4 gap-2">
                {exam.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestionIndex(index)
                      setShowHint(false)
                    }}
                    className={`p-2 text-center rounded-lg ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : selectedAnswers[exam.questions[index].id]
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Konten utama */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Soal {currentQuestionIndex + 1} dari {exam.questions.length}
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Selesai
                </button>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>
                
                <div className="space-y-3">
                  {options.map(({ key, value }) => (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      className={`w-full p-4 text-left rounded-lg border ${
                        selectedAnswers[currentQuestion.id] === key
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="font-semibold mr-2">{key}.</span>
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <button
                  onClick={toggleHint}
                  className="w-full px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50"
                >
                  {showHint ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
                </button>

                {showHint && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Penjelasan:</h3>
                    <p className="text-blue-800">{currentQuestion.explanation}</p>
                    <p className="mt-2 font-semibold text-blue-900">
                      Jawaban benar: {currentQuestion.answer}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstQuestion}
                    className={`px-4 py-2 rounded-lg mr-3 ${
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
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog konfirmasi submit */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Konfirmasi Selesai
            </DialogTitle>
            <DialogDescription className="mt-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">{exam?.title}</h3>
                <p className="text-sm text-blue-700 mt-1">{exam?.description}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600">
                  Anda baru menjawab {Object.keys(selectedAnswers).length} dari {exam?.questions.length} soal.
                </p>
                <p className="text-gray-600">
                  Yakin ingin menyelesaikan?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Kembali
            </Button>
            <Button
              onClick={() => {
                setShowConfirmDialog(false)
                submitAnswers()
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ya, Selesaikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog hasil */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Hasil Latihan Soal
            </DialogTitle>
            <DialogDescription className="mt-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">{exam.title}</h3>
                <p className="text-sm text-blue-700 mt-1">{exam.description}</p>
              </div>
              
              <div className="text-center py-4">
                <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
                <p className="text-gray-600">Nilai Anda</p>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Anda menjawab benar {exam?.questions.reduce((acc, question) => 
                    selectedAnswers[question.id] === question.answer ? acc + 1 : acc, 0
                  )} dari {exam?.questions.length} soal
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem(`exam_${params.id}_session`)
                sessionStorage.removeItem(`exam_${params.id}_reviewing`)
                router.push('/dashboard/exams')
              }}
            >
              Kembali ke Daftar Soal
            </Button>
            <Button
              onClick={() => setShowResult(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Lihat Pembahasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 