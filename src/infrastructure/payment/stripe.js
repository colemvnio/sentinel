const Stripe = require('stripe');

const logger = require('../logger');
const CustomerEntity = require('../../domain/entities/customerEntity');
const TransactionEntity = require('../../domain/entities/transactionEntity');
const StripeEventNames = require('../../enums/stripeEvents');
const BaseLoggingService = require('../../application/events/baseLoggingService');
const { encrypt, decrypt } = require('../../utils/crypto');

class StripePayment {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.eventLoggingService = new BaseLoggingService();
  }

  /**
   * @param objData { { params: {}, entity: CustomerEntity|TransactionEntity} } }
   * @returns {Promise<Stripe.Response<Stripe.Charge>>}
   */
  async createCharge(objData) {
    let result;

    try {
      const objCharge = { amount: objData.params.amount };
      Object.assign(objCharge, StripePayment.dataByEntity(objData));

      result = await this.stripe.charges.create(objCharge);
      this.logChargeStatus(result);

      return result;
    } catch (error) {
      this.eventLoggingService.logEvent(
        StripeEventNames.CHARGE_FAILED,
        {
          name: 'chargeId',
          identifier: result?.id,
        },
      );

      logger.error('Error creating Stripe charge:', error);
      throw error;
    }
  }

  async createCustomer(objData) {
    this.eventLoggingService.logEvent(
      StripeEventNames.CUSTOMER_CREATED,
      {
        name: 'sentinelCustomerId',
        identifier: objData.metadata._id,
      },
    );

    const customer = await this.stripe.customers.create(objData);

    customer.id = encrypt(customer.id);

    this.eventLoggingService.logEvent(
      StripeEventNames.CUSTOMER_CREATED,
      {
        name: 'stripeCustomerId',
        identifier: customer.id,
      },
    );

    return customer;
  }

  /**
   * @param objData { { params: {}, entity: CustomerEntity|TransactionEntity} } }
   * @returns {{}}
   */
  static dataByEntity(objData) {
    const { params, entity } = objData;
    const objParams = {
      capture: params?.capture || true,
      metadata: {},
    };

    // Financial informations
    objParams.currency = params.stripe.currencyCode;
    objParams.source = decrypt(params.stripe.sourceId);
    objParams.customer = decrypt(params.stripe.id);
    if (params.radarSessionId) objParams.radar_options = { session: params.radarSessionId };

    // Identifiable information
    if (entity instanceof CustomerEntity) {
      objParams.metadata._id = entity._id;
      objParams.metadata.email = entity.email;
      // (...)
    } else if (entity instanceof TransactionEntity) {
      objParams.metadata.transactionId = entity.id;
    }

    return objParams;
  }

  logChargeStatus(result) {
    switch (result.status) {
      case 'succeeded':
        this.eventLoggingService.logEvent(
          StripeEventNames.CHARGE_CAPTURED,
          {
            name: 'chargeId',
            identifier: result.id,
          },
        );
        break;
      default:
        this.eventLoggingService.logEvent(
          StripeEventNames.CHARGE_PENDING,
          {
            name: 'chargeId',
            identifier: result.id,
          },
        );
        break;
    }
  }

  /**
   * @param dbEntity { CustomerEntity }
   * @param currentDevice { { ua: string } }
   */
  static getCustomerMetadata(dbEntity, currentDevice) {
    return {
      _id: dbEntity._id.toString(),
      firstName: dbEntity.firstName,
      lastName: dbEntity.lastName,
      createdSource: process.env.COMPANY_NAME,
      createdEnv: process.env.NODE_ENV,
      createdDevice: currentDevice?.ua,
    };
  }
}

module.exports = StripePayment;
