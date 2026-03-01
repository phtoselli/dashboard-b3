/**
 * Finance API Service
 * Integração com a API de dados financeiros para ações da B3
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'https://internal-api.z.ai';
const API_PREFIX = process.env.API_PREFIX || '/external/finance';

const defaultHeaders: Record<string, string> = {
  'X-Z-AI-From': 'Z',
};

/**
 * Busca ações por nome ou ticker
 */
export async function searchStocks(query: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/search?search=${encodeURIComponent(query)}`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to search stocks: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca cotação em tempo real de uma ação
 */
export async function getStockQuote(ticker: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/quote?ticker=${encodeURIComponent(ticker)}&type=STOCKS`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get quote for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca cotações de múltiplas ações
 */
export async function getStockQuotes(tickers: string[]) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/stock/quotes?ticker=${tickers.join(',')}`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get quotes: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca dados históricos de uma ação
 */
export async function getStockHistory(symbol: string, interval: string = '1d', limit?: number) {
  let url = `${GATEWAY_URL}${API_PREFIX}/v2/markets/stock/history?symbol=${encodeURIComponent(symbol)}&interval=${interval}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  
  const response = await fetch(url, { headers: defaultHeaders });
  
  if (!response.ok) {
    throw new Error(`Failed to get history for ${symbol}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca estatísticas de uma ação
 */
export async function getStockStatistics(ticker: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/stock/modules?ticker=${encodeURIComponent(ticker)}&module=statistics`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get statistics for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca dados financeiros de uma ação
 */
export async function getStockFinancialData(ticker: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/stock/modules?ticker=${encodeURIComponent(ticker)}&module=financial-data`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get financial data for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca perfil da empresa
 */
export async function getStockProfile(ticker: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/stock/modules?ticker=${encodeURIComponent(ticker)}&module=asset-profile`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get profile for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca calendário de eventos (dividendos, resultados)
 */
export async function getStockCalendarEvents(ticker: string) {
  const response = await fetch(
    `${GATEWAY_URL}${API_PREFIX}/v1/markets/stock/modules?ticker=${encodeURIComponent(ticker)}&module=calendar-events`,
    { headers: defaultHeaders }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get calendar events for ${ticker}: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Busca notícias de mercado
 */
export async function getMarketNews(ticker?: string) {
  let url = `${GATEWAY_URL}${API_PREFIX}/v1/markets/news`;
  if (ticker) {
    url += `?ticker=${encodeURIComponent(ticker)}`;
  }
  
  const response = await fetch(url, { headers: defaultHeaders });
  
  if (!response.ok) {
    throw new Error(`Failed to get market news: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Interface para dados consolidados de uma ação
 */
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
  dividendPerShare: number | null;
  payoutRatio: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  beta: number | null;
  sector?: string;
  industry?: string;
  description?: string;
  website?: string;
}

/**
 * Busca dados consolidados de uma ação
 */
export async function getConsolidatedStockData(ticker: string): Promise<ConsolidatedStockData> {
  try {
    // Buscar quote e statistics em paralelo
    const [quoteData, statsData, profileData] = await Promise.allSettled([
      getStockQuote(ticker),
      getStockStatistics(ticker),
      getStockProfile(ticker),
    ]);

    const quote = quoteData.status === 'fulfilled' ? quoteData.value?.body : null;
    const stats = statsData.status === 'fulfilled' ? statsData.value?.body : null;
    const profile = profileData.status === 'fulfilled' ? profileData.value?.body : null;

    return {
      ticker: ticker,
      name: quote?.shortName || quote?.longName || stats?.summaryDetail?.longName || ticker,
      price: quote?.regularMarketPrice || stats?.summaryDetail?.regularMarketPrice || null,
      priceChange: quote?.regularMarketChange || null,
      priceChangePercent: quote?.regularMarketChangePercent || null,
      volume: quote?.regularMarketVolume || stats?.summaryDetail?.regularMarketVolume || null,
      marketCap: stats?.summaryDetail?.marketCap || quote?.marketCap || null,
      peRatio: stats?.summaryDetail?.trailingPE || stats?.summaryDetail?.forwardPE || null,
      pbRatio: stats?.summaryDetail?.priceToBook || stats?.defaultKeyStatistics?.priceToBook || null,
      dividendYield: stats?.summaryDetail?.dividendYield || null,
      roe: stats?.financialData?.returnOnEquity || null,
      roic: stats?.financialData?.returnOnAssets || null,
      evEbitda: stats?.summaryDetail?.enterpriseToEbitda || null,
      debtToEquity: stats?.financialData?.debtToEquity || null,
      dividendPerShare: stats?.summaryDetail?.dividendRate || null,
      payoutRatio: stats?.summaryDetail?.payoutRatio || null,
      fiftyTwoWeekHigh: stats?.summaryDetail?.fiftyTwoWeekHigh || null,
      fiftyTwoWeekLow: stats?.summaryDetail?.fiftyTwoWeekLow || null,
      beta: stats?.summaryDetail?.beta || null,
      sector: profile?.sector || null,
      industry: profile?.industry || null,
      description: profile?.longBusinessSummary || null,
      website: profile?.website || null,
    };
  } catch (error) {
    console.error(`Error fetching consolidated data for ${ticker}:`, error);
    throw error;
  }
}

/**
 * Calcula o score de qualidade para dividendos (método Barsi/AGF)
 * Fatores: Dividend Yield, P/L, ROE, Dívida/Patrimônio, Histórico de dividendos
 */
export function calculateQualityScore(data: ConsolidatedStockData): number {
  let score = 0;
  let factors = 0;

  // Dividend Yield (0-25 pontos)
  // Ideal: 4-8% para empresas maduras
  if (data.dividendYield !== null && data.dividendYield !== undefined) {
    const dy = data.dividendYield * 100; // Converter para porcentagem
    if (dy >= 4 && dy <= 8) {
      score += 25;
    } else if (dy >= 3 && dy <= 10) {
      score += 20;
    } else if (dy >= 2 && dy <= 12) {
      score += 15;
    } else if (dy > 0) {
      score += 10;
    }
    factors++;
  }

  // P/L (0-20 pontos)
  // Ideal: 8-15 para empresas maduras
  if (data.peRatio !== null && data.peRatio !== undefined && data.peRatio > 0) {
    const pe = data.peRatio;
    if (pe >= 8 && pe <= 15) {
      score += 20;
    } else if (pe >= 6 && pe <= 20) {
      score += 15;
    } else if (pe >= 5 && pe <= 25) {
      score += 10;
    } else {
      score += 5;
    }
    factors++;
  }

  // ROE (0-20 pontos)
  // Ideal: > 15%
  if (data.roe !== null && data.roe !== undefined) {
    const roe = data.roe * 100;
    if (roe >= 15) {
      score += 20;
    } else if (roe >= 10) {
      score += 15;
    } else if (roe >= 5) {
      score += 10;
    } else {
      score += 5;
    }
    factors++;
  }

  // Dívida/Patrimônio (0-20 pontos)
  // Ideal: < 1.0
  if (data.debtToEquity !== null && data.debtToEquity !== undefined) {
    const de = data.debtToEquity;
    if (de < 0.5) {
      score += 20;
    } else if (de < 1.0) {
      score += 15;
    } else if (de < 1.5) {
      score += 10;
    } else if (de < 2.0) {
      score += 5;
    }
    factors++;
  }

  // P/VP (0-15 pontos)
  // Ideal: < 2.0 para valor
  if (data.pbRatio !== null && data.pbRatio !== undefined && data.pbRatio > 0) {
    const pb = data.pbRatio;
    if (pb < 1.0) {
      score += 15;
    } else if (pb < 1.5) {
      score += 12;
    } else if (pb < 2.0) {
      score += 8;
    } else if (pb < 3.0) {
      score += 5;
    }
    factors++;
  }

  return factors > 0 ? Math.round(score) : 0;
}
