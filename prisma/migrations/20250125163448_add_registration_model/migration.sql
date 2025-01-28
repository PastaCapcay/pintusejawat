/*
  Warnings:

  - You are about to drop the column `followUpAt` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `nama` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "followUpAt",
DROP COLUMN "name",
DROP COLUMN "notes",
DROP COLUMN "paidAt",
ADD COLUMN     "nama" TEXT NOT NULL;
