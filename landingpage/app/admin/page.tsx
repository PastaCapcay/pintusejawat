'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Stats {
  totalUsers: number
  regularUsers: number
  adminUsers: number
  totalExams: number
  totalQuestions: number
  totalVideos: number
  totalDocuments: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    regularUsers: 0,
    adminUsers: 0,
    totalExams: 0,
    totalQuestions: 0,
    totalVideos: 0,
    totalDocuments: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Selamat datang, Admin!
        </h1>
        <p className="text-gray-600">
          Berikut adalah ringkasan data di sistem Pintu Sejawat
        </p>
      </div>

      {/* Existing Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistik Platform</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* User Stats */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total User</h3>
            <p className="text-3xl font-bold text-[#0066FF]">{stats.totalUsers}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Regular: {stats.regularUsers}</p>
              <p>Admin: {stats.adminUsers}</p>
            </div>
          </div>

          {/* Exam Stats */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paket Soal</h3>
            <p className="text-3xl font-bold text-[#0066FF]">{stats.totalExams}</p>
            <p className="mt-2 text-sm text-gray-600">
              Total Soal: {stats.totalQuestions}
            </p>
          </div>

          {/* Video Stats */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Materi Video</h3>
            <p className="text-3xl font-bold text-[#0066FF]">{stats.totalVideos}</p>
            <p className="mt-2 text-sm text-gray-600">
              Video pembelajaran
            </p>
          </div>

          {/* Document Stats */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Materi Dokumen</h3>
            <p className="text-3xl font-bold text-[#0066FF]">{stats.totalDocuments}</p>
            <p className="mt-2 text-sm text-gray-600">
              Dokumen pembelajaran
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 