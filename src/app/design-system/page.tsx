'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TrendingUp,
  Menu,
  X,
  Download,
  Copy,
  Check,
  ChevronRight,
  Palette,
  Type,
  Layout,
  Box,
  Eye,
  Code,
  ArrowRight,
  AlertCircle,
  Info,
  Loader2,
  Star,
  Rocket,
  Zap,
  Landmark,
  Shield,
  Droplets,
  Phone,
  Truck,
  Search,
  Filter,
  Plus,
  Minus,
  Settings,
  User,
  Mail,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  iconsList,
  sectorColors,
  designSystemForExport,
} from '@/lib/design-system/data';

// Navigation sections
const sections = [
  { id: 'overview', label: 'Visão Geral', icon: Eye },
  { id: 'colors', label: 'Cores', icon: Palette },
  { id: 'typography', label: 'Tipografia', icon: Type },
  { id: 'spacing', label: 'Espaçamento', icon: Layout },
  { id: 'components', label: 'Componentes', icon: Box },
  { id: 'icons', label: 'Ícones', icon: Star },
  { id: 'export', label: 'Exportar', icon: Download },
];

// Category labels
const categoryLabels: Record<string, string> = {
  form: 'Formulário',
  layout: 'Layout',
  feedback: 'Feedback',
  navigation: 'Navegação',
  overlay: 'Overlay',
  data: 'Dados',
};

export default function SystemDesignPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    toast.success('Copiado para a área de transferência!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Export design system as JSON
  const exportDesignSystem = () => {
    const dataStr = JSON.stringify(designSystemForExport, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'b3-dividendos-design-system.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Design System exportado com sucesso!');
  };

  // Export for Canva (simplified format)
  const exportForCanva = () => {
    const canvaExport = {
      type: 'design-system',
      name: 'B3 Dividendos Analyzer',
      colors: colors.map(c => ({
        name: c.name,
        hex: c.lightValue,
        usage: c.description,
      })),
      fonts: typography.map(t => ({
        name: t.name,
        size: t.fontSize,
        weight: t.fontWeight,
      })),
      spacing: spacing.map(s => ({
        name: s.name,
        value: s.pixels,
      })),
      brand: {
        primary: '#14b8a6',
        secondary: '#10b981',
        gradient: 'from-teal-500 to-emerald-600',
      },
      sectors: sectorColors.map(s => ({
        name: s.sector,
        color: s.color,
      })),
    };

    const dataStr = JSON.stringify(canvaExport, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'b3-dividendos-canva-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Arquivo para Canva exportado!');
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-white hidden sm:block">
                  B3 Dividendos
                </span>
              </Link>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:block">
                Design System
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={exportDesignSystem}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar JSON
              </Button>
              <Button
                onClick={exportForCanva}
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Exportar para Canva</span>
                <span className="sm:hidden">Canva</span>
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <nav className="px-4 py-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div className="flex pt-16">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
                {activeSection === section.id && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Overview Section */}
            <section id="overview" className="mb-16 scroll-mt-20">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Design System
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Documentação completa do sistema de design do B3 Dividendos Analyzer.
                  Aqui você encontra todas as especificações de cores, tipografia, componentes e padrões de design.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{colors.length}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Tokens de Cor</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{components.length}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Componentes</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{iconsList.length}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Ícones</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{typography.length}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Estilos de Texto</div>
                  </CardContent>
                </Card>
              </div>

              {/* Brand Colors Preview */}
              <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 border-0">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Cores da Marca</h3>
                      <p className="text-white/80 text-sm">
                        Teal (#14b8a6) → Emerald (#10b981)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-teal-500 shadow-lg" title="#14b8a6" />
                      <div className="h-10 w-10 rounded-lg bg-teal-600 shadow-lg" title="#0d9488" />
                      <div className="h-10 w-10 rounded-lg bg-emerald-500 shadow-lg" title="#10b981" />
                      <div className="h-10 w-10 rounded-lg bg-emerald-600 shadow-lg" title="#059669" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Colors Section */}
            <section id="colors" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Cores</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Tokens de cor do design system, incluindo cores semânticas, de marca e funcionais.
              </p>

              <div className="space-y-8">
                {/* Brand Colors */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Cores da Marca</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {colors.filter(c => c.name.includes('Teal') || c.name.includes('Emerald')).map((color) => (
                      <Card key={color.name} className="overflow-hidden">
                        <div 
                          className="h-20 w-full"
                          style={{ backgroundColor: color.lightValue }}
                        />
                        <CardContent className="pt-3 pb-3">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.lightValue}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Semantic Colors */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Cores Semânticas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {colors.filter(c => ['Primary', 'Secondary', 'Destructive', 'Success', 'Warning', 'Info'].includes(c.name)).map((color) => (
                      <Card key={color.name} className="overflow-hidden">
                        <div 
                          className="h-20 w-full"
                          style={{ backgroundColor: color.lightValue }}
                        />
                        <CardContent className="pt-3 pb-3">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.lightValue}</div>
                          <div className="text-xs text-slate-400 mt-1">{color.description}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Background & Surface */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Background & Surface</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {colors.filter(c => ['Background', 'Foreground', 'Card', 'Card Foreground', 'Muted', 'Muted Foreground'].includes(c.name)).map((color) => (
                      <Card key={color.name} className="overflow-hidden">
                        <div 
                          className="h-16 w-full border-b"
                          style={{ backgroundColor: color.lightValue }}
                        />
                        <CardContent className="pt-3 pb-3">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{color.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{color.lightValue}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Chart Colors */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Cores de Gráficos</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {colors.filter(c => c.name.includes('Chart')).map((color) => (
                      <Card key={color.name} className="overflow-hidden">
                        <div 
                          className="h-16 w-full"
                          style={{ backgroundColor: color.lightValue }}
                        />
                        <CardContent className="pt-2 pb-2 px-2">
                          <div className="font-medium text-xs text-slate-900 dark:text-white">{color.name}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sector Colors */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Cores por Setor</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {sectorColors.map((sector) => (
                      <Card key={sector.sector} className="overflow-hidden">
                        <div 
                          className="h-16 w-full flex items-center justify-center"
                          style={{ backgroundColor: sector.color + '30' }}
                        >
                          <div 
                            className="h-10 w-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: sector.color }}
                          >
                            <span className="text-white font-bold text-sm">
                              {sector.sector.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <CardContent className="pt-3 pb-3">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{sector.sector}</div>
                          <div className="text-xs text-slate-500 font-mono">{sector.color}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Typography Section */}
            <section id="typography" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tipografia</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Escalas tipográficas do design system usando as fontes Geist Sans e Geist Mono.
              </p>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {typography.map((type) => (
                      <div key={type.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                        <div>
                          <div className={type.className}>{type.name}</div>
                          <div className="text-sm text-slate-500 mt-1">{type.description}</div>
                        </div>
                        <div className="text-sm text-slate-400 space-y-1">
                          <div><span className="font-medium">Size:</span> {type.fontSize}</div>
                          <div><span className="font-medium">Weight:</span> {type.fontWeight}</div>
                          <div><span className="font-medium">Line:</span> {type.lineHeight}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Spacing Section */}
            <section id="spacing" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Espaçamento</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Sistema de espaçamento baseado em múltiplos de 4px.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Escala de Espaçamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {spacing.map((space) => (
                        <div key={space.name} className="flex items-center gap-4">
                          <div className="w-12 text-sm font-medium text-slate-900 dark:text-white">p-{space.name}</div>
                          <div className="flex-1 h-6 bg-teal-500 rounded" style={{ width: space.pixels, maxWidth: '200px' }} />
                          <div className="text-sm text-slate-500 font-mono">{space.pixels}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Border Radius</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {borderRadius.map((radius) => (
                        <div key={radius.name} className="text-center">
                          <div 
                            className="h-16 w-16 mx-auto bg-teal-500 mb-2"
                            style={{ borderRadius: radius.value }}
                          />
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{radius.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{radius.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shadows */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Sombras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {shadows.map((shadow) => (
                      <div key={shadow.name} className="text-center">
                        <div 
                          className="h-20 w-full bg-white dark:bg-slate-800 rounded-lg mb-2"
                          style={{ boxShadow: shadow.value }}
                        />
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{shadow.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Components Section */}
            <section id="components" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Componentes</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Biblioteca de componentes UI baseados em shadcn/ui com customizações para o projeto.
              </p>

              <div className="space-y-12">
                {/* Form Components */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Badge variant="outline">Formulário</Badge>
                  </h3>
                  
                  {/* Button */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Button</CardTitle>
                      <CardDescription>Botão interativo para ações do usuário</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Variantes</div>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default">Default</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="destructive">Destructive</Button>
                          <Button variant="link">Link</Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Tamanhos</div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button size="sm">Small</Button>
                          <Button size="default">Default</Button>
                          <Button size="lg">Large</Button>
                          <Button size="icon"><Plus className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Gradiente (Marca)</div>
                        <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700">
                          Gradiente Teal-Emerald
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Input */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Input</CardTitle>
                      <CardDescription>Campo de entrada de texto</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2 block">Texto padrão</Label>
                          <Input placeholder="Digite algo..." />
                        </div>
                        <div>
                          <Label className="mb-2 block">Com ícone</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="seu@email.com" className="pl-10" />
                          </div>
                        </div>
                        <div>
                          <Label className="mb-2 block">Com senha</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input type="password" placeholder="••••••••" className="pl-10" />
                          </div>
                        </div>
                        <div>
                          <Label className="mb-2 block">Desabilitado</Label>
                          <Input placeholder="Desabilitado" disabled />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Select */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Select</CardTitle>
                      <CardDescription>Menu dropdown para seleção</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select>
                        <SelectTrigger className="w-full sm:w-[200px]">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="energia">Energia</SelectItem>
                          <SelectItem value="bancos">Bancos</SelectItem>
                          <SelectItem value="saneamento">Saneamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Checkbox & Switch */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Checkbox & Switch</CardTitle>
                      <CardDescription>Controles de seleção booleana</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="checkbox-demo" 
                            checked={checkboxChecked}
                            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
                          />
                          <Label htmlFor="checkbox-demo">Checkbox</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="switch-demo"
                            checked={switchEnabled}
                            onCheckedChange={setSwitchEnabled}
                          />
                          <Label htmlFor="switch-demo">Switch {switchEnabled ? 'ON' : 'OFF'}</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Slider */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Slider</CardTitle>
                      <CardDescription>Controle deslizante para valores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Slider 
                          value={sliderValue}
                          onValueChange={setSliderValue}
                          max={100}
                          step={1}
                        />
                        <div className="text-sm text-slate-500">Valor: {sliderValue[0]}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Textarea */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Textarea</CardTitle>
                      <CardDescription>Área de texto multilinha</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea placeholder="Digite sua mensagem..." rows={4} />
                    </CardContent>
                  </Card>
                </div>

                {/* Feedback Components */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Badge variant="outline">Feedback</Badge>
                  </h3>

                  {/* Alert */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Alert</CardTitle>
                      <CardDescription>Mensagem de alerta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Informação</AlertTitle>
                        <AlertDescription>Esta é uma mensagem informativa.</AlertDescription>
                      </Alert>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>Algo deu errado. Verifique os dados.</AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  {/* Badge */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Badge</CardTitle>
                      <CardDescription>Rótulo para status e categorias</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge className="bg-teal-500">Teal</Badge>
                        <Badge className="bg-emerald-500">Emerald</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Progress */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Progress</CardTitle>
                      <CardDescription>Barra de progresso</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={33} />
                      <Progress value={66} className="h-2" />
                      <Progress value={100} className="h-1" />
                    </CardContent>
                  </Card>

                  {/* Skeleton */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Skeleton</CardTitle>
                      <CardDescription>Placeholder de carregamento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Avatar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Avatar</CardTitle>
                      <CardDescription>Imagem de perfil com fallback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">SM</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Layout Components */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Badge variant="outline">Layout</Badge>
                  </h3>

                  {/* Card */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Card</CardTitle>
                      <CardDescription>Container para conteúdo relacionado</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Título do Card</CardTitle>
                            <CardDescription>Descrição do card</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Conteúdo do card aqui.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0">
                          <CardHeader>
                            <CardTitle>Card Gradiente</CardTitle>
                            <CardDescription className="text-white/80">Com cores da marca</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-white/90">
                              Conteúdo com gradiente.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tabs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tabs</CardTitle>
                      <CardDescription>Navegação por abas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="tab1">
                        <TabsList>
                          <TabsTrigger value="tab1">Aba 1</TabsTrigger>
                          <TabsTrigger value="tab2">Aba 2</TabsTrigger>
                          <TabsTrigger value="tab3">Aba 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" className="p-4 border rounded-lg mt-2">
                          Conteúdo da primeira aba
                        </TabsContent>
                        <TabsContent value="tab2" className="p-4 border rounded-lg mt-2">
                          Conteúdo da segunda aba
                        </TabsContent>
                        <TabsContent value="tab3" className="p-4 border rounded-lg mt-2">
                          Conteúdo da terceira aba
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                {/* Overlay Components */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Badge variant="outline">Overlay</Badge>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Dialog */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dialog</CardTitle>
                        <CardDescription>Modal de diálogo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Abrir Dialog</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Título do Dialog</DialogTitle>
                              <DialogDescription>
                                Esta é uma descrição do dialog. Você pode adicionar qualquer conteúdo aqui.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Conteúdo do dialog vai aqui.
                              </p>
                            </div>
                            <DialogFooter>
                              <Button>Confirmar</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>

                    {/* Sheet */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sheet</CardTitle>
                        <CardDescription>Painel lateral</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline">Abrir Sheet</Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Título do Sheet</SheetTitle>
                              <SheetDescription>
                                Conteúdo do painel lateral.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Este é um painel lateral deslizante.
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </CardContent>
                    </Card>

                    {/* Tooltip */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tooltip</CardTitle>
                        <CardDescription>Dica de contexto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline">Passe o mouse</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Esta é uma dica de contexto!</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardContent>
                    </Card>

                    {/* Dropdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dropdown Menu</CardTitle>
                        <CardDescription>Menu dropdown</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Abrir Menu</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                            <DropdownMenuItem>Configurações</DropdownMenuItem>
                            <DropdownMenuItem>Sair</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Data Components */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Badge variant="outline">Dados</Badge>
                  </h3>

                  {/* Table */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Table</CardTitle>
                      <CardDescription>Tabela de dados</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticker</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead className="text-right">DY</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">TAEE11</TableCell>
                            <TableCell>Transmissora Aliança</TableCell>
                            <TableCell>R$ 12,50</TableCell>
                            <TableCell className="text-right">8.5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">BBDC4</TableCell>
                            <TableCell>Bradesco</TableCell>
                            <TableCell>R$ 14,20</TableCell>
                            <TableCell className="text-right">6.2%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Accordion */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Accordion</CardTitle>
                      <CardDescription>Seções expansíveis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>O que é Dividend Yield?</AccordionTrigger>
                          <AccordionContent>
                            Dividend Yield é o rendimento de dividendos de uma ação, calculado como a razão entre os dividendos pagos e o preço atual da ação.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Como escolher boas ações?</AccordionTrigger>
                          <AccordionContent>
                            Busque empresas de setores perenes, com histórico consistente de pagamentos, indicadores fundamentalistas sólidos e governança transparente.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Icons Section */}
            <section id="icons" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Ícones</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Biblioteca de ícones Lucide React utilizados no projeto.
              </p>

              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {[
                      { icon: TrendingUp, name: 'TrendingUp' },
                      { icon: Zap, name: 'Zap' },
                      { icon: Landmark, name: 'Landmark' },
                      { icon: Shield, name: 'Shield' },
                      { icon: Droplets, name: 'Droplets' },
                      { icon: Phone, name: 'Phone' },
                      { icon: Truck, name: 'Truck' },
                      { icon: Star, name: 'Star' },
                      { icon: Rocket, name: 'Rocket' },
                      { icon: Search, name: 'Search' },
                      { icon: Filter, name: 'Filter' },
                      { icon: Download, name: 'Download' },
                      { icon: Plus, name: 'Plus' },
                      { icon: Minus, name: 'Minus' },
                      { icon: Check, name: 'Check' },
                      { icon: X, name: 'X' },
                      { icon: AlertCircle, name: 'AlertCircle' },
                      { icon: Info, name: 'Info' },
                      { icon: Loader2, name: 'Loader2' },
                      { icon: ArrowRight, name: 'ArrowRight' },
                      { icon: Menu, name: 'Menu' },
                      { icon: User, name: 'User' },
                      { icon: Settings, name: 'Settings' },
                      { icon: Mail, name: 'Mail' },
                    ].map(({ icon: Icon, name }) => (
                      <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                        <span className="text-xs text-slate-500">{name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Export Section */}
            <section id="export" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Exportar</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Exporte o Design System para uso em outras ferramentas como Canva, Figma ou documentação.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-teal-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                        <Download className="h-4 w-4 text-white" />
                      </div>
                      Exportar para Canva
                    </CardTitle>
                    <CardDescription>
                      Arquivo JSON otimizado para importação no Canva com cores, tipografia e espaçamento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Tokens de cor com valores hex
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Escala tipográfica
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Sistema de espaçamento
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Cores por setor
                      </li>
                    </ul>
                    <Button 
                      onClick={exportForCanva}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar canva-export.json
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-slate-700 dark:bg-slate-600 flex items-center justify-center">
                        <Code className="h-4 w-4 text-white" />
                      </div>
                      Exportar JSON Completo
                    </CardTitle>
                    <CardDescription>
                      Design System completo em formato JSON para documentação ou integração com outras ferramentas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Todos os tokens de cor
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Documentação de componentes
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Lista de ícones utilizados
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-teal-500" />
                        Exemplos de código
                      </li>
                    </ul>
                    <Button 
                      onClick={exportDesignSystem}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar design-system.json
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Import Instructions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Como usar no Canva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. Baixe o arquivo</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Clique no botão "Exportar para Canva" para baixar o arquivo JSON.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. Importe no Canva</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        No Canva, use as cores e especificações do arquivo para criar seus designs.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. Aplique os estilos</div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Use os códigos hex das cores e as especificações tipográficas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="lg:ml-64 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                B3 Dividendos Analyzer
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Design System v1.0.0 • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
