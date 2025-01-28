# Pintu Sejawat

Aplikasi latihan soal untuk persiapan ujian.

## Fitur

- Manajemen user (admin/user)
- Upload soal via Excel
- Latihan soal dengan timer
- History pengerjaan soal
- Grafik perkembangan nilai
- Pembahasan soal
- Manajemen materi pembelajaran
- Pendaftaran user baru

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js

## Development

1. Clone repository
```bash
git clone https://github.com/PastaCapcay/pintusejawat.git
cd pintusejawat
```

2. Install dependencies
```bash
npm install
```

3. Copy .env.example ke .env dan sesuaikan konfigurasi

4. Jalankan migrasi database
```bash
npx prisma migrate dev
```

5. Jalankan development server
```bash
npm run dev
```

## Deployment

1. Build aplikasi
```bash
npm run build
```

2. Jalankan production server
```bash
npm start
```
