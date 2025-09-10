const express = require('express');
const router = express.Router();
const {
  getFinancialSummary
} = require('../controllers/summaryController');

// Rotas de resumo
router.get('/', getFinancialSummary);

module.exports = router;
