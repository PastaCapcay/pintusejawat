import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const results = await prisma.tryoutResult.findMany({
      where: {
        userId: user.id
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
    console.error('[TRYOUT_RESULTS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 