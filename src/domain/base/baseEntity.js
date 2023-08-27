const BaseTimestamp = require('./baseTimestamp');

/**
 * BaseEntity class
 * @class BaseEntity
 * @param {string} id
 * @param {BaseTimestamp} timestamp {@link baseTimestamp.js}
 */
class BaseEntity {
  constructor(id, timestamp) {
    if (id !== undefined) this._id = id;
    this.timestamp = timestamp || new BaseTimestamp();
  }
}

module.exports = BaseEntity;
