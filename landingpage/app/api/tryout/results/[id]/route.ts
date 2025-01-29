import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Ambil hasil tryout dengan detail exam dan soal-soalnya
    const result = await prisma.tryoutResult.findUnique({
      where: {
        id: params.id
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
      return new NextResponse('Result not found', { status: 404 })
    }

    // Pastikan user hanya bisa melihat hasil tryoutnya sendiri
    if (result.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[TRYOUT_RESULT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 