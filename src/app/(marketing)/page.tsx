'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Shield,
  Zap,
  Target,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Landmark,
  Droplets,
  Phone,
  Truck,
  Star,
  Play,
  Menu,
  X,
} from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Análise Fundamentalista',
    description: 'Indicadores completos como P/L, P/VP, ROE, ROIC e Dividend Yield para decisões informadas.',
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: 'Gestão de Carteira',
    description: 'Acompanhe suas posições, rendimentos e distribuição de ativos em tempo real.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Score de Qualidade',
    description: 'Sistema de pontuação que avalia a qualidade das empresas para dividendos.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Dados em Tempo Real',
    description: 'Integração com a API brapi.dev para cotações atualizadas da B3.',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Filtros Avançados',
    description: 'Encontre as melhores oportunidades com filtros por indicadores e setores.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Ações "Em Alta"',
    description: 'Destaque para empresas com histórico consistente de pagamento de dividendos.',
  },
];

const sectors = [
  { icon: <Zap className="h-5 w-5" />, name: 'Energia Elétrica', color: 'text-amber-500' },
  { icon: <Landmark className="h-5 w-5" />, name: 'Bancos', color: 'text-blue-500' },
  { icon: <Shield className="h-5 w-5" />, name: 'Seguradoras', color: 'text-purple-500' },
  { icon: <Droplets className="h-5 w-5" />, name: 'Saneamento', color: 'text-cyan-500' },
  { icon: <Phone className="h-5 w-5" />, name: 'Telecom', color: 'text-rose-500' },
  { icon: <Truck className="h-5 w-5" />, name: 'Logística', color: 'text-orange-500' },
];

const stats = [
  { value: '50+', label: 'Ações Monitoradas' },
  { value: '7', label: 'Setores Perenes' },
  { value: '15+', label: 'Indicadores' },
  { value: '100%', label: 'Gratuito' },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                B3 Dividendos
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Funcionalidades
              </a>
              <a href="#sectors" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Setores
              </a>
              <a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Sobre
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 dark:text-slate-400">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white">
                  Criar Conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-slate-600 dark:text-slate-400">
                Funcionalidades
              </a>
              <a href="#sectors" className="block text-slate-600 dark:text-slate-400">
                Setores
              </a>
              <a href="#about" className="block text-slate-600 dark:text-slate-400">
                Sobre
              </a>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-0">
              Método de Dividendos
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Construa sua{' '}
              <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
                Renda Passiva
              </span>{' '}
              na B3
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              Analise, selecione e acompanhe as melhores ações pagadoras de dividendos da Bolsa de Valores brasileira.
              Construa uma carteira sólida focada em renda passiva recorrente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="px-8">
                  Ver Funcionalidades
                </Button>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-0">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Tudo que você precisa para investir em dividendos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ferramentas profissionais para análise, seleção e gestão da sua carteira de ações focada em renda passiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors group">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
              Setores Perenes
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Setores Ideais para Dividendos
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Empresas de setores perenes oferecem maior previsibilidade e consistência no pagamento de dividendos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-colors cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <div className={`flex justify-center mb-3 ${sector.color}`}>
                    {sector.icon}
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white text-sm">
                    {sector.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Highlight Stocks */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-white">
                      <h3 className="font-semibold text-lg">Ações "Em Alta"</h3>
                      <p className="text-white/80 text-sm">
                        TAEE11, BBDC4, ITUB4, BBAS3, PETR4 e outras com histórico consistente de dividendos
                      </p>
                    </div>
                  </div>
                  <Link href="/register">
                    <Button variant="secondary" className="bg-white text-teal-600 hover:bg-white/90">
                      Ver Ações
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About/Method Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0">
                Método de Investimento
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Invista como os grandes mestres
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Nossa metodologia é baseada nos princípios de investidores consagrados como Luiz Barsi e Décio Bazin,
                focando em empresas maduras, lucrativas e pagadoras de dividendos consistentes.
              </p>
              <ul className="space-y-4">
                {[
                  'Empresas de setores perenes e essenciais',
                  'Histórico consistente de pagamento de dividendos',
                  'Indicadores fundamentalistas sólidos',
                  'Governança corporativa transparente',
                  'Dívida controlada e fluxo de caixa estável',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Dividend Yield Médio</span>
                      <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">6.5%</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">P/L Médio</span>
                      <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">8.5x</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">ROE Médio</span>
                      <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Score de Qualidade</span>
                      <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">75+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Pronto para começar sua jornada de dividendos?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Crie sua conta gratuita e comece a analisar as melhores ações pagadoras de dividendos da B3.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              B3 Dividendos Analyzer
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/design-system" 
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Design System
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} B3 Dividendos Analyzer. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
