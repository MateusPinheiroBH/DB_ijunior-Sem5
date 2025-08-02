import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID da relação SongUser para deletar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  try {
    await prisma.songUser.delete({ where: { id } });
    console.log('Relação SongUser deletada');
  } catch (e) {
    console.error('Erro ao deletar relação SongUser:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
