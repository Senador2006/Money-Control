const { Category } = require('../models/mongodb');

// Obter categorias
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// Atualizar orçamento da categoria
const updateCategoryBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { budget } = req.body;
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { budget: parseFloat(budget) },
      { new: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar orçamento' });
  }
};

module.exports = {
  getAllCategories,
  updateCategoryBudget
};
