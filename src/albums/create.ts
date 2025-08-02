import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const questions = [
    {
      type: 'text',
      name: 'title',
      message: 'Título do álbum:',
    },
    {
      type: 'text',
      name: 'coverUrl',
      message: 'URL da capa (opcional):',
      initial: '',
    },
    {
      type: 'text',
      name: 'releaseDate',
      message: 'Data de lançamento (YYYY-MM-DD) (opcional):',
      initial: '',
    },
    {
      type: 'number',
      name: 'artistId',
      message: 'ID do artista:',
    },
  ];

  const response = await prompts(questions);

  const releaseDate = response.releaseDate ? new Date(response.releaseDate) : null;
  const coverUrl = response.coverUrl || null;
  const artistId = Number(response.artistId); // garantir que é number

  try {
    const album = await prisma.album.create({
      data: {
        title: response.title,
        coverUrl,
        releaseDate,
        artistId,
      } as any,  // aqui faz cast para qualquer, evita erro de tipagem
    });
    console.log('Álbum criado:', album);
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

