'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Home, Clock } from 'lucide-react'

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

export default function TrialPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(true)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)

  // Fungsi untuk fetch soal dan set timer
  const fetchQuestions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/trial')
      if (!response.ok) throw new Error('Failed to fetch questions')
      const data = await response.json()
      setQuestions(data)
      
      // Set waktu setelah soal dimuat (1 menit per soal, maksimal 100 menit)
      const minutes = Math.min(data.length, 100)
      setTimeLeft(minutes * 60) // Konversi ke detik
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal memuat soal')
    } finally {
      setIsLoading(false)
    }
  }

  // Inisialisasi soal dan timer
  useEffect(() => {
    fetchQuestions()
  }, [])

  // Timer countdown hanya berjalan setelah soal dimuat
  useEffect(() => {
    if (isLoading || questions.length === 0 || timeLeft === 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLoading, questions.length])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleFinish = () => {
    // Pastikan ada soal sebelum menghitung skor
    if (questions.length === 0) return

    // Hitung skor
    let correct = 0
    Object.keys(answers).forEach(questionId => {
      const question = questions.find(q => q.id === questionId)
      if (question && answers[questionId] === question.answer) correct++
    })
    
    // Hitung skor berdasarkan total soal
    const finalScore = (correct / questions.length) * 100
    setScore(finalScore || 0) // Gunakan 0 jika NaN
    setShowScore(true)

    // Tampilkan toast sesuai kondisi
    const totalAnswered = Object.keys(answers).length
    if (totalAnswered === 0) {
      toast.error('Waktu habis! Anda belum menjawab soal apapun')
    } else if (totalAnswered < questions.length) {
      toast.warning(`Waktu habis! Anda hanya menjawab ${totalAnswered} dari ${questions.length} soal`)
    } else {
      toast.success('Tryout selesai! Berikut hasil pengerjaan Anda')
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat soal...</p>
        </div>
      </div>
    )
  }

  if (showScore) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Hasil Simulasi Tryout</h1>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score.toFixed(0)}%</div>
            <p className="text-gray-600">
              Jawaban benar: {Math.round((score / 100) * questions.length)} dari {questions.length} soal
            </p>
          </div>
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-4">{question.question}</p>
                    <div className="grid gap-2">
                      {['A', 'B', 'C', 'D', 'E'].map((option) => (
                        <div 
                          key={option}
                          className={`p-3 rounded-lg ${
                            answers[question.id] === option
                              ? option === question.answer 
                                ? 'bg-green-100 border-2 border-green-500'
                                : 'bg-red-100 border-2 border-red-500'
                              : option === question.answer
                                ? 'bg-green-50 border-2 border-green-500'
                                : 'bg-white border-2 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{option}.</span>
                            <span>{question[`option${option}` as keyof Question]}</span>
                            {option === question.answer && (
                              <span className="ml-2 text-green-600 text-sm font-medium">
                                ✓ Jawaban Benar
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                      <p className="font-medium text-blue-900 mb-2">Penjelasan:</p>
                      <p className="text-blue-800">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Timer dan Progress */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-900">
            <Clock className="w-5 h-5" />
            <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-gray-600">
            Soal {currentIndex + 1} dari {questions.length}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Minimap Navigasi */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Navigasi Soal</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                // Tentukan status soal
                const isActive = currentIndex === index
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
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600">Sudah dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded border border-gray-300"></div>
                <span className="text-gray-600">Belum dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded ring-2 ring-blue-300"></div>
                <span className="text-gray-600">Soal aktif</span>
              </div>
            </div>
          </div>

          {/* Konten Soal */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <p className="text-gray-900">{questions[currentIndex].question}</p>
              
              <div className="grid gap-3">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(questions[currentIndex].id, option)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      answers[questions[currentIndex].id] === option
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{option}.</span>
                      <span>{questions[currentIndex][`option${option}` as keyof Question]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Kembali
              </Button>
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                {currentIndex === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 