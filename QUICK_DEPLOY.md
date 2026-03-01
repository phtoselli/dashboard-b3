# 🚀 Deploy Rápido na Vercel

## 1️⃣ Criar Banco PostgreSQL

### Opção A: Neon (Recomendado - Gratuito)
```
1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto "b3-dividendos"
4. Copie as connection strings:
   - DATABASE_URL (pooled)
   - DIRECT_DATABASE_URL (direct)
```

### Opção B: Vercel Postgres
```
1. Acesse seu projeto na Vercel
2. Storage > Create Database > Postgres
3. Escolha região "São Paulo (gru1)"
4. As variáveis são injetadas automaticamente
```

## 2️⃣ Configurar Variáveis na Vercel

Acesse: **Settings > Environment Variables**

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `postgres://...?pgbouncer=true` |
| `DIRECT_DATABASE_URL` | `postgres://...` (sem pgbouncer) |
| `BRAPI_API_KEY` | `2xgt2TJXkFGADn6ZavNTbQ` |
| `NEXTAUTH_SECRET` | *(gerar com `openssl rand -base64 32`)* |
| `NEXTAUTH_URL` | `https://seu-projeto.vercel.app` |

## 3️⃣ Deploy

### Via GitHub
```
1. Push para o GitHub
2. Importe o repo em vercel.com/new
3. Configure as variáveis
4. Deploy!
```

### Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 4️⃣ Migrações do Banco

Após o primeiro deploy:

```bash
# Baixar variáveis da Vercel
vercel env pull .env.local

# Executar migrações
npx prisma migrate deploy

# Popular dados iniciais
npx prisma db seed
```

## ✅ Pronto!

Seu site estará disponível em: `https://seu-projeto.vercel.app`

---

## 🔗 Links Úteis

- [DEPLOY.md](./DEPLOY.md) - Guia completo
- [.env.production.example](./.env.production.example) - Todas as variáveis
- [.env.vercel](./.env.vercel) - Template para copiar
