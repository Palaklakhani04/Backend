import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

console.log("db connected")
export default prisma
