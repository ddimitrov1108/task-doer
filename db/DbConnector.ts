import { PrismaClient } from "@prisma/client";

export default class DbConnector {
  protected prisma: PrismaClient;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.prisma = new PrismaClient();
    } else {
      if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
      }
      this.prisma = (global as any).prisma;
    }
  }
}
