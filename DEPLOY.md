# 🚀 Deploy na Vercel - Guia Completo

Este guia contém todas as instruções necessárias para fazer o deploy do **B3 Dividendos Analyzer** na Vercel.

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com) (gratuita)
- Conta em um serviço de PostgreSQL (veja opções abaixo)
- Chave de API do [Brapi.dev](https://brapi.dev)
- Repositório no GitHub, GitLab ou Bitbucket

## 🗄️ Opções de Banco de Dados

O SQLite **NÃO** funciona na Vercel (ambiente serverless). Escolha uma das opções abaixo:

| Serviço | Plano Gratuito | Recomendação |
|---------|---------------|--------------|
| [Vercel Postgres](https://vercel.com/storage/postgres) | 256MB | ⭐ Mais simples (integração nativa) |
| [Supabase](https://supabase.com) | 500MB | ⭐ Feature-rich, boa UI |
| [Neon](https://neon.tech) | 3GB | ⭐ Serverless, muito rápido |
| [PlanetScale](https://planetscale.com) | 5GB | MySQL, branching |
| [Railway](https://railway.app) | $5 créditos/mês | Simples, bom para hobby |

### Recomendado: Vercel Postgres ou Neon

## 📝 Passo a Passo

### 1. Preparar o Banco de Dados

#### Opção A: Vercel Postgres (Recomendado)

1. Acesse seu projeto na Vercel
2. Vá em **Storage** > **Create Database** > **Postgres**
3. Escolha a região mais próxima (São Paulo: `gru1`)
4. Após criar, copie as variáveis de ambiente fornecidas

#### Opção B: Neon

1. Crie uma conta em [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie as strings de conexão:
   - `DATABASE_URL` (pooled connection)
   - `DIRECT_DATABASE_URL` (direct connection)

#### Opção C: Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings** > **Database**
4. Copie a **Connection string** (URI)
5. Adicione `?pgbouncer=true` para `DATABASE_URL` (pooler)
6. Use a string direta para `DIRECT_DATABASE_URL`

### 2. Configurar Variáveis de Ambiente na Vercel

Acesse **Settings** > **Environment Variables** e adicione:

#### ✅ Obrigatórias

| Nome | Descrição | Exemplo |
|------|-----------|---------|
| `DATABASE_URL` | URL do banco com pooler | `postgres://...?pgbouncer=true` |
| `DIRECT_DATABASE_URL` | URL direta (sem pooler) | `postgres://...` |
| `BRAPI_API_KEY` | Chave da API Brapi | `2xgt2TJXkFGA...` |
| `NEXTAUTH_SECRET` | Chave secreta (gerar) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL do site | `https://seu-site.vercel.app` |

#### 🔧 Opcionais

| Nome | Descrição |
|------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública para meta tags |
| `NEXT_PUBLIC_SITE_NAME` | Nome do site |

### 3. Gerar NEXTAUTH_SECRET

Execute no terminal:
```bash
openssl rand -base64 32
```

Copie o resultado para a variável `NEXTAUTH_SECRET`.

### 4. Fazer o Deploy

#### Via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Clique em **Deploy**

#### Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 5. Executar Migrações do Banco

Após o primeiro deploy, execute as migrações do Prisma:

#### Via Vercel CLI

```bash
# Configurar variáveis de ambiente local
vercel env pull .env.local

# Executar migrações
npx prisma migrate deploy
npx prisma db seed
```

#### Via Dashboard Vercel

1. Vá em **Storage** > **Postgres** > **Query**
2. Execute os comandos SQL do arquivo `prisma/migrations/*/migration.sql`

### 6. Configurar Domínio Personalizado (Opcional)

1. Vá em **Settings** > **Domains**
2. Adicione seu domínio
3. Configure os registros DNS
4. Atualize `NEXTAUTH_URL` para o novo domínio

## 🔄 CI/CD Automático

O projeto está configurado para deploy automático:

- **Push para `main`** → Deploy em produção
- **Pull Request** → Preview deploy

## 📊 Monitoramento

### Vercel Analytics

1. Vá em **Analytics** no dashboard
2. Habilite o Analytics gratuito
3. Adicione `NEXT_PUBLIC_VERCEL_ANALYTICS=true` nas variáveis

### Logs

- Acesse **Deployments** > **[Deploy]** > **Functions**
- Veja logs em tempo real

## ⚠️ Problemas Comuns

### Erro: "Prisma Client could not be generated"

**Solução:** Adicione um script de build no `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Erro: "Database connection failed"

**Soluções:**
1. Verifique se `DATABASE_URL` está correto
2. Verifique se o IP da Vercel está liberado no banco
3. Teste a conexão com `npx prisma db pull`

### Erro: "NEXTAUTH_URL mismatch"

**Solução:** Atualize `NEXTAUTH_URL` para a URL exata do seu site.

### Erro: "Functions timeout"

**Solução:** Aumente o timeout no `vercel.json`:

```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

## 📁 Estrutura de Arquivos para Deploy

```
├── prisma/
│   └── schema.prisma      # Schema PostgreSQL
├── vercel.json            # Configurações Vercel
├── next.config.ts         # Configurações Next.js
├── .env.example           # Variáveis de exemplo (dev)
├── .env.production.example # Variáveis de exemplo (prod)
└── package.json           # Scripts de build
```

## 🔐 Segurança

- ✅ Headers de segurança configurados
- ✅ CSP básico implementado
- ✅ Variáveis sensíveis não expostas
- ✅ HTTPS automático na Vercel

## 💡 Dicas de Performance

1. **Edge Functions**: Use para APIs rápidas
2. **ISR (Incremental Static Regeneration)**: Para páginas semi-estáticas
3. **Image Optimization**: Automático na Vercel
4. **Cache**: Configure headers de cache no `vercel.json`

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação NextAuth](https://next-auth.js.org/getting-started)

---

Feito com ❤️ para a comunidade de investidores brasileiros.
