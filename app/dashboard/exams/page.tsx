'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
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
  createdAt: string
  exam: Exam
}

export default function ExamsPage() {
  const { data: session } = useSession()
  const [exams, setExams] = useState<Exam[]>([])
  const [results, setResults] = useState<ExamResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'packages' | 'history'>('packages')
  const [visibleGraphs, setVisibleGraphs] = useState<{ [key: string]: boolean }>({})
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({})
  const [expandedExam, setExpandedExam] = useState<string | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsResponse, resultsResponse] = await Promise.all([
          fetch('/api/exams'),
          fetch('/api/exams/results/user')
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
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
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

  const renderPackages = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <Link 
          href={`/dashboard/exams/${exam.id}`} 
          key={exam.id}
          className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6 border-l-4 border-orange-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {exam.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {exam.description}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              {exam.questions.length} Soal
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  const renderHistory = () => {
    const examResults = results.reduce((acc, result) => {
      if (!acc[result.examId]) {
        acc[result.examId] = []
      }
      acc[result.examId].push(result)
      return acc
    }, {} as { [key: string]: ExamResult[] })

    return (
      <div className="space-y-8">
        {Object.entries(examResults).map(([examId, examHistory]) => {
          const exam = exams.find(e => e.id === examId)
          if (!exam) return null

          const isExpanded = expandedExam === examId
          const currentPageNum = currentPage[examId] || 1

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
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                pointBackgroundColor: '#f97316',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#f97316',
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
                min: 0,
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
            },
            interaction: {
              intersect: false,
              mode: 'index'
            },
            animation: {
              duration: 1000
            }
          }

          return (
            <div key={examId} className="bg-white rounded-lg shadow-sm p-6">
              <div 
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleExamExpand(examId)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exam.title}
                    <span className="ml-2 text-sm text-gray-500">
                      ({examHistory.length} kali)
                    </span>
                  </h3>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleGraph(examId)
                    }}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    {visibleGraphs[examId] ? 'Sembunyikan Grafik' : 'Lihat Grafik'}
                  </button>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <>
                  {visibleGraphs[examId] && (
                    <div className="mb-6">
                      <div className="h-80 relative bg-white rounded-lg p-4 border">
                        {lastTenResults.length > 0 ? (
                          <Line data={chartData} options={chartOptions as any} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            Belum ada data hasil latihan soal
                          </div>
                        )}
                      </div>

                      {lastTenResults.length > 0 && (
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <div>
                              Nilai tertinggi: <span className="font-semibold text-green-600">
                                {Math.max(...lastTenResults.map(r => r.score))}
                              </span>
                            </div>
                            <div>
                              Nilai terakhir: <span className="font-semibold text-orange-600">
                                {lastTenResults[lastTenResults.length - 1].score}
                              </span>
                            </div>
                            <div>
                              Nilai terendah: <span className="font-semibold text-red-600">
                                {Math.min(...lastTenResults.map(r => r.score))}
                              </span>
                            </div>
                          </div>
                          {lastTenResults.length > 1 && (
                            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                              <span>Trend:</span>
                              <span className={`font-semibold ${
                                lastTenResults[lastTenResults.length - 1].score > lastTenResults[0].score
                                  ? 'text-green-600'
                                  : lastTenResults[lastTenResults.length - 1].score < lastTenResults[0].score
                                  ? 'text-red-600'
                                  : 'text-orange-600'
                              }`}>
                                {lastTenResults[lastTenResults.length - 1].score > lastTenResults[0].score
                                  ? '↗ Meningkat'
                                  : lastTenResults[lastTenResults.length - 1].score < lastTenResults[0].score
                                  ? '↘ Menurun'
                                  : '→ Stabil'
                              }
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2">No</th>
                          <th className="pb-2">Tanggal</th>
                          <th className="pb-2">Nilai</th>
                          <th className="pb-2">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageData.map((result, index) => (
                          <tr key={result.id} className="border-b">
                            <td className="py-3">{startIndex + index + 1}</td>
                            <td className="py-3">
                              {new Date(result.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="py-3">
                              <span className={`font-semibold ${
                                result.score >= 80 ? 'text-green-600' :
                                result.score >= 60 ? 'text-orange-600' :
                                'text-red-600'
                              }`}>
                                {result.score}
                              </span>
                            </td>
                            <td className="py-3">
                              <Link
                                href={`/dashboard/exams/${examId}/review/${result.id}`}
                                className="text-orange-500 hover:text-orange-600"
                              >
                                Lihat Pembahasan
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {totalPages > 1 && (
                      <div className="mt-4 flex justify-center space-x-2">
                        <button
                          onClick={() => handlePageChange(examId, currentPageNum - 1)}
                          disabled={currentPageNum === 1}
                          className={`px-3 py-1 rounded ${
                            currentPageNum === 1
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          }`}
                        >
                          &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(examId, page)}
                            className={`px-3 py-1 rounded ${
                              currentPageNum === page
                                ? 'bg-orange-500 text-white'
                                : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(examId, currentPageNum + 1)}
                          disabled={currentPageNum === totalPages}
                          className={`px-3 py-1 rounded ${
                            currentPageNum === totalPages
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          }`}
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Latihan Soal</h1>
        <p className="text-orange-100">
          Pilih paket soal yang ingin Anda kerjakan atau lihat history pengerjaan Anda.
        </p>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-2 px-4 ${
            activeTab === 'packages'
              ? 'border-b-2 border-orange-500 text-orange-600 font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Paket Soal
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2 px-4 ${
            activeTab === 'history'
              ? 'border-b-2 border-orange-500 text-orange-600 font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          History
        </button>
      </div>

      {activeTab === 'packages' ? renderPackages() : renderHistory()}
    </div>
  )
} 