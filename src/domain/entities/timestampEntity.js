/**
 * TimestampEntity class
 * @class TimestampEntity
 * @param {string} date
 * @param {Object} user
 */
class TimestampEntity {
  constructor(userId) {
    this.date = new Date();
    this.userId = userId;
  }
}
module.exports = TimestampEntity;
