/**
 * Serviço de integração com a API brapi.dev
 * Documentação: https://brapi.dev/docs
 */

const BRAPI_API_KEY = process.env.BRAPI_API_KEY || '';
const BRAPI_BASE_URL = 'https://brapi.dev/api';

// Interface para dados de cotação da brapi.dev
export interface BrapiQuote {
  symbol: string;
  shortName: string;
  longName: string | null;
  currency: string;
  regularMarketPrice: number | null;
  regularMarketChange: number | null;
  regularMarketChangePercent: number | null;
  regularMarketTime: string | null;
  marketCap: number | null;
  regularMarketVolume: number | null;
  regularMarketPreviousClose: number | null;
  regularMarketOpen: number | null;
  fiftyTwoWeekLow: number | null;
  fiftyTwoWeekHigh: number | null;
  priceEarnings: number | null;
  earningsPerShare: number | null;
  logourl: string | null;
  defaultKeyStatistics?: {
    bookValue: number | null;
    priceToBook: number | null;
    trailingEps: number | null;
    enterpriseValue: number | null;
    sharesOutstanding: number | null;
  };
  financialData?: {
    returnOnEquity: number | null;
    returnOnAssets: number | null;
    totalDebt: number | null;
    totalCash: number | null;
    ebitda: number | null;
    debtToEquity: number | null;
    quickRatio: number | null;
    currentRatio: number | null;
    profitMargins: number | null;
  };
}

// Interface para dados consolidados
export interface ConsolidatedStockData {
  ticker: string;
  name: string;
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
  earningsPerShare: number | null;
  profitMargins: number | null;
  bookValue: number | null;
  fiftyTwoWeekLow: number | null;
  fiftyTwoWeekHigh: number | null;
  logoUrl: string | null;
  lastUpdate: Date;
}

/**
 * Busca cotações de múltiplas ações
 * @param tickers Lista de tickers (sem o .SA)
 * @returns Dados consolidados das ações
 */
export async function fetchQuotesFromBrapi(tickers: string[]): Promise<Map<string, ConsolidatedStockData>> {
  const results = new Map<string, ConsolidatedStockData>();
  
  if (tickers.length === 0) return results;

  try {
    // A API aceita múltiplos tickers separados por vírgula
    const tickersParam = tickers.join(',');
    const url = `${BRAPI_BASE_URL}/quote/${tickersParam}?token=${BRAPI_API_KEY}&modules=defaultKeyStatistics,financialData`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      console.error(`Brapi API error: ${response.status}`);
      return results;
    }

    const data = await response.json();
    
    if (data.results && Array.isArray(data.results)) {
      for (const quote of data.results) {
        const consolidated = convertBrapiToConsolidated(quote);
        results.set(quote.symbol, consolidated);
      }
    }
  } catch (error) {
    console.error('Error fetching from brapi.dev:', error);
  }

  return results;
}

/**
 * Busca cotação de uma única ação
 * @param ticker Ticker da ação (sem o .SA)
 * @returns Dados consolidados da ação
 */
export async function fetchQuoteFromBrapi(ticker: string): Promise<ConsolidatedStockData | null> {
  try {
    const url = `${BRAPI_BASE_URL}/quote/${ticker}?token=${BRAPI_API_KEY}&modules=defaultKeyStatistics,financialData`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      console.error(`Brapi API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return convertBrapiToConsolidated(data.results[0]);
    }
  } catch (error) {
    console.error('Error fetching from brapi.dev:', error);
  }

  return null;
}

/**
 * Converte dados da brapi.dev para formato consolidado
 */
function convertBrapiToConsolidated(quote: BrapiQuote): ConsolidatedStockData {
  // Calcular Dividend Yield aproximado (não fornecido diretamente)
  // Usar uma estimativa baseada no payout médio do setor
  const dividendYield = estimateDividendYield(quote);

  // Calcular EV/EBITDA
  const evEbitda = calculateEvEbitda(quote);

  // Calcular ROIC
  const roic = calculateRoic(quote);

  return {
    ticker: quote.symbol,
    name: quote.longName || quote.shortName,
    price: quote.regularMarketPrice,
    priceChange: quote.regularMarketChange,
    priceChangePercent: quote.regularMarketChangePercent ? quote.regularMarketChangePercent / 100 : null,
    volume: quote.regularMarketVolume,
    marketCap: quote.marketCap,
    peRatio: quote.priceEarnings,
    pbRatio: quote.defaultKeyStatistics?.priceToBook || null,
    dividendYield,
    roe: quote.financialData?.returnOnEquity || null,
    roic,
    evEbitda,
    debtToEquity: quote.financialData?.debtToEquity || null,
    earningsPerShare: quote.earningsPerShare || quote.defaultKeyStatistics?.trailingEps || null,
    profitMargins: quote.financialData?.profitMargins || null,
    bookValue: quote.defaultKeyStatistics?.bookValue || null,
    fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
    fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
    logoUrl: quote.logourl,
    lastUpdate: new Date(),
  };
}

/**
 * Estima o Dividend Yield baseado no setor e payout
 * Nota: A brapi.dev não fornece DY diretamente na cotação
 */
function estimateDividendYield(quote: BrapiQuote): number | null {
  // Dividend Yield médio por setor (estimativa conservadora)
  const sectorYields: Record<string, number> = {
    'Utilities': 0.06,      // Energia/Saneamento
    'Finance': 0.05,        // Bancos
    'Energy Minerals': 0.08, // Petróleo/Mineração
    'Communications': 0.06,  // Telecom
    'Consumer Non-Durables': 0.04,
    'Health Services': 0.03,
    'Producer Manufacturing': 0.03,
    'Process Industries': 0.04,
    'Commercial Services': 0.03,
    'Transportation': 0.04,
    'Technology Services': 0.02,
  };

  // Se temos margem de lucro e P/L, podemos estimar
  if (quote.priceEarnings && quote.priceEarnings > 0 && quote.financialData?.profitMargins) {
    // Estimar payout médio de 50% para empresas maduras
    const avgPayout = 0.50;
    const earningsYield = 1 / quote.priceEarnings;
    return earningsYield * avgPayout;
  }

  return null;
}

/**
 * Calcula EV/EBITDA
 */
function calculateEvEbitda(quote: BrapiQuote): number | null {
  const ev = quote.defaultKeyStatistics?.enterpriseValue;
  const ebitda = quote.financialData?.ebitda;

  if (ev && ebitda && ebitda > 0) {
    return ev / ebitda;
  }

  return null;
}

/**
 * Calcula ROIC (Return on Invested Capital)
 */
function calculateRoic(quote: BrapiQuote): number | null {
  const ebitda = quote.financialData?.ebitda;
  const totalDebt = quote.financialData?.totalDebt;
  const totalCash = quote.financialData?.totalCash;
  const marketCap = quote.marketCap;

  if (ebitda && marketCap) {
    // ROIC simplificado: EBITDA / (Market Cap + Debt - Cash)
    const investedCapital = marketCap + (totalDebt || 0) - (totalCash || 0);
    if (investedCapital > 0) {
      return ebitda / investedCapital;
    }
  }

  return null;
}

/**
 * Busca lista de ações disponíveis
 */
export async function fetchAvailableStocks(): Promise<string[]> {
  try {
    const url = `${BRAPI_BASE_URL}/available?token=${BRAPI_API_KEY}`;
    
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache por 24 horas
    });

    if (!response.ok) {
      console.error(`Brapi API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error('Error fetching available stocks:', error);
    return [];
  }
}

/**
 * Busca lista de ações com paginação
 */
export async function fetchStocksList(page: number = 1, limit: number = 50): Promise<{
  stocks: Array<{
    symbol: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    marketCap: number;
    sector: string;
    logo: string;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const url = `${BRAPI_BASE_URL}/quote/list?token=${BRAPI_API_KEY}&limit=${limit}&page=${page}`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      console.error(`Brapi API error: ${response.status}`);
      return { stocks: [], totalCount: 0, totalPages: 0, currentPage: page };
    }

    const data = await response.json();
    
    return {
      stocks: data.stocks || [],
      totalCount: data.totalCount || 0,
      totalPages: data.totalPages || 0,
      currentPage: data.currentPage || page,
    };
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    return { stocks: [], totalCount: 0, totalPages: 0, currentPage: page };
  }
}
