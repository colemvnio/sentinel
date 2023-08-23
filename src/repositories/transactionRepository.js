const BaseRepository = require('./baseRepository');

class TransactionRepository extends BaseRepository {
  constructor() {
    super('transactions');
  }
}

module.exports = TransactionRepository;
