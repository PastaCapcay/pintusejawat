import { NextResponse } from "next/server"
import { PrismaClient, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!session.user?.id) {
      return NextResponse.json(
        { error: "User ID not found" },
        { status: 400 }
      )
    }

    const { examId, score, answers } = await request.json()

    // Validasi input
    if (!examId || typeof score !== 'number' || !answers) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }

    // Buat hasil baru
    const result = await (prisma as any).examResult.create({
      data: {
        examId,
        userId: session.user.id,
        score,
        answers: answers as Prisma.JsonValue,
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in POST /api/exams/results:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 