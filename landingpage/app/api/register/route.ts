import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash('jarot123', 10)
    
    // Buat admin jarot
    const admin = await prisma.user.create({
      data: {
        name: 'jarot',
        email: 'jarot@admin.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    return NextResponse.json({ message: 'Admin berhasil dibuat', admin })
  } catch (error) {
    console.error("Error in POST /api/register:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 