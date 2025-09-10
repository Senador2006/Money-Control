const express = require('express');
const router = express.Router();

// Importar todas as rotas
const transactionRoutes = require('./transactionRoutes');
const investmentRoutes = require('./investmentRoutes');
const categoryRoutes = require('./categoryRoutes');
const summaryRoutes = require('./summaryRoutes');
const profileRoutes = require('./profileRoutes');

// Configurar rotas
router.use('/transactions', transactionRoutes);
router.use('/investments', investmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/summary', summaryRoutes);
router.use('/user-profile', profileRoutes);

module.exports = router;
