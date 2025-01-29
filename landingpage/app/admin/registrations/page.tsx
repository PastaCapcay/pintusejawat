'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface Registration {
  id: string
  nama: string
  email: string
  whatsapp: string
  universitas: string
  paket: string
  status: 'NEW' | 'FOLLOWED_UP' | 'PAID' | 'COMPLETED'
  createdAt: string
}

export default function RegistrationsPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations')
      if (!response.ok) throw new Error('Failed to fetch registrations')
      const data = await response.json()
      setRegistrations(data.registrations)
    } catch (error) {
      console.error(error)
      toast.error('Gagal memuat data pendaftaran')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) throw new Error('Failed to update status')
      
      toast.success('Status berhasil diperbarui')
      fetchRegistrations()
    } catch (error) {
      console.error(error)
      toast.error('Gagal memperbarui status')
    }
  }

  const handleWhatsApp = (whatsapp: string) => {
    // Format nomor WA dan buka di tab baru
    const formattedNumber = whatsapp.startsWith('0') ? '62' + whatsapp.slice(1) : whatsapp
    window.open(`https://wa.me/${formattedNumber}`, '_blank')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data pendaftaran ini?')) return

    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete registration')
      
      toast.success('Data pendaftaran berhasil dihapus')
      fetchRegistrations()
    } catch (error) {
      console.error(error)
      toast.error('Gagal menghapus data pendaftaran')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Pendaftaran</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-medium text-gray-900">Nama</th>
                <th className="p-4 font-medium text-gray-900">Email</th>
                <th className="p-4 font-medium text-gray-900">WhatsApp</th>
                <th className="p-4 font-medium text-gray-900">Universitas</th>
                <th className="p-4 font-medium text-gray-900">Paket</th>
                <th className="p-4 font-medium text-gray-900">Status</th>
                <th className="p-4 font-medium text-gray-900">Tanggal Daftar</th>
                <th className="p-4 font-medium text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="p-4">{registration.nama}</td>
                  <td className="p-4">{registration.email}</td>
                  <td className="p-4">
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleWhatsApp(registration.whatsapp)}
                    >
                      {registration.whatsapp}
                    </Button>
                  </td>
                  <td className="p-4">{registration.universitas}</td>
                  <td className="p-4">{registration.paket}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      registration.status === 'NEW' ? 'bg-yellow-100 text-yellow-800' :
                      registration.status === 'FOLLOWED_UP' ? 'bg-blue-100 text-blue-800' :
                      registration.status === 'PAID' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {registration.status === 'NEW' ? 'Baru' :
                       registration.status === 'FOLLOWED_UP' ? 'Sudah Follow Up' :
                       registration.status === 'PAID' ? 'Sudah Bayar' :
                       'Selesai'}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(registration.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {registration.status === 'NEW' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(registration.id, 'FOLLOWED_UP')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Sudah Follow Up
                        </Button>
                      )}
                      {registration.status === 'FOLLOWED_UP' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(registration.id, 'PAID')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Sudah Bayar
                        </Button>
                      )}
                      {registration.status === 'PAID' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(registration.id, 'COMPLETED')}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Selesai
                        </Button>
                      )}
                      {registration.status === 'COMPLETED' && (
                        <Button
                          size="sm"
                          onClick={() => handleDelete(registration.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Hapus
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 