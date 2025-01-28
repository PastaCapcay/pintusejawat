'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { getEmbedUrl } from '@/lib/utils'

interface Material {
  id: string
  title: string
  description: string
  type: 'VIDEO' | 'DOCUMENT'
  url: string
  createdAt: string
  updatedAt: string
}

export default function MaterialsPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [materials, setMaterials] = useState<Material[]>([])
  const [activeTab, setActiveTab] = useState<'VIDEO' | 'DOCUMENT'>('VIDEO')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials')
      const data = await response.json()
      setMaterials(data)
    } catch (error) {
      console.error('Error fetching materials:', error)
      toast.error('Gagal memuat materi')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat materi...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  const filteredMaterials = materials.filter(material => material.type === activeTab)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Materi Pembelajaran</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('VIDEO')
              setSelectedMaterial(null)
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'VIDEO'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Video
          </button>
          <button
            onClick={() => {
              setActiveTab('DOCUMENT')
              setSelectedMaterial(null)
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'DOCUMENT'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Dokumen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daftar Materi */}
          <div className="space-y-4">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedMaterial?.id === material.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
                }`}
                onClick={() => setSelectedMaterial(material)}
              >
                <div className="flex items-center gap-3">
                  {material.type === 'VIDEO' ? (
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{material.title}</h3>
                    <p className="text-sm text-gray-600">{material.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {filteredMaterials.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  {activeTab === 'VIDEO' ? 'Belum ada video tersedia' : 'Belum ada dokumen tersedia'}
                </p>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
            {selectedMaterial ? (
              selectedMaterial.type === 'VIDEO' ? (
                <div className="w-full aspect-video">
                  <iframe
                    src={getEmbedUrl(selectedMaterial.url, selectedMaterial.type)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <iframe
                  src={getEmbedUrl(selectedMaterial.url, selectedMaterial.type)}
                  className="w-full h-full rounded-lg"
                ></iframe>
              )
            ) : (
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
                <p>Pilih materi untuk melihat preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 