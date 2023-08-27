const { getDb } = require('../infrastructure/database/mongo');
const { stringToObjectId } = require('../utils/mongo');

class BaseRepository {
  constructor(collectionName) {
    if (new.target === BaseRepository) {
      throw new TypeError('Cannot construct BaseRepository instances directly');
    }
    this.collection = getDb().collection(collectionName);
  }

  async getById(id) {
    return this.collection.findOne({ _id: stringToObjectId(id) });
  }

  async exists(query) {
    const document = await this.getByQuery(query);
    return !!document;
  }

  async getByQuery(query, bypassTimestamp = false) {
    const objQuery = query;
    if (objQuery._id) objQuery._id = stringToObjectId(query._id);
    if (!bypassTimestamp) objQuery['timestamp.deleted'] = null;

    return this.collection.findOne(query);
  }

  async getAll(query, bypassTimestamp = false) {
    const objQuery = query;
    if (!bypassTimestamp) objQuery['timestamp.deleted'] = null;

    return this.collection.find(objQuery).toArray();
  }

  async insertOne(document) {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }

  async updateOne(query, update, options) {
    const objQuery = query;
    if (objQuery._id) objQuery._id = stringToObjectId(query._id);

    const result = await this.collection.updateOne(query, update, options);
    return result.modifiedCount;
  }

  async findOneAndUpdate(query, update, returnOriginal = 'after') {
    const result = await this.collection.findOneAndUpdate(query, { $set: update }, { returnOriginal });
    return result.value;
  }
}

module.exports = BaseRepository;
