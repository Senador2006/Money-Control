const { Transaction } = require('../models/mongodb');

// Obter todas as transações
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

// Adicionar nova transação
const createTransaction = async (req, res) => {
  try {
    const { description, amount, type, categoryId, date } = req.body;
    
    const transaction = new Transaction({
      description,
      amount: parseFloat(amount),
      type, // 'income' ou 'expense'
      categoryId,
      date: date ? new Date(date) : new Date()
    });
    
    const savedTransaction = await transaction.save();
    res.json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

// Atualizar transação
const updateTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, categoryId, date } = req.body;
    
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        description,
        amount: parseFloat(amount),
        type,
        categoryId,
        date: date ? new Date(date) : new Date()
      },
      { new: true }
    );
    
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
};

// Deletar transação
const deleteTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    
    res.json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransactionById,
  deleteTransactionById
};
