/*
  Warnings:

  - Changed the type of `type` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Ubah tipe kolom type menjadi text sementara
ALTER TABLE "Material" ALTER COLUMN "type" TYPE text;

-- Hapus data yang tidak valid (opsional)
DELETE FROM "Material" WHERE "type" NOT IN ('VIDEO', 'DOCUMENT');

-- Update data yang ada ke format yang benar
UPDATE "Material" SET "type" = 'VIDEO' WHERE "type" = 'video';
UPDATE "Material" SET "type" = 'DOCUMENT' WHERE "type" = 'document';
