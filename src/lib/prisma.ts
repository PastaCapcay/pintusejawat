import { PrismaClient } from '@prisma/client';

// Declare global variable untuk menyimpan instance PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Gunakan global prisma untuk development hot reload
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error'],
    errorFormat: 'minimal'
  });

// Simpan instance di global object saat development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };

// Handle connection cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
