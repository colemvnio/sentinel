const TransactionRepository = require('../../repositories/transactionRepository');
const TransactionEntity = require('../../domain/entities/transactionEntity');
const BaseTimestamp = require('../../domain/base/baseTimestamp');
const TimestampEntity = require('../../domain/entities/timestampEntity');
const StripePayment = require('../../infrastructure/payment/stripe');
const { CHARGE_INITIATED } = require('../../enums/stripeEvents');
const { getClient } = require('../../infrastructure/database/mongo');

const BaseService = require('./baseService');
const CustomerService = require('./customerService');

class TransactionService extends BaseService {
  constructor() {
    super(new TransactionRepository());

    this.customerService = new CustomerService();
    this.stripeLib = new StripePayment();
  }

  async getById(id) {
    this.eventLoggingService.logEvent(
      'view_transaction_detail',
      {
        name: 'transactionId',
        identifier: id,
      },
    );
    return this.repository.getById(id);
  }

  async create(data, userId) {
    this.eventLoggingService.logEvent(
      CHARGE_INITIATED,
      {
        name: 'userId',
        identifier: userId,
      },
    );

    let result;

    const customer = await this.customerService.getById(userId);
    const session = getClient().startSession();
    try {
      result = await session.withTransaction(async () => {
        const transaction = new TransactionEntity({
          userId,
          timestamp: new BaseTimestamp(new TimestampEntity(userId, this.device)),
          amount: data.amount,
          payment: data.payment,
        });

        // TODO: Stripe payment processing
        const objData = {
          params: {
            stripe: customer.stripe,
            amount: transaction.amount,
          },
          entity: transaction,
        };
        const stripeCharge = await this.stripeLib.createCharge(objData);
        transaction.setStripeId(stripeCharge.id);

        return this.repository.insertOne(transaction);
      });

      await session.endSession();
    } catch (e) {
      await session.endSession();

      throw e;
    }

    return result;
  }
}

module.exports = TransactionService;
