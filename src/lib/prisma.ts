import { PrismaClient } from '@prisma/client';

// Declare global variable untuk menyimpan instance PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

// Simpan instance di global object saat development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export { prisma };

// Handle connection cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
