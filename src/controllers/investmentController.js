const { Investment, InvestmentType, UserProfile } = require('../models/mongodb');
const { generateInvestmentRecommendations } = require('../utils/investmentRecommendations');

// Obter todos os investimentos
const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find().populate('typeId').sort({ createdAt: -1 });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar investimentos' });
  }
};

// Adicionar novo investimento
const createInvestment = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    
    const { name, typeId, currentPrice, investedAmount, purchaseDate, quantity } = req.body;
    
    // Validações básicas
    if (!name || !typeId || !currentPrice || !investedAmount) {
      return res.status(400).json({ error: 'Campos obrigatórios: name, typeId, currentPrice, investedAmount' });
    }
    
    const quantityValue = parseFloat(quantity) || (parseFloat(investedAmount) / parseFloat(currentPrice));
    const currentValue = quantityValue * parseFloat(currentPrice);
    const profitLoss = currentValue - parseFloat(investedAmount);
    const profitLossPercentage = (profitLoss / parseFloat(investedAmount)) * 100;
    
    console.log('Valores calculados:', {
      quantityValue,
      currentValue,
      profitLoss,
      profitLossPercentage
    });
    
    const investment = new Investment({
      name,
      typeId,
      currentPrice: parseFloat(currentPrice),
      investedAmount: parseFloat(investedAmount),
      quantity: quantityValue,
      purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
      currentValue,
      profitLoss,
      profitLossPercentage
    });
    
    console.log('Objeto investment criado:', investment);
    
    const savedInvestment = await investment.save();
    console.log('Investimento salvo:', savedInvestment);
    
    const populatedInvestment = await Investment.findById(savedInvestment._id).populate('typeId');
    console.log('Investimento populado:', populatedInvestment);
    
    res.json(populatedInvestment);
  } catch (error) {
    console.error('Erro ao criar investimento:', error);
    res.status(500).json({ error: 'Erro ao criar investimento', details: error.message });
  }
};

// Atualizar investimento
const updateInvestmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, typeId, currentPrice, investedAmount, quantity, purchaseDate } = req.body;
    
    const quantityValue = parseFloat(quantity);
    const currentValue = quantityValue * parseFloat(currentPrice);
    const profitLoss = currentValue - parseFloat(investedAmount);
    const profitLossPercentage = (profitLoss / parseFloat(investedAmount)) * 100;
    
    const updatedInvestment = await Investment.findByIdAndUpdate(
      id,
      {
        name,
        typeId,
        currentPrice: parseFloat(currentPrice),
        investedAmount: parseFloat(investedAmount),
        quantity: quantityValue,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
        currentValue,
        profitLoss,
        profitLossPercentage
      },
      { new: true }
    ).populate('typeId');
    
    if (!updatedInvestment) {
      return res.status(404).json({ error: 'Investimento não encontrado' });
    }
    
    res.json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar investimento' });
  }
};

// Deletar investimento
const deleteInvestmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvestment = await Investment.findByIdAndDelete(id);
    
    if (!deletedInvestment) {
      return res.status(404).json({ error: 'Investimento não encontrado' });
    }
    
    res.json({ message: 'Investimento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar investimento' });
  }
};

// Obter tipos de investimento
const getInvestmentTypesList = async (req, res) => {
  try {
    const types = await InvestmentType.find().sort({ name: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipos de investimento' });
  }
};

// Criar tipo de investimento personalizado
const createInvestmentType = async (req, res) => {
  try {
    const { name, description, risk, return: expectedReturn } = req.body;
    
    const investmentType = new InvestmentType({
      name,
      description,
      risk,
      return: expectedReturn,
      isCustom: true
    });
    
    const savedType = await investmentType.save();
    res.json(savedType);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tipo de investimento' });
  }
};

// Obter resumo de investimentos
const getInvestmentSummary = async (req, res) => {
  try {
    const investments = await Investment.find();
    const investmentTypes = await InvestmentType.find();
    
    const totalInvested = investments.reduce((sum, i) => sum + i.investedAmount, 0);
    const totalCurrentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
    const totalProfitLoss = totalCurrentValue - totalInvested;
    const totalProfitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;
    
    // Investimentos por tipo
    const investmentsByType = investmentTypes.map(type => {
      const typeInvestments = investments.filter(i => i.typeId.toString() === type._id.toString());
      const typeTotalInvested = typeInvestments.reduce((sum, i) => sum + i.investedAmount, 0);
      const typeCurrentValue = typeInvestments.reduce((sum, i) => sum + i.currentValue, 0);
      const typeProfitLoss = typeCurrentValue - typeTotalInvested;
      
      return {
        id: type._id,
        name: type.name,
        description: type.description,
        risk: type.risk,
        return: type.return,
        count: typeInvestments.length,
        totalInvested: typeTotalInvested,
        currentValue: typeCurrentValue,
        profitLoss: typeProfitLoss,
        profitLossPercentage: typeTotalInvested > 0 ? (typeProfitLoss / typeTotalInvested) * 100 : 0
      };
    });
    
    res.json({
      totalInvested,
      totalCurrentValue,
      totalProfitLoss,
      totalProfitLossPercentage,
      investmentsByType,
      totalInvestments: investments.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular resumo de investimentos' });
  }
};

// Obter recomendações de investimento
const getInvestmentRecommendations = async (req, res) => {
  try {
    console.log('Gerando recomendações de investimento...');
    
    // Criar perfil padrão para teste
    const userProfile = {
      riskTolerance: 'moderate',
      investmentGoal: 'growth',
      timeHorizon: 'medium',
      monthlyIncome: 0,
      totalInvested: 0
    };
    
    const investmentTypes = await InvestmentType.find();
    console.log('Tipos de investimento encontrados:', investmentTypes.length);
    
    if (!investmentTypes || investmentTypes.length === 0) {
      return res.status(404).json({ error: 'Tipos de investimento não encontrados' });
    }
    
    const recommendations = generateInvestmentRecommendations(userProfile, investmentTypes);
    console.log('Recomendações geradas:', recommendations.length);
    
    res.json(recommendations);
  } catch (error) {
    console.error('Erro ao gerar recomendações:', error);
    res.status(500).json({ error: 'Erro ao gerar recomendações', details: error.message });
  }
};

module.exports = {
  getAllInvestments,
  createInvestment,
  updateInvestmentById,
  deleteInvestmentById,
  getInvestmentTypesList,
  createInvestmentType,
  getInvestmentSummary,
  getInvestmentRecommendations
};
