'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UserProfile {
  whatsapp: string | null
  universitas: string | null
  paketBerakhir: string | null
}

interface User {
  id: string
  name: string | null
  email: string
  role: string
  grade: string | null
  UserProfile: UserProfile | null
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [canAccess, setCanAccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/me')
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUserData(data)

        // Cek akses berdasarkan paket dan paketBerakhir
        const hasValidGrade = data.grade === 'DIAMOND' || data.grade === 'GOLD' || data.grade === 'SILVER'
        const paketBerakhir = data.UserProfile?.paketBerakhir
          ? new Date(data.UserProfile.paketBerakhir)
          : null
        const isPackageValid = data.grade === 'DIAMOND' || 
          (paketBerakhir && new Date() < paketBerakhir)

        setCanAccess(Boolean(hasValidGrade && isPackageValid))
      } catch (error) {
        console.error('Error:', error)
        toast.error('Gagal memuat data user')
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchUserData()
    }
  }, [session])

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

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Akses Terbatas</h2>
          <p className="text-gray-600 mb-6">
            {!userData?.grade 
              ? "Anda belum memiliki paket. Silakan hubungi admin untuk mendapatkan akses."
              : userData?.grade === 'DIAMOND'
                ? "Terjadi kesalahan dalam memuat data. Silakan refresh halaman."
                : "Masa aktif paket Anda telah berakhir. Silakan hubungi admin untuk memperpanjang."}
          </p>
          <div className="text-sm text-gray-500">
            {userData?.UserProfile?.paketBerakhir && (
              <p>Paket berakhir: {new Date(userData.UserProfile.paketBerakhir).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat datang, {userData?.name}!
        </h1>
        <p className="text-orange-100">
          Selamat belajar dan berlatih untuk persiapan ujian Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#0066FF]">
          <h3 className="text-lg font-semibold text-gray-700">Status Paket</h3>
          <p className="text-3xl font-bold text-[#0066FF] mt-2">
            {userData?.grade === 'DIAMOND' ? 'Diamond' : userData?.grade === 'GOLD' ? 'Gold' : userData?.grade === 'SILVER' ? 'Silver' : '-'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#0066FF]">
          <h3 className="text-lg font-semibold text-gray-700">Status Akses</h3>
          <p className="text-3xl font-bold text-[#0066FF] mt-2">
            {userData?.grade === 'DIAMOND' ? 'Aktif' : userData?.UserProfile?.paketBerakhir ? 'Aktif' : 'Tidak Aktif'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#0066FF]">
          <h3 className="text-lg font-semibold text-gray-700">Masa Berlaku</h3>
          <p className="text-3xl font-bold text-[#0066FF] mt-2">
            {userData?.grade === 'DIAMOND' 
              ? 'Selamanya'
              : userData?.UserProfile?.paketBerakhir
                ? new Date(userData.UserProfile.paketBerakhir).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                : '-'}
          </p>
        </div>
      </div>
    </div>
  )
} 