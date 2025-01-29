'use client'

import { useState, useEffect } from 'react'
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
}

export default function MaterialsPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [materials, setMaterials] = useState<Material[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'VIDEO',
    url: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchMaterials()
  }, [])

  useEffect(() => {
    const filtered = materials.filter(material => 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMaterials(filtered)
  }, [searchTerm, materials])

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials')
      if (!response.ok) throw new Error('Failed to fetch materials')
      const data = await response.json()
      setMaterials(data)
      setFilteredMaterials(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal memuat data materi')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/materials' + (isEditing ? `/${selectedMaterial?.id}` : ''), {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error(isEditing ? 'Failed to update material' : 'Failed to add material')
      
      toast.success(isEditing ? 'Materi berhasil diperbarui' : 'Materi berhasil ditambahkan')
      setShowAddDialog(false)
      setFormData({
        title: '',
        description: '',
        type: 'VIDEO',
        url: ''
      })
      setIsEditing(false)
      setSelectedMaterial(null)
      fetchMaterials()
    } catch (error) {
      console.error('Error:', error)
      toast.error(isEditing ? 'Gagal memperbarui materi' : 'Gagal menambahkan materi')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (material: Material) => {
    setFormData({
      title: material.title,
      description: material.description,
      type: material.type,
      url: material.url
    })
    setSelectedMaterial(material)
    setIsEditing(true)
    setShowAddDialog(true)
  }

  const handlePreview = (material: Material) => {
    setSelectedMaterial(material)
    setShowPreviewDialog(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus materi ini?')) return

    try {
      const response = await fetch(`/api/materials/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete material')
      
      toast.success('Materi berhasil dihapus')
      fetchMaterials()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Gagal menghapus materi')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Materi</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Cari materi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
          <button
            onClick={() => {
              setIsEditing(false)
              setSelectedMaterial(null)
              setFormData({
                title: '',
                description: '',
                type: 'VIDEO',
                url: ''
              })
              setShowAddDialog(true)
            }}
            className="bg-[#0066FF] text-white px-4 py-2 rounded-lg hover:bg-[#0052CC]"
          >
            Tambah Materi
          </button>
        </div>
      </div>

      {/* Daftar Materi */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.map(material => (
          <div key={material.id} className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{material.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(material)}
                  className="text-[#0066FF] hover:text-[#0052CC] font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{material.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="bg-blue-100 text-[#0066FF] px-3 py-1 rounded-full font-medium">
                {material.type}
              </span>
              <button
                onClick={() => handlePreview(material)}
                className="text-[#0066FF] hover:text-[#0052CC] font-medium flex items-center gap-1"
              >
                Lihat Materi
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Tambah/Edit Materi */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Materi' : 'Tambah Materi Baru'}
              </h2>
              <button
                onClick={() => {
                  setShowAddDialog(false)
                  setIsEditing(false)
                  setSelectedMaterial(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0066FF] focus:outline-none focus:ring-[#0066FF]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0066FF] focus:outline-none focus:ring-[#0066FF]"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Materi
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0066FF] focus:outline-none focus:ring-[#0066FF]"
                  >
                    <option value="VIDEO">Video</option>
                    <option value="DOCUMENT">Dokumen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL {formData.type === 'VIDEO' ? 'Video' : 'Dokumen'}
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#0066FF] focus:outline-none focus:ring-[#0066FF]"
                    placeholder={formData.type === 'VIDEO' ? 'https://youtube.com/...' : 'https://drive.google.com/...'}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddDialog(false)
                      setIsEditing(false)
                      setSelectedMaterial(null)
                    }}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#0066FF] text-white px-4 py-2 rounded-lg hover:bg-[#0052CC] disabled:opacity-50"
                  >
                    {isSaving ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Simpan Materi')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dialog Preview Materi */}
      {showPreviewDialog && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedMaterial.title}</h2>
              <button
                onClick={() => {
                  setShowPreviewDialog(false)
                  setSelectedMaterial(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video mb-4">
              <iframe
                src={getEmbedUrl(selectedMaterial.url, selectedMaterial.type)}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>

            <p className="text-gray-600 mb-4">{selectedMaterial.description}</p>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPreviewDialog(false)
                  setSelectedMaterial(null)
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 