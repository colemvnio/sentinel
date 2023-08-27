/**
 * TimestampEntity class
 * @class TimestampEntity
 * @param {string} date
 * @param {Object} user
 */
class TimestampEntity {
  constructor(userId, device) {
    this.date = new Date();
    this.userId = userId;
    this.device = device;
  }
}
module.exports = TimestampEntity;
