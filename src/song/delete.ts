import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID da música para deletar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  try {
    await prisma.song.delete({ where: { id } });
    console.log('Música deletada');
  } catch (e) {
    console.error('Erro ao deletar música:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
