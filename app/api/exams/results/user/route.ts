import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
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

    const results = await prisma.examResult.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        exam: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in GET /api/exams/results/user:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 