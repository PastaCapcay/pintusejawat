import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Ambil semua user
    const users = await prisma.user.findMany()
    
    // Ambil semua exam dan questions
    const exams = await prisma.exam.findMany({
      include: {
        questions: true
      }
    })

    // Ambil semua materials
    const materials = await prisma.material.findMany()

    // Hitung statistik
    const stats = {
      // User stats
      totalUsers: users.length,
      regularUsers: users.filter(user => user.role === "USER").length,
      adminUsers: users.filter(user => user.role === "ADMIN").length,
      
      // Exam stats
      totalExams: exams.length,
      totalQuestions: exams.reduce((acc, exam) => acc + exam.questions.length, 0),

      // Material stats
      totalVideos: materials.filter(m => m.type === 'VIDEO').length,
      totalDocuments: materials.filter(m => m.type === 'DOCUMENT').length
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error in GET /api/stats:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 