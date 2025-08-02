import prompts from 'prompts';
import prisma from '../prisma/client.ts';


async function main() {
  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Nome do usuário:',
    },
    {
      type: 'text',
      name: 'email',
      message: 'Email do usuário:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Senha:',
    },
    {
      type: 'text',
      name: 'photoUrl',
      message: 'URL da foto (opcional):',
      initial: '',
    },
    {
      type: 'toggle',
      name: 'privilege',
      message: 'Usuário tem privilégio?',
      initial: false,
      active: 'Sim',
      inactive: 'Não',
    },
  ];

  const response = await prompts(questions);

  try {
    const user = await prisma.user.create({
      data: response,
    });
    console.log('Usuário criado:', user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
