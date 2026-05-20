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
# Telas
## Home/kanban de tarefas
<img width="1892" height="890" alt="image" src="https://github.com/user-attachments/assets/18ddd058-7a3c-4ba6-800b-3a23f271d4f9" />

## Nova terefa
<img width="1888" height="869" alt="image" src="https://github.com/user-attachments/assets/0a4e84db-e18c-4e88-97df-ef00b6ffca31" />

## Editar tarefa
<img width="1877" height="855" alt="image" src="https://github.com/user-attachments/assets/017e7d49-68c3-4ca0-8f86-cdbada6b5e36" />

## Excluir tarefa
<img width="1873" height="915" alt="image" src="https://github.com/user-attachments/assets/321d1c71-92a6-4a30-a12c-7723273581b9" />

## Detalhes de tarefa
<img width="1845" height="902" alt="image" src="https://github.com/user-attachments/assets/94935dbe-e818-45c2-a9e9-63513cad5d78" />

## Lista/Criar categoria
<img width="1898" height="716" alt="image" src="https://github.com/user-attachments/assets/f3fce841-6060-4c0e-86df-3e9e43375114" />

##






