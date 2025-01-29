'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
import { Line } from 'react-chartjs-2'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
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

interface TryoutResult {
  id: string
  examId: string
  score: number
  timeSpent: number
  createdAt: string
  exam: Exam
}

export default function TryoutPage() {
  const { data: session } = useSession()
  const [exams, setExams] = useState<Exam[]>([])
  const [results, setResults] = useState<TryoutResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'packages' | 'history'>('packages')
  const [visibleGraphs, setVisibleGraphs] = useState<{ [key: string]: boolean }>({})
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({})
  const [expandedExam, setExpandedExam] = useState<string | null>(null)
  const itemsPerPage = 10
  const [showStartDialog, setShowStartDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsResponse, resultsResponse] = await Promise.all([
          fetch('/api/exams'),
          fetch('/api/tryout/results/user')
        ])

        if (!examsResponse.ok || !resultsResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const [examsData, resultsData] = await Promise.all([
          examsResponse.json(),
          resultsResponse.json()
        ])

        setExams(examsData)
        setResults(resultsData)
        
        const initialPages = examsData.reduce((acc: any, exam: Exam) => {
          acc[exam.id] = 1
          return acc
        }, {})
        setCurrentPage(initialPages)
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
          <div className="w-16 h-16 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  const toggleGraph = (examId: string) => {
    setVisibleGraphs(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }))
  }

  const handlePageChange = (examId: string, page: number) => {
    setCurrentPage(prev => ({
      ...prev,
      [examId]: page
    }))
  }

  const toggleExamExpand = (examId: string) => {
    setExpandedExam(prev => prev === examId ? null : examId)
  }

  const formatTimeSpent = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const handleStartTryout = (exam: Exam) => {
    setSelectedExam(exam)
    setShowStartDialog(true)
  }

  const handleSubmitConfirm = () => {
    setShowConfirmDialog(true)
  }

  const handleSubmit = async () => {
    if (!selectedExam) return
    
    try {
      const response = await fetch('/api/tryout/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          examId: selectedExam.id,
          answers: answers
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal mengirim jawaban')
      }
      
      const { resultId } = await response.json()
      router.push(`/dashboard/tryout/${selectedExam.id}/review/${resultId}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal mengirim jawaban')
    }
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
                  onClick={() => handleStartTryout(exam)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Mulai Tryout
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHistory = () => {
    const examResults = results.reduce((acc, result) => {
      if (!acc[result.examId]) {
        acc[result.examId] = []
      }
      acc[result.examId].push(result)
      return acc
    }, {} as { [key: string]: TryoutResult[] })

    return (
      <div className="space-y-8">
        {Object.entries(examResults).map(([id, examHistory]) => {
          const exam = exams.find(e => e.id === id)
          if (!exam) return null

          const isExpanded = expandedExam === id
          const currentPageNum = currentPage[id] || 1

          const sortedHistory = [...examHistory].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )

          const totalPages = Math.ceil(sortedHistory.length / itemsPerPage)

          const startIndex = (currentPageNum - 1) * itemsPerPage
          const currentPageData = sortedHistory.slice(startIndex, startIndex + itemsPerPage)

          const lastTenResults = [...sortedHistory]
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .slice(-10)

          const chartData = {
            labels: lastTenResults.map(result => 
              new Date(result.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
              })
            ),
            datasets: [
              {
                label: 'Nilai',
                data: lastTenResults.map(result => result.score),
                borderColor: '#0066FF',
                backgroundColor: 'rgba(0, 102, 255, 0.1)',
                pointBackgroundColor: '#0066FF',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0066FF',
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
                  weight: 'bold'
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
                  callback: (value: number) => `${value}%`
                }
              }
            }
          }

          return (
            <div key={id} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {exam.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {exam.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleExamExpand(id)}
                    className="text-[#0066FF] hover:text-[#0052CC]"
                  >
                    {isExpanded ? 'Tutup' : 'Lihat Detail'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-6">
                    <button
                      onClick={() => toggleGraph(id)}
                      className="text-[#0066FF] hover:text-[#0052CC] mb-4"
                    >
                      {visibleGraphs[id] ? 'Sembunyikan Grafik' : 'Lihat Grafik'}
                    </button>

                    {visibleGraphs[id] && lastTenResults.length > 0 && (
                      <div className="mb-6">
                        <div className="max-h-[300px]">
                          <Line
                            data={chartData}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  display: false
                                },
                                title: {
                                  display: true,
                                  text: '10 Hasil Terakhir',
                                  color: '#1F2937',
                                  font: {
                                    size: 14,
                                    weight: 500
                                  }
                                }
                              },
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  max: 100,
                                  ticks: {
                                    stepSize: 20
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {currentPageData.map((result) => (
                        <Link
                          href={`/dashboard/tryout/${id}/results/${result.id}`}
                          key={result.id}
                          className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
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
                              <p className="text-sm text-gray-500 mt-1">
                                Waktu pengerjaan: {formatTimeSpent(result.timeSpent)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-[#0066FF]">
                                {result.score}
                              </p>
                              <p className="text-sm text-gray-500">Nilai</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center space-x-2 mt-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(id, page)}
                            className={`px-3 py-1 rounded ${
                              currentPageNum === page
                                ? 'bg-[#0066FF] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
          <h1 className="text-2xl font-bold mb-2">Tryout</h1>
          <p className="text-blue-100">
            Latih kemampuanmu dengan tryout yang tersedia. Setiap soal memiliki batas waktu 1 menit.
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
              Riwayat
            </button>
          </nav>
        </div>

        {activeTab === 'packages' ? renderPackages() : renderHistory()}
      </div>

      {/* Dialog konfirmasi mulai tryout */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Mulai Tryout
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
                  <li>Pastikan koneksi internet Anda stabil</li>
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
                router.push(`/dashboard/tryout/${selectedExam?.id}`)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Mulai Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog konfirmasi selesai */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Konfirmasi Selesai
            </DialogTitle>
            <DialogDescription className="mt-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">{selectedExam?.title}</h3>
                <p className="text-sm text-blue-700 mt-1">{selectedExam?.description}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600">
                  Anda baru menjawab {Object.keys(answers).length} dari {selectedExam?.questions.length} soal.
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
                handleSubmit()
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ya, Selesaikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 