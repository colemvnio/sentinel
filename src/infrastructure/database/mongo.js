const { MongoClient } = require('mongodb');

const logger = require('../logger');

let client; // To hold the MongoDB client instance

/**
 * Connects to the MongoDB instance and returns a client instance.
 * @returns {Promise<MongoClient>}
 */
async function connect() {
  if (!client) {
    const uri = process.env.MONGO_URL + process.env.MONGO_DBNAME;
    logger.info(`Connecting to MongoDB: ${uri}`);

    try {
      client = new MongoClient(uri);
      await client.connect();
    } catch (error) {
      logger.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  return client;
}

/**
 * Returns the database instance from the client.
 * @returns {Promise<Db>}
 * @returns {*}
 */
function getDb() {
  if (!client || !process.env.MONGO_DBNAME) {
    throw new Error('Database not initialized. Call connect() first.');
  }
  return client.db(process.env.MONGO_DBNAME);
}

function getClient() {
  if (!client) {
    throw new Error('Database not initialized. Call connect() first.');
  }
  return client;
}

module.exports = { connect, getDb, getClient };
