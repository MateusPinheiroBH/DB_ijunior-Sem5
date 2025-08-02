import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({
    type: 'number',
    name: 'id',
    message: 'ID do artista para atualizar:',
  });

  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Novo nome (deixe vazio para não alterar):',
    },
    {
      type: 'text',
      name: 'photoUrl',
      message: 'Nova URL da foto (deixe vazio para não alterar):',
    },
  ];

  const dataRaw = await prompts(questions);
  const data: any = {};
  if (dataRaw.name) data.name = dataRaw.name;
  if (dataRaw.photoUrl) data.photoUrl = dataRaw.photoUrl;

  try {
    const artist = await prisma.artist.update({ where: { id }, data });
    console.log('Artista atualizado:', artist);
  } catch (e) {
    console.error('Erro ao atualizar artista:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
