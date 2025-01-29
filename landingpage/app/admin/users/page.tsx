'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Grade = 'DIAMOND' | 'GOLD' | 'SILVER'
type Role = 'USER' | 'ADMIN'

interface UserProfile {
  whatsapp?: string
  universitas?: string
  paketBerakhir?: Date
}

interface User {
  id: string
  name: string
  email: string
  role: Role
  grade?: Grade
  createdAt: Date
  UserProfile?: UserProfile
}

const initialUserState = {
  id: '',
  name: '',
  email: '',
  password: '',
  role: 'USER' as Role,
  grade: '' as Grade | '',
  whatsapp: '',
  universitas: '',
  paketBerakhir: null as Date | null
}

// Jumlah item per halaman
const ITEMS_PER_PAGE = 10

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState(initialUserState)

  // Search dan Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [gradeFilter, setGradeFilter] = useState('ALL')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Fungsi untuk filter dan search
  const filterUsers = () => {
    let result = [...users]

    // Filter berdasarkan search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.UserProfile?.whatsapp?.toLowerCase().includes(searchLower) ||
        user.UserProfile?.universitas?.toLowerCase().includes(searchLower)
      )
    }

    // Filter berdasarkan role
    if (roleFilter !== 'ALL') {
      result = result.filter(user => user.role === roleFilter)
    }

    // Filter berdasarkan grade
    if (gradeFilter !== 'ALL') {
      result = result.filter(user => user.grade === gradeFilter)
    }

    setFilteredUsers(result)
    setCurrentPage(1) // Reset ke halaman pertama saat filter berubah
  }

  // Update filtered users ketika ada perubahan di search atau filter
  useEffect(() => {
    filterUsers()
  }, [searchTerm, roleFilter, gradeFilter, users])

  // Reset form saat modal dibuka/ditutup
  const handleModalToggle = (show: boolean, user?: User) => {
    setShowModal(show)
    if (show && user) {
      setIsEditMode(true)
      setSelectedUser({
        ...user,
        password: '',
        grade: user.grade || '',
        whatsapp: user.UserProfile?.whatsapp || '',
        universitas: user.UserProfile?.universitas || '',
        paketBerakhir: user.UserProfile?.paketBerakhir || null
      })
    } else {
      setIsEditMode(false)
      setSelectedUser(initialUserState)
    }
  }

  // Konfirmasi hapus user
  const handleDeleteConfirm = (user: User) => {
    setUserToDelete(user)
    setShowDeleteConfirm(true)
  }

  // Hapus user
  const handleDelete = async () => {
    if (!userToDelete) return

    try {
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal menghapus user')
      }

      // Fetch ulang data
      const updatedResponse = await fetch('/api/users')
      const updatedData = await updatedResponse.json()
      setUsers(updatedData)

      toast.success('User berhasil dihapus')
      setShowDeleteConfirm(false)
      setUserToDelete(null)
    } catch (error: any) {
      toast.error(error.message)
      console.error(error)
    }
  }

  // Fetch data user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (!response.ok) {
          throw new Error('Gagal mengambil data user')
        }
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (error) {
        console.error(error)
        toast.error('Gagal mengambil data user')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Fungsi untuk menambah/edit user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = isEditMode ? `/api/users/${selectedUser.id}` : '/api/users'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedUser.name,
          email: selectedUser.email,
          password: selectedUser.password,
          role: selectedUser.role,
          grade: selectedUser.grade,
          whatsapp: selectedUser.whatsapp,
          universitas: selectedUser.universitas,
          paketBerakhir: selectedUser.paketBerakhir
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || (isEditMode ? 'Gagal mengupdate user' : 'Gagal menambahkan user'))
      }

      // Fetch ulang data
      const updatedResponse = await fetch('/api/users')
      const updatedData = await updatedResponse.json()
      setUsers(updatedData)

      toast.success(isEditMode ? 'User berhasil diupdate' : 'User berhasil ditambahkan')
      handleModalToggle(false)
    } catch (error: any) {
      toast.error(error.message)
      console.error(error)
    }
  }

  // Fungsi untuk navigasi halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
        <h1 className="text-2xl font-bold text-gray-900">Manajemen User</h1>
        <button
          onClick={() => handleModalToggle(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Tambah User
        </button>
      </div>

      {/* Search dan Filter */}
      <div className="bg-white p-4 rounded-xl border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cari
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, email, whatsapp, atau universitas..."
              className="w-full p-2 border rounded-lg text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900 bg-white"
            >
              <option value="ALL">Semua Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Grade
            </label>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900 bg-white"
            >
              <option value="ALL">Semua Grade</option>
              <option value="DIAMOND">Diamond</option>
              <option value="GOLD">Gold</option>
              <option value="SILVER">Silver</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setRoleFilter('ALL')
                setGradeFilter('ALL')
              }}
              className="w-full p-2 text-gray-600 border rounded-lg hover:bg-gray-50"
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Menampilkan {filteredUsers.length} dari {users.length} user
        </div>
      </div>

      {/* Tabel User */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Nama</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Grade</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">WhatsApp</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Universitas</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Paket Berakhir</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Tanggal Daftar</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    {users.length === 0 ? 'Belum ada user terdaftar' : 'Tidak ada user yang sesuai dengan filter'}
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="text-gray-900">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.grade || '-'}</td>
                    <td className="px-6 py-4">{user.UserProfile?.whatsapp || '-'}</td>
                    <td className="px-6 py-4">{user.UserProfile?.universitas || '-'}</td>
                    <td className="px-6 py-4">
                      {user.role === 'USER' ? (
                        user.grade === 'DIAMOND' 
                          ? 'Selamanya'
                          : user.UserProfile?.paketBerakhir 
                            ? new Date(user.UserProfile.paketBerakhir).toLocaleDateString('id-ID')
                            : '-'
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleModalToggle(true, user)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteConfirm(user)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} dari {filteredUsers.length} user
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
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
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {isEditMode ? 'Edit User' : 'Tambah User Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {isEditMode && '(Kosongkan jika tidak ingin mengubah)'}
                </label>
                <input
                  type="password"
                  value={selectedUser.password}
                  onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  required={!isEditMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => {
                    const newRole = e.target.value as Role
                    setSelectedUser({ 
                      ...selectedUser, 
                      role: newRole,
                      // Reset grade jika role bukan USER
                      ...(newRole !== 'USER' && { grade: '', paketBerakhir: null })
                    })
                  }}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  disabled={isEditMode} // Nonaktifkan saat mode edit
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {isEditMode && (
                  <p className="text-sm text-orange-600 mt-1">
                    Role tidak dapat diubah setelah user dibuat
                  </p>
                )}
              </div>
              {/* Tampilkan field grade hanya jika role USER dan mode tambah baru */}
              {selectedUser.role === 'USER' && !isEditMode && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paket
                    </label>
                    <select
                      value={selectedUser.grade}
                      onChange={(e) => {
                        const selectedGrade = e.target.value as Grade | ''
                        setSelectedUser({ 
                          ...selectedUser, 
                          grade: selectedGrade
                        })
                      }}
                      className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                      required
                    >
                      <option value="">Pilih Paket</option>
                      <option value="DIAMOND">Diamond (Selamanya)</option>
                      <option value="GOLD">Gold (3 Bulan)</option>
                      <option value="SILVER">Silver (3 Bulan)</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Universitas
                </label>
                <input
                  type="text"
                  value={selectedUser.universitas}
                  onChange={(e) => setSelectedUser({ ...selectedUser, universitas: e.target.value })}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  placeholder="Nama universitas"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={selectedUser.whatsapp}
                  onChange={(e) => {
                    const value = e.target.value
                    // Hanya izinkan angka
                    if (value === '' || /^\d*$/.test(value)) {
                      setSelectedUser({ ...selectedUser, whatsapp: value })
                    }
                  }}
                  className="w-full p-2 border rounded-lg text-gray-900 bg-white"
                  placeholder="Contoh: 081234567890 atau 6281234567890"
                  required={selectedUser.role === 'USER'} // WhatsApp wajib untuk USER
                />
                <p className="text-sm text-gray-500 mt-1">
                  Gunakan format 08 atau 62 diikuti nomor HP (9-12 digit)
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => handleModalToggle(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Konfirmasi Hapus</h2>
            <p className="text-gray-700 mb-4">
              Apakah Anda yakin ingin menghapus user <span className="font-semibold">{userToDelete?.name}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 