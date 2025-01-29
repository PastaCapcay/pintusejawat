import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

// GET - Mengambil semua exam
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const exams = await prisma.exam.findMany({
      include: {
        questions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error("Error in GET /api/exams:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 