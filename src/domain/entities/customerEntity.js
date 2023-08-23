const BaseEntity = require('../base/baseEntity');

/**
 * CustomerEntity class
 * @class CustomerEntity
 * @extends BaseEntity
 */
class CustomerEntity extends BaseEntity {
  constructor({ id, name, email, timestamp, stripe }) {
    super(id, timestamp);

    this.name = name;
    this.email = email;

    // Optional properties
    if (stripe !== undefined) this.stripe = stripe;
  }
}

module.exports = CustomerEntity;
