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

    // Ambil data user lengkap termasuk UserProfile
    const user = await prisma.user.findUnique({
      where: { 
        email: session.user.email as string 
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        grade: true,
        UserProfile: {
          select: {
            whatsapp: true,
            universitas: true,
            paketBerakhir: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error in GET /api/users/me:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 