import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  fetchQuotesFromBrapi,
  fetchQuoteFromBrapi,
  ConsolidatedStockData 
} from '@/lib/brapi-service';
import { B3_DIVIDEND_STOCKS, SECTORS } from '@/lib/b3-stocks';

// Cache em memória para dados de ações
const stockCache = new Map<string, { data: ConsolidatedStockData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Inicializar setores no banco
async function initializeSectors() {
  for (const sector of SECTORS) {
    await db.sector.upsert({
      where: { id: sector.id },
      create: {
        id: sector.id,
        name: sector.name,
        description: sector.description,
        icon: sector.icon,
        color: sector.color,
      },
      update: {
        name: sector.name,
        description: sector.description,
        icon: sector.icon,
        color: sector.color,
      },
    });
  }
}

/**
 * Calcula o score de qualidade para dividendos (método Barsi/AGF)
 * Fatores: Dividend Yield, P/L, ROE, Dívida/Patrimônio, P/VP
 */
function calculateQualityScore(data: ConsolidatedStockData): number {
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

// Buscar dados de ações em batch da brapi.dev
async function fetchStocksDataFromBrapi(tickers: string[]): Promise<Map<string, ConsolidatedStockData>> {
  const results = new Map<string, ConsolidatedStockData>();
  
  // Verificar cache primeiro
  const uncachedTickers: string[] = [];
  for (const ticker of tickers) {
    const cached = stockCache.get(ticker);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      results.set(ticker, cached.data);
    } else {
      uncachedTickers.push(ticker);
    }
  }

  if (uncachedTickers.length > 0) {
    try {
      // Buscar da brapi.dev (limite de 20 tickers por requisição)
      const batchSize = 20;
      for (let i = 0; i < uncachedTickers.length; i += batchSize) {
        const batch = uncachedTickers.slice(i, i + batchSize);
        const batchResults = await fetchQuotesFromBrapi(batch);
        
        // Adicionar ao cache e resultados
        for (const [ticker, data] of batchResults) {
          stockCache.set(ticker, { data, timestamp: Date.now() });
          results.set(ticker, data);
        }
        
        // Pequeno delay entre batches para não sobrecarregar a API
        if (i + batchSize < uncachedTickers.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } catch (error) {
      console.error('Error fetching from brapi.dev:', error);
    }
  }

  return results;
}

// GET - Buscar lista de ações com filtros
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sector = searchParams.get('sector');
    const search = searchParams.get('search');
    const aristocrats = searchParams.get('aristocrats');
    const refresh = searchParams.get('refresh');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Inicializar setores se necessário
    await initializeSectors();

    // Filtrar ações
    let stocks = [...B3_DIVIDEND_STOCKS];

    if (sector && sector !== 'all') {
      stocks = stocks.filter(s => s.sectorId === sector);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      stocks = stocks.filter(s => 
        s.ticker.toLowerCase().includes(searchLower) ||
        s.name.toLowerCase().includes(searchLower)
      );
    }

    if (aristocrats === 'true') {
      stocks = stocks.filter(s => s.isDividendAristocrat);
    }

    // Se refresh=true, limpar cache
    if (refresh === 'true') {
      stockCache.clear();
    }

    // Limitar para não sobrecarregar a API
    const stocksToFetch = stocks.slice(0, limit);

    // Buscar dados da brapi.dev em batch
    const tickers = stocksToFetch.map(s => s.ticker.replace('.SA', ''));
    const stocksData = await fetchStocksDataFromBrapi(tickers);

    // Montar resultado consolidado
    const stocksWithData = stocksToFetch.map((stock) => {
      const tickerWithoutSA = stock.ticker.replace('.SA', '');
      const data = stocksData.get(tickerWithoutSA);
      
      return {
        ...stock,
        ticker: stock.ticker,
        name: data?.name || stock.name,
        price: data?.price || null,
        priceChange: data?.priceChange || null,
        priceChangePercent: data?.priceChangePercent || null,
        volume: data?.volume || null,
        marketCap: data?.marketCap || null,
        peRatio: data?.peRatio || null,
        pbRatio: data?.pbRatio || null,
        dividendYield: data?.dividendYield || null,
        roe: data?.roe || null,
        roic: data?.roic || null,
        evEbitda: data?.evEbitda || null,
        debtToEquity: data?.debtToEquity || null,
        qualityScore: data ? calculateQualityScore(data) : null,
        logoUrl: data?.logoUrl || null,
        fiftyTwoWeekLow: data?.fiftyTwoWeekLow || null,
        fiftyTwoWeekHigh: data?.fiftyTwoWeekHigh || null,
      };
    });

    // Salvar no banco de dados em background
    stocksWithData.forEach(async (stock) => {
      if (stock.price) {
        try {
          await db.stock.upsert({
            where: { ticker: stock.ticker },
            create: {
              ticker: stock.ticker,
              name: stock.name,
              sectorId: stock.sectorId,
              price: stock.price,
              priceChange: stock.priceChange,
              priceChangePercent: stock.priceChangePercent,
              volume: stock.volume ? Number(stock.volume) : null,
              marketCap: stock.marketCap,
              peRatio: stock.peRatio,
              pbRatio: stock.pbRatio,
              dividendYield: stock.dividendYield,
              roe: stock.roe,
              roic: stock.roic,
              evEbitda: stock.evEbitda,
              debtToEquity: stock.debtToEquity,
              qualityScore: stock.qualityScore,
              description: stock.description,
              logoUrl: stock.logoUrl,
              lastUpdate: new Date(),
            },
            update: {
              name: stock.name,
              price: stock.price,
              priceChange: stock.priceChange,
              priceChangePercent: stock.priceChangePercent,
              volume: stock.volume ? Number(stock.volume) : null,
              marketCap: stock.marketCap,
              peRatio: stock.peRatio,
              pbRatio: stock.pbRatio,
              dividendYield: stock.dividendYield,
              roe: stock.roe,
              roic: stock.roic,
              evEbitda: stock.evEbitda,
              debtToEquity: stock.debtToEquity,
              qualityScore: stock.qualityScore,
              logoUrl: stock.logoUrl,
              lastUpdate: new Date(),
            },
          });
        } catch (dbError) {
          console.error(`Error saving ${stock.ticker} to DB:`, dbError);
        }
      }
    });

    // Ordenar por score de qualidade
    stocksWithData.sort((a, b) => (b.qualityScore || 0) - (a.qualityScore || 0));

    return NextResponse.json({
      success: true,
      stocks: stocksWithData,
      total: stocks.length,
      sectors: SECTORS,
    });
  } catch (error) {
    console.error('Error in stocks API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stocks' },
      { status: 500 }
    );
  }
}

// POST - Buscar ação específica
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker } = body;

    if (!ticker) {
      return NextResponse.json(
        { success: false, error: 'Ticker is required' },
        { status: 400 }
      );
    }

    // Buscar ação na nossa lista
    const stockInfo = B3_DIVIDEND_STOCKS.find(s => 
      s.ticker.toLowerCase() === ticker.toLowerCase()
    );

    // Buscar dados da brapi.dev
    const tickerWithoutSA = ticker.replace('.SA', '').toUpperCase();
    const data = await fetchQuoteFromBrapi(tickerWithoutSA);
    const qualityScore = data ? calculateQualityScore(data) : null;

    return NextResponse.json({
      success: true,
      stock: {
        ...stockInfo,
        ticker: ticker.toUpperCase(),
        name: data?.name || stockInfo?.name || ticker,
        ...data,
        qualityScore,
      },
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
