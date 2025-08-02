import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const questions = [
    { type: 'text', name: 'name', message: 'Nome da música:' },
    { type: 'text', name: 'genre', message: 'Gênero da música:' },
    { type: 'text', name: 'coverURL', message: 'URL da capa (opcional):', initial: '' },
    { type: 'number', name: 'artistId', message: 'ID do artista:' },
    { type: 'number', name: 'albumId', message: 'ID do álbum:' },
  ];

  const response = await prompts(questions);

  if (!response.artistId || !response.albumId) {
    console.log('ID do artista e do álbum são obrigatórios.');
    process.exit(1);
  }

  try {
    // Verifica se artista existe
    const artistExists = await prisma.artist.findUnique({ where: { id: response.artistId } });
    if (!artistExists) {
      console.log(`Artista com id ${response.artistId} não encontrado.`);
      process.exit(1);
    }

    // Verifica se álbum existe
    const albumExists = await prisma.album.findUnique({ where: { id: response.albumId } });
    if (!albumExists) {
      console.log(`Álbum com id ${response.albumId} não encontrado.`);
      process.exit(1);
    }

    const song = await prisma.song.create({
      data: {
        name: response.name,
        genre: response.genre,
        coverURL: response.coverURL || null,
        artistId: response.artistId,
        albumId: response.albumId,
      },
    });

    console.log('Música criada:', song);
  } catch (error) {
    console.error('Erro ao criar música:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
