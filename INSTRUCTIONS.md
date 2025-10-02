# Sistema de Gerenciamento de Alunos

Sistema completo de CRUD para gerenciamento de alunos com autenticação JWT, validações de segurança e interface moderna.

## 🚀 Funcionalidades

### ✅ Autenticação
- **Cadastro de alunos** com validação completa:
  - Nome completo (mínimo 3 caracteres)
  - E-mail institucional (único no sistema)
  - Matrícula (5-20 caracteres, único no sistema)
  - Senha forte (mínimo 8 caracteres, 1 número, 1 caractere especial)
- **Login seguro** com JWT via Lovable Cloud (Supabase)
- **Alteração de senha** com validação da senha atual

### 📋 CRUD de Alunos
- **CREATE**: Cadastro de novos alunos com validações
- **READ**: Listagem paginada (10 itens por página) com ordenação
- **UPDATE**: Edição de informações do aluno
- **DELETE**: Exclusão com confirmação

### 🔒 Segurança
- Autenticação JWT automática
- Row Level Security (RLS) no banco de dados
- Validações client-side e server-side com Zod
- E-mail e matrícula únicos garantidos por constraints
- Políticas de acesso por usuário autenticado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Router** - Roteamento
- **Zod** - Validação de schemas
- **Sonner** - Toast notifications

### Backend (Lovable Cloud)
- **PostgreSQL** - Banco de dados relacional
- **Supabase Auth** - Autenticação JWT
- **Row Level Security** - Segurança em nível de linha
- **Triggers e Functions** - Lógica automática no banco

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:8080
```

## 🎯 Como Usar

### 1. Primeira Vez (Cadastro)
1. Acesse a aplicação
2. Clique na aba "Cadastrar"
3. Preencha todos os campos:
   - Nome completo
   - E-mail institucional
   - Matrícula
   - Senha (seguindo os requisitos)
4. Clique em "Cadastrar"
5. Faça login com suas credenciais

### 2. Gerenciar Alunos
Após o login, você terá acesso ao Dashboard com:

#### Criar Novo Aluno
1. Clique em "Novo Aluno"
2. Preencha os dados
3. Clique em "Cadastrar"

#### Editar Aluno
1. Clique no ícone de edição (lápis)
2. Modifique os campos desejados
3. Clique em "Atualizar"

#### Excluir Aluno
1. Clique no ícone de exclusão (lixeira)
2. Confirme a exclusão

#### Alterar Senha
1. Role até a seção "Alterar Senha"
2. Digite a senha atual
3. Digite a nova senha (deve atender aos requisitos)
4. Confirme a nova senha
5. Clique em "Alterar Senha"

### 3. Navegação
- Use os botões de paginação para navegar entre páginas
- Visualize o total de alunos cadastrados
- Faça logout clicando no botão "Sair"

## 🗄️ Estrutura do Banco de Dados

### Tabela: `students`
```sql
- id: UUID (PK, auto-gerado)
- user_id: UUID (FK -> auth.users)
- full_name: TEXT (min 3 chars)
- email: TEXT (único, max 255 chars)
- matricula: TEXT (único, 5-20 chars)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP (auto-atualizado)
```

### Tabela: `profiles`
```sql
- id: UUID (PK, FK -> auth.users)
- full_name: TEXT
- matricula: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Políticas RLS
- Usuários autenticados podem visualizar todos os alunos
- Usuários só podem criar/editar/excluir seus próprios registros
- Validações automáticas via triggers

## 🔐 Validações Implementadas

### E-mail
- Formato válido de e-mail
- Máximo 255 caracteres
- Único no sistema

### Matrícula
- Entre 5 e 20 caracteres
- Única no sistema

### Senha
- Mínimo 8 caracteres
- Pelo menos 1 número
- Pelo menos 1 caractere especial (!@#$%^&*(),.?":{}|<>)

### Nome
- Mínimo 3 caracteres
- Máximo 100 caracteres

## 📱 Interface

### Páginas
1. **Landing (/)** - Página inicial com informações do sistema
2. **Autenticação (/auth)** - Login e cadastro
3. **Dashboard (/dashboard)** - Gerenciamento de alunos (protegido)

### Design System
- **Cores**: Azul educacional (#2563eb) com gradientes
- **Componentes**: Cards, Tabelas, Formulários, Modais
- **Responsivo**: Mobile-first com breakpoints otimizados
- **Acessibilidade**: Labels, ARIA, feedback visual

## 🚀 Deploy

### Via Lovable
1. Clique em "Publish" no canto superior direito
2. Seu app será automaticamente deployado

### Via GitHub + Vercel/Netlify
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente (Lovable Cloud fornece automaticamente)
3. Deploy!

## 🧪 Testes

Para testar o sistema:

1. **Criar conta**: Use um e-mail válido e senha forte
2. **Adicionar alunos**: Cadastre alguns alunos de teste
3. **Testar paginação**: Adicione mais de 10 alunos
4. **Editar dados**: Modifique informações de alunos existentes
5. **Alterar senha**: Teste a funcionalidade de mudança de senha
6. **Logout/Login**: Verifique a persistência da sessão

## 📝 Observações

- **Lovable Cloud**: Backend gerenciado automaticamente, sem necessidade de servidor próprio
- **JWT**: Tokens gerenciados automaticamente pelo Lovable Cloud
- **Senha**: Hash automático via Supabase Auth (bcrypt)
- **E-mail confirmação**: Desabilitado para facilitar testes (pode ser habilitado no Lovable Cloud)
- **Real-time**: A lista de alunos atualiza automaticamente quando há mudanças

## 🆘 Troubleshooting

### Erro ao fazer login
- Verifique se o e-mail e senha estão corretos
- Confirme que você completou o cadastro

### Erro ao criar aluno
- Verifique se o e-mail/matrícula já não estão cadastrados
- Confira se todos os campos atendem aos requisitos

### Erro de autenticação
- Faça logout e login novamente
- Limpe o cache do navegador

## 📚 Recursos Adicionais

- [Documentação Lovable](https://docs.lovable.dev/)
- [Lovable Cloud](https://docs.lovable.dev/features/cloud)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 Licença

Este projeto foi criado como exemplo de sistema CRUD completo com autenticação.

---

**Desenvolvido com Lovable** 🚀
