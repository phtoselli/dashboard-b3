import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Buscar favoritos
export async function GET() {
  try {
    const favorites = await db.favorite.findMany({
      include: {
        stock: {
          include: {
            sector: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

// POST - Adicionar favorito
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker, notes, userId = 'default-user' } = body;

    if (!ticker) {
      return NextResponse.json(
        { success: false, error: 'Ticker is required' },
        { status: 400 }
      );
    }

    // Buscar ou criar ação
    let stock = await db.stock.findUnique({
      where: { ticker },
    });

    if (!stock) {
      stock = await db.stock.create({
        data: {
          ticker,
          name: ticker,
        },
      });
    }

    // Verificar se já é favorito (usando findFirst com composite key)
    const existing = await db.favorite.findFirst({
      where: {
        stockId: stock.id,
        userId,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Ação já está nos favoritos',
      }, { status: 400 });
    }

    const favorite = await db.favorite.create({
      data: {
        stockId: stock.id,
        userId,
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
      favorite,
      message: 'Ação adicionada aos favoritos',
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}

// DELETE - Remover favorito
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ticker = searchParams.get('ticker');
    const userId = searchParams.get('userId') || 'default-user';

    if (!ticker) {
      return NextResponse.json(
        { success: false, error: 'Ticker is required' },
        { status: 400 }
      );
    }

    const stock = await db.stock.findUnique({
      where: { ticker },
    });

    if (!stock) {
      return NextResponse.json(
        { success: false, error: 'Stock not found' },
        { status: 404 }
      );
    }

    // Usar deleteMany com filtros para composite key
    await db.favorite.deleteMany({
      where: {
        stockId: stock.id,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Ação removida dos favoritos',
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove favorite' },
      { status: 500 }
    );
  }
}
