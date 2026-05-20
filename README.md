# TaskFlow Manager

Sistema web para gerenciamento de tarefas.

---

# Tecnologias utilizadas

## Backend
- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger

## Frontend
- Next.js
- React
- TypeScript
- Material UI
- Tailwind CSS

---

# Funcionalidades

## Tarefas
- Criar tarefas
- Editar tarefas
- Excluir tarefas
- Visualizar detalhes da tarefa
- Atualizar status
- Drag and Drop entre colunas do List/kanban

## Home/Kanban
- Coluna de tarefas pendentes
- Coluna de tarefas em andamento
- Coluna de tarefas concluídas

## Categorias
- Criar categorias
- Editar categorias
- Excluir categorias
- Bloquear exclusão de categorias vinculadas a tarefas

---

# Como rodar o projeto

# Pré-requisitos

Necessário possuir instalado:

- Node.js
- PostgreSQL
- npm

---

# Backend

## 1. Acesse a pasta backend

```bash
cd backend
```

## 2. Instale as dependências

```bash
npm install
```

## 3. Configure o arquivo `.env`

Crie um arquivo:

```txt
.env
```

Adicione:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskflow_db"
```

---

## 4. Crie o banco PostgreSQL

Nome sugerido:

```txt
taskflow_db
```

---

## 5. Rode as migrations

```bash
npx prisma migrate dev
```

---

## 6. Gere o Prisma Client

```bash
npx prisma generate
```
---
## 7. Seed de usuários

O sistema utiliza usuários cadastrados previamente para vincular tarefas.

### Rodar seed

Execute:

```bash
npx prisma db seed
```

Isso irá criar usuários de exemplo no banco de dados.

---

## 8. Inicie o backend

```bash
npm run start:dev
```

---

# Backend disponível em

```txt
http://localhost:3000
```

# Swagger

```txt
http://localhost:3000/api
```

---

# Frontend

## 1. Acesse a pasta frontend

```bash
cd frontend
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Configure o `.env.local`

Crie o arquivo:

```txt
.env.local
```

Adicione:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 4. Rode o frontend

```bash
npm run dev -- -p 3001
```

---

# Frontend disponível em

```txt
http://localhost:3001
```

---

# Estrutura do projeto

```txt
taskflow-manager/
│
├── backend/
│   ├── prisma/
│   └── src/
│       ├── category/
│       ├── task/
│       ├── user/
│       └── prisma/
│
├── frontend/
│   ├── app/
│   │   ├── categories/
│   │   └── tasks/
│   │
│   ├── components/
│   ├── services/
│   ├── types/
│   └── public/
```

---

# Rotas principais

# Frontend

```txt
/                  Kanban principal
/tasks/new         Criar tarefa
/tasks/[id]        Detalhes da tarefa
/tasks/[id]/edit   Editar tarefa
/categories        Gerenciar categorias
```

---

# Backend

## Tasks

```txt
GET     /tasks
POST    /tasks
GET     /tasks/:id
PATCH   /tasks/:id
PATCH   /tasks/:id/status
DELETE  /tasks/:id
```

## Categories

```txt
GET     /categories
POST    /categories
GET     /categories/:id
PATCH   /categories/:id
DELETE  /categories/:id
```

## Users

```txt
GET     /users
POST    /users
```


---

# Funcionalidade de Drag and Drop

O sistema permite:

- Segurar e arrastar tarefas
- Alterar status visualmente
- Persistir atualização no backend automaticamente

---

# Regras implementadas

## Categorias
- Não é permitido excluir categorias vinculadas a tarefas.

## Tarefas
- Validação obrigatória de:
  - título
  - descrição
  - prioridade
  - responsável
  - categorias
