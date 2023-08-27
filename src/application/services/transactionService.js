const TransactionRepository = require('../../repositories/transactionRepository');
const TransactionEntity = require('../../domain/entities/transactionEntity');
const BaseTimestamp = require('../../domain/base/baseTimestamp');
const TimestampEntity = require('../../domain/entities/timestampEntity');
const BaseService = require('./baseService');

class TransactionService extends BaseService {
  constructor() {
    super(new TransactionRepository());
  }

  async getById(id) {
    this.eventLoggingService.logEvent(
      'view_transaction_detail',
      id,
    );
    return this.repository.getById(id);
  }

  async create(data, userId) {
    const transaction = new TransactionEntity({
      timestamp: new BaseTimestamp(new TimestampEntity(userId, this.device)),
      amount: data.amount,
      payment: data.payment,
    });

    return this.repository.insertOne(transaction);
  }
}

module.exports = TransactionService;
