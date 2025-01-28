import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { nama, email, whatsapp, universitas, paket } = await request.json()

    // Validasi input
    if (!nama || !email || !whatsapp || !universitas || !paket) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah terdaftar di tabel User
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar sebagai user" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah ada di tabel Registration dengan status belum COMPLETED
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        OR: [
          { email },
          { whatsapp }
        ],
        status: {
          not: 'COMPLETED'
        }
      }
    })

    if (existingRegistration) {
      if (existingRegistration.email === email) {
        return NextResponse.json(
          { error: "Email sudah terdaftar. Tim kami akan segera menghubungi Anda." },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          { error: "Nomor WhatsApp sudah terdaftar. Tim kami akan segera menghubungi Anda." },
          { status: 400 }
        )
      }
    }

    // Simpan data pendaftaran
    const registration = await prisma.registration.create({
      data: {
        nama,
        email,
        whatsapp,
        universitas,
        paket,
        status: 'NEW'
      }
    })

    return NextResponse.json(registration)
  } catch (error) {
    console.error("Error in POST /api/register:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 