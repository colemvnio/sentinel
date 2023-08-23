const BaseTimestamp = require('../../domain/base/baseTimestamp');
const TimestampEntity = require('../../domain/entities/timestampEntity');
const BaseService = require('./baseService');
const CustomerRepository = require('../../repositories/customerRepository');
const CustomerEntity = require('../../domain/entities/customerEntity');

class CustomerService extends BaseService {
  constructor() {
    super(new CustomerRepository());
  }

  async create(data, userId) {
    const customer = new CustomerEntity({
      timestamp: new BaseTimestamp(new TimestampEntity(userId)),
      name: data.name,
      email: data.email,
    });

    return this.repository.insertOne(customer);
  }
}

module.exports = CustomerService;
