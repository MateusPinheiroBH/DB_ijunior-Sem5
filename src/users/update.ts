import prompts from 'prompts';
import prisma from '../prisma/client.ts';

async function main() {
  const { id } = await prompts({ type: 'number', name: 'id', message: 'ID do usuário para atualizar:' });
  if (!id) {
    console.log('ID inválido');
    process.exit(1);
  }

  const questions = [
    { type: 'text', name: 'name', message: 'Novo nome (deixe vazio para não alterar):' },
    { type: 'text', name: 'email', message: 'Novo email (deixe vazio para não alterar):' },
    { type: 'password', name: 'password', message: 'Nova senha (deixe vazio para não alterar):' },
    { type: 'text', name: 'photoUrl', message: 'Nova URL da foto (deixe vazio para não alterar):' },
    { type: 'confirm', name: 'privilege', message: 'Usuário tem privilégio?', initial: false },
  ];

  const dataRaw = await prompts(questions);
  const data: any = {};
  if (dataRaw.name) data.name = dataRaw.name;
  if (dataRaw.email) data.email = dataRaw.email;
  if (dataRaw.password) data.password = dataRaw.password;
  if (dataRaw.photoUrl) data.photoUrl = dataRaw.photoUrl;
  if (typeof dataRaw.privilege === 'boolean') data.privilege = dataRaw.privilege;

  try {
    const user = await prisma.user.update({ where: { id }, data });
    console.log('Usuário atualizado:', user);
  } catch (e) {
    console.error('Erro ao atualizar usuário:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
