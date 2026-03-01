/**
 * B3 Dividendos Analyzer - Design System Data
 * Este arquivo contém todas as especificações do Design System
 */

export interface ColorToken {
  name: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  description: string;
}

export interface TypographyToken {
  name: string;
  className: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  description: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  pixels: string;
}

export interface ComponentVariant {
  name: string;
  value: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  description: string;
  import: string;
  variants: ComponentVariant[];
  sizes: ComponentVariant[];
  props: string[];
  codeExample: string;
  category: 'form' | 'layout' | 'feedback' | 'navigation' | 'overlay' | 'data';
}

// ============================================
// CORE DESIGN TOKENS
// ============================================

export const colors: ColorToken[] = [
  // Brand Colors
  { name: 'Primary', cssVar: '--primary', lightValue: '#1a1a1a', darkValue: '#e5e5e5', description: 'Cor primária da marca' },
  { name: 'Primary Foreground', cssVar: '--primary-foreground', lightValue: '#fafafa', darkValue: '#1a1a1a', description: 'Texto sobre primary' },
  { name: 'Secondary', cssVar: '--secondary', lightValue: '#f5f5f5', darkValue: '#262626', description: 'Cor secundária' },
  { name: 'Secondary Foreground', cssVar: '--secondary-foreground', lightValue: '#1a1a1a', darkValue: '#fafafa', description: 'Texto sobre secondary' },
  
  // Background Colors
  { name: 'Background', cssVar: '--background', lightValue: '#ffffff', darkValue: '#1a1a1a', description: 'Fundo principal' },
  { name: 'Foreground', cssVar: '--foreground', lightValue: '#1a1a1a', darkValue: '#fafafa', description: 'Texto principal' },
  { name: 'Card', cssVar: '--card', lightValue: '#ffffff', darkValue: '#1a1a1a', description: 'Fundo de cards' },
  { name: 'Card Foreground', cssVar: '--card-foreground', lightValue: '#1a1a1a', darkValue: '#fafafa', description: 'Texto em cards' },
  
  // Accent Colors
  { name: 'Accent', cssVar: '--accent', lightValue: '#f5f5f5', darkValue: '#262626', description: 'Cor de destaque' },
  { name: 'Accent Foreground', cssVar: '--accent-foreground', lightValue: '#1a1a1a', darkValue: '#fafafa', description: 'Texto sobre accent' },
  { name: 'Muted', cssVar: '--muted', lightValue: '#f5f5f5', darkValue: '#262626', description: 'Cor suavizada' },
  { name: 'Muted Foreground', cssVar: '--muted-foreground', lightValue: '#737373', darkValue: '#a3a3a3', description: 'Texto suavizado' },
  
  // Semantic Colors
  { name: 'Destructive', cssVar: '--destructive', lightValue: '#dc2626', darkValue: '#b91c1c', description: 'Erro/Perigo' },
  { name: 'Success', cssVar: '--success', lightValue: '#10b981', darkValue: '#059669', description: 'Sucesso' },
  { name: 'Warning', cssVar: '--warning', lightValue: '#f59e0b', darkValue: '#d97706', description: 'Aviso' },
  { name: 'Info', cssVar: '--info', lightValue: '#0ea5e9', darkValue: '#0284c7', description: 'Informação' },
  
  // Border & Input
  { name: 'Border', cssVar: '--border', lightValue: '#e5e5e5', darkValue: 'rgba(255,255,255,0.1)', description: 'Bordas' },
  { name: 'Input', cssVar: '--input', lightValue: '#e5e5e5', darkValue: 'rgba(255,255,255,0.15)', description: 'Inputs' },
  { name: 'Ring', cssVar: '--ring', lightValue: '#a3a3a3', darkValue: '#737373', description: 'Focus ring' },
  
  // Brand Custom Colors
  { name: 'Teal 500', cssVar: '--teal-500', lightValue: '#14b8a6', darkValue: '#14b8a6', description: 'Cor principal da marca' },
  { name: 'Teal 600', cssVar: '--teal-600', lightValue: '#0d9488', darkValue: '#0d9488', description: 'Teal escuro' },
  { name: 'Emerald 500', cssVar: '--emerald-500', lightValue: '#10b981', darkValue: '#10b981', description: 'Verde esmeralda' },
  { name: 'Emerald 600', cssVar: '--emerald-600', lightValue: '#059669', darkValue: '#059669', description: 'Emerald escuro' },
  
  // Chart Colors
  { name: 'Chart 1', cssVar: '--chart-1', lightValue: '#f97316', darkValue: '#6366f1', description: 'Gráfico 1' },
  { name: 'Chart 2', cssVar: '--chart-2', lightValue: '#06b6d4', darkValue: '#22c55e', description: 'Gráfico 2' },
  { name: 'Chart 3', cssVar: '--chart-3', lightValue: '#6366f1', darkValue: '#f59e0b', description: 'Gráfico 3' },
  { name: 'Chart 4', cssVar: '--chart-4', lightValue: '#facc15', darkValue: '#a855f7', description: 'Gráfico 4' },
  { name: 'Chart 5', cssVar: '--chart-5', lightValue: '#f59e0b', darkValue: '#ef4444', description: 'Gráfico 5' },
];

export const typography: TypographyToken[] = [
  { name: 'Display', className: 'text-5xl font-bold', fontSize: '48px', fontWeight: '700', lineHeight: '1.1', description: 'Títulos grandes e impactantes' },
  { name: 'H1', className: 'text-4xl font-bold', fontSize: '36px', fontWeight: '700', lineHeight: '1.2', description: 'Título principal de página' },
  { name: 'H2', className: 'text-3xl font-semibold', fontSize: '30px', fontWeight: '600', lineHeight: '1.25', description: 'Título de seção' },
  { name: 'H3', className: 'text-2xl font-semibold', fontSize: '24px', fontWeight: '600', lineHeight: '1.3', description: 'Subtítulo de seção' },
  { name: 'H4', className: 'text-xl font-medium', fontSize: '20px', fontWeight: '500', lineHeight: '1.4', description: 'Título de card' },
  { name: 'H5', className: 'text-lg font-medium', fontSize: '18px', fontWeight: '500', lineHeight: '1.4', description: 'Título pequeno' },
  { name: 'Body Large', className: 'text-lg', fontSize: '18px', fontWeight: '400', lineHeight: '1.6', description: 'Texto corpo grande' },
  { name: 'Body', className: 'text-base', fontSize: '16px', fontWeight: '400', lineHeight: '1.5', description: 'Texto corpo padrão' },
  { name: 'Body Small', className: 'text-sm', fontSize: '14px', fontWeight: '400', lineHeight: '1.5', description: 'Texto corpo pequeno' },
  { name: 'Caption', className: 'text-xs', fontSize: '12px', fontWeight: '400', lineHeight: '1.4', description: 'Texto de legenda' },
  { name: 'Overline', className: 'text-xs uppercase tracking-wider', fontSize: '12px', fontWeight: '500', lineHeight: '1.4', description: 'Rótulo acima de títulos' },
];

export const spacing: SpacingToken[] = [
  { name: '0', value: '0', pixels: '0px' },
  { name: '1', value: '0.25rem', pixels: '4px' },
  { name: '2', value: '0.5rem', pixels: '8px' },
  { name: '3', value: '0.75rem', pixels: '12px' },
  { name: '4', value: '1rem', pixels: '16px' },
  { name: '5', value: '1.25rem', pixels: '20px' },
  { name: '6', value: '1.5rem', pixels: '24px' },
  { name: '8', value: '2rem', pixels: '32px' },
  { name: '10', value: '2.5rem', pixels: '40px' },
  { name: '12', value: '3rem', pixels: '48px' },
  { name: '16', value: '4rem', pixels: '64px' },
  { name: '20', value: '5rem', pixels: '80px' },
  { name: '24', value: '6rem', pixels: '96px' },
];

export const borderRadius = [
  { name: 'none', value: '0' },
  { name: 'sm', value: '0.125rem' },
  { name: 'default', value: '0.25rem' },
  { name: 'md', value: '0.375rem' },
  { name: 'lg', value: '0.5rem' },
  { name: 'xl', value: '0.75rem' },
  { name: '2xl', value: '1rem' },
  { name: '3xl', value: '1.5rem' },
  { name: 'full', value: '9999px' },
];

export const shadows = [
  { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  { name: 'default', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
  { name: 'md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
  { name: 'lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
  { name: 'xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
];

// ============================================
// COMPONENTS DOCUMENTATION
// ============================================

export const components: ComponentDoc[] = [
  // FORM COMPONENTS
  {
    name: 'Button',
    description: 'Botão interativo para ações do usuário. Suporta múltiplas variantes e tamanhos.',
    import: `import { Button } from '@/components/ui/button'`,
    variants: [
      { name: 'default', value: 'default', description: 'Botão primário com fundo sólido' },
      { name: 'secondary', value: 'secondary', description: 'Botão secundário mais suave' },
      { name: 'outline', value: 'outline', description: 'Botão com borda, sem fundo' },
      { name: 'ghost', value: 'ghost', description: 'Botão transparente' },
      { name: 'destructive', value: 'destructive', description: 'Botão de ação perigosa' },
      { name: 'link', value: 'link', description: 'Botão estilo link' },
    ],
    sizes: [
      { name: 'sm', value: 'sm', description: 'Pequeno (h-8)' },
      { name: 'default', value: 'default', description: 'Padrão (h-9)' },
      { name: 'lg', value: 'lg', description: 'Grande (h-10)' },
      { name: 'icon', value: 'icon', description: 'Quadrado para ícone' },
    ],
    props: ['variant', 'size', 'asChild', 'className', 'disabled', 'children'],
    codeExample: `<Button variant="default" size="lg">
  Clique aqui
</Button>`,
    category: 'form',
  },
  {
    name: 'Input',
    description: 'Campo de entrada de texto para formulários. Suporta todos os tipos HTML.',
    import: `import { Input } from '@/components/ui/input'`,
    variants: [
      { name: 'default', value: 'default', description: 'Input padrão com borda' },
    ],
    sizes: [
      { name: 'default', value: 'default', description: 'Tamanho padrão (h-10)' },
    ],
    props: ['type', 'placeholder', 'value', 'onChange', 'disabled', 'className', 'id', 'name'],
    codeExample: `<Input 
  type="email" 
  placeholder="seu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
    category: 'form',
  },
  {
    name: 'Textarea',
    description: 'Área de texto multilinha para entradas longas.',
    import: `import { Textarea } from '@/components/ui/textarea'`,
    variants: [],
    sizes: [],
    props: ['placeholder', 'value', 'onChange', 'rows', 'disabled', 'className'],
    codeExample: `<Textarea 
  placeholder="Digite sua mensagem..."
  rows={4}
/>`,
    category: 'form',
  },
  {
    name: 'Label',
    description: 'Rótulo para campos de formulário.',
    import: `import { Label } from '@/components/ui/label'`,
    variants: [],
    sizes: [],
    props: ['htmlFor', 'className', 'children'],
    codeExample: `<Label htmlFor="email">Email</Label>`,
    category: 'form',
  },
  {
    name: 'Checkbox',
    description: 'Caixa de seleção para opções booleanas.',
    import: `import { Checkbox } from '@/components/ui/checkbox'`,
    variants: [],
    sizes: [],
    props: ['id', 'checked', 'onCheckedChange', 'disabled'],
    codeExample: `<Checkbox 
  id="terms"
  checked={accepted}
  onCheckedChange={setAccepted}
/>`,
    category: 'form',
  },
  {
    name: 'Switch',
    description: 'Toggle switch para alternar entre estados.',
    import: `import { Switch } from '@/components/ui/switch'`,
    variants: [],
    sizes: [],
    props: ['id', 'checked', 'onCheckedChange', 'disabled'],
    codeExample: `<Switch 
  checked={enabled}
  onCheckedChange={setEnabled}
/>`,
    category: 'form',
  },
  {
    name: 'Select',
    description: 'Menu dropdown para seleção de opções.',
    import: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'`,
    variants: [],
    sizes: [],
    props: ['value', 'onValueChange', 'placeholder', 'disabled'],
    codeExample: `<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>`,
    category: 'form',
  },
  {
    name: 'RadioGroup',
    description: 'Grupo de botões de rádio para seleção única.',
    import: `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'`,
    variants: [],
    sizes: [],
    props: ['value', 'onValueChange', 'name'],
    codeExample: `<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="a" id="a" />
    <Label htmlFor="a">Opção A</Label>
  </div>
</RadioGroup>`,
    category: 'form',
  },
  {
    name: 'Slider',
    description: 'Controle deslizante para seleção de valor numérico.',
    import: `import { Slider } from '@/components/ui/slider'`,
    variants: [],
    sizes: [],
    props: ['value', 'onValueChange', 'min', 'max', 'step'],
    codeExample: `<Slider 
  value={[50]}
  onValueChange={setValue}
  max={100}
  step={1}
/>`,
    category: 'form',
  },

  // LAYOUT COMPONENTS
  {
    name: 'Card',
    description: 'Container para agrupar conteúdo relacionado.',
    import: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'`,
    variants: [],
    sizes: [],
    props: ['className'],
    codeExample: `<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>`,
    category: 'layout',
  },
  {
    name: 'Separator',
    description: 'Linha divisória horizontal ou vertical.',
    import: `import { Separator } from '@/components/ui/separator'`,
    variants: [],
    sizes: [],
    props: ['orientation', 'decorative', 'className'],
    codeExample: `<Separator orientation="horizontal" />`,
    category: 'layout',
  },
  {
    name: 'ScrollArea',
    description: 'Área com scroll customizado.',
    import: `import { ScrollArea } from '@/components/ui/scroll-area'`,
    variants: [],
    sizes: [],
    props: ['className', 'children'],
    codeExample: `<ScrollArea className="h-72 w-48">
  {/* Conteúdo longo */}
</ScrollArea>`,
    category: 'layout',
  },
  {
    name: 'AspectRatio',
    description: 'Container que mantém proporção de aspecto.',
    import: `import { AspectRatio } from '@/components/ui/aspect-ratio'`,
    variants: [],
    sizes: [],
    props: ['ratio'],
    codeExample: `<AspectRatio ratio={16/9}>
  <img src="..." alt="..." />
</AspectRatio>`,
    category: 'layout',
  },

  // FEEDBACK COMPONENTS
  {
    name: 'Alert',
    description: 'Mensagem de alerta para informações importantes.',
    import: `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'`,
    variants: [
      { name: 'default', value: 'default', description: 'Alerta padrão' },
      { name: 'destructive', value: 'destructive', description: 'Alerta de erro' },
    ],
    sizes: [],
    props: ['variant', 'className'],
    codeExample: `<Alert variant="destructive">
  <AlertTitle>Erro</AlertTitle>
  <AlertDescription>Algo deu errado.</AlertDescription>
</Alert>`,
    category: 'feedback',
  },
  {
    name: 'Badge',
    description: 'Rótulo pequeno para status ou categorias.',
    import: `import { Badge } from '@/components/ui/badge'`,
    variants: [
      { name: 'default', value: 'default', description: 'Badge padrão' },
      { name: 'secondary', value: 'secondary', description: 'Badge secundária' },
      { name: 'destructive', value: 'destructive', description: 'Badge destrutiva' },
      { name: 'outline', value: 'outline', description: 'Badge com borda' },
    ],
    sizes: [],
    props: ['variant', 'className'],
    codeExample: `<Badge variant="default">Novo</Badge>`,
    category: 'feedback',
  },
  {
    name: 'Progress',
    description: 'Barra de progresso para indicar conclusão.',
    import: `import { Progress } from '@/components/ui/progress'`,
    variants: [],
    sizes: [],
    props: ['value', 'className'],
    codeExample: `<Progress value={66} />`,
    category: 'feedback',
  },
  {
    name: 'Skeleton',
    description: 'Placeholder animado durante carregamento.',
    import: `import { Skeleton } from '@/components/ui/skeleton'`,
    variants: [],
    sizes: [],
    props: ['className'],
    codeExample: `<Skeleton className="h-4 w-48" />`,
    category: 'feedback',
  },
  {
    name: 'Avatar',
    description: 'Imagem de perfil com fallback.',
    import: `import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'`,
    variants: [],
    sizes: [],
    props: ['className', 'src', 'alt', 'fallback'],
    codeExample: `<Avatar>
  <AvatarImage src="/avatar.png" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
    category: 'feedback',
  },

  // NAVIGATION COMPONENTS
  {
    name: 'Tabs',
    description: 'Navegação por abas para organizar conteúdo.',
    import: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'`,
    variants: [],
    sizes: [],
    props: ['defaultValue', 'value', 'onValueChange', 'className'],
    codeExample: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo 1</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>`,
    category: 'navigation',
  },
  {
    name: 'Breadcrumb',
    description: 'Trilha de navegação hierárquica.',
    import: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'`,
    variants: [],
    sizes: [],
    props: ['className'],
    codeExample: `<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>Página</BreadcrumbItem>
</Breadcrumb>`,
    category: 'navigation',
  },
  {
    name: 'Pagination',
    description: 'Navegação entre páginas de dados.',
    import: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'`,
    variants: [],
    sizes: [],
    props: ['className'],
    codeExample: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    category: 'navigation',
  },

  // OVERLAY COMPONENTS
  {
    name: 'Dialog',
    description: 'Modal para diálogos e confirmações.',
    import: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'`,
    variants: [],
    sizes: [],
    props: ['open', 'onOpenChange'],
    codeExample: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    category: 'overlay',
  },
  {
    name: 'Sheet',
    description: 'Painel lateral deslizante.',
    import: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'`,
    variants: [
      { name: 'top', value: 'top', description: 'Abre do topo' },
      { name: 'right', value: 'right', description: 'Abre da direita' },
      { name: 'bottom', value: 'bottom', description: 'Abre de baixo' },
      { name: 'left', value: 'left', description: 'Abre da esquerda' },
    ],
    sizes: [],
    props: ['open', 'onOpenChange', 'side'],
    codeExample: `<Sheet>
  <SheetTrigger asChild>
    <Button>Abrir</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Título</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    category: 'overlay',
  },
  {
    name: 'Tooltip',
    description: 'Dica de contexto ao passar o mouse.',
    import: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'`,
    variants: [],
    sizes: [],
    props: ['content', 'side', 'delayDuration'],
    codeExample: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      Informação adicional
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    category: 'overlay',
  },
  {
    name: 'Popover',
    description: 'Popup flutuante para conteúdo adicional.',
    import: `import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'`,
    variants: [],
    sizes: [],
    props: ['open', 'onOpenChange', 'side', 'align'],
    codeExample: `<Popover>
  <PopoverTrigger asChild>
    <Button>Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>
    Conteúdo do popover
  </PopoverContent>
</Popover>`,
    category: 'overlay',
  },
  {
    name: 'DropdownMenu',
    description: 'Menu dropdown com ações.',
    import: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'`,
    variants: [],
    sizes: [],
    props: ['open', 'onOpenChange'],
    codeExample: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Ações</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Ação 1</DropdownMenuItem>
    <DropdownMenuItem>Ação 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    category: 'overlay',
  },

  // DATA COMPONENTS
  {
    name: 'Table',
    description: 'Tabela para exibição de dados estruturados.',
    import: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table'`,
    variants: [],
    sizes: [],
    props: ['className'],
    codeExample: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>R$ 100</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    category: 'data',
  },
  {
    name: 'Accordion',
    description: 'Seções expansíveis/colapsáveis.',
    import: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'`,
    variants: [],
    sizes: [],
    props: ['type', 'collapsible', 'defaultValue'],
    codeExample: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Seção 1</AccordionTrigger>
    <AccordionContent>
      Conteúdo da seção
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    category: 'data',
  },
  {
    name: 'Calendar',
    description: 'Calendário para seleção de datas.',
    import: `import { Calendar } from '@/components/ui/calendar'`,
    variants: [],
    sizes: [],
    props: ['mode', 'selected', 'onSelect', 'className'],
    codeExample: `<Calendar 
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
    category: 'data',
  },
];

// ============================================
// ICONS (Lucide React)
// ============================================

export const iconsList = [
  { name: 'TrendingUp', description: 'Tendência de alta' },
  { name: 'TrendingDown', description: 'Tendência de baixa' },
  { name: 'BarChart3', description: 'Gráfico de barras' },
  { name: 'PieChart', description: 'Gráfico de pizza' },
  { name: 'DollarSign', description: 'Dólar/Financeiro' },
  { name: 'Percent', description: 'Porcentagem' },
  { name: 'Building2', description: 'Empresa/Prédio' },
  { name: 'Landmark', description: 'Banco/Instituição' },
  { name: 'Shield', description: 'Seguro/Proteção' },
  { name: 'Zap', description: 'Energia/Flash' },
  { name: 'Droplets', description: 'Água/Saneamento' },
  { name: 'Phone', description: 'Telefone/Telecom' },
  { name: 'Truck', description: 'Transporte/Logística' },
  { name: 'Star', description: 'Favorito/Destaque' },
  { name: 'Rocket', description: 'Em alta/Crescimento' },
  { name: 'Search', description: 'Busca' },
  { name: 'Filter', description: 'Filtro' },
  { name: 'Download', description: 'Download' },
  { name: 'Upload', description: 'Upload' },
  { name: 'Plus', description: 'Adicionar' },
  { name: 'Minus', description: 'Remover' },
  { name: 'Check', description: 'Confirmado' },
  { name: 'X', description: 'Fechar/Cancelar' },
  { name: 'AlertCircle', description: 'Alerta/Erro' },
  { name: 'Info', description: 'Informação' },
  { name: 'Loader2', description: 'Carregando (animado)' },
  { name: 'ArrowRight', description: 'Seta direita' },
  { name: 'ArrowLeft', description: 'Seta esquerda' },
  { name: 'ChevronRight', description: 'Chevron direita' },
  { name: 'ChevronDown', description: 'Chevron baixo' },
  { name: 'Menu', description: 'Menu hambúrguer' },
  { name: 'User', description: 'Usuário' },
  { name: 'Settings', description: 'Configurações' },
  { name: 'LogOut', description: 'Sair' },
  { name: 'Mail', description: 'Email' },
  { name: 'Lock', description: 'Senha/Segurança' },
  { name: 'Eye', description: 'Ver' },
  { name: 'EyeOff', description: 'Esconder' },
  { name: 'Calendar', description: 'Calendário' },
  { name: 'Clock', description: 'Relógio/Horário' },
  { name: 'RefreshCw', description: 'Atualizar' },
  { name: 'Copy', description: 'Copiar' },
  { name: 'Edit', description: 'Editar' },
  { name: 'Trash2', description: 'Excluir' },
];

// ============================================
// SECTOR COLORS (Project Specific)
// ============================================

export const sectorColors = [
  { sector: 'Energia Elétrica', color: '#F59E0B', bgClass: 'bg-amber-100', textClass: 'text-amber-600', icon: 'Zap' },
  { sector: 'Distribuição de Energia', color: '#10B981', bgClass: 'bg-emerald-100', textClass: 'text-emerald-600', icon: 'Zap' },
  { sector: 'Bancos', color: '#3B82F6', bgClass: 'bg-blue-100', textClass: 'text-blue-600', icon: 'Landmark' },
  { sector: 'Seguradoras', color: '#8B5CF6', bgClass: 'bg-purple-100', textClass: 'text-purple-600', icon: 'Shield' },
  { sector: 'Saneamento Básico', color: '#06B6D4', bgClass: 'bg-cyan-100', textClass: 'text-cyan-600', icon: 'Droplets' },
  { sector: 'Telecomunicações', color: '#EC4899', bgClass: 'bg-rose-100', textClass: 'text-rose-600', icon: 'Phone' },
  { sector: 'Logística', color: '#F97316', bgClass: 'bg-orange-100', textClass: 'text-orange-600', icon: 'Truck' },
];

// ============================================
// EXPORT DATA FOR CANVA
// ============================================

export const designSystemForExport = {
  name: 'B3 Dividendos Analyzer - Design System',
  version: '1.0.0',
  description: 'Design System completo para o projeto B3 Dividendos Analyzer',
  colors: colors.map(c => ({
    name: c.name,
    hex: {
      light: c.lightValue,
      dark: c.darkValue,
    },
    cssVar: c.cssVar,
  })),
  typography: typography.map(t => ({
    name: t.name,
    fontSize: t.fontSize,
    fontWeight: t.fontWeight,
    lineHeight: t.lineHeight,
    className: t.className,
  })),
  spacing: spacing.map(s => ({
    name: s.name,
    rem: s.value,
    px: s.pixels,
  })),
  borderRadius,
  shadows,
  components: components.map(c => ({
    name: c.name,
    description: c.description,
    import: c.import,
    variants: c.variants,
    sizes: c.sizes,
    props: c.props,
    category: c.category,
  })),
  icons: iconsList,
  sectorColors,
  brandColors: {
    primary: '#14b8a6',
    primaryDark: '#0d9488',
    secondary: '#10b981',
    secondaryDark: '#059669',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
  },
};
