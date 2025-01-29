import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const result = await prisma.examResult.findUnique({
      where: {
        id: params.id,
        userId: session.user.id // Memastikan user hanya bisa melihat hasil miliknya
      },
      include: {
        exam: {
          include: {
            questions: true
          }
        }
      }
    })

    if (!result) {
      return NextResponse.json(
        { error: "Result not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/exams/results/[id]:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 