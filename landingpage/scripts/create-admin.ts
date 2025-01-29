import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('jarot123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'jarot@admin.com' },
    update: {},
    create: {
      email: 'jarot@admin.com',
      password: hashedPassword,
      name: 'Admin Jarot',
      role: 'ADMIN'
    }
  })

  console.log('Admin created:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 