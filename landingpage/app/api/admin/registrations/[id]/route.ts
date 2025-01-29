import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const { id } = params

    // Update status pendaftaran
    const registration = await prisma.registration.update({
      where: { id },
      data: { status }
    })

    // Jika status COMPLETED, buat user baru
    if (status === 'COMPLETED') {
      // Set password default
      const password = "123456"
      const hashedPassword = await bcrypt.hash(password, 10)

      // Buat user baru
      const user = await prisma.user.create({
        data: {
          email: registration.email,
          name: registration.nama,
          password: hashedPassword,
          grade: registration.paket === 'diamond' ? 'DIAMOND' : 
                 registration.paket === 'gold' ? 'GOLD' : 'SILVER',
          UserProfile: {
            create: {
              whatsapp: registration.whatsapp,
              universitas: registration.universitas,
              paketBerakhir: registration.paket === 'diamond' ? 
                new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : // 1 tahun
                new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 3 bulan
            }
          }
        }
      })

      return NextResponse.json({ 
        message: "Status berhasil diupdate dan user baru dibuat dengan password default: 123456"
      })
    }

    return NextResponse.json({ message: "Status berhasil diupdate" })
  } catch (error) {
    console.error("Error in PATCH /api/admin/registrations/[id]:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Hapus data pendaftaran
    await prisma.registration.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Data pendaftaran berhasil dihapus" })
  } catch (error) {
    console.error("Error in DELETE /api/admin/registrations/[id]:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 