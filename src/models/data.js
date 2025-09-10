// Dados em memória (em produção, usar banco de dados)
let transactions = [];
let categories = [
  { id: '1', name: 'Alimentação', color: '#FF6B6B', budget: 0 },
  { id: '2', name: 'Transporte', color: '#4ECDC4', budget: 0 },
  { id: '3', name: 'Investimentos', color: '#45B7D1', budget: 0 },
  { id: '4', name: 'Lazer', color: '#96CEB4', budget: 0 },
  { id: '5', name: 'Saúde', color: '#FFEAA7', budget: 0 },
  { id: '6', name: 'Educação', color: '#DDA0DD', budget: 0 },
  { id: '7', name: 'Outros', color: '#98D8C8', budget: 0 }
];

// Dados de investimentos
let investments = [];
let investmentTypes = [
  { id: '1', name: 'Renda Fixa', description: 'CDB, LCI, LCA, Tesouro Direto', risk: 'Baixo', return: 'Baixo-Médio' },
  { id: '2', name: 'Ações', description: 'Ações individuais na bolsa', risk: 'Alto', return: 'Alto' },
  { id: '3', name: 'Fundos de Investimento', description: 'Fundos multimercado, ações, renda fixa', risk: 'Médio-Alto', return: 'Médio-Alto' },
  { id: '4', name: 'Fundos Imobiliários', description: 'FIIs - Fundos de Investimento Imobiliário', risk: 'Médio', return: 'Médio' },
  { id: '5', name: 'Criptomoedas', description: 'Bitcoin, Ethereum e outras criptos', risk: 'Muito Alto', return: 'Muito Alto' },
  { id: '6', name: 'Commodities', description: 'Ouro, prata, petróleo', risk: 'Médio-Alto', return: 'Médio-Alto' }
];

let userProfile = {
  riskTolerance: 'moderate', // conservative, moderate, aggressive
  investmentGoal: 'growth', // preservation, income, growth
  timeHorizon: 'medium', // short, medium, long
  monthlyIncome: 0,
  totalInvested: 0
};

// Getters
const getTransactions = () => transactions;
const getCategories = () => categories;
const getInvestments = () => investments;
const getInvestmentTypes = () => investmentTypes;
const getUserProfile = () => userProfile;

// Setters
const setTransactions = (newTransactions) => { transactions = newTransactions; };
const setCategories = (newCategories) => { categories = newCategories; };
const setInvestments = (newInvestments) => { investments = newInvestments; };
const setInvestmentTypes = (newInvestmentTypes) => { investmentTypes = newInvestmentTypes; };
const setUserProfile = (newUserProfile) => { userProfile = newUserProfile; };

// Adicionar item
const addTransaction = (transaction) => { transactions.push(transaction); };
const addInvestment = (investment) => { investments.push(investment); };

// Atualizar item
const updateTransaction = (id, updatedTransaction) => {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updatedTransaction };
    return transactions[index];
  }
  return null;
};

const updateInvestment = (id, updatedInvestment) => {
  const index = investments.findIndex(i => i.id === id);
  if (index !== -1) {
    investments[index] = { ...investments[index], ...updatedInvestment };
    return investments[index];
  }
  return null;
};

const updateCategory = (id, updatedCategory) => {
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
    return categories[index];
  }
  return null;
};

// Deletar item
const deleteTransaction = (id) => {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) {
    return transactions.splice(index, 1)[0];
  }
  return null;
};

const deleteInvestment = (id) => {
  const index = investments.findIndex(i => i.id === id);
  if (index !== -1) {
    return investments.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  // Getters
  getTransactions,
  getCategories,
  getInvestments,
  getInvestmentTypes,
  getUserProfile,
  
  // Setters
  setTransactions,
  setCategories,
  setInvestments,
  setInvestmentTypes,
  setUserProfile,
  
  // Adicionar
  addTransaction,
  addInvestment,
  
  // Atualizar
  updateTransaction,
  updateInvestment,
  updateCategory,
  
  // Deletar
  deleteTransaction,
  deleteInvestment
};
