import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID do álbum para deletar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  try {
    await prisma.album.delete({ where: { id } });
    console.log('Álbum deletado');
  } catch (error) {
    console.error('Erro ao deletar álbum:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
