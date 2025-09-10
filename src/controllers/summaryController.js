const { Transaction, Category } = require('../models/mongodb');

// Obter resumo financeiro
const getFinancialSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const categories = await Category.find();
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    // Gastos por categoria
    const expensesByCategory = categories.map(category => {
      const categoryExpenses = transactions
        .filter(t => t.type === 'expense' && t.categoryId === category._id.toString())
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        id: category._id,
        name: category.name,
        color: category.color,
        budget: category.budget,
        spent: categoryExpenses,
        remaining: category.budget - categoryExpenses
      };
    });
    
    res.json({
      totalIncome,
      totalExpenses,
      balance,
      expensesByCategory
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular resumo financeiro' });
  }
};

module.exports = {
  getFinancialSummary
};
