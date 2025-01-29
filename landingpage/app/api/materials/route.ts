import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

// GET - Mengambil semua materi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const materials = await prisma.material.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(materials)
  } catch (error) {
    console.error("Error in GET /api/materials:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST - Menambah materi baru
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { title, description, type, url } = await req.json()

    // Validasi input
    if (!title || !description || !type || !url) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      )
    }

    // Validasi tipe materi
    if (type !== 'VIDEO' && type !== 'DOCUMENT') {
      return NextResponse.json(
        { error: "Tipe materi harus VIDEO atau DOCUMENT" },
        { status: 400 }
      )
    }

    // Validasi URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: "URL tidak valid" },
        { status: 400 }
      )
    }

    const material = await prisma.material.create({
      data: {
        title,
        description,
        type,
        url
      }
    })

    return NextResponse.json(material)
  } catch (error) {
    console.error("Error in POST /api/materials:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 