import prisma from '../prisma/client.ts';

async function main() {
  try {
    const songs = await prisma.song.findMany({
      include: {
        artist: true,
        album: true,
      },
    });
    console.table(songs);
  } catch (e) {
    console.error('Erro ao listar músicas:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
