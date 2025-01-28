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

        const [examData, resultsData] = await Promise.all([
          examResponse.json(),
          resultsResponse.json()
        ])

        setExam(examData)
        
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
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
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

  const handleFinish = async () => {
    // Konfirmasi sebelum menyelesaikan
    const totalAnswered = Object.keys(selectedAnswers).length
    const totalQuestions = exam?.questions.length || 0
    
    if (totalAnswered < totalQuestions) {
      const confirmed = window.confirm(
        `Anda baru menjawab ${totalAnswered} dari ${totalQuestions} soal. Yakin ingin menyelesaikan?`
      )
      if (!confirmed) return
    }

    const calculatedScore = calculateScore()
    setScore(calculatedScore)
    
    try {
      const response = await fetch('/api/exams/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: params.id,
          score: calculatedScore,
          answers: selectedAnswers
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save results')
      }

      setShowResult(true)
      toast.success('Hasil latihan soal berhasil disimpan')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal menyimpan hasil')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat soal...</p>
        </div>
      </div>
    )
  }

  if (existingResult) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Soal {currentQuestionIndex + 1} dari {exam.questions.length}
            </span>
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Selesai
            </button>
          </div>
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
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
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
            className="w-full px-4 py-2 text-orange-500 hover:text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50"
          >
            {showHint ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
          </button>

          {showHint && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Penjelasan:</h3>
              <p className="text-orange-700">{currentQuestion.explanation}</p>
              <p className="mt-2 font-semibold text-orange-800">
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
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigasi Soal</h2>
        <div className="grid grid-cols-8 gap-2">
          {exam.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index)
                setShowHint(false)
              }}
              className={`p-2 text-center rounded-lg ${
                index === currentQuestionIndex
                  ? 'bg-orange-500 text-white'
                  : selectedAnswers[exam.questions[index].id]
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 