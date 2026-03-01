import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Buscar carteira
export async function GET() {
  try {
    // Buscar ou criar carteira padrão
    let portfolio = await db.portfolio.findFirst({
      include: {
        items: {
          include: {
            stock: {
              include: {
                sector: true,
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      portfolio = await db.portfolio.create({
        data: {
          name: 'Minha Carteira',
          description: 'Carteira de investimentos focada em dividendos',
        },
        include: {
          items: {
            include: {
              stock: {
                include: {
                  sector: true,
                },
              },
            },
          },
        },
      });
    }

    // Calcular totais
    let totalValue = 0;
    let totalDividends = 0;

    const itemsWithValues = portfolio.items.map(item => {
      const currentValue = (item.stock.price || 0) * item.quantity;
      const investedValue = item.avgPrice * item.quantity;
      const profit = currentValue - investedValue;
      const profitPercent = investedValue > 0 ? (profit / investedValue) * 100 : 0;
      const estimatedDividend = (item.stock.dividendYield || 0) * currentValue;

      totalValue += currentValue;
      totalDividends += estimatedDividend;

      return {
        ...item,
        currentValue,
        investedValue,
        profit,
        profitPercent,
        estimatedDividend,
      };
    });

    // Calcular pesos
    const itemsWithWeight = itemsWithValues.map(item => ({
      ...item,
      weight: totalValue > 0 ? (item.currentValue / totalValue) * 100 : 0,
    }));

    return NextResponse.json({
      success: true,
      portfolio: {
        ...portfolio,
        items: itemsWithWeight,
        totalValue,
        totalDividends,
        dividendYield: totalValue > 0 ? (totalDividends / totalValue) * 100 : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

// POST - Adicionar ação à carteira
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker, quantity, avgPrice, targetWeight, notes } = body;

    if (!ticker || !quantity || !avgPrice) {
      return NextResponse.json(
        { success: false, error: 'Ticker, quantity and avgPrice are required' },
        { status: 400 }
      );
    }

    // Buscar ou criar carteira padrão
    let portfolio = await db.portfolio.findFirst();
    if (!portfolio) {
      portfolio = await db.portfolio.create({
        data: {
          name: 'Minha Carteira',
          description: 'Carteira de investimentos focada em dividendos',
        },
      });
    }

    // Buscar ação
    let stock = await db.stock.findUnique({
      where: { ticker },
    });

    if (!stock) {
      // Criar ação se não existir
      stock = await db.stock.create({
        data: {
          ticker,
          name: ticker,
        },
      });
    }

    // Verificar se já existe na carteira
    const existingItem = await db.portfolioItem.findUnique({
      where: {
        portfolioId_stockId: {
          portfolioId: portfolio.id,
          stockId: stock.id,
        },
      },
    });

    if (existingItem) {
      // Atualizar quantidade e preço médio
      const newQuantity = existingItem.quantity + quantity;
      const newAvgPrice = ((existingItem.avgPrice * existingItem.quantity) + (avgPrice * quantity)) / newQuantity;

      const updatedItem = await db.portfolioItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          avgPrice: newAvgPrice,
          targetWeight,
          notes,
        },
        include: {
          stock: {
            include: { sector: true },
          },
        },
      });

      return NextResponse.json({
        success: true,
        item: updatedItem,
        message: 'Posição atualizada na carteira',
      });
    }

    // Criar novo item
    const newItem = await db.portfolioItem.create({
      data: {
        portfolioId: portfolio.id,
        stockId: stock.id,
        userId: 'default-user', // TODO: usar ID do usuário autenticado
        quantity,
        avgPrice,
        targetWeight,
        notes,
      },
      include: {
        stock: {
          include: { sector: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      item: newItem,
      message: 'Ação adicionada à carteira',
    });
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add to portfolio' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar item da carteira
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity, avgPrice, targetWeight, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    const updatedItem = await db.portfolioItem.update({
      where: { id },
      data: {
        quantity,
        avgPrice,
        targetWeight,
        notes,
      },
      include: {
        stock: {
          include: { sector: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      item: updatedItem,
      message: 'Item atualizado',
    });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE - Remover item da carteira
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    await db.portfolioItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Item removido da carteira',
    });
  } catch (error) {
    console.error('Error removing from portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove from portfolio' },
      { status: 500 }
    );
  }
}
