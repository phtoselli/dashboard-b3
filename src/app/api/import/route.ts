import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseBrokerFile, parseJSONFormat, ParsedPosition } from '@/lib/portfolio-import';
import { getConsolidatedStockData, calculateQualityScore } from '@/lib/finance-service';

interface ProcessedPosition {
  ticker: string;
  action: 'created' | 'updated';
  quantity: number;
  avgPrice: number;
}

// GET - Buscar histórico de importações
export async function GET() {
  try {
    const imports = await db.portfolioImport.findMany({
      include: {
        brokerConnection: true,
        positions: true,
      },
      orderBy: {
        importedAt: 'desc',
      },
      take: 20,
    });

    // Buscar conexões de corretoras
    const connections = await db.brokerConnection.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      imports,
      connections,
    });
  } catch (error) {
    console.error('Error fetching imports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch imports' },
      { status: 500 }
    );
  }
}

// POST - Importar carteira de arquivo
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const textContent = formData.get('text') as string | null;
    const brokerName = formData.get('broker') as string | null;
    const connectionId = formData.get('connectionId') as string | null;
    
    let content = '';
    let fileName = '';
    let fileType = '';
    
    if (file) {
      content = await file.text();
      fileName = file.name;
      fileType = file.name.split('.').pop()?.toLowerCase() || '';
    } else if (textContent) {
      content = textContent;
      fileName = 'manual-input.txt';
      fileType = 'txt';
    } else {
      return NextResponse.json(
        { success: false, error: 'No file or text content provided' },
        { status: 400 }
      );
    }
    
    // Parse do conteúdo
    let parseResult;
    if (fileType === 'json') {
      parseResult = parseJSONFormat(content);
    } else {
      parseResult = parseBrokerFile(content, fileName);
    }
    
    if (!parseResult.success || parseResult.positions.length === 0) {
      // Salvar tentativa falha
      await db.portfolioImport.create({
        data: {
          source: file ? 'file_upload' : 'manual',
          fileName,
          fileType,
          status: 'error',
          itemsImported: 0,
          itemsSkipped: 0,
          errorMessage: parseResult.errors.join('; ') || 'No positions found',
          rawData: content.substring(0, 10000), // Limitar tamanho
        },
      });
      
      return NextResponse.json({
        success: false,
        error: parseResult.errors.join('; ') || 'No positions found',
        warnings: parseResult.warnings,
      }, { status: 400 });
    }
    
    // Criar registro de importação
    const importRecord = await db.portfolioImport.create({
      data: {
        brokerConnectionId: connectionId || null,
        source: file ? 'file_upload' : 'manual',
        fileName,
        fileType,
        status: 'processed',
        itemsImported: parseResult.positions.length,
        itemsSkipped: 0,
        processedData: JSON.stringify(parseResult.positions),
        rawData: content.substring(0, 10000),
      },
    });
    
    // Buscar ou criar carteira padrão
    let portfolio = await db.portfolio.findFirst();
    if (!portfolio) {
      portfolio = await db.portfolio.create({
        data: {
          name: 'Minha Carteira',
          description: 'Carteira importada da B3',
        },
      });
    }
    
    // Processar cada posição
    const processedPositions: ProcessedPosition[] = [];
    const errors: string[] = [];
    
    for (const position of parseResult.positions) {
      try {
        // Verificar se o ticker existe no nosso banco
        let stock = await db.stock.findUnique({
          where: { ticker: position.ticker },
        });
        
        // Se não existe, tentar buscar dados e criar
        if (!stock) {
          try {
            const stockData = await getConsolidatedStockData(position.ticker);
            const qualityScore = calculateQualityScore(stockData);
            
            stock = await db.stock.create({
              data: {
                ticker: position.ticker,
                name: position.name || stockData.name || position.ticker,
                price: stockData.price,
                peRatio: stockData.peRatio,
                pbRatio: stockData.pbRatio,
                dividendYield: stockData.dividendYield,
                roe: stockData.roe,
                qualityScore,
                description: stockData.description,
                lastUpdate: new Date(),
              },
            });
          } catch {
            // Criar stock básico se falhar
            stock = await db.stock.create({
              data: {
                ticker: position.ticker,
                name: position.name || position.ticker,
                lastUpdate: new Date(),
              },
            });
          }
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
          // Atualizar com nova posição (média ponderada)
          const newQuantity = existingItem.quantity + position.quantity;
          const newAvgPrice = ((existingItem.avgPrice * existingItem.quantity) + 
                              (position.avgPrice * position.quantity)) / newQuantity;
          
          await db.portfolioItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: newQuantity,
              avgPrice: newAvgPrice,
            },
          });
          
          processedPositions.push({
            ticker: position.ticker,
            action: 'updated',
            quantity: newQuantity,
            avgPrice: newAvgPrice,
          });
        } else {
          // Criar novo item
          await db.portfolioItem.create({
            data: {
              portfolioId: portfolio.id,
              stockId: stock.id,
              userId: 'default-user', // TODO: usar ID do usuário autenticado
              quantity: position.quantity,
              avgPrice: position.avgPrice,
            },
          });
          
          processedPositions.push({
            ticker: position.ticker,
            action: 'created',
            quantity: position.quantity,
            avgPrice: position.avgPrice,
          });
        }
        
        // Criar snapshot
        await db.positionSnapshot.create({
          data: {
            importId: importRecord.id,
            ticker: position.ticker,
            quantity: position.quantity,
            avgPrice: position.avgPrice,
            currentPrice: position.currentPrice || stock.price,
            totalValue: position.totalValue,
            snapshotDate: new Date(),
          },
        });
        
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Erro ao processar ${position.ticker}: ${errorMsg}`);
      }
    }
    
    // Atualizar registro de importação
    await db.portfolioImport.update({
      where: { id: importRecord.id },
      data: {
        itemsImported: processedPositions.length,
        itemsSkipped: errors.length,
        errorMessage: errors.length > 0 ? errors.join('; ') : null,
      },
    });
    
    // Criar conexão de corretora se especificada
    if (brokerName && !connectionId) {
      // Verificar se já existe
      const existingConnection = await db.brokerConnection.findFirst({
        where: { name: brokerName },
      });
      
      if (existingConnection) {
        await db.brokerConnection.update({
          where: { id: existingConnection.id },
          data: {
            lastSync: new Date(),
            status: 'active',
          },
        });
      } else {
        await db.brokerConnection.create({
          data: {
            name: brokerName,
            connectionType: 'file_upload',
            lastSync: new Date(),
            status: 'active',
          },
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Importados ${processedPositions.length} ativos com sucesso!`,
      broker: parseResult.broker,
      positions: processedPositions,
      errors: errors.length > 0 ? errors : undefined,
      warnings: parseResult.warnings.length > 0 ? parseResult.warnings : undefined,
      importId: importRecord.id,
    });
    
  } catch (error) {
    console.error('Error importing portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import portfolio' },
      { status: 500 }
    );
  }
}

// DELETE - Limpar carteira
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const importId = searchParams.get('importId');
    
    if (importId) {
      // Deletar importação específica e seus snapshots
      await db.positionSnapshot.deleteMany({
        where: { importId },
      });
      
      await db.portfolioImport.delete({
        where: { id: importId },
      });
      
      return NextResponse.json({
        success: true,
        message: 'Importação removida',
      });
    }
    
    // Se não especificou importId, limpar toda a carteira
    const portfolio = await db.portfolio.findFirst();
    
    if (portfolio) {
      await db.portfolioItem.deleteMany({
        where: { portfolioId: portfolio.id },
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Carteira limpa com sucesso',
    });
    
  } catch (error) {
    console.error('Error clearing portfolio:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear portfolio' },
      { status: 500 }
    );
  }
}
