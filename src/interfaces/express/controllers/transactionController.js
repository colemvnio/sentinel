const TransactionService = require('../../../application/services/transactionService');
const BaseController = require('./baseController');

class TransactionController extends BaseController {
  constructor(req, res) {
    super(req, res, new TransactionService());
  }

  async detail() {
    const document = await this.service.getById(this.params.id, this.userId);
    return this.handleOk(document);
  }
}

module.exports = TransactionController;
