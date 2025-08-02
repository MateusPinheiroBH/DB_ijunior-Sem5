import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID do álbum para atualizar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  const questions = [
    { type: 'text', name: 'title', message: 'Novo título (deixe vazio para não alterar):' },
    { type: 'text', name: 'coverUrl', message: 'Nova URL da capa (deixe vazio para não alterar):' },
    { type: 'text', name: 'releaseDate', message: 'Nova data de lançamento (YYYY-MM-DD) (deixe vazio para não alterar):' },
    { type: 'number', name: 'artistId', message: 'Novo ID do artista (deixe vazio para não alterar):' },
  ];

  const dataRaw = await prompts(questions);
  const data: any = {};

  if (dataRaw.title) data.title = dataRaw.title;
  if (dataRaw.coverUrl) data.coverUrl = dataRaw.coverUrl;
  if (dataRaw.releaseDate) data.releaseDate = new Date(dataRaw.releaseDate);
  if (dataRaw.artistId) data.artistId = dataRaw.artistId;

  try {
    const album = await prisma.album.update({
      where: { id },
      data,
    });
    console.log('Álbum atualizado:', album);
  } catch (error) {
    console.error('Erro ao atualizar álbum:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
