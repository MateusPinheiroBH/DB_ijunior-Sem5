import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID da relação SongUser para atualizar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  const questions = [
    { type: 'number', name: 'userId', message: 'Novo ID do usuário (deixe vazio para não alterar):' },
    { type: 'number', name: 'songId', message: 'Novo ID da música (deixe vazio para não alterar):' },
  ];

  const dataRaw = await prompts(questions);
  const data: any = {};
  if (dataRaw.userId) data.userId = dataRaw.userId;
  if (dataRaw.songId) data.songId = dataRaw.songId;

  try {
    if (data.userId) {
      const userExists = await prisma.user.findUnique({ where: { id: data.userId } });
      if (!userExists) {
        console.log(`Usuário com id ${data.userId} não encontrado.`);
        process.exit(1);
      }
    }
    if (data.songId) {
      const songExists = await prisma.song.findUnique({ where: { id: data.songId } });
      if (!songExists) {
        console.log(`Música com id ${data.songId} não encontrada.`);
        process.exit(1);
      }
    }

    const songUser = await prisma.songUser.update({ where: { id }, data });
    console.log('Relação SongUser atualizada:', songUser);
  } catch (e) {
    console.error('Erro ao atualizar relação SongUser:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
