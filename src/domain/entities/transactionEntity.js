const BaseEntity = require('../base/baseEntity');
const { encrypt, decrypt } = require('../../utils/crypto');
const { stringToObjectId } = require('../../utils/mongo');

/**
 * TransactionEntity class
 * @class TransactionEntity
 * @extends BaseEntity
 */
class TransactionEntity extends BaseEntity {
  constructor({
    id, userId, amount, amountRefunded, stripeId, timestamp, payment,
  }) {
    super(id, timestamp);

    this.amount = amount.sRound();
    this.userId = stringToObjectId(userId);

    // Optional properties
    if (amountRefunded !== undefined) this.amountRefunded = amountRefunded;
    if (payment !== undefined) this.payment = payment;
    if (stripeId !== undefined) this.stripeId = stripeId;
  }

  setStripeId(stripeId) {
    this.stripeId = encrypt(stripeId);
  }

  getStripeId() {
    return decrypt(this.stripeId);
  }
}

module.exports = TransactionEntity;
