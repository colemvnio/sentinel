const express = require('express');

const CustomerController = require('../controllers/customerController');

const router = express.Router();

// region GET
router.get(
  '/:id',
  (req, res, next) => new CustomerController(req, res)
    .detail()
    .catch(next),
);
// endregion

// region PUT
// endregion

// region PATCH
// endregion

// region POST
router.post(
  '/',
  (req, res, next) => new CustomerController(req, res)
    .create()
    .catch(next),
);
// endregion

// region DELETE
// endregion

module.exports = router;
