import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, whatsapp, universitas } = await req.json()

    // Validasi format WhatsApp
    if (whatsapp && !/^(08|62)\d{9,12}$/.test(whatsapp)) {
      return NextResponse.json(
        { error: "Format WhatsApp tidak valid. Gunakan format 08/62 diikuti 9-12 digit angka" },
        { status: 400 }
      )
    }

    // Update user dan profile
    const updatedUser = await prisma.user.update({
      where: { 
        email: session.user.email as string 
      },
      data: {
        name,
        UserProfile: {
          upsert: {
            create: {
              whatsapp,
              universitas
            },
            update: {
              whatsapp,
              universitas
            }
          }
        }
      },
      include: {
        UserProfile: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error in PUT /api/users/profile:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 