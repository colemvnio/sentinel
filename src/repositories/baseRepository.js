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

    async getAll(query) {
        return this.collection.find(query).toArray();
    }

    async insertOne(document) {
        const result = await this.collection.insertOne(document);
        return result.insertedId;
    }

    async updateOne(query, update, options) {
        const result = await this.collection.updateOne(query, update, options);
        return result.modifiedCount;
    }

    async findOneAndUpdate(query, update, returnOriginal = 'after') {
        const result = await this.collection.findOneAndUpdate(query, { $set: update }, { returnOriginal });
        return result.value;
    }
}

module.exports = BaseRepository;