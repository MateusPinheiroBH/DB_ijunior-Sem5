import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Nome do artista:',
    },
    {
      type: 'text',
      name: 'photoUrl',
      message: 'URL da foto (opcional):',
      initial: '',
    },
  ];

  const response = await prompts(questions);

  try {
    const artist = await prisma.artist.create({
      data: {
        name: response.name,
        photoUrl: response.photoUrl || null,
      },
    });
    console.log('Artista criado:', artist);
  } catch (error) {
    console.error('Erro ao criar artista:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
