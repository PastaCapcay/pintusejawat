import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

// PUT /api/users/[id] - Update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, password, role, grade } = body

    // Validasi input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah digunakan oleh user lain
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: params.id
        }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      )
    }

    // Update user
    const updateData: any = {
      name,
      email,
      role: role || "USER",
      grade: grade || null
    }

    // Jika password diisi, update password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData
    })

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Cek apakah user yang akan dihapus adalah admin terakhir
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" }
    })

    const userToDelete = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (adminCount === 1 && userToDelete?.role === "ADMIN") {
      return NextResponse.json(
        { error: "Tidak dapat menghapus admin terakhir" },
        { status: 400 }
      )
    }

    // Hapus user
    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "User berhasil dihapus" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
} 