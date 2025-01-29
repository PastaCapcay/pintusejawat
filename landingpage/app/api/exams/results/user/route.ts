import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    console.log("Session:", session)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Dapatkan user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })
    console.log("User:", user)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Ambil semua hasil exam user
    const results = await prisma.examResult.findMany({
      where: {
        userId: user.id
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    console.log("Results:", results)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in GET /api/exams/results/user:", error)
    return NextResponse.json(
      { error: "Failed to fetch exam results" },
      { status: 500 }
    )
  }
} 