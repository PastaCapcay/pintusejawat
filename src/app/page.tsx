import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  GraduationCap,
  Users,
  BookOpen,
  Clock,
  Star,
  CheckCircle2,
  MessageCircle,
  Trophy
} from 'lucide-react';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import Image from 'next/image';

export default async function Home() {
  const { userId } = await auth();

  // Guard untuk mencegah infinite redirect
  if (!userId) {
    return (
      <div className='min-h-screen w-full overflow-y-auto'>
        {/* Header/Navbar */}
        <header className='bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md'>
          <nav className='container mx-auto flex items-center justify-between p-4'>
            <div className='text-2xl font-bold'>PintuSejawat</div>
            <div className='flex items-center gap-4'>
              <ModeToggle />
              <Link href='/auth/sign-in'>
                <Button variant='ghost'>Masuk</Button>
              </Link>
              <Link href='/auth/sign-up'>
                <Button>Daftar</Button>
              </Link>
            </div>
          </nav>
        </header>

        <main className='pt-20'>
          {/* Hero Section */}
          <section className='flex min-h-[calc(100vh-5rem)] items-center px-4'>
            <div className='container mx-auto max-w-6xl py-16'>
              <div className='grid items-center gap-8 lg:grid-cols-2'>
                <div className='space-y-6'>
                  <h1 className='text-5xl leading-tight font-bold'>
                    Siap UKAI Bareng PintuSejawat?
                  </h1>
                  <p className='text-muted-foreground text-xl'>
                    Platform all-in-one buat belajar, tryout, dan mentoring UKAI
                    secara online.
                  </p>
                  <div className='flex gap-4'>
                    <Link href='/auth/sign-up'>
                      <Button size='lg' className='px-8 text-lg'>
                        Mulai Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className='relative'>
                  <img
                    src='https://raw.githubusercontent.com/ShaifArfan/one-page-website-html-css-project/main/images/hero-bg.png'
                    alt='Hero Image'
                    className='h-full w-full rounded-lg object-cover'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className='bg-muted/50 px-4 py-16'>
            <div className='container mx-auto max-w-6xl'>
              <h2 className='mb-12 text-center text-3xl font-bold'>
                Kenapa Harus PintuSejawat?
              </h2>
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4'>
                      <GraduationCap className='text-primary h-10 w-10' />
                    </div>
                    <h3 className='mb-2 text-lg font-semibold'>
                      Tryout Berkualitas
                    </h3>
                    <p className='text-muted-foreground'>
                      Soal-soal tryout yang terverifikasi dan up-to-date dengan
                      standar UKAI terbaru
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4'>
                      <MessageCircle className='text-primary h-10 w-10' />
                    </div>
                    <h3 className='mb-2 text-lg font-semibold'>
                      Mentoring 24/7
                    </h3>
                    <p className='text-muted-foreground'>
                      Konsultasi dengan mentor berpengalaman kapanpun Anda
                      butuhkan
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4'>
                      <BookOpen className='text-primary h-10 w-10' />
                    </div>
                    <h3 className='mb-2 text-lg font-semibold'>
                      Materi Terstruktur
                    </h3>
                    <p className='text-muted-foreground'>
                      Materi pembelajaran yang disusun sistematis dan mudah
                      dipahami
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4'>
                      <Trophy className='text-primary h-10 w-10' />
                    </div>
                    <h3 className='mb-2 text-lg font-semibold'>
                      Analisis Performa
                    </h3>
                    <p className='text-muted-foreground'>
                      Pantau perkembangan belajar dengan analisis detail setiap
                      tryout
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className='bg-primary text-primary-foreground px-4 py-16'>
            <div className='container mx-auto max-w-3xl text-center'>
              <h2 className='mb-4 text-3xl font-bold'>Siap Untuk Mulai?</h2>
              <p className='mb-8 text-lg'>
                Raih impianmu menjadi apoteker yang kompeten!
              </p>
              <Link href='/auth/sign-up'>
                <Button size='lg' variant='secondary' className='px-8 text-lg'>
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </section>

          {/* Pricing Section */}
          <section className='px-4 py-16'>
            <div className='container mx-auto max-w-6xl'>
              <h2 className='mb-12 text-center text-3xl font-bold'>
                Pilih Paket Belajarmu
              </h2>
              <div className='grid gap-8 md:grid-cols-3'>
                {/* Free Plan */}
                <Card className='bg-card relative'>
                  <CardContent className='pt-6'>
                    <div className='mb-6 text-center'>
                      <h3 className='text-lg font-semibold'>FREE</h3>
                      <div className='mt-2 text-3xl font-bold'>Rp 0</div>
                      <p className='text-muted-foreground'>Selamanya</p>
                    </div>
                    <ul className='space-y-3'>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>1x Tryout Gratis</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Akses Terbatas</span>
                      </li>
                    </ul>
                    <Link href='/auth/sign-up'>
                      <Button className='mt-6 w-full'>Mulai Gratis</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className='border-primary bg-card relative'>
                  <div className='bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium'>
                    Popular
                  </div>
                  <CardContent className='pt-6'>
                    <div className='mb-6 text-center'>
                      <h3 className='text-lg font-semibold'>PRO</h3>
                      <div className='mt-2 text-3xl font-bold'>Rp 299.000</div>
                      <p className='text-muted-foreground'>per bulan</p>
                    </div>
                    <ul className='space-y-3'>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Semua Fitur FREE</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Akses Semua Tryout</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Bank Soal Lengkap</span>
                      </li>
                    </ul>
                    <Link href='/auth/sign-up'>
                      <Button className='mt-6 w-full'>Pilih PRO</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Pro Plus Plan */}
                <Card className='bg-card relative'>
                  <CardContent className='pt-6'>
                    <div className='mb-6 text-center'>
                      <h3 className='text-lg font-semibold'>PRO PLUS</h3>
                      <div className='mt-2 text-3xl font-bold'>Rp 499.000</div>
                      <p className='text-muted-foreground'>per bulan</p>
                    </div>
                    <ul className='space-y-3'>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Semua Fitur PRO</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Mentoring Premium</span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <CheckCircle2 className='h-5 w-5 text-green-500' />
                        <span>Garansi Kelulusan</span>
                      </li>
                    </ul>
                    <Link href='/auth/sign-up'>
                      <Button className='mt-6 w-full'>Pilih PRO PLUS</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className='bg-muted/50 px-4 py-16'>
            <div className='container mx-auto max-w-6xl'>
              <h2 className='mb-12 text-center text-3xl font-bold'>
                Apa Kata Mereka?
              </h2>
              <div className='grid gap-8 md:grid-cols-3'>
                {/* Testimonial 1 */}
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4 flex items-center gap-2'>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className='h-5 w-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <p className='text-card-foreground mb-4'>
                      "Berkat PintuSejawat, saya berhasil lulus UKAI di
                      kesempatan pertama!"
                    </p>
                    <div className='flex items-center gap-3'>
                      <img
                        src='https://randomuser.me/api/portraits/women/1.jpg'
                        alt='Dr. Sarah'
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <div>
                        <div className='font-semibold'>Dr. Sarah</div>
                        <div className='text-muted-foreground text-sm'>
                          Universitas Indonesia
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Testimonial 2 */}
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4 flex items-center gap-2'>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className='h-5 w-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <p className='text-card-foreground mb-4'>
                      "Materinya lengkap dan mudah dipahami. Mentornya juga
                      sangat membantu!"
                    </p>
                    <div className='flex items-center gap-3'>
                      <img
                        src='https://randomuser.me/api/portraits/men/2.jpg'
                        alt='Dr. Andi'
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <div>
                        <div className='font-semibold'>Dr. Andi</div>
                        <div className='text-muted-foreground text-sm'>
                          Universitas Gadjah Mada
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Testimonial 3 */}
                <Card className='bg-card'>
                  <CardContent className='pt-6'>
                    <div className='mb-4 flex items-center gap-2'>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className='h-5 w-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <p className='text-card-foreground mb-4'>
                      "Platform terbaik untuk persiapan UKAI. Worth it banget!"
                    </p>
                    <div className='flex items-center gap-3'>
                      <img
                        src='https://randomuser.me/api/portraits/women/3.jpg'
                        alt='Dr. Maya'
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <div>
                        <div className='font-semibold'>Dr. Maya</div>
                        <div className='text-muted-foreground text-sm'>
                          Universitas Airlangga
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className='px-4 py-16'>
            <div className='container mx-auto max-w-3xl'>
              <h2 className='mb-12 text-center text-3xl font-bold'>
                Pertanyaan Umum
              </h2>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='text-left'>
                    Kalau gagal UKAI, gimana?
                  </AccordionTrigger>
                  <AccordionContent>
                    Jangan khawatir! Kami memberikan garansi perpanjangan akses
                    premium sampai Anda lulus UKAI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className='text-left'>
                    Pembayaran bisa dicicil?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ya, kami menyediakan opsi cicilan melalui berbagai payment
                    gateway dan kartu kredit.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className='text-left'>
                    Berapa lama akses materi?
                  </AccordionTrigger>
                  <AccordionContent>
                    Akses materi sesuai dengan durasi paket yang Anda pilih, dan
                    dapat diperpanjang sesuai kebutuhan.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-4'>
                  <AccordionTrigger className='text-left'>
                    Apakah ada trial period?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ya, Anda bisa mencoba fitur dasar dengan paket FREE sebelum
                    memutuskan untuk upgrade.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className='mt-auto bg-slate-900 px-4 py-12 text-slate-200'>
          <div className='container mx-auto max-w-6xl'>
            <div className='grid gap-8 md:grid-cols-4'>
              <div>
                <h3 className='mb-4 text-lg font-bold'>PintuSejawat</h3>
                <p className='text-slate-400'>
                  Platform persiapan UKAI terpercaya dengan ribuan alumni yang
                  sukses.
                </p>
              </div>
              <div>
                <h4 className='mb-4 font-semibold'>Quick Links</h4>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='/about'
                      className='text-slate-400 hover:text-white'
                    >
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/contact'
                      className='text-slate-400 hover:text-white'
                    >
                      Kontak
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/blog'
                      className='text-slate-400 hover:text-white'
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='mb-4 font-semibold'>Legal</h4>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='/terms'
                      className='text-slate-400 hover:text-white'
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/privacy'
                      className='text-slate-400 hover:text-white'
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='mb-4 font-semibold'>Kontak</h4>
                <ul className='space-y-2 text-slate-400'>
                  <li>Email: info@pintusejawat.com</li>
                  <li>WhatsApp: +62 812-3456-7890</li>
                  <li>Instagram: @pintusejawat</li>
                </ul>
              </div>
            </div>
            <div className='mt-8 border-t border-slate-800 pt-8 text-center text-slate-400'>
              <p>
                &copy; {new Date().getFullYear()} PintuSejawat. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Jika user sudah login, redirect sesuai role
  if (userId) {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true }
    });

    if (dbUser?.role === 'ADMIN') {
      redirect('/dashboard');
    } else {
      redirect('/dashboarduser');
    }
  }

  return (
    <div className='min-h-screen w-full overflow-y-auto'>
      {/* Header/Navbar */}
      <header className='bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md'>
        <nav className='container mx-auto flex items-center justify-between p-4'>
          <div className='text-2xl font-bold'>PintuSejawat</div>
          <div className='flex items-center gap-4'>
            <ModeToggle />
            <Link href='/auth/sign-in'>
              <Button variant='ghost'>Masuk</Button>
            </Link>
            <Link href='/auth/sign-up'>
              <Button>Daftar</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className='pt-20'>
        {/* Hero Section */}
        <section className='flex min-h-[calc(100vh-5rem)] items-center px-4'>
          <div className='container mx-auto max-w-6xl py-16'>
            <div className='grid items-center gap-8 lg:grid-cols-2'>
              <div className='space-y-6'>
                <h1 className='text-5xl leading-tight font-bold'>
                  Siap UKAI Bareng PintuSejawat?
                </h1>
                <p className='text-muted-foreground text-xl'>
                  Platform all-in-one buat belajar, tryout, dan mentoring UKAI
                  secara online.
                </p>
                <div className='flex gap-4'>
                  <Link href='/auth/sign-up'>
                    <Button size='lg' className='px-8 text-lg'>
                      Mulai Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='relative'>
                <img
                  src='https://raw.githubusercontent.com/ShaifArfan/one-page-website-html-css-project/main/images/hero-bg.png'
                  alt='Hero Image'
                  className='h-full w-full rounded-lg object-cover'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='bg-muted/50 px-4 py-16'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='mb-12 text-center text-3xl font-bold'>
              Kenapa Harus PintuSejawat?
            </h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4'>
                    <GraduationCap className='text-primary h-10 w-10' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>
                    Tryout Berkualitas
                  </h3>
                  <p className='text-muted-foreground'>
                    Soal-soal tryout yang terverifikasi dan up-to-date dengan
                    standar UKAI terbaru
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4'>
                    <MessageCircle className='text-primary h-10 w-10' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>Mentoring 24/7</h3>
                  <p className='text-muted-foreground'>
                    Konsultasi dengan mentor berpengalaman kapanpun Anda
                    butuhkan
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4'>
                    <BookOpen className='text-primary h-10 w-10' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>
                    Materi Terstruktur
                  </h3>
                  <p className='text-muted-foreground'>
                    Materi pembelajaran yang disusun sistematis dan mudah
                    dipahami
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4'>
                    <Trophy className='text-primary h-10 w-10' />
                  </div>
                  <h3 className='mb-2 text-lg font-semibold'>
                    Analisis Performa
                  </h3>
                  <p className='text-muted-foreground'>
                    Pantau perkembangan belajar dengan analisis detail setiap
                    tryout
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-primary text-primary-foreground px-4 py-16'>
          <div className='container mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-3xl font-bold'>Siap Untuk Mulai?</h2>
            <p className='mb-8 text-lg'>
              Raih impianmu menjadi apoteker yang kompeten!
            </p>
            <Link href='/auth/sign-up'>
              <Button size='lg' variant='secondary' className='px-8 text-lg'>
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </section>

        {/* Pricing Section */}
        <section className='px-4 py-16'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='mb-12 text-center text-3xl font-bold'>
              Pilih Paket Belajarmu
            </h2>
            <div className='grid gap-8 md:grid-cols-3'>
              {/* Free Plan */}
              <Card className='bg-card relative'>
                <CardContent className='pt-6'>
                  <div className='mb-6 text-center'>
                    <h3 className='text-lg font-semibold'>FREE</h3>
                    <div className='mt-2 text-3xl font-bold'>Rp 0</div>
                    <p className='text-muted-foreground'>Selamanya</p>
                  </div>
                  <ul className='space-y-3'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>1x Tryout Gratis</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Akses Terbatas</span>
                    </li>
                  </ul>
                  <Link href='/auth/sign-up'>
                    <Button className='mt-6 w-full'>Mulai Gratis</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className='border-primary bg-card relative'>
                <div className='bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-medium'>
                  Popular
                </div>
                <CardContent className='pt-6'>
                  <div className='mb-6 text-center'>
                    <h3 className='text-lg font-semibold'>PRO</h3>
                    <div className='mt-2 text-3xl font-bold'>Rp 299.000</div>
                    <p className='text-muted-foreground'>per bulan</p>
                  </div>
                  <ul className='space-y-3'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Semua Fitur FREE</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Akses Semua Tryout</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Bank Soal Lengkap</span>
                    </li>
                  </ul>
                  <Link href='/auth/sign-up'>
                    <Button className='mt-6 w-full'>Pilih PRO</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pro Plus Plan */}
              <Card className='bg-card relative'>
                <CardContent className='pt-6'>
                  <div className='mb-6 text-center'>
                    <h3 className='text-lg font-semibold'>PRO PLUS</h3>
                    <div className='mt-2 text-3xl font-bold'>Rp 499.000</div>
                    <p className='text-muted-foreground'>per bulan</p>
                  </div>
                  <ul className='space-y-3'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Semua Fitur PRO</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Mentoring Premium</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle2 className='h-5 w-5 text-green-500' />
                      <span>Garansi Kelulusan</span>
                    </li>
                  </ul>
                  <Link href='/auth/sign-up'>
                    <Button className='mt-6 w-full'>Pilih PRO PLUS</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='bg-muted/50 px-4 py-16'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='mb-12 text-center text-3xl font-bold'>
              Apa Kata Mereka?
            </h2>
            <div className='grid gap-8 md:grid-cols-3'>
              {/* Testimonial 1 */}
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4 flex items-center gap-2'>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className='h-5 w-5 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='text-card-foreground mb-4'>
                    "Berkat PintuSejawat, saya berhasil lulus UKAI di kesempatan
                    pertama!"
                  </p>
                  <div className='flex items-center gap-3'>
                    <img
                      src='https://randomuser.me/api/portraits/women/1.jpg'
                      alt='Dr. Sarah'
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-semibold'>Dr. Sarah</div>
                      <div className='text-muted-foreground text-sm'>
                        Universitas Indonesia
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Testimonial 2 */}
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4 flex items-center gap-2'>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className='h-5 w-5 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='text-card-foreground mb-4'>
                    "Materinya lengkap dan mudah dipahami. Mentornya juga sangat
                    membantu!"
                  </p>
                  <div className='flex items-center gap-3'>
                    <img
                      src='https://randomuser.me/api/portraits/men/2.jpg'
                      alt='Dr. Andi'
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-semibold'>Dr. Andi</div>
                      <div className='text-muted-foreground text-sm'>
                        Universitas Gadjah Mada
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Testimonial 3 */}
              <Card className='bg-card'>
                <CardContent className='pt-6'>
                  <div className='mb-4 flex items-center gap-2'>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className='h-5 w-5 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='text-card-foreground mb-4'>
                    "Platform terbaik untuk persiapan UKAI. Worth it banget!"
                  </p>
                  <div className='flex items-center gap-3'>
                    <img
                      src='https://randomuser.me/api/portraits/women/3.jpg'
                      alt='Dr. Maya'
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-semibold'>Dr. Maya</div>
                      <div className='text-muted-foreground text-sm'>
                        Universitas Airlangga
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='px-4 py-16'>
          <div className='container mx-auto max-w-3xl'>
            <h2 className='mb-12 text-center text-3xl font-bold'>
              Pertanyaan Umum
            </h2>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-left'>
                  Kalau gagal UKAI, gimana?
                </AccordionTrigger>
                <AccordionContent>
                  Jangan khawatir! Kami memberikan garansi perpanjangan akses
                  premium sampai Anda lulus UKAI.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger className='text-left'>
                  Pembayaran bisa dicicil?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, kami menyediakan opsi cicilan melalui berbagai payment
                  gateway dan kartu kredit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger className='text-left'>
                  Berapa lama akses materi?
                </AccordionTrigger>
                <AccordionContent>
                  Akses materi sesuai dengan durasi paket yang Anda pilih, dan
                  dapat diperpanjang sesuai kebutuhan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger className='text-left'>
                  Apakah ada trial period?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, Anda bisa mencoba fitur dasar dengan paket FREE sebelum
                  memutuskan untuk upgrade.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='mt-auto bg-slate-900 px-4 py-12 text-slate-200'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid gap-8 md:grid-cols-4'>
            <div>
              <h3 className='mb-4 text-lg font-bold'>PintuSejawat</h3>
              <p className='text-slate-400'>
                Platform persiapan UKAI terpercaya dengan ribuan alumni yang
                sukses.
              </p>
            </div>
            <div>
              <h4 className='mb-4 font-semibold'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/about'
                    className='text-slate-400 hover:text-white'
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-slate-400 hover:text-white'
                  >
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    className='text-slate-400 hover:text-white'
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold'>Legal</h4>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/terms'
                    className='text-slate-400 hover:text-white'
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy'
                    className='text-slate-400 hover:text-white'
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold'>Kontak</h4>
              <ul className='space-y-2 text-slate-400'>
                <li>Email: info@pintusejawat.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Instagram: @pintusejawat</li>
              </ul>
            </div>
          </div>
          <div className='mt-8 border-t border-slate-800 pt-8 text-center text-slate-400'>
            <p>
              &copy; {new Date().getFullYear()} PintuSejawat. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
