-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('NEW', 'FOLLOWED_UP', 'PAID', 'COMPLETED');

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "universitas" TEXT NOT NULL,
    "paket" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "followUpAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);
