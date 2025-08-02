import prisma from '../prisma/client.ts';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.table(users);
  } catch (e) {
    console.error('Erro ao listar usuários:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
