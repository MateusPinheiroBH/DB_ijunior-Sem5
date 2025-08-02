Projeto CRUD Prisma + TypeScript - Aplicativo de Música

Este projeto implementa operações básicas de CRUD (Create, Read, Update, Delete)
para as tabelas do banco de dados utilizando Prisma ORM com TypeScript e interface
interativa via prompts.

-------------------------------------------------------------------------------

Estrutura do Projeto

- src/prisma/client.ts
  Instancia o cliente Prisma para conexão com o banco.

- Diretórios e arquivos para cada tabela do banco:
  - src/users/    — CRUD para a tabela User
  - src/artists/  — CRUD para a tabela Artist
  - src/albums/   — CRUD para a tabela Album
  - src/songs/    — CRUD para a tabela Song
  - src/songUser/ — CRUD para a tabela SongUser (relacionamento entre usuários e músicas)

Cada pasta contém 4 arquivos principais:
- create.ts — cria um registro novo com perguntas interativas
- read.ts   — lista todos os registros da tabela
- update.ts — atualiza um registro existente por ID
- delete.ts — exclui um registro por ID

-------------------------------------------------------------------------------

Como rodar

Antes de rodar o projeto, crie um arquivo chamado `.env` na raiz com a seguinte variável:
  <DATABASE_URL="file:./dev.db">
- Ou simplesmente copie o conteúdo de `.env.example`.

Pré-requisitos
- Node.js instalado (preferencialmente 18+)
- Banco configurado no arquivo .env com variável DATABASE_URL (ex: SQLite)
- Dependências instaladas com npm install

-------------------------------------------------------------------------------

Comandos para rodar cada operação

Use o comando:

  npx ts-node src/<tabela>/<operacao>.ts

Substitua <tabela> e <operacao> conforme desejado.

-------------------------------------------------------------------------------

Exemplos de uso

Criar usuário:
  npx ts-node src/users/create.ts

Listar todos os artistas:
  npx ts-node src/artists/read.ts

Atualizar um álbum:
  npx ts-node src/albums/update.ts

Deletar uma música:
  npx ts-node src/songs/delete.ts

Criar uma relação SongUser (usuário que ouviu uma música):
  npx ts-node src/songUser/create.ts

-------------------------------------------------------------------------------

Fluxo básico

1. Ao rodar um script create.ts ou update.ts, você será guiado por perguntas para informar os dados necessários.
2. Os scripts read.ts listam registros com tabelas no console.
3. Os scripts delete.ts solicitam o ID do registro a ser removido.

-------------------------------------------------------------------------------

Observações importantes

- IDs precisam existir no banco para as operações de update e delete.
- As operações que envolvem relações entre tabelas validam se os IDs informados existem para evitar erros de chave estrangeira.
- Datas devem ser inseridas no formato YYYY-MM-DD.
- O banco usado neste projeto é SQLite, mas pode ser alterado no arquivo schema.prisma e no .env.

-------------------------------------------------------------------------------

Tecnologias usadas

- Prisma ORM (https://www.prisma.io/)
- TypeScript
- prompts (para entrada interativa no terminal)
- SQLite (pode ser outro banco suportado pelo Prisma)

-------------------------------------------------------------------------------

Se precisar de ajuda para rodar algum comando ou entender o fluxo, entre em contato comigo pelo
email <mateus.poelman2@gmail.com>. Obrigado por testar minha aplicação!

