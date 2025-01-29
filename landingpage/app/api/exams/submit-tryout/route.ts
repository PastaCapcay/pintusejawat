import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { examId, answers, timeSpent } = await request.json()

    // Dapatkan user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Dapatkan exam dan soal-soalnya
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true }
    })

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 })
    }

    // Hitung score
    let correctAnswers = 0
    exam.questions.forEach(question => {
      if (answers[question.id] === question.answer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / exam.questions.length) * 100

    // Simpan hasil ke TryoutResult
    const result = await prisma.tryoutResult.create({
      data: {
        examId,
        userId: user.id,
        score,
        timeSpent,
        answers: answers
      }
    })

    return NextResponse.json({ resultId: result.id })
  } catch (error) {
    console.error('Error submitting tryout:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 