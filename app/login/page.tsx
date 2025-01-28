'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast.error("Email atau password salah")
        return
      }

      toast.success("Login berhasil")
      router.refresh()
      router.push(callbackUrl)
    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#0066FF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PS</span>
            </div>
            <span className="text-xl font-bold text-[#0066FF]">Pintu Sejawat</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Login ke Akun Anda</h1>
          <p className="text-blue-600 mt-2">Masuk untuk mengakses materi belajar Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-900 font-medium block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-900 font-medium block">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
              placeholder="Masukkan password Anda"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0066FF] hover:bg-blue-700 text-white py-6 text-lg font-medium"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-900 mt-6">
          Belum punya akun?{" "}
          <Button
            variant="link"
            onClick={() => {
              router.push('/#daftar-section')
            }}
            className="text-[#0066FF] font-medium hover:underline p-0"
          >
            Daftar Sekarang
          </Button>
        </p>
      </div>
    </div>
  )
} 