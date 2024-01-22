import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient({
//   log: process.env.NODE_ENV === "development" ? ["query"] : [],
// });

let prisma: PrismaClient;

const globalVar: any = global;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalVar.prisma) {
    globalVar.prisma = new PrismaClient();
  }

  prisma = globalVar.prisma;
}

export { prisma };
