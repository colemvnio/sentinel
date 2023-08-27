const CustomerService = require('../../../application/services/customerService');

const BaseController = require('./baseController');

class CustomerController extends BaseController {
  constructor(req, res) {
    super(req, res, new CustomerService());
  }
}

module.exports = CustomerController;
