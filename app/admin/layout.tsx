'use client'

import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r flex flex-col">
          <div className="flex items-center mb-5 p-2">
            <div className="w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-[#0066FF]">Pintu Sejawat</span>
          </div>
          
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/registrations"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Pendaftaran</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Kelola User</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/exams"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Bank Soal</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/materials"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Kelola Materi</span>
              </Link>
            </li>
          </ul>

          {/* Logout button at bottom with padding */}
          <div className="mt-auto mb-16">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center p-2 text-red-600 rounded-lg hover:bg-red-50"
            >
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-4 bg-white rounded-lg shadow-sm min-h-screen">
          {children}
        </div>
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-[#0066FF] text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? "←" : "→"}
      </button>
    </div>
  )
} 