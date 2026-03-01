import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar setores perenes
  const sectors = [
    {
      name: 'Energia Elétrica',
      description: 'Empresas de geração, transmissão e distribuição de energia elétrica',
      icon: 'Zap',
      color: 'amber',
    },
    {
      name: 'Bancos',
      description: 'Instituições financeiras bancárias',
      icon: 'Landmark',
      color: 'blue',
    },
    {
      name: 'Seguradoras',
      description: 'Empresas de seguros e previdência',
      icon: 'Shield',
      color: 'purple',
    },
    {
      name: 'Saneamento',
      description: 'Empresas de abastecimento de água e tratamento de esgoto',
      icon: 'Droplets',
      color: 'cyan',
    },
    {
      name: 'Telecomunicações',
      description: 'Empresas de telecomunicações e serviços de dados',
      icon: 'Phone',
      color: 'rose',
    },
    {
      name: 'Logística',
      description: 'Empresas de logística, transporte e infraestrutura',
      icon: 'Truck',
      color: 'orange',
    },
    {
      name: 'Petróleo e Gás',
      description: 'Empresas de exploração, refino e distribuição de petróleo e gás',
      icon: 'Fuel',
      color: 'slate',
    },
  ];

  console.log('📊 Criando setores...');
  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { name: sector.name },
      update: sector,
      create: sector,
    });
  }
  console.log(`✅ ${sectors.length} setores criados/atualizados`);

  // Criar usuário admin para testes
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@b3dividendos.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@b3dividendos.com',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log(`✅ Usuário admin criado: ${adminUser.email}`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
