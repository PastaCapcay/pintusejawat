'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Question {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  optionE: string
  answer: string
  explanation: string
}

interface ExamForm {
  title: string
  description: string
  questions: Question[]
}

interface Exam {
  id: string
  title: string
  description: string
  questions: Question[]
  createdAt: string
  updatedAt: string
}

export default function ExamsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [exams, setExams] = useState<Exam[]>([])
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5
  const totalPages = Math.ceil(filteredExams.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedExams = filteredExams.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const [formData, setFormData] = useState<ExamForm>({
    title: '',
    description: '',
    questions: [
      {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        answer: '',
        explanation: ''
      }
    ]
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Fungsi untuk mengambil daftar soal
  const fetchExams = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/exams')
      
      if (response.status === 401) {
        toast.error('Anda tidak memiliki akses ke halaman ini')
        router.push('/login')
        return
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch exams')
      }
      
      const data = await response.json()
      setExams(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal mengambil data soal. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  // Panggil fetchExams saat komponen dimount
  useEffect(() => {
    fetchExams()
  }, [])

  // Fungsi untuk filter dan search
  useEffect(() => {
    let result = [...exams]

    // Filter berdasarkan search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(exam => 
        exam.title.toLowerCase().includes(searchLower) ||
        exam.description.toLowerCase().includes(searchLower) ||
        // Cari di dalam soal
        exam.questions.some(q => 
          q.question.toLowerCase().includes(searchLower) ||
          q.optionA.toLowerCase().includes(searchLower) ||
          q.optionB.toLowerCase().includes(searchLower) ||
          q.optionC.toLowerCase().includes(searchLower) ||
          q.optionD.toLowerCase().includes(searchLower) ||
          q.optionE.toLowerCase().includes(searchLower) ||
          q.explanation.toLowerCase().includes(searchLower)
        )
      )
    }

    setFilteredExams(result)
    setCurrentPage(1) // Reset ke halaman pertama saat filter berubah
  }, [searchTerm, exams])

  // Fungsi untuk navigasi halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          optionE: '',
          answer: '',
          explanation: ''
        }
      ]
    })
  }

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const newQuestions = [...formData.questions]
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value
    }
    setFormData({
      ...formData,
      questions: newQuestions
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    })
  }

  // Fungsi untuk menghapus soal
  const handleDelete = async (examId: string) => {
    try {
      const response = await fetch(`/api/admin/exams/${examId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Gagal menghapus soal')
      }

      toast.success('Soal berhasil dihapus')
      fetchExams() // Refresh daftar soal
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal menghapus soal')
    }
  }

  // Fungsi untuk edit soal
  const handleEdit = (exam: Exam) => {
    setFormData({
      title: exam.title,
      description: exam.description,
      questions: exam.questions
    })
    setIsEditMode(true)
    setSelectedExam(exam)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = isEditMode && selectedExam 
        ? `/api/admin/exams/${selectedExam.id}`
        : '/api/admin/exams'
      
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save exam')
      }

      toast.success(isEditMode ? 'Soal berhasil diupdate' : 'Soal berhasil ditambahkan')
      setFormData({
        title: '',
        description: '',
        questions: [
          {
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            optionE: '',
            answer: '',
            explanation: ''
          }
        ]
      })
      setIsOpen(false)
      setIsEditMode(false)
      setSelectedExam(null)
      fetchExams() // Refresh daftar soal
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal menyimpan soal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Hanya terima file Excel
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('File harus berformat Excel (.xlsx atau .xls)')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/exams/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Gagal mengupload soal')
      }

      const data = await response.json()
      toast.success(`Berhasil mengupload ${data.count} soal`)
      fetchExams() // Refresh daftar soal
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal mengupload soal')
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = '' // Reset input file
      }
    }
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" />
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Bank Soal</h1>
            <div className="flex items-center gap-3">
              {/* Input file tersembunyi */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".xlsx,.xls"
                className="hidden"
              />
              
              {/* Tombol untuk trigger input file */}
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                {isLoading ? 'Mengupload...' : 'Upload Excel'}
              </Button>

              {/* Tombol download template */}
              <Button
                variant="outline"
                onClick={() => window.open('/api/admin/exams/template', '_blank')}
              >
                Download Template
              </Button>

              <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) {
                  setIsEditMode(false)
                  setSelectedExam(null)
                  setFormData({
                    title: '',
                    description: '',
                    questions: [
                      {
                        question: '',
                        optionA: '',
                        optionB: '',
                        optionC: '',
                        optionD: '',
                        optionE: '',
                        answer: '',
                        explanation: ''
                      }
                    ]
                  })
                }
              }}>
                <DialogTrigger asChild>
                  <Button>Tambah Soal Baru</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white [&>button]:text-gray-900 [&>button]:hover:text-[#0066FF]">
                  <DialogHeader>
                    <DialogTitle className="text-[#0066FF]">Tambah Soal Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-[#0066FF]">Nama Ujian</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'title')}
                        required
                        className="bg-white text-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-[#0066FF]">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'description')}
                        required
                        className="bg-white text-gray-900"
                      />
                    </div>

                    {formData.questions.map((question, index) => {
                      return (
                        <div key={index} className="space-y-4 p-4 border rounded-lg bg-white">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-[#0066FF]">Soal {index + 1}</h3>
                            {formData.questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newQuestions = formData.questions.filter((_, i) => i !== index)
                                  setFormData({ ...formData, questions: newQuestions })
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                Hapus Soal
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#0066FF]">Pertanyaan</Label>
                            <Textarea
                              value={question.question}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionChange(index, 'question', e.target.value)}
                              required
                              className="bg-white text-gray-900"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Opsi A</Label>
                              <Input
                                value={question.optionA}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'optionA', e.target.value)}
                                required
                                className="bg-white text-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Opsi B</Label>
                              <Input
                                value={question.optionB}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'optionB', e.target.value)}
                                required
                                className="bg-white text-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Opsi C</Label>
                              <Input
                                value={question.optionC}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'optionC', e.target.value)}
                                required
                                className="bg-white text-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Opsi D</Label>
                              <Input
                                value={question.optionD}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'optionD', e.target.value)}
                                required
                                className="bg-white text-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Opsi E</Label>
                              <Input
                                value={question.optionE}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuestionChange(index, 'optionE', e.target.value)}
                                required
                                className="bg-white text-gray-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[#0066FF]">Jawaban Benar</Label>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900"
                                value={question.answer}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleQuestionChange(index, 'answer', e.target.value)}
                                required
                              >
                                <option value="">Pilih jawaban</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[#0066FF]">Penjelasan</Label>
                            <Textarea
                              value={question.explanation}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleQuestionChange(index, 'explanation', e.target.value)}
                              required
                              className="bg-white text-gray-900"
                            />
                          </div>
                        </div>
                      )
                    })}

                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addQuestion}
                      className="w-full"
                    >
                      + Tambah Soal Lain
                    </Button>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Menyimpan...' : 'Simpan Soal'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-lg border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cari
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari judul, deskripsi, atau isi soal..."
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setSearchTerm('')}
                  className="w-full p-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Menampilkan {filteredExams.length} dari {exams.length} soal
            </div>
          </div>

          {/* Daftar soal */}
          <div className="bg-white p-6 rounded-lg border">
            {filteredExams.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                {exams.length === 0 ? 'Belum ada soal' : 'Tidak ada soal yang sesuai dengan pencarian'}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedExams.map((exam) => (
                  <div 
                    key={exam.id} 
                    className="p-4 border rounded-lg hover:border-[#0066FF] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedExam(exam)
                      setShowDetailDialog(true)
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-[#0066FF] text-lg mb-1">{exam.title}</h3>
                        <p className="text-gray-600 text-sm">{exam.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm bg-blue-50 text-[#0066FF] px-3 py-1 rounded-full">
                          {exam.questions.length} Soal
                        </span>
                        <div 
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleEdit(exam)}
                            className="text-[#0066FF] hover:text-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedExam(exam)
                              setShowDeleteConfirm(true)
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredExams.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Menampilkan {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredExams.length)} dari {filteredExams.length} soal
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === i + 1
                            ? 'bg-[#0066FF] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Konfirmasi Hapus */}
          {showDeleteConfirm && selectedExam && (
            <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
              <DialogContent className="bg-white [&>button]:text-gray-900 [&>button]:hover:text-[#0066FF]">
                <DialogHeader>
                  <DialogTitle className="text-[#0066FF]">Konfirmasi Hapus</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600">
                    Apakah Anda yakin ingin menghapus soal "{selectedExam.title}"?
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setSelectedExam(null)
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete(selectedExam.id)
                      setShowDeleteConfirm(false)
                      setSelectedExam(null)
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Dialog Detail Soal */}
          {showDetailDialog && selectedExam && (
            <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white [&>button]:text-gray-900 [&>button]:hover:text-[#0066FF]">
                <DialogHeader>
                  <DialogTitle className="text-[#0066FF] text-xl font-bold">{selectedExam.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-900 mb-6">{selectedExam.description}</p>
                  <div className="space-y-6">
                    {selectedExam.questions.map((question, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-blue-50 text-[#0066FF] px-3 py-1 rounded-full font-medium">
                            Soal {idx + 1}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mb-4 text-base">{question.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className={`p-3 rounded ${question.answer === 'A' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 text-gray-900'}`}>
                            A. {question.optionA}
                          </div>
                          <div className={`p-3 rounded ${question.answer === 'B' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 text-gray-900'}`}>
                            B. {question.optionB}
                          </div>
                          <div className={`p-3 rounded ${question.answer === 'C' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 text-gray-900'}`}>
                            C. {question.optionC}
                          </div>
                          <div className={`p-3 rounded ${question.answer === 'D' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 text-gray-900'}`}>
                            D. {question.optionD}
                          </div>
                          <div className={`p-3 rounded ${question.answer === 'E' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 text-gray-900'}`}>
                            E. {question.optionE}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                          <p className="text-gray-900">
                            <span className="font-medium text-[#0066FF]">Penjelasan:</span> {question.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </div>
  )
} 