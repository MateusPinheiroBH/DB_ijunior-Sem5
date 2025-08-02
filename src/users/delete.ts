import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID do usuário para deletar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  try {
    await prisma.user.delete({ where: { id } });
    console.log('Usuário deletado');
  } catch (e) {
    console.error('Erro ao deletar usuário:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
