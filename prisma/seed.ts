import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hapus data yang ada
  await prisma.material.deleteMany()
  await prisma.user.deleteMany()

  // Buat admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@pintusejawat.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Buat materi contoh
  await prisma.material.create({
    data: {
      title: 'Pengantar Anatomi',
      description: 'Video pembelajaran tentang dasar-dasar anatomi tubuh manusia',
      type: 'VIDEO',
      url: 'https://www.youtube.com/watch?v=example1'
    }
  })

  await prisma.material.create({
    data: {
      title: 'Sistem Kardiovaskular',
      description: 'Video pembelajaran tentang sistem peredaran darah',
      type: 'VIDEO',
      url: 'https://www.youtube.com/watch?v=example2'
    }
  })

  await prisma.material.create({
    data: {
      title: 'Panduan Praktikum Anatomi',
      description: 'Dokumen panduan untuk praktikum anatomi',
      type: 'DOCUMENT',
      url: 'https://drive.google.com/file/d/example1'
    }
  })

  await prisma.material.create({
    data: {
      title: 'Rangkuman Sistem Saraf',
      description: 'Dokumen rangkuman materi sistem saraf pusat dan tepi',
      type: 'DOCUMENT',
      url: 'https://drive.google.com/file/d/example2'
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 