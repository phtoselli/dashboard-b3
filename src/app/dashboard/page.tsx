'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Landmark,
  Shield,
  Droplets,
  Phone,
  Truck,
  Star,
  StarOff,
  Rocket,
  Plus,
  Minus,
  RefreshCw,
  Search,
  Wallet,
  PieChart,
  BarChart3,
  Target,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  SortAsc,
  SortDesc,
  Info,
  DollarSign,
  Percent,
  Building2,
  Clock,
  Upload,
  Download,
  FileText,
  FileSpreadsheet,
  X,
  Check,
  History,
  Trash2,
  Link2,
  CloudUpload,
  Copy,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  GraduationCap,
  BookOpen,
  Lightbulb,
  TrendingUp as TrendingUpIcon,
  ArrowRight,
  Play,
  Clock as ClockIcon,
  ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Stock {
  ticker: string;
  name: string;
  sector: string;
  sectorId: string;
  description: string;
  isDividendAristocrat?: boolean;
  price: number | null;
  priceChange: number | null;
  priceChangePercent: number | null;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
  pbRatio: number | null;
  dividendYield: number | null;
  roe: number | null;
  roic: number | null;
  evEbitda: number | null;
  debtToEquity: number | null;
  dividendPerShare: number | null;
  payoutRatio: number | null;
  qualityScore: number | null;
}

interface PortfolioItem {
  id: string;
  quantity: number;
  avgPrice: number;
  targetWeight: number | null;
  notes: string | null;
  stock: Stock & { sector: Sector | null };
  currentValue: number;
  investedValue: number;
  profit: number;
  profitPercent: number;
  estimatedDividend: number;
  weight: number;
}

interface Portfolio {
  id: string;
  name: string;
  description: string | null;
  items: PortfolioItem[];
  totalValue: number;
  totalDividends: number;
  dividendYield: number;
}

interface PortfolioImport {
  id: string;
  source: string;
  fileName: string | null;
  fileType: string | null;
  status: string;
  itemsImported: number;
  itemsSkipped: number;
  errorMessage: string | null;
  importedAt: string;
  brokerConnection?: {
    name: string;
  } | null;
  positions?: {
    ticker: string;
    quantity: number;
    avgPrice: number;
  }[];
}

// Supported brokers
const SUPPORTED_BROKERS = [
  { id: 'xp', name: 'XP Investimentos' },
  { id: 'rico', name: 'Rico' },
  { id: 'clear', name: 'Clear Corretora' },
  { id: 'nuinvest', name: 'Nu Invest' },
  { id: 'btg', name: 'BTG Pactual' },
  { id: 'modal', name: 'Modal Mais' },
  { id: 'toro', name: 'Toro Investimentos' },
  { id: 'trade', name: 'Trade Map' },
  { id: 'sinacor', name: 'Sinacor (B3)' },
  { id: 'other', name: 'Outra' },
];

// Educational content data
interface EducationalContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  readTime: number;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  article: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
    keyTakeaways: string[];
  };
}

const EDUCATIONAL_CONTENT: EducationalContent[] = [
  {
    id: 'metodo-dividendos',
    title: 'Aprendendo a Investir com o Método de Dividendos',
    description: 'Descubra os princípios fundamentais para construir uma carteira focada em recebimento de dividendos e renda passiva.',
    icon: 'Lightbulb',
    color: 'emerald',
    readTime: 15,
    level: 'Iniciante',
    article: {
      introduction: 'O investimento em empresas pagadoras de dividendos é uma das estratégias mais consagradas para construir patrimônio de longo prazo. Este método, popularizado por investidores como Luiz Barsi, foca em empresas maduras, lucrativas e que distribuem parte de seus lucros aos acionistas de forma recorrente.',
      sections: [
        {
          title: 'O Que São Dividendos?',
          content: 'Dividendos são parcelas do lucro líquido de uma empresa que são distribuídas aos acionistas como forma de remuneração. Quando você possui ações de uma empresa, você se torna sócio dela e, consequentemente, tem direito a receber parte dos lucros gerados.\n\nAs empresas que pagam dividendos regularmente geralmente são companhias maduras, com negócios consolidados e fluxo de caixa estável. Elas não precisam reinvestir todo o lucro para crescer, então optam por distribuir parte aos acionistas.'
        },
        {
          title: 'A Filosofia do Investimento em Dividendos',
          content: 'A estratégia de dividendos se baseia na ideia de que você não precisa vender suas ações para gerar renda. Ao contrário do trading, onde você compra barato para vender caro, no investimento em dividendos você mantém as ações e recebe pagamentos regulares.\n\nEsta abordagem permite que você:\n\n• Gere renda passiva mensal ou trimestral\n• Se beneficie do efeito dos juros compostos ao reinvestir os dividendos\n• Tenha menos preocupação com a volatilidade de curto prazo do mercado\n• Construa patrimônio de forma gradual e consistente'
        },
        {
          title: 'Características das Boas Pagadoras de Dividendos',
          content: 'Empresas excelentes para uma estratégia de dividendos costumam apresentar:\n\n• Histórico consistente de pagamentos (aristocratas de dividendos)\n• Setores perenes (energia, bancos, saneamento, seguros)\n• Baixa necessidade de reinvestimento de capital\n• Governança corporativa sólida\n• Dívida controlada\n• Margens de lucro estáveis\n\nO ideal é buscar empresas que paguem entre 4% e 8% de dividend yield, pois valores muito altos podem indicar problemas na empresa.'
        },
        {
          title: 'O Poder dos Juros Compostos',
          content: 'Um dos maiores benefícios de investir em dividendos é o poder dos juros compostos. Ao reinvestir os dividendos recebidos, você compra mais ações, que por sua vez geram mais dividendos.\n\nPor exemplo, se você investir R$ 10.000 em ações com dividend yield de 6% ao ano e reinvestir todos os dividendos por 20 anos, você terá aproximadamente R$ 32.000, mesmo sem aportar nada a mais.\n\nEste efeito "bola de neve" é o que permite que muitos investidores construam patrimônios significativos ao longo do tempo.'
        },
        {
          title: 'Montando Sua Primeira Carteira',
          content: 'Para começar sua jornada no investimento em dividendos:\n\n1. Defina seu objetivo: renda passiva mensal ou crescimento patrimonial?\n2. Escolha setores perenes e diversificados\n3. Analise os fundamentos das empresas\n4. Verifique o histórico de pagamentos\n5. Construa uma carteira com pelo menos 10-15 empresas\n6. Aporte regularmente (idealmente todo mês)\n7. Reinvista os dividendos no início\n\nLembre-se: paciência e consistência são as chaves do sucesso.'
        }
      ],
      conclusion: 'O método de dividendos não é uma estratégia de enriquecimento rápido, mas sim de construção de patrimônio sólido e duradouro. Ao focar em empresas de qualidade, com negócios perenes e boa distribuição de lucros, você constrói uma fonte de renda passiva que cresce ao longo do tempo.',
      keyTakeaways: [
        'Dividendos são pagamentos de parte do lucro aos acionistas',
        'Empresas maduras de setores perenes são as melhores pagadoras',
        'Reinvestir dividendos acelera a construção de patrimônio',
        'Paciência e consistência são fundamentais',
        'Diversificação entre setores reduz riscos'
      ]
    }
  },
  {
    id: 'escolhendo-empresas',
    title: 'Como Escolher Boas Empresas e Criar uma Carteira de Dividendos',
    description: 'Aprenda a analisar fundamentos e selecionar as melhores empresas para sua carteira de dividendos.',
    icon: 'Target',
    color: 'blue',
    readTime: 20,
    level: 'Intermediário',
    article: {
      introduction: 'Escolher boas empresas para investir é fundamental para o sucesso da estratégia de dividendos. Neste guia, vamos explorar os principais indicadores e critérios que ajudam a identificar empresas sólidas, lucrativas e com potencial para continuar pagando dividendos por muitos anos.',
      sections: [
        {
          title: 'Analisando a Qualidade da Empresa',
          content: 'Antes de qualquer análise numérica, é importante entender o negócio da empresa:\n\n• A empresa vende produtos/serviços essenciais?\n• Ela possui vantagens competitivas (marcas fortes, barreiras de entrada)?\n• O setor é regulamentado e estável?\n• A empresa é líder ou está bem posicionada no mercado?\n\nEmpresas de setores perenes como energia elétrica, saneamento, bancos e seguros tendem a ser mais estáveis e previsíveis, características ideais para investidores de dividendos.'
        },
        {
          title: 'Indicadores Fundamentais',
          content: 'Os principais indicadores para analisar empresas de dividendos:\n\n**Dividend Yield (DY)**: Indica quanto a empresa paga em dividendos em relação ao preço da ação. O ideal é entre 4% e 8%.\n\n**P/L (Preço/Lucro)**: Indica quanto o mercado está disposto a pagar por cada real de lucro. Valores entre 8x e 15x são considerados razoáveis.\n\n**P/VP (Preço/Valor Patrimonial)**: Compara o preço da ação com o patrimônio líquido por ação. Abaixo de 2x é interessante.\n\n**ROE (Retorno sobre Patrimônio)**: Mede a eficiência da empresa em gerar lucro. Acima de 15% é bom.\n\n**Dívida Líquida/EBITDA**: Indica o nível de endividamento. Abaixo de 3x é saudável.'
        },
        {
          title: 'O Score de Qualidade',
          content: 'Para facilitar a análise, podemos criar um score de qualidade que combina vários indicadores:\n\n1. Dividend Yield entre 4-8%: +20 pontos\n2. P/L entre 8-15x: +20 pontos\n3. P/VP abaixo de 2x: +15 pontos\n4. ROE acima de 15%: +20 pontos\n5. Dívida/Patrimônio abaixo de 1x: +15 pontos\n6. Histórico de dividendos: +10 pontos\n\nEmpresas com score acima de 70 são consideradas de alta qualidade para dividendos.'
        },
        {
          title: 'Diversificação Setorial',
          content: 'Uma carteira bem construída deve ter diversificação setorial para reduzir riscos:\n\n• **Energia Elétrica**: Estável, fluxo de caixa previsível\n• **Saneamento**: Monopólios naturais, contratos longos\n• **Bancos**: Lucrativos, dividendos consistentes\n• **Seguros**: Setor perene, boa rentabilidade\n• **Logística**: Essencial para a economia\n• **Telecomunicações**: Recorrência de receita\n\nEvite concentrar mais de 20% da carteira em um único setor.'
        },
        {
          title: 'Verificando o Histórico',
          content: 'O histórico de uma empresa revela muito sobre sua qualidade:\n\n• **Histórico de dividendos**: A empresa paga há quanto tempo? Cresceu os pagamentos?\n• **Consistência de lucros**: A empresa é lucrativa há quantos anos?\n• **Crises passadas**: Como a empresa reagiu em crises anteriores?\n• **Governança**: Há escândalos ou problemas com minoritários?\n\nEmpresas aristocratas de dividendos (que aumentam pagamentos por 25+ anos) são as mais seguras.'
        }
      ],
      conclusion: 'A análise fundamentalista é essencial para identificar boas empresas de dividendos. Foque em negócios de qualidade, com indicadores saudáveis, história consistente e boa governança. Lembre-se: uma empresa bem escolhida pode pagar dividendos por décadas.',
      keyTakeaways: [
        'Analise o negócio antes dos números',
        'Busque DY entre 4-8%, P/L entre 8-15x, ROE > 15%',
        'Diversifique entre setores perenes',
        'Verifique o histórico de pagamentos',
        'Empresas aristocratas são mais seguras'
      ]
    }
  },
  {
    id: 'crises-e-altas',
    title: 'O Que Fazer em Tempos de Crise e Tempos de Alta',
    description: 'Entenda como posicionar sua carteira em diferentes ciclos econômicos e proteger seu patrimônio.',
    icon: 'TrendingUp',
    color: 'amber',
    readTime: 18,
    level: 'Intermediário',
    article: {
      introduction: 'O mercado financeiro é cíclico por natureza. Existem momentos de euforia, quando os preços sobem, e momentos de pessimismo, quando os preços caem. Para o investidor de dividendos, entender como navegar esses ciclos é fundamental para maximizar retornos e minimizar riscos.',
      sections: [
        {
          title: 'Entendendo os Ciclos Econômicos',
          content: 'A economia passa por ciclos que podem durar anos:\n\n• **Expansão**: Economia crescendo, empresas lucrativas, desemprego baixo\n• **Pico**: Crescimento desacelera, inflação pode subir, juros sobem\n• **Contração**: Economia encolhe, lucros caem, desemprego sobe\n• **Fundo**: Pior momento passa, juros caem, recuperação começa\n\nCada fase afeta diferentes setores de formas distintas. Empresas cíclicas sofrem mais em contrações, enquanto empresas defensivas são mais resilientes.'
        },
        {
          title: 'Comportamento em Tempos de Crise',
          content: 'Em momentos de crise, o investidor de dividendos deve:\n\n**1. Manter a calma**: Crises são temporárias. Empresas de qualidade sobrevivem e se fortalecem.\n\n**2. Não vender por pânico**: Vender no fundo cristaliza prejuízos. Lembre-se que você investiu para receber dividendos, não para fazer trading.\n\n**3. Continuar aportando**: Comprar ações baratas é uma oportunidade. O mesmo aporte compra mais ações.\n\n**4. Verificar os fundamentos**: Empresas realmente afetadas podem precisar ser trocadas.\n\n**5. Aproveitar os dividendos**: Em crise, os juros sobem, mas seus dividendos continuam caindo na conta.'
        },
        {
          title: 'Oportunidades em Crises',
          content: 'Crises criam excelentes oportunidades:\n\n• **Preços menores**: Ações de qualidade ficam mais baratas\n• **Dividend Yield maior**: Com preço menor, o yield aumenta\n• **Mais ações pelo mesmo valor**: Seu aporte compra mais unidades\n\nInvestidores como Warren Buffett e Luiz Barsi construíram grande parte de seus patrimônios comprando em momentos de crise.'
        },
        {
          title: 'Comportamento em Tempos de Alta',
          content: 'Quando o mercado está em alta:\n\n**1. Não eufóricos**: Não aumente os preços que está disposto a pagar por uma ação\n\n**2. Mantenha a disciplina**: Continue analisando fundamentos, não apenas o momentum\n\n**3. Reveja posições muito valorizadas**: Se uma ação subiu muito e está cara, considere realizar parcialmente\n\n**4. Aumente a reserva**: Guarde parte dos dividendos para oportunidades futuras\n\n**5. Não se apresse para comprar**: Em alta, boas oportunidades são mais raras'
        },
        {
          title: 'Setores Defensivos vs Cíclicos',
          content: 'Em diferentes ciclos, setores se comportam de formas distintas:\n\n**Setores Defensivos (melhores em crise):**\n• Energia elétrica\n• Saneamento\n• Serviços essenciais\n• Alimentos básicos\n\n**Setores Cíclicos (melhores em alta):**\n• Construção civil\n• Varejo de bens duráveis\n• Automobilístico\n• Viagens e turismo\n\nO ideal é ter uma carteira balanceada entre os dois tipos.'
        }
      ],
      conclusion: 'Crises e altas fazem parte do mercado. O investidor de dividendos bem-sucedido é aquele que mantém a disciplina, aproveita oportunidades em momentos de pessimismo e mantém a cautela em momentos de euforia. O foco deve ser sempre nos fundamentos das empresas, não no humor do mercado.',
      keyTakeaways: [
        'Crises são oportunidades para comprar barato',
        'Não venda por pânico em crises',
        'Em alta, mantenha disciplina nos preços',
        'Diversifique entre setores defensivos e cíclicos',
        'Foco nos fundamentos, não no humor do mercado'
      ]
    }
  },
  {
    id: 'swap-acoes',
    title: 'Como Fazer o "Swap" de Ações: Trocar uma Empresa por Outra',
    description: 'Aprenda quando e como trocar posições da sua carteira para otimizar rendimentos e reduzir riscos.',
    icon: 'ArrowRight',
    color: 'purple',
    readTime: 15,
    level: 'Avançado',
    article: {
      introduction: 'O "swap" de ações é a troca de uma posição por outra em sua carteira. Esta é uma ferramenta poderosa para otimizar sua estratégia de dividendos, mas deve ser usada com critério e conhecimento. Neste guia, vamos explorar quando, como e por que fazer swaps inteligentes.',
      sections: [
        {
          title: 'Quando Fazer Swap de Ações',
          content: 'O swap pode ser considerado em situações como:\n\n**Deterioração dos Fundamentos:**\n• A empresa apresenta queda consistente nos lucros\n• O endividamento aumentou significativamente\n• Houve problemas de governança\n• O pagamento de dividendos foi reduzido ou suspenso\n\n**Oportunidades Melhores:**\n• Encontrou empresa com indicadores superiores\n• Mesmo setor, mas concorrente melhor posicionado\n• Preço muito atrativo em relação aos fundamentos\n\n**Rebalanceamento da Carteira:**\n• Concentração excessiva em um setor\n• Necessidade de diversificação'
        },
        {
          title: 'Como Avaliar se o Swap Vale a Pena',
          content: 'Antes de fazer um swap, analise:\n\n**1. Comparação de Fundamentos:**\n• Dividend Yield da nova é maior?\n• Qualidade geral é superior?\n• Histórico de pagamentos é melhor?\n\n**2. Custos da Transação:**\n• Corretagem\n• Imposto de Renda (se houver ganho)\n• Spread de compra/venda\n\n**3. Timing Tributário:**\n• Se vender antes de 30 dias, há ganho de capital?\n• Ações compradas há mais tempo têm menor imposto?\n\n**4. Impacto na Renda de Dividendos:**\n• O swap aumenta ou mantém sua renda passiva?'
        },
        {
          title: 'O Processo de Swap Passo a Passo',
          content: 'Para fazer um swap inteligente:\n\n**Passo 1 - Análise:**\nIdentifique a empresa que deseja vender e a que deseja comprar. Compare todos os indicadores.\n\n**Passo 2 - Verificação:**\nConfirme que a nova empresa é realmente superior. Não troque apenas por dividend yield maior.\n\n**Passo 3 - Planejamento Tributário:**\nVerifique se há ganho de capital e calcule o imposto devido.\n\n**Passo 4 - Execução:**\nVenda a posição antiga e compre a nova. Idealmente, faça no mesmo dia para minimizar risco de mercado.\n\n**Passo 5 - Documentação:**\nRegistre a operação para controle de IR e análise futura.'
        },
        {
          title: 'Erros Comuns a Evitar',
          content: '**Trocar por Yield Alto:**\nUm dividend yield muito alto pode indicar problema na empresa. Analise o motivo.\n\n**Trocar por Impaciência:**\nNão troque porque a ação "não sobe". O foco é dividendos, não valorização.\n\n**Trocar Muito Frequentemente:**\nCada troca gera custos e pode gerar impostos. Seja seletivo.\n\n**Ignorar o Setor:**\nTrocar por empresa de setor muito diferente pode alterar o perfil de risco da carteira.\n\n**Não Considerar o Histórico:**\nUma empresa com histórico consistente pode ser melhor que uma com indicadores momentaneamente melhores.'
        },
        {
          title: 'Swap Parcial vs Total',
          content: 'Nem sempre é necessário trocar toda a posição:\n\n**Swap Parcial:**\n• Mantém exposição à empresa original\n• Reduz risco da nova posição\n• Permite testar a tese com menor comprometimento\n\n**Swap Total:**\n• Mais indicado quando os fundamentos deterioraram muito\n• Limpa a carteira de posições problemáticas\n• Simplifica a gestão\n\nEm muitos casos, um swap parcial (50-70%) é mais prudente.'
        }
      ],
      conclusion: 'O swap de ações é uma ferramenta valiosa para otimizar sua carteira de dividendos, mas deve ser usado com moderação e análise criteriosa. Lembre-se: a melhor estratégia é ter paciência com empresas de qualidade. Só troque quando houver clara vantagem ou necessidade.',
      keyTakeaways: [
        'Só faça swap com análise criteriosa',
        'Considere custos e impostos na decisão',
        'Prefira swap parcial quando incerto',
        'Não troque por impaciência ou yield alto isoladamente',
        'Documente todas as operações'
      ]
    }
  },
  {
    id: 'metricas-e-termos',
    title: 'Métricas e Termos Técnicos: Guia Completo',
    description: 'Entenda todos os indicadores, siglas e termos técnicos utilizados na análise de empresas e dividendos.',
    icon: 'BookOpen',
    color: 'teal',
    readTime: 25,
    level: 'Iniciante',
    article: {
      introduction: 'O mercado financeiro possui uma linguagem própria, repleta de siglas e termos que podem parecer intimidadores para iniciantes. Este guia completo vai te ajudar a entender todos os principais conceitos para analisar empresas e tomar decisões de investimento mais informadas.',
      sections: [
        {
          title: 'Tipos de Ações na B3',
          content: '**Ações Ordinárias (ON - Final 3):**\nDão direito a voto em assembleias. Exemplo: PETR3 (Petrobras ON)\n\n**Ações Preferenciais (PN - Final 4):**\nPrioridade no recebimento de dividendos, mas geralmente sem direito a voto. Exemplo: PETR4 (Petrobras PN)\n\n**Units (Final 11):**\nPacote que combina ações ON e PN. Exemplo: BBSE3, BBDC3\n\n**Qual escolher?**\nPara investidores de dividendos, PN e Units costumam ser mais interessantes pela prioridade no pagamento de proventos.'
        },
        {
          title: 'Indicadores de Valor',
          content: '**P/L (Preço/Lucro):**\nQuantos anos de lucro você está pagando pela ação. P/L de 10 significa que a empresa precisa 10 anos de lucro atual para "pagar" seu preço de mercado.\n\n• Baixo (< 10): Pode estar barata ou com problemas\n• Médio (10-15): Justo para empresas maduras\n• Alto (> 20): Pode estar cara ou com expectativa de crescimento\n\n**P/VP (Preço/Valor Patrimonial):**\nCompara o preço da ação com o patrimônio líquido por ação.\n\n• < 1: Ação está sendo negociada abaixo do seu valor contábil\n• 1-2: Faixa comum para empresas consolidadas\n• > 3: Pode indicar alta expectativa de crescimento'
        },
        {
          title: 'Indicadores de Rentabilidade',
          content: '**ROE (Retorno sobre Patrimônio):**\nMede quanto de lucro a empresa gera com o capital dos sócios.\n\nROE = Lucro Líquido / Patrimônio Líquido\n\n• < 10%: Baixa eficiência\n• 10-15%: Razoável\n• > 15%: Bom\n• > 20%: Excelente\n\n**ROIC (Retorno sobre Capital Investido):**\nSimilar ao ROE, mas considera toda a estrutura de capital, incluindo dívidas.\n\n**Margem Líquida:**\nPercentual do faturamento que vira lucro.\n\nMargem = Lucro Líquido / Receita'
        },
        {
          title: 'Indicadores de Endividamento',
          content: '**Dívida Líquida/EBITDA:**\nMede quantos "anos de caixa" a empresa precisa para pagar sua dívida.\n\n• < 1x: Dívida baixa\n• 1-3x: Nível saudável\n• > 3x: Atenção\n• > 5x: Alto risco\n\n**Dívida/Patrimônio (D/E):**\nCompara a dívida com o capital próprio.\n\n• < 0,5x: Conservador\n• 0,5-1x: Moderado\n• > 1x: Alavancado\n\n**EBITDA:**\nLucro antes de juros, impostos, depreciação e amortização. Indica o caixa operacional da empresa.'
        },
        {
          title: 'Indicadores de Dividendos',
          content: '**Dividend Yield (DY):**\nRendimento de dividendos em relação ao preço da ação.\n\nDY = (Dividendos por Ação / Preço da Ação) × 100\n\n• 2-4%: Baixo para estratégia de dividendos\n• 4-8%: Faixa ideal\n• > 10%: Atenção - pode ser sinal de problema\n\n**Payout:**\nPercentual do lucro que é distribuído como dividendos.\n\nPayout = (Dividendos / Lucro Líquido) × 100\n\n• 20-40%: Conservador, boa retenção para crescimento\n• 40-70%: Equilibrado\n• > 80%: Alto - pode não ser sustentável\n\n**Dividendos por Ação (DPA):**\nValor total de dividendos pagos por cada ação.'
        },
        {
          title: 'Outros Termos Importantes',
          content: '**Valor de Mercado (Market Cap):**\nValor total da empresa no mercado.\n\nMarket Cap = Preço da Ação × Número de Ações\n\n• Small Cap: < R$ 2 bilhões\n• Mid Cap: R$ 2-10 bilhões\n• Large Cap: > R$ 10 bilhões\n\n**Volatilidade:**\nVariação do preço da ação. Alta volatilidade = grandes oscilações.\n\n**Liquidez:**\nFacilidade de comprar/vender a ação. Alta liquidez = mais volume de negociação.\n\n**Gap de Dividendos:**\nQueda do preço da ação no dia em que ela "vai ex-dividendo" (quem comprar não tem direito ao dividendo).\n\n**Data Com:**\nData em que você precisa estar posicionado para ter direito ao dividendo.\n\n**Data Ex:**\nData a partir da qual a ação é negociada sem direito ao dividendo.'
        }
      ],
      conclusion: 'Dominar os termos e indicadores do mercado financeiro é essencial para tomar decisões de investimento mais assertivas. Com este conhecimento, você será capaz de analisar empresas com mais propriedade e construir uma carteira de dividendos mais sólida e rentável.',
      keyTakeaways: [
        'Ações PN (final 4) têm prioridade em dividendos',
        'P/L entre 8-15x e P/VP < 2x são referências',
        'ROE > 15% indica boa eficiência',
        'Dividend Yield ideal: 4-8%',
        'Entenda os prazos: Data Com vs Data Ex'
      ]
    }
  }
];

// Sector icons mapping
const sectorIcons: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-4 w-4" />,
  Plug: <Zap className="h-4 w-4" />,
  Landmark: <Landmark className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  Droplets: <Droplets className="h-4 w-4" />,
  Phone: <Phone className="h-4 w-4" />,
  Truck: <Truck className="h-4 w-4" />,
};

// Format helpers
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatPercent = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return `${(value * 100).toFixed(2)}%`;
};

const formatNumber = (value: number | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined) return '-';
  return value.toFixed(decimals);
};

const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Get company logo URL
const getCompanyLogoUrl = (ticker: string): string | null => {
  const symbol = ticker.replace('.SA', '');
  // Using TradingView's logo service
  return `https://s3-symbol-logo.tradingview.com/br-${symbol}--big.png`;
};

// Get initials for logo fallback
const getCompanyInitials = (ticker: string): string => {
  const symbol = ticker.replace('.SA', '');
  // Remove numbers at the end (3, 4, 11, etc.)
  const letters = symbol.replace(/\d+$/, '');
  return letters.substring(0, 2).toUpperCase();
};

// Color palette by sector for logo fallback
const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  // Energia Elétrica - Amarelo/Âmbar
  'energia': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
  // Distribuição de Energia - Verde
  'distribuicao': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
  // Bancos - Azul
  'bancos': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
  // Seguradoras - Roxo
  'seguradoras': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
  // Saneamento Básico - Ciano
  'saneamento': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' },
  // Telecomunicações - Rosa
  'telecom': { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400' },
  // Logística - Laranja
  'logistica': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
  // Default - Teal
  'default': { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400' },
};

// Get color based on sector
const getLogoColor = (sectorId: string): { bg: string; text: string } => {
  return SECTOR_COLORS[sectorId] || SECTOR_COLORS['default'];
};

// Filter state interface
interface FilterState {
  sortBy: 'qualityScore' | 'dividendYield' | 'peRatio' | 'pbRatio' | 'roe' | 'marketCap';
  sortOrder: 'asc' | 'desc';
  minDividendYield: number;
  maxPERatio: number;
  minROE: number;
  maxDebtToEquity: number;
  minQualityScore: number;
  showAristocrats: boolean;
  showOnlyFavorites: boolean;
}

const defaultFilters: FilterState = {
  sortBy: 'qualityScore',
  sortOrder: 'desc',
  minDividendYield: 0,
  maxPERatio: 50,
  minROE: 0,
  maxDebtToEquity: 5,
  minQualityScore: 0,
  showAristocrats: false,
  showOnlyFavorites: false,
};

// Company Logo Component with fallback
function CompanyLogo({ ticker, name, sectorId }: { ticker: string; name: string; sectorId: string }) {
  const [imageError, setImageError] = useState(false);
  const logoUrl = getCompanyLogoUrl(ticker);
  const initials = getCompanyInitials(ticker);
  const colors = getLogoColor(sectorId);

  if (imageError || !logoUrl) {
    return (
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg}`}>
        <span className={`text-xs font-bold ${colors.text}`}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <img
        src={logoUrl}
        alt={name}
        className="h-7 w-7 object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function B3DividendosApp() {
  // State
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [importHistory, setImportHistory] = useState<PortfolioImport[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [activeTab, setActiveTab] = useState('stocks');
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  // Dialog states
  const [addStockDialog, setAddStockDialog] = useState(false);
  const [importDialog, setImportDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  
  // Import states
  const [importMethod, setImportMethod] = useState<'file' | 'text'>('file');
  const [selectedBroker, setSelectedBroker] = useState('');
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Education state
  const [selectedEducation, setSelectedEducation] = useState<EducationalContent | null>(null);

  // Fetch stocks
  const fetchStocks = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (refresh) params.append('refresh', 'true');

      const response = await fetch(`/api/stocks?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setStocks(data.stocks);
        setSectors(data.sectors);
      }
    } catch (error) {
      console.error('Error fetching stocks:', error);
      toast.error('Erro ao carregar ações');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery]);

  // Fetch portfolio
  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      if (data.success) {
        setPortfolio(data.portfolio);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  }, []);

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      if (data.success) {
        setFavorites(data.favorites.map((f: { stockId: string }) => f.stockId));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, []);

  // Fetch import history
  const fetchImportHistory = useCallback(async () => {
    try {
      const response = await fetch('/api/import');
      const data = await response.json();
      if (data.success) {
        setImportHistory(data.imports);
      }
    } catch (error) {
      console.error('Error fetching import history:', error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
    fetchFavorites();
    fetchImportHistory();
  }, [fetchStocks, fetchPortfolio, fetchFavorites, fetchImportHistory]);

  // Reset filters
  const resetFilters = () => {
    setFilters(defaultFilters);
    setSelectedSector('all');
  };

  // Apply filters and sort
  const filteredAndSortedStocks = stocks
    .filter(stock => {
      // Sector filter
      if (selectedSector !== 'all' && stock.sectorId !== selectedSector) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!stock.ticker.toLowerCase().includes(query) && 
            !stock.name.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Dividend Yield filter
      if (stock.dividendYield !== null && stock.dividendYield * 100 < filters.minDividendYield) {
        return false;
      }
      
      // P/E Ratio filter
      if (stock.peRatio !== null && stock.peRatio > filters.maxPERatio) {
        return false;
      }
      
      // ROE filter
      if (stock.roe !== null && stock.roe * 100 < filters.minROE) {
        return false;
      }
      
      // Debt to Equity filter
      if (stock.debtToEquity !== null && stock.debtToEquity > filters.maxDebtToEquity) {
        return false;
      }
      
      // Quality Score filter
      if (stock.qualityScore !== null && stock.qualityScore < filters.minQualityScore) {
        return false;
      }
      
      // Aristocrats filter
      if (filters.showAristocrats && !stock.isDividendAristocrat) {
        return false;
      }
      
      // Favorites filter
      if (filters.showOnlyFavorites && !favorites.includes(stock.ticker)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy] ?? -Infinity;
      const bValue = b[filters.sortBy] ?? -Infinity;
      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  // Count active filters
  const activeFiltersCount = [
    filters.minDividendYield > 0,
    filters.maxPERatio < 50,
    filters.minROE > 0,
    filters.maxDebtToEquity < 5,
    filters.minQualityScore > 0,
    filters.showAristocrats,
    filters.showOnlyFavorites,
    selectedSector !== 'all',
  ].filter(Boolean).length;

  // Handle file drag
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file select
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  // Import portfolio
  const handleImport = useCallback(async () => {
    if (importMethod === 'file' && !selectedFile) {
      toast.error('Selecione um arquivo para importar');
      return;
    }
    if (importMethod === 'text' && !importText.trim()) {
      toast.error('Cole o conteúdo da sua posição');
      return;
    }

    setImporting(true);

    try {
      const formData = new FormData();
      
      if (importMethod === 'file' && selectedFile) {
        formData.append('file', selectedFile);
      } else if (importMethod === 'text') {
        formData.append('text', importText);
      }
      
      if (selectedBroker) {
        formData.append('broker', selectedBroker);
      }

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setImportDialog(false);
        setSelectedFile(null);
        setImportText('');
        setSelectedBroker('');
        fetchPortfolio();
        fetchImportHistory();
      } else {
        toast.error(data.error || 'Erro ao importar');
      }
    } catch {
      toast.error('Erro ao importar carteira');
    } finally {
      setImporting(false);
    }
  }, [importMethod, selectedFile, importText, selectedBroker, fetchPortfolio, fetchImportHistory]);

  // Clear portfolio
  const handleClearPortfolio = useCallback(async () => {
    if (!confirm('Tem certeza que deseja limpar toda a carteira?')) return;

    try {
      const response = await fetch('/api/import', { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Carteira limpa com sucesso');
        fetchPortfolio();
      }
    } catch {
      toast.error('Erro ao limpar carteira');
    }
  }, [fetchPortfolio]);

  // Add to portfolio
  const addToPortfolio = async () => {
    if (!selectedStock || !quantity || !avgPrice) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: selectedStock.ticker,
          quantity: parseFloat(quantity),
          avgPrice: parseFloat(avgPrice),
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Ação adicionada à carteira');
        setAddStockDialog(false);
        setQuantity('');
        setAvgPrice('');
        setSelectedStock(null);
        fetchPortfolio();
      } else {
        toast.error(data.error || 'Erro ao adicionar ação');
      }
    } catch {
      toast.error('Erro ao adicionar ação');
    }
  };

  // Remove from portfolio
  const removeFromPortfolio = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success('Ação removida da carteira');
        fetchPortfolio();
      }
    } catch {
      toast.error('Erro ao remover ação');
    }
  };

  // Toggle favorite
  const toggleFavorite = async (ticker: string) => {
    try {
      const isFavorite = favorites.includes(ticker);
      
      if (isFavorite) {
        const response = await fetch(`/api/favorites?ticker=${ticker}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          setFavorites(prev => prev.filter(id => id !== ticker));
          toast.success('Removido dos favoritos');
        }
      } else {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker }),
        });
        const data = await response.json();
        if (data.success) {
          setFavorites(prev => [...prev, ticker]);
          toast.success('Adicionado aos favoritos');
        }
      }
    } catch {
      toast.error('Erro ao atualizar favoritos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <TooltipProvider>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    B3 Dividendos
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Setores Perenes · Dividendos
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setImportDialog(true)}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Importar</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchStocks(true)}
                  disabled={refreshing}
                >
                  {refreshing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ações Analisadas</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{stocks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <Rocket className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Em Alta</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {stocks.filter(s => s.isDividendAristocrat).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Carteira</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {formatCurrency(portfolio?.totalValue || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Percent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">DY Médio</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {portfolio?.dividendYield ? formatPercent(portfolio.dividendYield / 100) : '-'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="stocks" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Ações</span>
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Carteira</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Análise</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Educação</span>
              </TabsTrigger>
            </TabsList>

            {/* Stocks Tab */}
            <TabsContent value="stocks" className="space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Buscar ação por ticker ou nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 relative">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">Filtros</span>
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[420px] sm:w-[500px] p-0 flex flex-col">
                    {/* Header Section */}
                    <div className="px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                      <SheetHeader className="space-y-1">
                        <SheetTitle className="flex items-center gap-3 text-lg">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                            <SlidersHorizontal className="h-4 w-4" />
                          </div>
                          Filtros Avançados
                        </SheetTitle>
                        <SheetDescription className="pl-11">
                          Refine sua busca com filtros detalhados
                        </SheetDescription>
                      </SheetHeader>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                      <div className="space-y-5">
                        {/* Sorting Section */}
                        <Card className="border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                              <ArrowUpDown className="h-4 w-4 text-emerald-600" />
                              Ordenação
                            </div>
                            <div className="flex gap-2">
                              <Select 
                                value={filters.sortBy} 
                                onValueChange={(v) => setFilters(prev => ({ ...prev, sortBy: v as FilterState['sortBy'] }))}
                              >
                                <SelectTrigger className="flex-1 bg-white dark:bg-slate-900">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="qualityScore">Score de Qualidade</SelectItem>
                                  <SelectItem value="dividendYield">Dividend Yield</SelectItem>
                                  <SelectItem value="peRatio">P/L</SelectItem>
                                  <SelectItem value="pbRatio">P/VP</SelectItem>
                                  <SelectItem value="roe">ROE</SelectItem>
                                  <SelectItem value="marketCap">Valor de Mercado</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setFilters(prev => ({ 
                                  ...prev, 
                                  sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' 
                                }))}
                                className="bg-white dark:bg-slate-900"
                              >
                                {filters.sortOrder === 'desc' ? (
                                  <SortDesc className="h-4 w-4" />
                                ) : (
                                  <SortAsc className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Indicators Section */}
                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 px-1">
                            <Target className="h-4 w-4 text-emerald-600" />
                            Indicadores Fundamentais
                          </h4>
                          
                          <div className="grid gap-3">
                            {/* Dividend Yield */}
                            <Card className="border border-slate-200 dark:border-slate-700">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Dividend Yield Mínimo
                                  </Label>
                                  <Badge variant="outline" className="font-mono text-emerald-600 border-emerald-200 dark:border-emerald-800">
                                    {filters.minDividendYield}%
                                  </Badge>
                                </div>
                                <Slider
                                  value={[filters.minDividendYield]}
                                  onValueChange={([v]) => setFilters(prev => ({ ...prev, minDividendYield: v }))}
                                  max={20}
                                  step={0.5}
                                  className="py-2"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Ideal: 4-8% para empresas maduras
                                </p>
                              </CardContent>
                            </Card>

                            {/* P/E Ratio */}
                            <Card className="border border-slate-200 dark:border-slate-700">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    P/L Máximo
                                  </Label>
                                  <Badge variant="outline" className="font-mono text-blue-600 border-blue-200 dark:border-blue-800">
                                    {filters.maxPERatio}x
                                  </Badge>
                                </div>
                                <Slider
                                  value={[filters.maxPERatio]}
                                  onValueChange={([v]) => setFilters(prev => ({ ...prev, maxPERatio: v }))}
                                  max={50}
                                  step={1}
                                  className="py-2"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Ideal: 8-15x para empresas maduras
                                </p>
                              </CardContent>
                            </Card>

                            {/* ROE */}
                            <Card className="border border-slate-200 dark:border-slate-700">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    ROE Mínimo
                                  </Label>
                                  <Badge variant="outline" className="font-mono text-purple-600 border-purple-200 dark:border-purple-800">
                                    {filters.minROE}%
                                  </Badge>
                                </div>
                                <Slider
                                  value={[filters.minROE]}
                                  onValueChange={([v]) => setFilters(prev => ({ ...prev, minROE: v }))}
                                  max={50}
                                  step={1}
                                  className="py-2"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Ideal: acima de 15%
                                </p>
                              </CardContent>
                            </Card>

                            {/* Quality Score */}
                            <Card className="border border-slate-200 dark:border-slate-700">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Score de Qualidade Mínimo
                                  </Label>
                                  <Badge variant="outline" className="font-mono text-teal-600 border-teal-200 dark:border-teal-800">
                                    {filters.minQualityScore}
                                  </Badge>
                                </div>
                                <Slider
                                  value={[filters.minQualityScore]}
                                  onValueChange={([v]) => setFilters(prev => ({ ...prev, minQualityScore: v }))}
                                  max={100}
                                  step={5}
                                  className="py-2"
                                />
                              </CardContent>
                            </Card>

                            {/* Debt to Equity */}
                            <Card className="border border-slate-200 dark:border-slate-700">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Dívida/Patrimônio Máximo
                                  </Label>
                                  <Badge variant="outline" className="font-mono text-orange-600 border-orange-200 dark:border-orange-800">
                                    {filters.maxDebtToEquity.toFixed(1)}x
                                  </Badge>
                                </div>
                                <Slider
                                  value={[filters.maxDebtToEquity]}
                                  onValueChange={([v]) => setFilters(prev => ({ ...prev, maxDebtToEquity: v }))}
                                  max={5}
                                  step={0.1}
                                  className="py-2"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Ideal: abaixo de 1.0x
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Toggle Filters Section */}
                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 px-1">
                            <Star className="h-4 w-4 text-amber-500" />
                            Filtros Especiais
                          </h4>
                          
                          <Card className="border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
                            <div className="flex items-center justify-between p-4">
                              <div className="space-y-0.5">
                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Apenas Em Alta
                                </Label>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Empresas com histórico de dividendos
                                </p>
                              </div>
                              <Switch
                                checked={filters.showAristocrats}
                                onCheckedChange={(checked) => 
                                  setFilters(prev => ({ ...prev, showAristocrats: checked }))
                                }
                              />
                            </div>

                            <div className="flex items-center justify-between p-4">
                              <div className="space-y-0.5">
                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Apenas Favoritos
                                </Label>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Mostrar somente ações favoritadas
                                </p>
                              </div>
                              <Switch
                                checked={filters.showOnlyFavorites}
                                onCheckedChange={(checked) => 
                                  setFilters(prev => ({ ...prev, showOnlyFavorites: checked }))
                                }
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={resetFilters}
                          className="flex-1 gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Limpar
                        </Button>
                        <Button 
                          onClick={() => setFilterDrawerOpen(false)}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                        >
                          Aplicar Filtros
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sector Chips */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSector === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSector('all')}
                >
                  Todos
                </Button>
                {sectors.map((sector) => (
                  <Button
                    key={sector.id}
                    variant={selectedSector === sector.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSector(selectedSector === sector.id ? 'all' : sector.id)}
                    className="gap-2"
                  >
                    {sectorIcons[sector.icon]}
                    {sector.name}
                  </Button>
                ))}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{filteredAndSortedStocks.length} ações encontradas</span>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
                    Limpar filtros ({activeFiltersCount})
                  </Button>
                )}
              </div>

              {/* Stocks Table */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px]">
                      <Table>
                        <TableHeader className="sticky top-0 bg-white dark:bg-slate-900">
                          <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead className="min-w-[120px]">Ticker</TableHead>
                            <TableHead className="min-w-[300px]">Empresa</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Var %</TableHead>
                            <TableHead className="text-right">P/L</TableHead>
                            <TableHead className="text-right">P/VP</TableHead>
                            <TableHead className="text-right">DY %</TableHead>
                            <TableHead className="text-right">ROE %</TableHead>
                            <TableHead className="text-center">Score</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAndSortedStocks.map((stock) => (
                            <TableRow key={stock.ticker} className="group">
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => toggleFavorite(stock.ticker)}
                                >
                                  {favorites.includes(stock.ticker) ? (
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  ) : (
                                    <StarOff className="h-4 w-4 text-slate-300" />
                                  )}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <CompanyLogo ticker={stock.ticker} name={stock.name} sectorId={stock.sectorId} />
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 dark:text-white">
                                      {stock.ticker.replace('.SA', '')}
                                    </span>
                                    {stock.isDividendAristocrat && (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Rocket className="h-3 w-3 text-orange-500" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Em Alta de Dividendos
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white text-sm truncate max-w-[280px]" title={stock.name}>
                                    {stock.name}
                                  </p>
                                  <p className="text-xs text-slate-500">{stock.sector}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {formatCurrency(stock.price)}
                              </TableCell>
                              <TableCell className="text-right">
                                {stock.priceChangePercent !== null ? (
                                  <div className={`flex items-center justify-end gap-1 ${stock.priceChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {stock.priceChangePercent >= 0 ? (
                                      <ArrowUpRight className="h-3 w-3" />
                                    ) : (
                                      <ArrowDownRight className="h-3 w-3" />
                                    )}
                                    {Math.abs(stock.priceChangePercent * 100).toFixed(2)}%
                                  </div>
                                ) : '-'}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {formatNumber(stock.peRatio)}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {formatNumber(stock.pbRatio)}
                              </TableCell>
                              <TableCell className="text-right">
                                <span className="font-mono text-emerald-600 font-semibold">
                                  {stock.dividendYield !== null ? (stock.dividendYield * 100).toFixed(2) + '%' : '-'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {stock.roe !== null ? (stock.roe * 100).toFixed(1) + '%' : '-'}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                  <Progress 
                                    value={stock.qualityScore || 0} 
                                    className="h-2 w-16"
                                  />
                                  <span className="text-xs font-mono w-8">
                                    {stock.qualityScore || '-'}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => {
                                          setSelectedStock(stock);
                                          setAvgPrice(stock.price?.toString() || '');
                                          setAddStockDialog(true);
                                        }}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Adicionar à Carteira</TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="space-y-4">
              {portfolio && portfolio.items.length > 0 ? (
                <>
                  {/* Portfolio Summary */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Valor Total</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {formatCurrency(portfolio.totalValue)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Dividendos Estimados (ano)</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {formatCurrency(portfolio.totalDividends)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Dividend Yield Médio</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {formatPercent(portfolio.dividendYield / 100)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Portfolio Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setImportDialog(true)} className="gap-2">
                      <Upload className="h-4 w-4" />
                      Importar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setHistoryDialog(true)} className="gap-2">
                      <History className="h-4 w-4" />
                      Histórico
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearPortfolio} className="gap-2 text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                      Limpar
                    </Button>
                  </div>

                  {/* Portfolio Items */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Minhas Posições</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ação</TableHead>
                            <TableHead className="text-right">Qtd</TableHead>
                            <TableHead className="text-right">Preço Médio</TableHead>
                            <TableHead className="text-right">Preço Atual</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Lucro/Prejuízo</TableHead>
                            <TableHead className="text-right">DY</TableHead>
                            <TableHead className="text-right">Peso</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {portfolio.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div>
                                  <p className="font-bold text-slate-900 dark:text-white">
                                    {item.stock.ticker.replace('.SA', '')}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate max-w-[150px]">
                                    {item.stock.name}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {formatCurrency(item.avgPrice)}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {formatCurrency(item.stock.price)}
                              </TableCell>
                              <TableCell className="text-right font-mono font-semibold">
                                {formatCurrency(item.currentValue)}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className={item.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                  <p className="font-mono font-semibold">
                                    {formatCurrency(item.profit)}
                                  </p>
                                  <p className="text-xs">
                                    {item.profitPercent >= 0 ? '+' : ''}{item.profitPercent.toFixed(2)}%
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono text-emerald-600">
                                {item.stock.dividendYield !== null ? (item.stock.dividendYield * 100).toFixed(2) + '%' : '-'}
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                {item.weight.toFixed(1)}%
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600"
                                  onClick={() => removeFromPortfolio(item.id)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-0 shadow-md">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                      <Link2 className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      Importe sua carteira da B3
                    </p>
                    <p className="text-sm text-slate-500 text-center max-w-md mb-6">
                      Importe sua posição de ações diretamente da sua corretora. 
                      Suportamos arquivos CSV, Excel e texto copiado de email.
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={() => setImportDialog(true)} className="gap-2">
                        <Upload className="h-4 w-4" />
                        Importar Carteira
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab('stocks')}>
                        Ver Ações
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-4">
              {/* Methodology */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    Metodologia de Análise - Dividendos
                  </CardTitle>
                  <CardDescription>
                    Critérios para seleção de empresas perenes com foco em dividendos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Dividend Yield</h4>
                      <p className="text-sm text-slate-500">
                        Buscamos empresas com DY entre 4% e 8%, indicando boa distribuição 
                        sem ser excessivamente arriscado.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">P/L (Preço/Lucro)</h4>
                      <p className="text-sm text-slate-500">
                        Ideal entre 8x e 15x. Valores muito altos podem indicar 
                        sobrevalorização.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">ROE</h4>
                      <p className="text-sm text-slate-500">
                        Return on Equity acima de 15% indica boa eficiência 
                        na geração de lucro com o capital próprio.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Dívida/Patrimônio</h4>
                      <p className="text-sm text-slate-500">
                        Relação abaixo de 1.0 é considerada saudável, indicando 
                        menor risco financeiro.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">P/VP</h4>
                      <p className="text-sm text-slate-500">
                        Preço sobre Valor Patrimonial abaixo de 2.0x indica 
                        que a ação está com preço razoável.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Setores Perenes</h4>
                      <p className="text-sm text-slate-500">
                        Foco em setores como energia, bancos, saneamento e 
                        telecomunicações - essenciais e estáveis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Dividend Stocks */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-orange-500" />
                    Top Em Alta de Dividendos
                  </CardTitle>
                  <CardDescription>
                    Empresas com histórico consistente de pagamento de dividendos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {stocks
                      .filter(s => s.isDividendAristocrat)
                      .slice(0, 9)
                      .map((stock) => (
                        <div
                          key={stock.ticker}
                          className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50"
                        >
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {stock.ticker.replace('.SA', '')}
                            </p>
                            <p className="text-xs text-slate-500 truncate max-w-[150px]">
                              {stock.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-semibold text-emerald-600">
                              {stock.dividendYield !== null ? (stock.dividendYield * 100).toFixed(2) + '%' : '-'}
                            </p>
                            <p className="text-xs text-slate-500">DY</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Quality Scores */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-500" />
                    Melhores Scores de Qualidade
                  </CardTitle>
                  <CardDescription>
                    Ranking baseado nos critérios para seleção de empresas de dividendos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stocks
                      .filter(s => s.qualityScore !== null)
                      .slice(0, 5)
                      .map((stock, index) => (
                        <div
                          key={stock.ticker}
                          className="flex items-center gap-4 p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white">
                              {stock.ticker.replace('.SA', '')}
                            </p>
                            <p className="text-xs text-slate-500">{stock.sector}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-slate-500">P/L</p>
                              <p className="font-mono font-semibold">{formatNumber(stock.peRatio)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-500">DY</p>
                              <p className="font-mono font-semibold text-emerald-600">
                                {stock.dividendYield !== null ? (stock.dividendYield * 100).toFixed(2) + '%' : '-'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-500">Score</p>
                              <div className="flex items-center gap-2">
                                <Progress value={stock.qualityScore || 0} className="h-2 w-16" />
                                <span className="font-mono font-bold">{stock.qualityScore}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-4">
              {selectedEducation ? (
                <div className="space-y-4">
                  {/* Back Button */}
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedEducation(null)}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar para aulas
                  </Button>

                  {/* Article Content */}
                  <Card className="border-0 shadow-md">
                    <CardHeader className="border-b">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-${selectedEducation.color}-100 dark:bg-${selectedEducation.color}-900/30`}>
                          {selectedEducation.icon === 'Lightbulb' && <Lightbulb className={`h-6 w-6 text-${selectedEducation.color}-600`} />}
                          {selectedEducation.icon === 'Target' && <Target className={`h-6 w-6 text-${selectedEducation.color}-600`} />}
                          {selectedEducation.icon === 'TrendingUp' && <TrendingUp className={`h-6 w-6 text-${selectedEducation.color}-600`} />}
                          {selectedEducation.icon === 'ArrowRight' && <ArrowRight className={`h-6 w-6 text-${selectedEducation.color}-600`} />}
                          {selectedEducation.icon === 'BookOpen' && <BookOpen className={`h-6 w-6 text-${selectedEducation.color}-600`} />}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{selectedEducation.title}</CardTitle>
                          <CardDescription className="mt-1">{selectedEducation.description}</CardDescription>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline" className="gap-1">
                              <ClockIcon className="h-3 w-3" />
                              {selectedEducation.readTime} min de leitura
                            </Badge>
                            <Badge variant={
                              selectedEducation.level === 'Iniciante' ? 'default' :
                              selectedEducation.level === 'Intermediário' ? 'secondary' : 'outline'
                            }>
                              {selectedEducation.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {/* Introduction */}
                        <div className="mb-8">
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                            {selectedEducation.article.introduction}
                          </p>
                        </div>

                        {/* Sections */}
                        {selectedEducation.article.sections.map((section, index) => (
                          <div key={index} className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-sm font-bold">
                                {index + 1}
                              </span>
                              {section.title}
                            </h3>
                            <div className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                              {section.content}
                            </div>
                          </div>
                        ))}

                        {/* Conclusion */}
                        <div className="mt-8 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            Conclusão
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            {selectedEducation.article.conclusion}
                          </p>
                        </div>

                        {/* Key Takeaways */}
                        <div className="mt-8 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-emerald-500" />
                            Pontos-Chave
                          </h4>
                          <ul className="space-y-2">
                            {selectedEducation.article.keyTakeaways.map((takeaway, index) => (
                              <li key={index} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                {takeaway}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <>
                  {/* Education Header */}
                  <Card className="border-0 shadow-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/20">
                          <GraduationCap className="h-8 w-8" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">Central de Educação</h2>
                          <p className="text-emerald-100">Aprenda a investir em dividendos de forma didática</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {EDUCATIONAL_CONTENT.map((content) => (
                      <Card 
                        key={content.id} 
                        className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                        onClick={() => setSelectedEducation(content)}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${
                              content.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                              content.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                              content.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                              content.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                              'bg-teal-100 dark:bg-teal-900/30'
                            }`}>
                              {content.icon === 'Lightbulb' && (
                                <Lightbulb className={`h-6 w-6 ${
                                  content.color === 'emerald' ? 'text-emerald-600' :
                                  content.color === 'blue' ? 'text-blue-600' :
                                  content.color === 'amber' ? 'text-amber-600' :
                                  content.color === 'purple' ? 'text-purple-600' :
                                  'text-teal-600'
                                }`} />
                              )}
                              {content.icon === 'Target' && (
                                <Target className={`h-6 w-6 ${
                                  content.color === 'emerald' ? 'text-emerald-600' :
                                  content.color === 'blue' ? 'text-blue-600' :
                                  content.color === 'amber' ? 'text-amber-600' :
                                  content.color === 'purple' ? 'text-purple-600' :
                                  'text-teal-600'
                                }`} />
                              )}
                              {content.icon === 'TrendingUp' && (
                                <TrendingUp className={`h-6 w-6 ${
                                  content.color === 'emerald' ? 'text-emerald-600' :
                                  content.color === 'blue' ? 'text-blue-600' :
                                  content.color === 'amber' ? 'text-amber-600' :
                                  content.color === 'purple' ? 'text-purple-600' :
                                  'text-teal-600'
                                }`} />
                              )}
                              {content.icon === 'ArrowRight' && (
                                <ArrowRight className={`h-6 w-6 ${
                                  content.color === 'emerald' ? 'text-emerald-600' :
                                  content.color === 'blue' ? 'text-blue-600' :
                                  content.color === 'amber' ? 'text-amber-600' :
                                  content.color === 'purple' ? 'text-purple-600' :
                                  'text-teal-600'
                                }`} />
                              )}
                              {content.icon === 'BookOpen' && (
                                <BookOpen className={`h-6 w-6 ${
                                  content.color === 'emerald' ? 'text-emerald-600' :
                                  content.color === 'blue' ? 'text-blue-600' :
                                  content.color === 'amber' ? 'text-amber-600' :
                                  content.color === 'purple' ? 'text-purple-600' :
                                  'text-teal-600'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={
                                  content.level === 'Iniciante' ? 'default' :
                                  content.level === 'Intermediário' ? 'secondary' : 'outline'
                                } className="text-xs">
                                  {content.level}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {content.readTime} min
                                </span>
                              </div>
                              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                {content.title}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                {content.description}
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Quick Tips */}
                  <Card className="border-0 shadow-md bg-slate-50 dark:bg-slate-800/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        Dicas Rápidas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">Comece aos poucos</p>
                            <p className="text-xs text-slate-500">Não precisa muito para começar a investir</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">Seja consistente</p>
                            <p className="text-xs text-slate-500">Aportes regulares fazem diferença</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">Tenha paciência</p>
                            <p className="text-xs text-slate-500">O tempo é seu melhor aliado</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t mt-auto py-4 bg-white/80 dark:bg-slate-900/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
              <p>
                B3 Dividendos - Análise de ações com foco em dividendos
              </p>
              <p className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Dados atualizados em tempo real via API
              </p>
            </div>
          </div>
        </footer>

        {/* Add to Portfolio Dialog */}
        <Dialog open={addStockDialog} onOpenChange={setAddStockDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar à Carteira</DialogTitle>
              <DialogDescription>
                Adicione {selectedStock?.ticker.replace('.SA', '')} - {selectedStock?.name} à sua carteira
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Ex: 100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgPrice">Preço Médio (R$)</Label>
                <Input
                  id="avgPrice"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 35.50"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(e.target.value)}
                />
              </div>
              {selectedStock?.price && (
                <p className="text-sm text-slate-500">
                  Preço atual: {formatCurrency(selectedStock.price)}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddStockDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={addToPortfolio}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Import Portfolio Dialog */}
        <Dialog open={importDialog} onOpenChange={setImportDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CloudUpload className="h-5 w-5" />
                Importar Carteira da B3
              </DialogTitle>
              <DialogDescription>
                Importe sua posição de ações de qualquer corretora brasileira
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Import Method Tabs */}
              <div className="flex gap-2">
                <Button
                  variant={importMethod === 'file' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImportMethod('file')}
                  className="gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Arquivo
                </Button>
                <Button
                  variant={importMethod === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImportMethod('text')}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar/Colar
                </Button>
              </div>

              {/* Broker Selection */}
              <div className="space-y-2">
                <Label>Corretora (opcional)</Label>
                <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua corretora" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_BROKERS.map((broker) => (
                      <SelectItem key={broker.id} value={broker.id}>
                        {broker.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              {importMethod === 'file' && (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-8 w-8 text-emerald-500" />
                      <div className="text-left">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-slate-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-300 mb-2">
                        Arraste e solte seu arquivo aqui
                      </p>
                      <p className="text-sm text-slate-500 mb-4">
                        ou clique para selecionar
                      </p>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Selecionar Arquivo
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xlsx,.xls,.txt,.json"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </>
                  )}
                </div>
              )}

              {/* Text Paste */}
              {importMethod === 'text' && (
                <div className="space-y-2">
                  <Label>Cole sua posição aqui</Label>
                  <Textarea
                    placeholder="Cole aqui o conteúdo do email de posição da sua corretora ou os dados no formato:&#10;&#10;TICKER, QUANTIDADE, PREÇO MÉDIO&#10;PETR4, 100, 35.50&#10;TAEE11, 50, 28.00"
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500">
                    Formatos aceitos: texto de email, CSV, ou lista simples
                  </p>
                </div>
              )}

              {/* Supported Formats Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Corretoras Suportadas</AlertTitle>
                <AlertDescription>
                  XP, Rico, Clear, Nu Invest, BTG, Modal, Toro, Trade Map e outras. 
                  A detecção é automática!
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setImportDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleImport} disabled={importing}>
                {importing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Importando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Import History Dialog */}
        <Dialog open={historyDialog} onOpenChange={setHistoryDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Histórico de Importações
              </DialogTitle>
              <DialogDescription>
                Veja todas as importações realizadas
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[400px]">
              {importHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  Nenhuma importação realizada ainda
                </div>
              ) : (
                <div className="space-y-3">
                  {importHistory.map((imp) => (
                    <div
                      key={imp.id}
                      className="flex items-start justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start gap-3">
                        {imp.status === 'processed' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">
                            {imp.fileName || 'Importação manual'}
                          </p>
                          <p className="text-sm text-slate-500">
                            {imp.brokerConnection?.name || 'Corretora não identificada'}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatDate(imp.importedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold text-emerald-600">
                          {imp.itemsImported} ativos
                        </p>
                        {imp.itemsSkipped > 0 && (
                          <p className="text-xs text-amber-500">
                            {imp.itemsSkipped} ignorados
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
