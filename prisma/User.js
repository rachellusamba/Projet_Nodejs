const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
 model User {
       id Int @id @default(autoincrement())
       email String @unique
       password String
     }