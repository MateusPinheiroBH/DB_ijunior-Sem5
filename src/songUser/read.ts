import prisma from '../prisma/client.ts';

async function main() {
  try {
    const songUsers = await prisma.songUser.findMany({
      include: {
        user: true,
        song: true,
      },
    });
    console.table(songUsers);
  } catch (e) {
    console.error('Erro ao listar relações SongUser:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
