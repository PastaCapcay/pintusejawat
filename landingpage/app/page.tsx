'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, Users, Loader2, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface ErrorState {
  nama?: string
  email?: string
  whatsapp?: string
  universitas?: string
  paket?: string
}

export default function Home() {
  const router = useRouter()
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    universitas: "",
    paket: ""
  })
  const [errors, setErrors] = useState<ErrorState>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showInstagramPopup, setShowInstagramPopup] = useState(false)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors: any = {}
    if (!formData.nama) newErrors.nama = "Nama harus diisi"
    if (!formData.email) newErrors.email = "Email harus diisi"
    if (!formData.whatsapp) newErrors.whatsapp = "WhatsApp harus diisi"
    if (!formData.universitas) newErrors.universitas = "Universitas harus diisi"
    if (!formData.paket) newErrors.paket = "Paket harus dipilih"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      toast.success("Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.")
      setFormData({
        nama: "",
        email: "",
        whatsapp: "",
        universitas: "",
        paket: ""
      })
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Terjadi kesalahan. Silakan coba lagi.")
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handlePilihPaket = (paket: string) => {
    const element = document.getElementById('daftar-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setFormData(prev => ({ ...prev, paket }))
    }
  }

  const handleTrialClick = () => {
    setShowInstagramPopup(true)
  }

  const handleFollowInstagram = () => {
    window.open('https://www.instagram.com/republikindonesia', '_blank')
    setTimeout(() => {
      setShowInstagramPopup(false)
      window.location.href = '/trial'
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo dan Nama */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#0066FF] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PS</span>
            </div>
            <span className="text-xl font-bold text-[#0066FF]">Pintu Sejawat</span>
          </Link>

          {/* Tombol-tombol */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
              variant="ghost" 
              className="text-[#0066FF] hover:text-[#0066FF] hover:bg-blue-50 px-6"
            >
              Coba Gratis
            </Button>
            <Link href="/login">
              <Button 
                variant="ghost" 
                className="text-[#0066FF] hover:text-[#0066FF] hover:bg-blue-50 px-6"
              >
                Login
              </Button>
            </Link>
            <Button 
              onClick={() => document.getElementById('daftar-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#0066FF] hover:bg-blue-700 text-white px-6"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-24">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Persiapkan Ujian Apoteker Anda Bersama{" "}
            <span className="text-blue-700">Pintu Sejawat</span>
          </h1>
          <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
            Platform bimbingan belajar online terpercaya untuk membantu Anda lulus ujian apoteker dengan persiapan yang maksimal
          </p>
          <Button 
            onClick={() => document.getElementById('daftar-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-8 py-6"
          >
            Mulai Belajar Sekarang <ArrowRight className="ml-2" />
          </Button>
        </section>

        {/* Statistics Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-blue-50 rounded-xl transform hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-700" />
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">1000+</div>
                <p className="text-blue-600">Peserta Aktif</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl transform hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-700" />
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">95%</div>
                <p className="text-blue-600">Tingkat Kelulusan</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl transform hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-700" />
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">4.9/5</div>
                <p className="text-blue-600">Rating Kepuasan</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl transform hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-700" />
                </div>
                <div className="text-3xl font-bold text-blue-800 mb-2">24/7</div>
                <p className="text-blue-600">Dukungan Mentor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">Pilih Paket Belajar Anda</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Gold Package */}
              <div className="bg-gradient-to-b from-amber-100 to-white p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-500 transition-all">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Gold</h3>
                <p className="text-3xl font-bold text-amber-600 mb-4">Rp 349.000</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-amber-600 mr-2" />
                    <span>Bimbel 3 bulan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-amber-600 mr-2" />
                    <span>Tryout</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-amber-600 mr-2" />
                    <span>Latihan Soal</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-amber-600 mr-2" />
                    <span>Modul</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePilihPaket('gold')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Pilih Paket
                </Button>
              </div>

              {/* Diamond Package */}
              <div className="bg-gradient-to-b from-blue-100 to-white p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-500 transition-all">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Diamond</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">Rp 599.000</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-blue-600 mr-2" />
                    <span>Bimbel sampai lulus</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-blue-600 mr-2" />
                    <span>Tryout</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-blue-600 mr-2" />
                    <span>Latihan soal</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-blue-600 mr-2" />
                    <span>Modul</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-blue-600 mr-2" />
                    <span>24 jam tanya jawab dengan mentor</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePilihPaket('diamond')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Pilih Paket
                </Button>
              </div>

              {/* Silver Package */}
              <div className="bg-gradient-to-b from-gray-100 to-white p-8 rounded-2xl border-2 border-gray-200 hover:border-gray-500 transition-all">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Silver</h3>
                <p className="text-3xl font-bold text-gray-600 mb-4">Rp 199.000</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-gray-600 mr-2" />
                    <span>Bimbel 3 bulan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-gray-600 mr-2" />
                    <span>Tryout</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-gray-600 mr-2" />
                    <span>Latihan Soal</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePilihPaket('silver')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Pilih Paket
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">Mengapa Memilih Pintu Sejawat?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">Materi Berkualitas</h3>
                <p className="text-blue-700">Dikembangkan oleh para ahli di bidang kefarmasian</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">Belajar Fleksibel</h3>
                <p className="text-blue-700">Akses materi kapanpun dan dimanapun</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">Mentor Berpengalaman</h3>
                <p className="text-blue-700">Dibimbing langsung oleh apoteker profesional</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - NEW */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">Apa Kata Mereka?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">DA</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Dr. Anita</h4>
                    <p className="text-blue-600 text-sm">Lulus Ujian Apoteker 2023</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-blue-800">"Berkat bimbingan dari Pintu Sejawat, saya berhasil lulus ujian apoteker dengan nilai memuaskan. Materinya lengkap dan mentornya sangat membantu."</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">RB</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Rudi Budiman</h4>
                    <p className="text-blue-600 text-sm">Lulus Ujian Apoteker 2023</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-blue-800">"Platform yang sangat membantu! Saya bisa belajar kapan saja dan dimana saja. Try out yang diberikan sangat mirip dengan soal ujian yang sebenarnya."</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Siti Maryam</h4>
                    <p className="text-blue-600 text-sm">Lulus Ujian Apoteker 2024</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-blue-800">"Mentor-mentornya sangat responsif dan selalu siap membantu. Materi yang diberikan sangat terstruktur dan mudah dipahami."</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - NEW */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">Pertanyaan Yang Sering Diajukan</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "Berapa lama waktu belajar yang dibutuhkan?",
                  a: "Waktu belajar fleksibel tergantung paket yang Anda pilih. Paket DIAMOND memberikan akses belajar sampai lulus, sementara paket GOLD dan SILVER memberikan akses selama 3 bulan."
                },
                {
                  q: "Apakah ada jaminan kelulusan?",
                  a: "Kami memiliki tingkat kelulusan 95% dan memberikan perpanjangan akses gratis jika Anda belum lulus pada paket DIAMOND."
                },
                {
                  q: "Bagaimana sistem belajarnya?",
                  a: "Sistem belajar online melalui platform kami dengan akses ke video pembelajaran, modul digital, latihan soal, dan bimbingan langsung dari mentor berpengalaman."
                },
                {
                  q: "Apakah bisa konsultasi dengan mentor kapan saja?",
                  a: "Ya, khusus untuk paket DIAMOND tersedia layanan konsultasi 24/7 dengan mentor. Untuk paket lain, konsultasi tersedia pada jam kerja."
                },
                {
                  q: "Bagaimana cara pembayarannya?",
                  a: "Kami menerima pembayaran melalui transfer bank, e-wallet, dan kartu kredit."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-all">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form - UPDATED */}
        <section id="daftar-section" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <h2 className="text-4xl font-bold text-blue-900 text-center mb-8">Daftar Sekarang</h2>
              <p className="text-blue-700 text-center mb-8">Mulai perjalanan Anda menuju kelulusan ujian apoteker</p>
              
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-blue-900 font-medium block">Nama Lengkap</label>
                  <input 
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors?.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-blue-900 font-medium block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
                    placeholder="Masukkan email aktif"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-blue-900 font-medium block">WhatsApp</label>
                  <input 
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
                    placeholder="Contoh: 08123456789"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-blue-900 font-medium block">Universitas</label>
                  <input 
                    type="text"
                    name="universitas"
                    value={formData.universitas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
                    placeholder="Asal universitas"
                  />
                  {errors.universitas && <p className="text-red-500 text-sm mt-1">{errors.universitas}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-blue-900 font-medium block">Pilih Paket</label>
                  <select 
                    name="paket"
                    value={formData.paket}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-white"
                  >
                    <option value="">Pilih paket belajar</option>
                    <option value="diamond">Diamond - Rp 599.000</option>
                    <option value="gold">Gold - Rp 349.000</option>
                    <option value="silver">Silver - Rp 199.000</option>
                  </select>
                  {errors.paket && <p className="text-red-500 text-sm mt-1">{errors.paket}</p>}
                </div>
                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0066FF] hover:bg-blue-700 text-white py-4 text-lg font-medium disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </Button>
                  <p className="text-sm text-blue-600 text-center mt-4">
                    Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Siap Untuk Mulai?</h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan calon apoteker lainnya yang telah berhasil meraih impian mereka bersama Pintu Sejawat
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={handleTrialClick}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                Mulai Simulasi Tryout
              </Button>
              <Button 
                onClick={() => document.getElementById('daftar-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white hover:bg-blue-800 text-lg px-8 py-6"
              >
                Konsultasi Dengan Tim Kami
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-xl">PS</span>
                </div>
                <span className="text-xl font-bold">Pintu Sejawat</span>
              </div>
              <p className="text-blue-200">Platform bimbingan belajar terpercaya untuk calon apoteker Indonesia</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Layanan</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Bimbingan Belajar</li>
                <li>Try Out</li>
                <li>Latihan Soal</li>
                <li>Konsultasi</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Kontak</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Email: info@pintusejawat.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Instagram: @pintusejawat</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Alamat</h4>
              <p className="text-blue-200">
                Jl. Apoteker No. 123<br />
                Jakarta Selatan<br />
                Indonesia
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Pintu Sejawat. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showInstagramPopup} onOpenChange={setShowInstagramPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-blue-600">Follow Instagram Kami</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mb-4">Untuk melanjutkan ke halaman trial, silakan follow Instagram kami terlebih dahulu:</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="font-semibold">@republikindonesia</span>
              </div>
              <Button 
                onClick={handleFollowInstagram} 
                className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
              >
                Follow Instagram
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}