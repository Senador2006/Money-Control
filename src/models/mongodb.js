const mongoose = require('mongoose');

// Schema para Transações
const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  categoryId: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

// Schema para Categorias
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  budget: { type: Number, default: 0 }
}, { timestamps: true });

// Schema para Tipos de Investimento
const investmentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  risk: { type: String, required: true },
  return: { type: String, required: true },
  isCustom: { type: Boolean, default: false }
}, { timestamps: true });

// Schema para Investimentos
const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestmentType', required: true },
  currentPrice: { type: Number, required: true },
  investedAmount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  currentValue: { type: Number, required: true },
  profitLoss: { type: Number, default: 0 },
  profitLossPercentage: { type: Number, default: 0 }
}, { timestamps: true });

// Schema para Perfil do Usuário
const userProfileSchema = new mongoose.Schema({
  riskTolerance: { type: String, enum: ['conservative', 'moderate', 'aggressive'], default: 'moderate' },
  investmentGoal: { type: String, enum: ['preservation', 'income', 'growth'], default: 'growth' },
  timeHorizon: { type: String, enum: ['short', 'medium', 'long'], default: 'medium' },
  monthlyIncome: { type: Number, default: 0 },
  totalInvested: { type: Number, default: 0 }
}, { timestamps: true });

// Criar modelos
const Transaction = mongoose.model('Transaction', transactionSchema);
const Category = mongoose.model('Category', categorySchema);
const InvestmentType = mongoose.model('InvestmentType', investmentTypeSchema);
const Investment = mongoose.model('Investment', investmentSchema);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    const config = require('../../config');
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout após 5s
      socketTimeoutMS: 45000, // Fecha sockets após 45s de inatividade
    });
    console.log(`✅ MongoDB Atlas conectado: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Inicializar dados padrão se necessário
    await initializeDefaultData();
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB Atlas:', error.message);
    console.log('🔧 Verifique se:');
    console.log('   - A string de conexão está correta');
    console.log('   - O IP está liberado no MongoDB Atlas');
    console.log('   - As credenciais estão corretas');
    console.log('   - A internet está funcionando');
  }
};

// Inicializar dados padrão
const initializeDefaultData = async () => {
  try {
    // Verificar se já existem categorias
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      const defaultCategories = [
        { name: 'Alimentação', color: '#FF6B6B', budget: 0 },
        { name: 'Transporte', color: '#4ECDC4', budget: 0 },
        { name: 'Investimentos', color: '#45B7D1', budget: 0 },
        { name: 'Lazer', color: '#96CEB4', budget: 0 },
        { name: 'Saúde', color: '#FFEAA7', budget: 0 },
        { name: 'Educação', color: '#DDA0DD', budget: 0 },
        { name: 'Outros', color: '#98D8C8', budget: 0 }
      ];
      await Category.insertMany(defaultCategories);
      console.log('Categorias padrão criadas');
    }

    // Verificar se já existem tipos de investimento
    const investmentTypesCount = await InvestmentType.countDocuments();
    if (investmentTypesCount === 0) {
      const defaultInvestmentTypes = [
        { name: 'Renda Fixa', description: 'CDB, LCI, LCA, Tesouro Direto', risk: 'Baixo', return: 'Baixo-Médio', isCustom: false },
        { name: 'Ações', description: 'Ações individuais na bolsa', risk: 'Alto', return: 'Alto', isCustom: false },
        { name: 'Fundos de Investimento', description: 'Fundos multimercado, ações, renda fixa', risk: 'Médio-Alto', return: 'Médio-Alto', isCustom: false },
        { name: 'Fundos Imobiliários', description: 'FIIs - Fundos de Investimento Imobiliário', risk: 'Médio', return: 'Médio', isCustom: false },
        { name: 'Criptomoedas', description: 'Bitcoin, Ethereum e outras criptos', risk: 'Muito Alto', return: 'Muito Alto', isCustom: false },
        { name: 'Commodities', description: 'Ouro, prata, petróleo', risk: 'Médio-Alto', return: 'Médio-Alto', isCustom: false }
      ];
      await InvestmentType.insertMany(defaultInvestmentTypes);
      console.log('Tipos de investimento padrão criados');
    }

    // Verificar se já existe perfil do usuário
    const userProfileCount = await UserProfile.countDocuments();
    if (userProfileCount === 0) {
      const defaultProfile = new UserProfile({
        riskTolerance: 'moderate',
        investmentGoal: 'growth',
        timeHorizon: 'medium',
        monthlyIncome: 0,
        totalInvested: 0
      });
      await defaultProfile.save();
      console.log('Perfil padrão do usuário criado');
    }
  } catch (error) {
    console.error('Erro ao inicializar dados padrão:', error);
  }
};

module.exports = {
  connectDB,
  Transaction,
  Category,
  InvestmentType,
  Investment,
  UserProfile
};
