/**
 * Dados das principais ações da B3 focadas em setores perenes
 * Setores: Energia, Bancos, Seguradoras, Saneamento, Distribuição de energia
 */

export interface B3Stock {
  ticker: string;
  name: string;
  sector: string;
  sectorId: string;
  description: string;
  isDividendAristocrat?: boolean;
}

export const SECTORS = [
  {
    id: 'energia',
    name: 'Energia Elétrica',
    description: 'Geradoras e transmissoras de energia elétrica',
    icon: 'Zap',
    color: '#F59E0B',
  },
  {
    id: 'distribuicao',
    name: 'Distribuição de Energia',
    description: 'Distribuidoras de energia elétrica',
    icon: 'Plug',
    color: '#10B981',
  },
  {
    id: 'bancos',
    name: 'Bancos',
    description: 'Instituições financeiras e bancos',
    icon: 'Landmark',
    color: '#3B82F6',
  },
  {
    id: 'seguradoras',
    name: 'Seguradoras',
    description: 'Empresas de seguros e previdência',
    icon: 'Shield',
    color: '#8B5CF6',
  },
  {
    id: 'saneamento',
    name: 'Saneamento Básico',
    description: 'Empresas de água e esgoto',
    icon: 'Droplets',
    color: '#06B6D4',
  },
  {
    id: 'telecom',
    name: 'Telecomunicações',
    description: 'Operadoras de telecomunicações',
    icon: 'Phone',
    color: '#EC4899',
  },
  {
    id: 'logistica',
    name: 'Logística',
    description: 'Empresas de logística e transporte',
    icon: 'Truck',
    color: '#F97316',
  },
];

export const B3_DIVIDEND_STOCKS: B3Stock[] = [
  // === ENERGIA ELÉTRICA ===
  {
    ticker: 'TAEE11.SA',
    name: 'Transmissora Aliança de Energia Elétrica S.A. Units',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Uma das maiores transmissoras de energia do Brasil, com ativos em diversas regiões. Excelente pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'TAEE3.SA',
    name: 'Transmissora Aliança de Energia Elétrica S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Versão ON da Transmissora Aliança, com rights diferentes.',
  },
  {
    ticker: 'TAEE4.SA',
    name: 'Transmissora Aliança de Energia Elétrica S.A. Ações Preferências Classe A',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Versão PNA da Transmissora Aliança.',
  },
  {
    ticker: 'CMIG4.SA',
    name: 'Companhia Energética de Minas Gerais S.A. Ações Preferências',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Companhia Energética de Minas Gerais, uma das maiores integradas do setor. Tradicional pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'CPLE6.SA',
    name: 'Companhia Paranaense de Energia S.A. Ações Preferências Classe B',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Companhia Paranaense de Energia, integrada com foco em renováveis.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'CPFE3.SA',
    name: 'CPFL Energia S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Maior grupo privado de energia elétrica do Brasil.',
  },
  {
    ticker: 'EGIE3.SA',
    name: 'Engie Brasil Energia S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Maior geradora privada de energia do país, com foco em renováveis.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'AESB3.SA',
    name: 'AES Brasil Energia S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Geradora de energia com foco em renováveis.',
  },
  {
    ticker: 'NEOE3.SA',
    name: 'Neoenergia S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Maior distribuidora de energia elétrica do Brasil em número de clientes.',
  },
  {
    ticker: 'ALUP11.SA',
    name: 'Alupar Investimentos S.A. Units',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Transmissora de energia com ativos em diversas regiões do Brasil.',
  },

  // === DISTRIBUIÇÃO DE ENERGIA ===
  {
    ticker: 'ENGI11.SA',
    name: 'Engie Brasil S.A. Units',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Engie Brasil, multinacional do setor energético.',
  },
  {
    ticker: 'ENGI3.SA',
    name: 'Engie Brasil S.A. Ações Ordinárias',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Versão ON da Engie Brasil.',
  },
  {
    ticker: 'ENGI4.SA',
    name: 'Engie Brasil S.A. Ações Preferências',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Versão PN da Engie Brasil.',
  },
  {
    ticker: 'CLSC4.SA',
    name: 'Centrais Elétricas de Santa Catarina S.A. Ações Preferências',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Centrais Elétricas de Santa Catarina.',
  },
  {
    ticker: 'CEBR3.SA',
    name: 'Companhia Energética de Brasília S.A. Ações Ordinárias',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Companhia Energética de Brasília.',
  },
  {
    ticker: 'CEBR5.SA',
    name: 'Companhia Energética de Brasília S.A. Ações Preferências',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Companhia Energética de Brasília - PN.',
  },
  {
    ticker: 'EEEL3.SA',
    name: 'Companhia Estadual de Energia Elétrica S.A. Ações Ordinárias',
    sector: 'Distribuição de Energia',
    sectorId: 'distribuicao',
    description: 'Companhia Estadual de Energia Elétrica do RS.',
  },
  {
    ticker: 'ELET3.SA',
    name: 'Centrais Elétricas Brasileiras S.A. - Eletrobras Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Maior empresa de energia elétrica da América Latina.',
  },
  {
    ticker: 'ELET6.SA',
    name: 'Centrais Elétricas Brasileiras S.A. - Eletrobras Ações Preferências Classe B',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Maior empresa de energia elétrica da América Latina - PN.',
  },

  // === BANCOS ===
  {
    ticker: 'BBDC4.SA',
    name: 'Banco Bradesco S.A. Ações Preferências',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Um dos maiores bancos privados do Brasil. Tradicional pagador de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'BBDC3.SA',
    name: 'Banco Bradesco S.A. Ações Ordinárias',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão ON do Bradesco.',
  },
  {
    ticker: 'ITUB4.SA',
    name: 'Itaú Unibanco Holding S.A. Ações Preferências',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Maior banco privado da América Latina. Excelente histórico de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'ITUB3.SA',
    name: 'Itaú Unibanco Holding S.A. Ações Ordinárias',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão ON do Itaú Unibanco.',
  },
  {
    ticker: 'BBAS3.SA',
    name: 'Banco do Brasil S.A. Ações Ordinárias',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Maior banco da América Latina. Excelente pagador de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'SANB11.SA',
    name: 'Banco Santander (Brasil) S.A. Units',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Subsidiária brasileira do grupo Santander.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'SANB3.SA',
    name: 'Banco Santander (Brasil) S.A. Ações Ordinárias',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão ON do Santander Brasil.',
  },
  {
    ticker: 'SANB4.SA',
    name: 'Banco Santander (Brasil) S.A. Ações Preferências',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão PN do Santander Brasil.',
  },
  {
    ticker: 'ABCB4.SA',
    name: 'Banco ABC Brasil S.A. Ações Preferências',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Banco médio com foco em corporate.',
  },
  {
    ticker: 'BPAC11.SA',
    name: 'BTG Pactual S.A. Units',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Maior banco de investimento independente da América Latina.',
  },
  {
    ticker: 'BPAC3.SA',
    name: 'BTG Pactual S.A. Ações Ordinárias',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão ON do BTG Pactual.',
  },
  {
    ticker: 'BPAC5.SA',
    name: 'BTG Pactual S.A. Ações Preferências',
    sector: 'Bancos',
    sectorId: 'bancos',
    description: 'Versão PN do BTG Pactual.',
  },

  // === SEGURADORAS ===
  {
    ticker: 'BBSE3.SA',
    name: 'BB Seguridade Participações S.A. Ações Ordinárias',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Controladora das atividades de seguros do BB. Excelente pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'IRBR3.SA',
    name: 'IRB Brasil Resseguros S.A. Ações Ordinárias',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Maior resseguradora da América Latina.',
  },
  {
    ticker: 'PSSA3.SA',
    name: 'Porto Seguro S.A. Ações Ordinárias',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Uma das maiores seguradoras do Brasil.',
  },
  {
    ticker: 'SULA11.SA',
    name: 'SulAmérica S.A. Units',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Seguradora com forte atuação em saúde e previdência.',
  },
  {
    ticker: 'SULA3.SA',
    name: 'SulAmérica S.A. Ações Ordinárias',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Versão ON da SulAmérica.',
  },
  {
    ticker: 'SULA4.SA',
    name: 'SulAmérica S.A. Ações Preferências',
    sector: 'Seguradoras',
    sectorId: 'seguradoras',
    description: 'Versão PN da SulAmérica.',
  },

  // === SANEAMENTO ===
  {
    ticker: 'SBSP3.SA',
    name: 'Companhia de Saneamento Básico do Estado de São Paulo S.A. Ações Ordinárias',
    sector: 'Saneamento Básico',
    sectorId: 'saneamento',
    description: 'Maior empresa de saneamento da América Latina. Excelente pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'CSMG3.SA',
    name: 'Companhia de Saneamento de Minas Gerais S.A. Ações Ordinárias',
    sector: 'Saneamento Básico',
    sectorId: 'saneamento',
    description: 'Companhia de Saneamento de Minas Gerais.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'CASN3.SA',
    name: 'Companhia Catarinense de Águas e Saneamento S.A. Ações Ordinárias',
    sector: 'Saneamento Básico',
    sectorId: 'saneamento',
    description: 'Companhia de Saneamento de Santa Catarina.',
  },
  {
    ticker: 'CESP6.SA',
    name: 'Companhia Energética de São Paulo S.A. Ações Preferências Classe B',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Companhia Energética de São Paulo.',
  },
  {
    ticker: 'AESP3.SA',
    name: 'AES Tietê Energia S.A. Ações Ordinárias',
    sector: 'Energia Elétrica',
    sectorId: 'energia',
    description: 'Geradora de energia hidrelétrica.',
  },
  {
    ticker: 'AMAR3.SA',
    name: 'Amarantino Saneamento Básico S.A. Ações Ordinárias',
    sector: 'Saneamento Básico',
    sectorId: 'saneamento',
    description: 'Empresa de saneamento regional.',
  },

  // === TELECOMUNICAÇÕES ===
  {
    ticker: 'VIVT3.SA',
    name: 'Telefônica Brasil S.A. Ações Ordinárias',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Maior operadora de telecomunicações do Brasil. Excelente pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'VIVT4.SA',
    name: 'Telefônica Brasil S.A. Ações Preferências',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Versão PN da Vivo.',
  },
  {
    ticker: 'TIMS3.SA',
    name: 'TIM S.A. Ações Ordinárias',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Operadora de telecomunicações com forte presença em mobile.',
  },
  {
    ticker: 'OIBR3.SA',
    name: 'Oi S.A. Ações Ordinárias',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Operadora de telecomunicações em reestruturação.',
  },
  {
    ticker: 'OIBR4.SA',
    name: 'Oi S.A. Ações Preferências',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Versão PN da Oi.',
  },
  {
    ticker: 'TLPP3.SA',
    name: 'Telecomunicações Brasileiras S.A. - Telebrás Ações Ordinárias',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Telecomunicações Brasileiras.',
  },
  {
    ticker: 'TLPP4.SA',
    name: 'Telecomunicações Brasileiras S.A. - Telebrás Ações Preferências',
    sector: 'Telecomunicações',
    sectorId: 'telecom',
    description: 'Versão PN da Telebrás.',
  },

  // === LOGÍSTICA E OUTROS SETORES PERENES ===
  {
    ticker: 'RAIL3.SA',
    name: 'Rumo Logística S.A. Ações Ordinárias',
    sector: 'Logística',
    sectorId: 'logistica',
    description: 'Maior operadora logística do Brasil, com foco em ferrovias.',
  },
  {
    ticker: 'VALE3.SA',
    name: 'Vale S.A. Ações Ordinárias',
    sector: 'Mineração',
    sectorId: 'energia',
    description: 'Maior produtora de minério de ferro do mundo. Dividendos expressivos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'PETR4.SA',
    name: 'Petróleo Brasileiro S.A. - Petrobras Ações Preferências',
    sector: 'Petróleo e Gás',
    sectorId: 'energia',
    description: 'Maior empresa do Brasil. Excelente pagadora de dividendos.',
    isDividendAristocrat: true,
  },
  {
    ticker: 'PETR3.SA',
    name: 'Petróleo Brasileiro S.A. - Petrobras Ações Ordinárias',
    sector: 'Petróleo e Gás',
    sectorId: 'energia',
    description: 'Versão ON da Petrobras.',
  },
  {
    ticker: 'RENT3.SA',
    name: 'Localiza Rent a Car S.A. Ações Ordinárias',
    sector: 'Logística',
    sectorId: 'logistica',
    description: 'Maior locadora de veículos do Brasil.',
  },
  {
    ticker: 'GGBR4.SA',
    name: 'Gerdau S.A. Ações Preferências',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Maior produtora de aço longos das Américas.',
  },
  {
    ticker: 'GGBR3.SA',
    name: 'Gerdau S.A. Ações Ordinárias',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Versão ON da Gerdau.',
  },
  {
    ticker: 'CSNA3.SA',
    name: 'Companhia Siderúrgica Nacional S.A. Ações Ordinárias',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Uma das maiores siderúrgicas do Brasil.',
  },
  {
    ticker: 'USIM5.SA',
    name: 'Usinas Siderúrgicas de Minas Gerais S.A. - Usiminas Ações Preferências Classe A',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Maior produtora de aços planos da América Latina.',
  },
  {
    ticker: 'USIM3.SA',
    name: 'Usinas Siderúrgicas de Minas Gerais S.A. - Usiminas Ações Ordinárias',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Versão ON da Usiminas.',
  },
  {
    ticker: 'GOAU4.SA',
    name: 'Metalúrgica Gerdau S.A. Ações Preferências',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Controladora da Gerdau.',
  },
  {
    ticker: 'GOAU3.SA',
    name: 'Metalúrgica Gerdau S.A. Ações Ordinárias',
    sector: 'Siderurgia',
    sectorId: 'logistica',
    description: 'Versão ON da Metalúrgica Gerdau.',
  },
];

// Obter ações por setor
export function getStocksBySector(sectorId: string): B3Stock[] {
  return B3_DIVIDEND_STOCKS.filter(stock => stock.sectorId === sectorId);
}

// Obter ações aristocratas de dividendos
export function getDividendAristocrats(): B3Stock[] {
  return B3_DIVIDEND_STOCKS.filter(stock => stock.isDividendAristocrat);
}

// Obter todos os tickers únicos
export function getAllTickers(): string[] {
  return [...new Set(B3_DIVIDEND_STOCKS.map(stock => stock.ticker))];
}

// Buscar ação por ticker
export function getStockByTicker(ticker: string): B3Stock | undefined {
  return B3_DIVIDEND_STOCKS.find(stock => stock.ticker === ticker);
}
