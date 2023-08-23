const express = require('express');
const TransactionController = require('../controllers/transactionController');

const router = express.Router();

// region GET
router.get(
  '/:id',
  (req, res, next) => new TransactionController(req, res).detail().catch(next),
);
// endregion

// region PUT
// endregion

// region PATCH
// endregion

// region POST
router.post(
  '/transactions',
  (req, res, next) => new TransactionController().create().catch(next),
);
// endregion

// region DELETE
// endregion

module.exports = router;
