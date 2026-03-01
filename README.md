# 📈 B3 Dividendos Analyzer

Uma aplicação web moderna e completa para análise de ações da B3 (Bolsa de Valores do Brasil) focadas em dividendos. Desenvolvida com as tecnologias mais recentes do ecossistema React/Next.js.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=flat-square&logo=prisma)

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [APIs e Integrações](#-apis-e-integrações)
- [Modelo de Dados](#-modelo-de-dados)
- [Setores Cobertos](#-setores-cobertos)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **B3 Dividendos Analyzer** é uma ferramenta desenvolvida para investidores que buscam construir uma carteira focada em renda passiva através de dividendos. A aplicação oferece:

- **Análise Fundamentalista**: Indicadores como P/L, P/VP, ROE, ROIC, Dividend Yield
- **Score de Qualidade**: Sistema de pontuação para avaliar a qualidade das empresas
- **Gestão de Carteira**: Acompanhe suas posições e rendimentos
- **Importação de Dados**: Suporte a importação de arquivos de corretoras
- **Favoritos**: Marque e acompanhe suas ações preferidas
- **Dados em Tempo Real**: Integração com a API brapi.dev

### Método de Análise

A aplicação segue princípios de investimento em empresas maduras e perenes, similar aos métodos de:
- **Décio Bazin**: Investimento em empresas "bem vestidas e bem alimentadas"
- **Luiz Barsi**: Foco em dividendos e reinvestimento

---

## ✨ Funcionalidades

### 📊 Painel Principal
- Visão geral do mercado de ações focadas em dividendos
- Ranking das melhores oportunidades
- Ações "Em Alta" com destaque visual
- Indicadores de mercado em tempo real

### 📈 Análise de Ações
- Tabela interativa com todas as ações monitoradas
- Filtros por setor e indicadores
- Ordenação múltipla por colunas
- Cards detalhados com informações fundamentalistas
- Logos das empresas com fallback por setor

### 💼 Gestão de Carteira
- Cadastro e acompanhamento de posições
- Cálculo de peso alvo na carteira
- Histórico de importações
- Snapshot de posições ao longo do tempo

### ⭐ Favoritos
- Lista personalizada de ações favoritas
- Notas e comentários por ação
- Acesso rápido às informações

### 📁 Importação de Dados
- Suporte a CSV, XLSX e PDF
- Importação manual ou via arquivo
- Histórico de importações
- Validação automática de dados

### 🔍 Busca
- Busca por ticker ou nome da empresa
- Resultados em tempo real
- Navegação rápida para detalhes

---

## 🛠️ Tecnologias Utilizadas

### Core Framework
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 16.1.3 | Framework React com App Router |
| [React](https://react.dev/) | 19.0 | Biblioteca para interfaces de usuário |
| [TypeScript](https://www.typescriptlang.org/) | 5.0 | Tipagem estática para JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Framework CSS utilitário |

### UI/UX
| Tecnologia | Descrição |
|------------|-----------|
| [shadcn/ui](https://ui.shadcn.com/) | Componentes acessíveis e customizáveis |
| [Lucide React](https://lucide.dev/) | Biblioteca de ícones |
| [Framer Motion](https://www.framer.com/motion/) | Animações fluidas |
| [Recharts](https://recharts.org/) | Gráficos e visualizações |
| [next-themes](https://github.com/pacocoursey/next-themes) | Tema claro/escuro |

### Backend & Dados
| Tecnologia | Descrição |
|------------|-----------|
| [Prisma](https://www.prisma.io/) | ORM TypeScript para banco de dados |
| [SQLite](https://www.sqlite.org/) | Banco de dados embutido |
| [TanStack Query](https://tanstack.com/query) | Gerenciamento de estado servidor |
| [Zustand](https://zustand-demo.pmnd.rs/) | Estado global do cliente |

### Validação & Formulários
| Tecnologia | Descrição |
|------------|-----------|
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | Validação de schemas |

### APIs Externas
| API | Descrição |
|-----|-----------|
| [brapi.dev](https://brapi.dev/) | Dados de cotações da B3 em tempo real |
| TradingView | Logos das empresas |

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ ou [Bun](https://bun.sh/)
- Git

### Passo a Passo

```bash
# 1. Clone o repositório
git clone <repository-url>
cd my-project

# 2. Instale as dependências
bun install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Configure o banco de dados
bun run db:push

# 5. Inicie o servidor de desenvolvimento
bun run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # Rotas de API
│   │   ├── stocks/           # Dados de ações
│   │   ├── favorites/        # Favoritos do usuário
│   │   ├── portfolio/        # Gestão de carteira
│   │   ├── search/           # Busca de ações
│   │   └── import/           # Importação de dados
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página inicial
│   └── globals.css           # Estilos globais
│
├── components/               # Componentes React
│   └── ui/                   # Componentes shadcn/ui
│
├── hooks/                    # Hooks customizados
│   ├── use-mobile.ts         # Detecção mobile
│   └── use-toast.ts          # Sistema de notificações
│
├── lib/                      # Bibliotecas e utilitários
│   ├── b3-stocks.ts          # Dados das ações B3
│   ├── brapi-service.ts      # Integração brapi.dev
│   ├── db.ts                 # Cliente Prisma
│   ├── finance-service.ts    # Serviços financeiros
│   ├── portfolio-import.ts   # Lógica de importação
│   └── utils.ts              # Funções utilitárias
│
└── types/                    # Definições de tipos TypeScript
```

---

## 🔌 APIs e Integrações

### brapi.dev

A aplicação utiliza a API [brapi.dev](https://brapi.dev/) para obter dados em tempo real das ações da B3.

**Funcionalidades integradas:**
- Cotações em tempo real
- Indicadores fundamentalistas
- Logos das empresas
- Lista de ações disponíveis

**Documentação:** [https://brapi.dev/docs](https://brapi.dev/docs)

---

## 🗄️ Modelo de Dados

### Diagrama ER Simplificado

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   Sector    │────<│    Stock    │>────│ PortfolioItem   │
├─────────────┤     ├─────────────┤     ├─────────────────┤
│ id          │     │ id          │     │ id              │
│ name        │     │ ticker      │     │ portfolioId     │
│ description │     │ name        │     │ stockId         │
│ icon        │     │ sectorId    │     │ quantity        │
│ color       │     │ price       │     │ avgPrice        │
└─────────────┘     │ marketCap   │     │ targetWeight    │
                    │ peRatio     │     └─────────────────┘
                    │ dividendYield│
                    │ qualityScore │     ┌─────────────────┐
                    └─────────────┘     │    Favorite     │
                                        ├─────────────────┤
                    ┌─────────────────┐ │ id              │
                    │ PriceHistory    │ │ stockId         │
                    ├─────────────────┤ │ notes           │
                    │ stockId         │ └─────────────────┘
                    │ date            │
                    │ close           │ ┌─────────────────┐
                    │ volume          │ │ PortfolioImport │
                    └─────────────────┘ ├─────────────────┤
                                        │ id              │
                                        │ source          │
                                        │ fileName        │
                                        │ status          │
                                        └─────────────────┘
```

### Principais Entidades

| Entidade | Descrição |
|----------|-----------|
| **Sector** | Setores econômicos (Energia, Bancos, etc.) |
| **Stock** | Ações disponíveis com indicadores |
| **Portfolio** | Carteira do usuário |
| **PortfolioItem** | Posição individual na carteira |
| **Favorite** | Ações favoritas do usuário |
| **PriceHistory** | Histórico de preços |
| **PortfolioImport** | Registro de importações |

---

## 🏭 Setores Cobertos

A aplicação monitora ações dos seguintes setores perenes:

| Setor | Ícone | Cor | Exemplos |
|-------|-------|-----|----------|
| **Energia Elétrica** | ⚡ Zap | Âmbar | TAEE11, CMIG4, EGIE3 |
| **Distribuição de Energia** | 🔌 Plug | Esmeralda | ENGI11, CLSC4 |
| **Bancos** | 🏛️ Landmark | Azul | BBDC4, ITUB4, BBAS3 |
| **Seguradoras** | 🛡️ Shield | Roxo | BBSE3, PSSA3 |
| **Saneamento Básico** | 💧 Droplets | Ciano | SBSP3, CSMG3 |
| **Telecomunicações** | 📱 Phone | Rosa | VIVT3, TIMS3 |
| **Logística** | 🚛 Truck | Laranja | RAIL3, RENT3 |

### Ações "Em Alta" (Dividend Aristocrats)

Empresas com histórico consistente de pagamento de dividendos:
- TAEE11 - Transmissora Aliança de Energia
- CMIG4 - CEMIG
- CPLE6 - Copel
- EGIE3 - Engie Brasil Energia
- BBDC4 - Bradesco
- ITUB4 - Itaú Unibanco
- BBAS3 - Banco do Brasil
- SANB11 - Santander Brasil
- BBSE3 - BB Seguridade
- SBSP3 - Sabesp
- CSMG3 - Copasa
- VIVT3 - Telefônica Brasil
- PETR4 - Petrobras
- VALE3 - Vale

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev          # Inicia servidor de desenvolvimento (porta 3000)

# Build
bun run build        # Gera build de produção
bun start            # Inicia servidor de produção

# Qualidade
bun run lint         # Executa ESLint

# Banco de Dados
bun run db:push      # Sincroniza schema com banco
bun run db:generate  # Gera cliente Prisma
bun run db:migrate   # Cria migração
bun run db:reset     # Reseta banco de dados
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL=file:/home/z/my-project/db/custom.db

# Brapi.dev API
BRAPI_API_KEY=sua_api_key_aqui

# NextAuth.js (opcional)
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

### Obtendo a API Key do brapi.dev

1. Acesse [brapi.dev](https://brapi.dev/)
2. Crie uma conta gratuita
3. Obtenha sua API Key no painel
4. Adicione ao arquivo `.env`

---

## 📱 Responsividade

A aplicação é totalmente responsiva, com breakpoints para:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Recursos Mobile
- Menu lateral colapsável
- Tabelas com scroll horizontal
- Cards adaptáveis
- Touch-friendly interactions

---

## 🎨 Tema

Suporte nativo a temas claro e escuro:
- Detecção automática de preferência do sistema
- Toggle manual no header
- Persistência da escolha

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código
- TypeScript estrito
- ESLint para linting
- Conventional Commits
- Componentes funcionais com hooks

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma [Issue](../../issues)
- Consulte a [documentação](./docs)

---

## 🙏 Agradecimentos

- [brapi.dev](https://brapi.dev/) pela API de dados da B3
- [shadcn/ui](https://ui.shadcn.com/) pelos componentes
- [TradingView](https://www.tradingview.com/) pelos logos
- Comunidade de investidores em dividendos

---

**Desenvolvido com ❤️ para investidores de dividendos**
