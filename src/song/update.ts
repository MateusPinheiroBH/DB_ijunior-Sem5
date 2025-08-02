import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID da música para atualizar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  const questions = [
    { type: 'text', name: 'name', message: 'Novo nome (deixe vazio para não alterar):' },
    { type: 'text', name: 'genre', message: 'Novo gênero (deixe vazio para não alterar):' },
    { type: 'text', name: 'coverURL', message: 'Nova URL da capa (deixe vazio para não alterar):' },
    { type: 'number', name: 'artistId', message: 'ID do artista (deixe vazio para não alterar):' },
    { type: 'number', name: 'albumId', message: 'ID do álbum (deixe vazio para não alterar):' },
  ];

  const dataRaw = await prompts(questions);
  const data: any = {};
  if (dataRaw.name) data.name = dataRaw.name;
  if (dataRaw.genre) data.genre = dataRaw.genre;
  if (dataRaw.coverURL) data.coverURL = dataRaw.coverURL;
  if (dataRaw.artistId) data.artistId = dataRaw.artistId;
  if (dataRaw.albumId) data.albumId = dataRaw.albumId;

  try {
    if (data.artistId) {
      const artistExists = await prisma.artist.findUnique({ where: { id: data.artistId } });
      if (!artistExists) {
        console.log(`Artista com id ${data.artistId} não encontrado.`);
        process.exit(1);
      }
    }
    if (data.albumId) {
      const albumExists = await prisma.album.findUnique({ where: { id: data.albumId } });
      if (!albumExists) {
        console.log(`Álbum com id ${data.albumId} não encontrado.`);
        process.exit(1);
      }
    }

    const song = await prisma.song.update({ where: { id }, data });
    console.log('Música atualizada:', song);
  } catch (e) {
    console.error('Erro ao atualizar música:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
