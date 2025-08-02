import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({
    type: 'number',
    name: 'id',
    message: 'ID do artista para deletar:',
  });

  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  try {
    await prisma.artist.delete({ where: { id } });
    console.log('Artista deletado');
  } catch (e) {
    console.error('Erro ao deletar artista:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
