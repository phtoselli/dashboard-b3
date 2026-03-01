import { NextRequest, NextResponse } from 'next/server';
import { searchStocks } from '@/lib/finance-service';

// GET - Buscar ações na API
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const results = await searchStocks(query);

    // Filtrar apenas ações da B3 (.SA)
    const b3Stocks = results?.body?.filter((stock: { symbol: string }) => 
      stock.symbol?.endsWith('.SA')
    ) || [];

    return NextResponse.json({
      success: true,
      results: b3Stocks,
    });
  } catch (error) {
    console.error('Error searching stocks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
