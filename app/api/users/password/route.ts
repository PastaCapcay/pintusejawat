import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await req.json()

    // Validasi password baru
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal 6 karakter" },
        { status: 400 }
      )
    }

    // Ambil user dari database
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email as string 
      },
      select: {
        password: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      )
    }

    // Verifikasi password saat ini
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password saat ini tidak sesuai" },
        { status: 400 }
      )
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { 
        email: session.user.email as string 
      },
      data: {
        password: hashedPassword
      }
    })

    return NextResponse.json({ message: "Password berhasil diperbarui" })
  } catch (error) {
    console.error("Error in PUT /api/users/password:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 