const { nanoid } = require('nanoid');

const BaseEntity = require('../base/baseEntity');

/**
 * CustomerEntity class
 * @class CustomerEntity
 * @extends BaseEntity
 */
class CustomerEntity extends BaseEntity {
  constructor({
    id, firstName, lastName, fullName, email, phone, stripe, devices = [], timestamp,
  }) {
    super(id, timestamp);

    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName || `${firstName} ${lastName}`;
    this.email = email;
    this.devices = devices;

    // Optional properties
    if (phone !== undefined) this.phone = phone;
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
