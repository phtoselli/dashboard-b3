/**
 * Parser para arquivos de posição de corretoras brasileiras
 * Suporta formatos: XP, Rico, Clear, Modal, Nu Invest, BTG, etc.
 */

export interface ParsedPosition {
  ticker: string;
  name?: string;
  quantity: number;
  avgPrice: number;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
  profitLossPercent?: number;
}

export interface ParseResult {
  success: boolean;
  positions: ParsedPosition[];
  broker?: string;
  errors: string[];
  warnings: string[];
}

/**
 * Normaliza o ticker para o formato padrão (.SA)
 */
function normalizeTicker(ticker: string): string {
  let normalized = ticker.toUpperCase().trim();
  
  // Remover espaços e caracteres especiais
  normalized = normalized.replace(/[^A-Z0-9]/g, '');
  
  // Adicionar .SA se não tiver
  if (!normalized.endsWith('SA')) {
    // Verificar se é um ticker válido (geralmente 4-6 caracteres)
    if (normalized.length >= 4) {
      normalized = normalized + '.SA';
    }
  } else if (!normalized.includes('.')) {
    // Se tem SA mas não tem ponto
    normalized = normalized.replace('SA', '.SA');
  }
  
  return normalized;
}

/**
 * Extrai número de string brasileira (1.234,56 -> 1234.56)
 */
function parseBrazilianNumber(value: string): number {
  if (!value) return 0;
  
  // Remover R$, espaços e outros caracteres
  let clean = value.replace(/[R$\s]/g, '').trim();
  
  // Verificar se é negativo
  const isNegative = clean.includes('(') || clean.includes('-');
  clean = clean.replace(/[()\-]/g, '');
  
  // Substituir separadores brasileiros
  clean = clean.replace(/\./g, '').replace(',', '.');
  
  const num = parseFloat(clean);
  return isNegative ? -num : num;
}

/**
 * Parser para formato XP Investimentos
 */
function parseXPFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  let foundPositions = false;
  
  for (const line of lines) {
    // Pular linhas vazias
    if (!line.trim()) continue;
    
    // Procurar por linhas com ações (formato: TICKER | Nome | Qtd | PM | Total | ...)
    // XP geralmente usa tabulação ou ponto e vírgula
    const parts = line.includes('\t') ? line.split('\t') : line.split(';');
    
    if (parts.length >= 4) {
      const ticker = parts[0]?.trim();
      
      // Verificar se parece um ticker
      if (/^[A-Z]{4,5}[0-9]{1,2}$/i.test(ticker.replace(/[^A-Z0-9]/gi, ''))) {
        foundPositions = true;
        
        try {
          const position: ParsedPosition = {
            ticker: normalizeTicker(ticker),
            name: parts[1]?.trim(),
            quantity: parseBrazilianNumber(parts[2] || parts[3]),
            avgPrice: parseBrazilianNumber(parts[3] || parts[4]),
            currentPrice: parts[4] ? parseBrazilianNumber(parts[4]) : undefined,
            totalValue: parts[5] ? parseBrazilianNumber(parts[5]) : undefined,
          };
          
          if (position.quantity > 0 && position.ticker) {
            result.positions.push(position);
          }
        } catch {
          result.warnings.push(`Linha ignorada: ${line.substring(0, 50)}...`);
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'XP Investimentos';
  }
  
  return result;
}

/**
 * Parser para formato Rico / Clear
 */
function parseRicoClearFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Rico/Clear geralmente tem formato CSV
    const parts = line.split(/[,;\t]/);
    
    if (parts.length >= 3) {
      const ticker = parts[0]?.trim();
      
      // Verificar se parece um ticker
      if (/^[A-Z]{4,5}[0-9]{1,2}$/i.test(ticker.replace(/[^A-Z0-9]/gi, ''))) {
        try {
          const position: ParsedPosition = {
            ticker: normalizeTicker(ticker),
            name: parts[1]?.trim(),
            quantity: parseBrazilianNumber(parts[2]),
            avgPrice: parseBrazilianNumber(parts[3]),
            currentPrice: parts[4] ? parseBrazilianNumber(parts[4]) : undefined,
            totalValue: parts[5] ? parseBrazilianNumber(parts[5]) : undefined,
          };
          
          if (position.quantity > 0 && position.ticker) {
            result.positions.push(position);
          }
        } catch {
          result.warnings.push(`Linha ignorada: ${line.substring(0, 50)}...`);
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'Rico/Clear';
  }
  
  return result;
}

/**
 * Parser para formato Nu Invest (antigo Easynvest)
 */
function parseNuInvestFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Nu Invest geralmente exporta em CSV com cabeçalho
    const parts = line.split(/[,;\t]/);
    
    // Procurar padrão: Ação/Ticker
    if (parts.length >= 3) {
      const firstCol = parts[0]?.trim().toUpperCase();
      
      // Verificar se é uma linha de ação
      if (firstCol.includes('AÇÃO') || firstCol.includes('TICKER') || /^[A-Z]{4,5}[0-9]{1,2}$/i.test(firstCol.replace(/[^A-Z0-9]/gi, ''))) {
        // Pular cabeçalho
        if (firstCol.includes('AÇÃO') || firstCol.includes('TICKER')) continue;
        
        try {
          const ticker = parts[0]?.trim();
          
          if (/^[A-Z]{4,5}[0-9]{1,2}$/i.test(ticker.replace(/[^A-Z0-9]/gi, ''))) {
            const position: ParsedPosition = {
              ticker: normalizeTicker(ticker),
              name: parts[1]?.trim(),
              quantity: parseBrazilianNumber(parts[2]),
              avgPrice: parseBrazilianNumber(parts[3]),
              currentPrice: parts[4] ? parseBrazilianNumber(parts[4]) : undefined,
              totalValue: parts[5] ? parseBrazilianNumber(parts[5]) : undefined,
            };
            
            if (position.quantity > 0 && position.ticker) {
              result.positions.push(position);
            }
          }
        } catch {
          result.warnings.push(`Linha ignorada: ${line.substring(0, 50)}...`);
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'Nu Invest';
  }
  
  return result;
}

/**
 * Parser para formato BTG Pactual
 */
function parseBTGFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split(/[,;\t]/);
    
    if (parts.length >= 3) {
      const ticker = parts[0]?.trim();
      
      // BTG às vezes tem código numérico antes do ticker
      const possibleTicker = ticker.includes('-') ? ticker.split('-')[1]?.trim() : ticker;
      
      if (possibleTicker && /^[A-Z]{4,5}[0-9]{1,2}$/i.test(possibleTicker.replace(/[^A-Z0-9]/gi, ''))) {
        try {
          const position: ParsedPosition = {
            ticker: normalizeTicker(possibleTicker),
            name: parts[1]?.trim(),
            quantity: parseBrazilianNumber(parts[2]),
            avgPrice: parseBrazilianNumber(parts[3]),
            currentPrice: parts[4] ? parseBrazilianNumber(parts[4]) : undefined,
            totalValue: parts[5] ? parseBrazilianNumber(parts[5]) : undefined,
          };
          
          if (position.quantity > 0 && position.ticker) {
            result.positions.push(position);
          }
        } catch {
          result.warnings.push(`Linha ignorada: ${line.substring(0, 50)}...`);
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'BTG Pactual';
  }
  
  return result;
}

/**
 * Parser genérico para CSV/Texto
 */
function parseGenericFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  // Tentar identificar colunas automaticamente
  let tickerCol = -1;
  let qtyCol = -1;
  let priceCol = -1;
  let nameCol = -1;
  
  // Procurar cabeçalho
  const headerLine = lines[0]?.toLowerCase() || '';
  const headers = headerLine.split(/[,;\t]/);
  
  headers.forEach((h, i) => {
    const header = h.trim().toLowerCase();
    if (header.includes('ticker') || header.includes('ativo') || header.includes('ação') || header.includes('codigo') || header.includes('código')) {
      tickerCol = i;
    } else if (header.includes('quantidade') || header.includes('qtde') || header.includes('qtd') || header.includes('qty')) {
      qtyCol = i;
    } else if (header.includes('preço') || header.includes('pm') || header.includes('médio') || header.includes('price')) {
      priceCol = i;
    } else if (header.includes('empresa') || header.includes('nome') || header.includes('descrição') || header.includes('name')) {
      nameCol = i;
    }
  });
  
  // Se não encontrou cabeçalho, assumir ordem padrão
  if (tickerCol === -1) tickerCol = 0;
  if (qtyCol === -1) qtyCol = 2;
  if (priceCol === -1) priceCol = 3;
  if (nameCol === -1) nameCol = 1;
  
  // Processar linhas de dados
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const parts = line.split(/[,;\t]/);
    
    if (parts.length >= 3) {
      const ticker = parts[tickerCol]?.trim();
      
      if (ticker && /^[A-Z]{4,5}[0-9]{1,2}$/i.test(ticker.replace(/[^A-Z0-9]/gi, ''))) {
        try {
          const position: ParsedPosition = {
            ticker: normalizeTicker(ticker),
            name: nameCol >= 0 ? parts[nameCol]?.trim() : undefined,
            quantity: parseBrazilianNumber(parts[qtyCol]),
            avgPrice: parseBrazilianNumber(parts[priceCol]),
            currentPrice: parts[priceCol + 1] ? parseBrazilianNumber(parts[priceCol + 1]) : undefined,
            totalValue: parts[priceCol + 2] ? parseBrazilianNumber(parts[priceCol + 2]) : undefined,
          };
          
          if (position.quantity > 0 && position.ticker) {
            result.positions.push(position);
          }
        } catch {
          result.warnings.push(`Linha ignorada: ${line.substring(0, 50)}...`);
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'Genérico';
  }
  
  return result;
}

/**
 * Parser para texto copiado de email/extrato
 * Formato comum: "PETR4 - 100 x R$ 35,00 = R$ 3.500,00"
 */
function parseTextFormat(content: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  const lines = content.split('\n');
  
  // Padrões regex comuns
  const patterns = [
    // Padrão 1: TICKER - Nome | Qtd: X | PM: R$ Y,YY
    /([A-Z]{4,5}[0-9]{1,2})[\s\-:]+(?:[A-Za-zÀ-ÿ\s]+)?[\s|]*(\d+)[\s]*(?:x|ação|ações)?[\s]*R?\$?\s*([\d.,]+)/gi,
    // Padrão 2: TICKER Qtd Preço
    /([A-Z]{4,5}[0-9]{1,2})\s+(\d+)\s+([\d.,]+)/gi,
    // Padrão 3: Colunas com ticker na primeira
    /^([A-Z]{4,5}[0-9]{1,2})\s+(.+?)\s+(\d+)\s+([\d.,]+)/gm,
  ];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    for (const pattern of patterns) {
      const matches = line.matchAll(pattern);
      
      for (const match of matches) {
        try {
          const ticker = match[1];
          const quantity = parseBrazilianNumber(match[2] || match[3]);
          const price = parseBrazilianNumber(match[3] || match[4]);
          
          if (ticker && quantity > 0) {
            const position: ParsedPosition = {
              ticker: normalizeTicker(ticker),
              quantity,
              avgPrice: price,
            };
            
            // Verificar se já existe
            if (!result.positions.find(p => p.ticker === position.ticker)) {
              result.positions.push(position);
            }
          }
        } catch {
          // Ignorar erro
        }
      }
    }
  }
  
  result.success = result.positions.length > 0;
  if (result.success) {
    result.broker = 'Texto/Email';
  }
  
  return result;
}

/**
 * Função principal que tenta todos os parsers
 */
export function parseBrokerFile(content: string, fileName?: string): ParseResult {
  // Detectar tipo de arquivo pelo nome
  const lowerFileName = fileName?.toLowerCase() || '';
  
  // Tentar parsers específicos primeiro
  const parsers: Array<() => ParseResult> = [
    () => parseXPFormat(content),
    () => parseRicoClearFormat(content),
    () => parseNuInvestFormat(content),
    () => parseBTGFormat(content),
    () => parseGenericFormat(content),
    () => parseTextFormat(content),
  ];
  
  for (const parser of parsers) {
    const result = parser();
    if (result.success && result.positions.length > 0) {
      return result;
    }
  }
  
  return {
    success: false,
    positions: [],
    errors: ['Não foi possível identificar o formato do arquivo. Verifique se contém posições de ações.'],
    warnings: [],
  };
}

/**
 * Parser para JSON (formato padronizado)
 */
export function parseJSONFormat(jsonString: string): ParseResult {
  const result: ParseResult = { success: false, positions: [], errors: [], warnings: [] };
  
  try {
    const data = JSON.parse(jsonString);
    
    // Suportar diferentes formatos JSON
    let positions: unknown[] = [];
    
    if (Array.isArray(data)) {
      positions = data;
    } else if (data.positions && Array.isArray(data.positions)) {
      positions = data.positions;
    } else if (data.stocks && Array.isArray(data.stocks)) {
      positions = data.stocks;
    } else if (data.ativos && Array.isArray(data.ativos)) {
      positions = data.ativos;
    }
    
    for (const pos of positions) {
      const item = pos as Record<string, unknown>;
      const ticker = item.ticker || item.ativo || item.codigo || item.symbol;
      const quantity = item.quantity || item.quantidade || item.qtd || item.qty;
      const avgPrice = item.avgPrice || item.pm || item.precoMedio || item.averagePrice;
      
      if (ticker && quantity && avgPrice) {
        result.positions.push({
          ticker: normalizeTicker(String(ticker)),
          name: String(item.name || item.nome || item.empresa || ''),
          quantity: Number(quantity),
          avgPrice: Number(avgPrice),
          currentPrice: item.currentPrice ? Number(item.currentPrice) : undefined,
          totalValue: item.totalValue ? Number(item.totalValue) : undefined,
        });
      }
    }
    
    result.success = result.positions.length > 0;
    if (result.success) {
      result.broker = 'JSON';
    }
  } catch {
    result.errors.push('Erro ao processar arquivo JSON');
  }
  
  return result;
}
