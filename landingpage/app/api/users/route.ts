import { NextResponse } from "next/server"
import { PrismaClient, Prisma, Role } from "@prisma/client"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

type Grade = 'DIAMOND' | 'GOLD' | 'SILVER'

interface UserWithProfile {
  id: string
  name: string | null
  email: string
  password: string
  role: Role
  grade?: Grade | null
  createdAt: Date
  updatedAt: Date
  UserProfile: {
    id: string
    userId: string
    whatsapp: string | null
    universitas: string | null
    paketBerakhir: Date | null
  } | null
}

// GET /api/users - Mengambil semua user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        grade: true,
        createdAt: true,
        UserProfile: {
          select: {
            whatsapp: true,
            universitas: true,
            paketBerakhir: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error in GET /api/users:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST /api/users - Membuat user baru
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, password, role, grade, whatsapp, universitas } = body

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Cek apakah WhatsApp sudah terdaftar
    if (whatsapp) {
      const existingWhatsApp = await prisma.userProfile.findFirst({
        where: { whatsapp }
      })

      if (existingWhatsApp) {
        return NextResponse.json(
          { error: "Nomor WhatsApp sudah terdaftar" },
          { status: 400 }
        )
      }
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Set paketBerakhir berdasarkan grade
    let paketBerakhir = null
    // Hanya set grade dan paketBerakhir jika rolenya USER
    if (role === 'USER') {
      if (grade === 'GOLD' || grade === 'SILVER') {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        paketBerakhir = date
      }
    }

    // Buat user baru dengan paketBerakhir yang sudah ditentukan
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER",
        // Hanya set grade jika rolenya USER
        ...(role === 'USER' && { grade }),
        UserProfile: {
          create: {
            whatsapp,
            // Hanya set universitas jika rolenya USER
            ...(role === 'USER' && { universitas }),
            paketBerakhir
          }
        }
      },
      include: {
        UserProfile: true
      }
    })

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/users:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, password, role, whatsapp, universitas } = body

    // Ambil data user yang akan diupdate
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: { UserProfile: true }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Validasi: role tidak boleh diubah
    if (role !== existingUser.role) {
      return NextResponse.json(
        { error: "Role tidak dapat diubah setelah user dibuat" },
        { status: 400 }
      )
    }

    // Update user dan profile dalam satu transaksi
    const result = await prisma.$transaction(async (tx) => {
      // Update user dulu
      const updatedUser = await tx.user.update({
        where: { id: params.id },
        data: {
          name,
          email,
          ...(password && { password: await bcrypt.hash(password, 10) })
        }
      })

      // Update profile
      const updatedProfile = await tx.userProfile.update({
        where: { userId: params.id },
        data: {
          whatsapp,
          // Hanya update universitas jika rolenya USER
          ...(existingUser.role === 'USER' && { universitas })
        }
      })

      return {
        ...updatedUser,
        UserProfile: updatedProfile
      }
    })

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = result

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error in PUT /api/users/[id]:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// DELETE /api/users/[id] - Hapus user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Hapus user (UserProfile akan terhapus otomatis karena onDelete: Cascade)
    await prisma.user.delete({
      where: { 
        id: params.id 
      }
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error in DELETE /api/users/[id]:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 