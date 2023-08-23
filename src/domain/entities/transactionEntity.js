const BaseEntity = require('../base/baseEntity');

/**
 * TransactionEntity class
 * @class TransactionEntity
 * @extends BaseEntity
 */
class TransactionEntity extends BaseEntity {
  constructor({ id, amount, amountRefunded, timestamp, payment }) {
    super(id, timestamp);

    this.amount = amount;

    // Optional properties
    if (amountRefunded !== undefined) this.amountRefunded = amountRefunded;
    if (payment !== undefined) this.payment = payment;
  }
}

module.exports = TransactionEntity;
