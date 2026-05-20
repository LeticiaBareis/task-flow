import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const users = [
    {
      name: 'Admin',
      email: 'admin@email.com',
    },
    {
      name: 'Leticia Reis',
      email: 'leticia@email.com',
    },
    {
      name: 'João Silva',
      email: 'joao@email.com',
    },
    {
      name: 'Maria Oliveira',
      email: 'maria@email.com',
    },
    {
      name: 'Carlos Souza',
      email: 'carlos@email.com',
    },
    {
      name: 'Ana Lima',
      email: 'ana@email.com',
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });

    console.log('Usuário criado:', user);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });