import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    // Get all registrations ordered by newest first
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get counts for each status
    const newCount = registrations.filter(r => r.status === 'NEW').length
    const followedUpCount = registrations.filter(r => r.status === 'FOLLOWED_UP').length
    const paidCount = registrations.filter(r => r.status === 'PAID').length
    const completedCount = registrations.filter(r => r.status === 'COMPLETED').length

    return NextResponse.json({
      registrations,
      stats: {
        new: newCount,
        followedUp: followedUpCount,
        paid: paidCount,
        completed: completedCount,
        total: registrations.length
      }
    })
  } catch (error) {
    console.error('Error in GET /api/admin/registrations:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 