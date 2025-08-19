import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("db connected")
export default prisma
