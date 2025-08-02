import prisma from '../prisma/client.ts';

async function main() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        artist: true,
        songs: true,
      },
    });
    console.table(albums);
  } catch (error) {
    console.error('Erro ao listar álbuns:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
