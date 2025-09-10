const express = require('express');
const router = express.Router();
const {
  getAllInvestments,
  createInvestment,
  updateInvestmentById,
  deleteInvestmentById,
  getInvestmentTypesList,
  createInvestmentType,
  getInvestmentSummary,
  getInvestmentRecommendations
} = require('../controllers/investmentController');

// Rotas de investimentos
router.get('/', getAllInvestments);
router.post('/', createInvestment);
router.put('/:id', updateInvestmentById);
router.delete('/:id', deleteInvestmentById);
router.get('/types', getInvestmentTypesList);
router.post('/types', createInvestmentType);
router.get('/summary', getInvestmentSummary);
router.get('/recommendations', getInvestmentRecommendations);

module.exports = router;
