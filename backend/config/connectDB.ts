import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function initDB() {
  await prisma.user.deleteMany();
}

export default initDB;
