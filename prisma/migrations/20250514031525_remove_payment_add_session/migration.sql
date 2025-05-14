/*
  Warnings:

  - The values [PREMIUM] on the enum `Grade` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[activeSessionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Grade_new" AS ENUM ('FREE', 'STARTER', 'PRO', 'PRO_PLUS');
ALTER TABLE "User" ALTER COLUMN "grade" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "grade" TYPE "Grade_new" USING ("grade"::text::"Grade_new");
ALTER TYPE "Grade" RENAME TO "Grade_old";
ALTER TYPE "Grade_new" RENAME TO "Grade";
DROP TYPE "Grade_old";
ALTER TABLE "User" ALTER COLUMN "grade" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeSessionId" TEXT,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_activeSessionId_key" ON "User"("activeSessionId");

-- Insert TRYOUT_FREE package
INSERT INTO "PaketSoal" ("id", "judul", "deskripsi", "createdAt", "updatedAt")
VALUES (
  'TRYOUT_FREE',
  'Tryout Gratis',
  'Paket tryout gratis untuk pengguna baru',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
