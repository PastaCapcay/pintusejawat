'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Line } from 'react-chartjs-2'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useRouter } from 'next/navigation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

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
  createdAt: string
}

interface ExamResult {
  id: string
  examId: string
  score: number
  answers: { [key: string]: string }
  createdAt: string
  exam: {
    id: string
    title: string
    description: string
  }
}

export default function ExamsPage() {
  const { data: session } = useSession()
  const [exams, setExams] = useState<Exam[]>([])
  const [results, setResults] = useState<ExamResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'packages' | 'history'>('packages')
  const [visibleGraphs, setVisibleGraphs] = useState<{ [key: string]: boolean }>({})
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [showStartDialog, setShowStartDialog] = useState(false)
  const router = useRouter()

  const toggleGraph = (examId: string) => {
    setVisibleGraphs(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsResponse, resultsResponse] = await Promise.all([
          fetch('/api/exams'),
          fetch('/api/exams/results/user')
        ])

        if (!examsResponse.ok) {
          throw new Error('Failed to fetch exams')
        }

        const examsData = await examsResponse.json()
        setExams(examsData)

        if (resultsResponse.ok) {
          const resultsData = await resultsResponse.json()
          setResults(resultsData)
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('Gagal memuat data')
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchData()
    }
  }, [session])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  const renderPackages = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <div 
            key={exam.id}
            className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {exam.title}
                </h3>
                <p className="text-blue-800 mb-4">
                  {exam.description}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-sm text-blue-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    {exam.questions.length} Soal
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {exam.questions.length} Menit
                  </div>
                </div>
              </div>
              <div className="md:w-48 flex items-center">
                <Button
                  onClick={() => {
                    setSelectedExam(exam)
                    setShowStartDialog(true)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Mulai Latihan
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Mulai Latihan Soal
            </DialogTitle>
            <DialogDescription className="mt-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">{selectedExam?.title}</h3>
                <p className="text-sm text-blue-700 mt-1">{selectedExam?.description}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600">Informasi Penting:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Jumlah soal: {selectedExam?.questions.length} soal</li>
                  <li>Hasil akan otomatis tersimpan setelah selesai mengerjakan</li>
                  <li>Anda dapat melihat pembahasan setelah selesai mengerjakan</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowStartDialog(false)}
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                setShowStartDialog(false)
                router.push(`/dashboard/exams/${selectedExam?.id}`)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Mulai Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderHistory = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat riwayat...</p>
          </div>
        </div>
      )
    }

    if (results.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-center">Belum ada riwayat latihan soal</p>
        </div>
      )
    }

    // Kelompokkan hasil berdasarkan examId
    const examResults: { [key: string]: ExamResult[] } = {}
    results.forEach(result => {
      if (!examResults[result.examId]) {
        examResults[result.examId] = []
      }
      examResults[result.examId].push(result)
    })

    return (
      <div className="space-y-6">
        {Object.entries(examResults).map(([examId, results]) => {
          const exam = results[0].exam
          const averageScore = Math.round(
            results.reduce((sum, r) => sum + r.score, 0) / results.length
          )

          // Urutkan hasil dari yang terlama ke terbaru untuk grafik
          const sortedResults = [...results].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )

          // Ambil 10 hasil terakhir untuk grafik
          const lastResults = sortedResults.slice(-10)

          const chartData = {
            labels: lastResults.map(result => 
              new Date(result.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
              })
            ),
            datasets: [
              {
                label: 'Nilai',
                data: lastResults.map(result => result.score),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2563eb',
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4,
                fill: true,
              }
            ]
          }

          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: '#1f2937',
                titleFont: {
                  size: 12,
                  weight: 'bold' as const
                },
                bodyFont: {
                  size: 12
                },
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: (context: any) => `Nilai: ${context.parsed.y}`,
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  font: {
                    size: 11
                  }
                }
              },
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  font: {
                    size: 11
                  },
                  callback: function(value: number | string) {
                    return value.toString()
                  }
                }
              }
            }
          }

          return (
            <div key={examId} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{exam.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{averageScore}</div>
                  <p className="text-sm text-gray-500">Rata-rata Nilai</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.max(...results.map(r => r.score))}
                  </div>
                  <p className="text-sm text-gray-500">Nilai Tertinggi</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {Math.min(...results.map(r => r.score))}
                  </div>
                  <p className="text-sm text-gray-500">Nilai Terendah</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  {lastResults.length >= 2 && (
                    <>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        <span className={
                          lastResults[lastResults.length - 1].score > lastResults[lastResults.length - 2].score
                            ? 'text-green-600'
                            : lastResults[lastResults.length - 1].score < lastResults[lastResults.length - 2].score
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }>
                          {lastResults[lastResults.length - 1].score > lastResults[lastResults.length - 2].score
                            ? '↗'
                            : lastResults[lastResults.length - 1].score < lastResults[lastResults.length - 2].score
                            ? '↘'
                            : '→'
                          }
                          {Math.abs(lastResults[lastResults.length - 1].score - lastResults[lastResults.length - 2].score)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Perubahan Terakhir</p>
                    </>
                  )}
                  {lastResults.length < 2 && (
                    <>
                      <div className="text-2xl font-bold text-gray-600">-</div>
                      <p className="text-sm text-gray-500">Belum Ada Tren</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => toggleGraph(examId)}
                className="mb-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {visibleGraphs[examId] ? 'Sembunyikan Grafik' : 'Lihat Grafik'}
              </button>

              {visibleGraphs[examId] && lastResults.length > 0 && (
                <div className="mb-6">
                  <div className="h-[300px]">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {results.map(result => (
                  <Link
                    key={result.id}
                    href={`/dashboard/exams/${examId}/review/${result.id}`}
                    className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">
                          {new Date(result.createdAt).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {result.score}
                        </p>
                        <p className="text-sm text-gray-500">Nilai</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="px-4">
        <div className="bg-blue-600 text-white rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Latihan Soal</h1>
          <p className="text-blue-100">
            Pilih paket soal yang ingin Anda kerjakan atau lihat history pengerjaan Anda.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-tl-xl transition-all
                ${activeTab === 'packages'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
            >
              Paket Soal
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-6 text-center font-medium text-sm rounded-tr-xl transition-all
                ${activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
            >
              History
            </button>
          </nav>
        </div>

        {activeTab === 'packages' ? renderPackages() : renderHistory()}
      </div>
    </div>
  )
} 