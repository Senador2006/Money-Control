const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  updateCategoryBudget
} = require('../controllers/categoryController');

// Rotas de categorias
router.get('/', getAllCategories);
router.put('/:id/budget', updateCategoryBudget);

module.exports = router;
