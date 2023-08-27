const { nanoid } = require('nanoid');

const BaseEntity = require('../base/baseEntity');

/**
 * CustomerEntity class
 * @class CustomerEntity
 * @extends BaseEntity
 */
class CustomerEntity extends BaseEntity {
  constructor({
    id, name, email, timestamp, stripe, devices = [],
  }) {
    super(id, timestamp);

    this.name = name;
    this.email = email;
    this.devices = devices;

    // Optional properties
    if (stripe !== undefined) this.stripe = stripe;
  }

  setDevice(device) {
    // TODO: Check if device is already in the list
    const objDevice = device;
    objDevice.id = nanoid(10);
    this.devices.push(objDevice);
  }
}

module.exports = CustomerEntity;
