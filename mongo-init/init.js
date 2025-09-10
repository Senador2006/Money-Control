// Script de inicialização do MongoDB
db = db.getSiblingDB('moneycontrol');

// Criar usuário para a aplicação
db.createUser({
  user: 'moneycontrol_user',
  pwd: 'moneycontrol_password',
  roles: [
    {
      role: 'readWrite',
      db: 'moneycontrol'
    }
  ]
});

// Criar coleções iniciais
db.createCollection('transactions');
db.createCollection('categories');
db.createCollection('investments');
db.createCollection('investmenttypes');
db.createCollection('userprofiles');

// Inserir tipos de investimento padrão
db.investmenttypes.insertMany([
  {
    name: 'Renda Fixa',
    description: 'CDB, LCI, LCA, Tesouro Direto',
    risk: 'Baixo',
    return: 'Baixo-Médio',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ações',
    description: 'Ações individuais na bolsa',
    risk: 'Alto',
    return: 'Alto',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Fundos de Investimento',
    description: 'Fundos multimercado, ações, renda fixa',
    risk: 'Médio-Alto',
    return: 'Médio-Alto',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Fundos Imobiliários',
    description: 'FIIs - Fundos de Investimento Imobiliário',
    risk: 'Médio',
    return: 'Médio',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Criptomoedas',
    description: 'Bitcoin, Ethereum e outras criptos',
    risk: 'Muito Alto',
    return: 'Muito Alto',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Commodities',
    description: 'Ouro, prata, petróleo',
    risk: 'Médio-Alto',
    return: 'Médio-Alto',
    isCustom: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Inserir categorias padrão
db.categories.insertMany([
  {
    name: 'Alimentação',
    color: '#FF6B6B',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Transporte',
    color: '#4ECDC4',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Saúde',
    color: '#45B7D1',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Educação',
    color: '#96CEB4',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Lazer',
    color: '#FFEAA7',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Outros',
    color: '#DDA0DD',
    budget: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Banco de dados inicializado com sucesso!');
