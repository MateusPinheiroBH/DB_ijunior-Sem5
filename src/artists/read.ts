import prisma from '../prisma/client.ts';

async function main() {
  try {
    const artists = await prisma.artist.findMany();
    console.table(artists);
  } catch (e) {
    console.error('Erro ao listar artistas:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
