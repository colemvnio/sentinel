/**
 * BaseTimestamp class
 * @class TimestampEntity
 * @param {TimestampEntity} objCreated {@link BaseTimestamp.js}
 * @param {TimestampEntity} objModified {@link BaseTimestamp.js}
 */
class BaseTimestamp {
  constructor(created, modified, deleted) {
    this.created = created;
    if (modified !== undefined) this.modified = modified;
    if (deleted !== undefined) this.deleted = deleted;
  }
}

module.exports = BaseTimestamp;
