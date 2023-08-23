const express = require('express');
const transactionRoutes = require('./transactionRoutes');
const customerRoutes = require('./customerRoutes');

const router = express.Router();

// Mount routes under their prefixes
router.use('/transactions', transactionRoutes);
router.use('/customers', customerRoutes);

module.exports = router;
