const BaseTimestamp = require('../../domain/base/baseTimestamp');
const TimestampEntity = require('../../domain/entities/timestampEntity');
const CustomerRepository = require('../../repositories/customerRepository');
const CustomerEntity = require('../../domain/entities/customerEntity');
const StripePayment = require('../../infrastructure/payment/stripe');
const { nonBlockingPromise } = require('../../utils/promise');

const BaseService = require('./baseService');

class CustomerService extends BaseService {
  constructor() {
    super(new CustomerRepository());

    this.stripeLib = new StripePayment();
  }

  async getById(id) {
    const dbCustomer = await this.repository.getById(id);
    return new CustomerEntity(dbCustomer);
  }

  async create(data, userId) {
    const customer = new CustomerEntity({
      timestamp: new BaseTimestamp(new TimestampEntity(userId, this.device)),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    const dbCustomer = await this.repository.exists({ email: customer.email });
    if (dbCustomer) throw new Error('Something went wrong.');

    customer.setDevice(this.device);
    customer._id = await this.repository.insertOne(customer);
    nonBlockingPromise(this.createStripeCustomer(customer));

    return customer._id;
  }

  async createStripeCustomer(dbCustomer) {
    const result = await this.stripeLib.createCustomer({
      email: dbCustomer.email,
      name: dbCustomer.fullName,
      metadata: StripePayment.getCustomerMetadata(dbCustomer, this.device),
      phone: dbCustomer.phone,
    });

    await this.updateOne(
      { _id: dbCustomer._id },
      { $set: { stripe: { id: result.id, currencyCode: 'CAD' } } },
    );
  }
}

module.exports = CustomerService;
