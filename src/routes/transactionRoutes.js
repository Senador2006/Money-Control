const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  updateTransactionById,
  deleteTransactionById
} = require('../controllers/transactionController');

// Rotas de transações
router.get('/', getAllTransactions);
router.post('/', createTransaction);
router.put('/:id', updateTransactionById);
router.delete('/:id', deleteTransactionById);

module.exports = router;
