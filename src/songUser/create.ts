import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const questions = [
    { type: 'number', name: 'userId', message: 'ID do usuário:' },
    { type: 'number', name: 'songId', message: 'ID da música:' },
  ];

  const response = await prompts(questions);

  if (!response.userId || !response.songId) {
    console.log('ID do usuário e da música são obrigatórios.');
    process.exit(1);
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { id: response.userId } });
    if (!userExists) {
      console.log(`Usuário com id ${response.userId} não encontrado.`);
      process.exit(1);
    }

    const songExists = await prisma.song.findUnique({ where: { id: response.songId } });
    if (!songExists) {
      console.log(`Música com id ${response.songId} não encontrada.`);
      process.exit(1);
    }

    const songUser = await prisma.songUser.create({
      data: {
        userId: response.userId,
        songId: response.songId,
      },
    });

    console.log('Relação SongUser criada:', songUser);
  } catch (error) {
    console.error('Erro ao criar relação SongUser:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
