const { InfluxDB } = require('@influxdata/influxdb-client');

const logger = require('../logger');

let client;

async function connect() {
  if (!client) {
    const uri = process.env.INFLUXDB_URI;
    logger.info(`Connecting to InfluxDB: ${uri}`);

    try {
      client = new InfluxDB({ url: uri, token: process.env.INFLUXDB_TOKEN });
    } catch (error) {
      logger.error('Error connecting to InfluxDB:', error);
      throw error;
    }
  }
}

/**
 * Retrieves a reference to the specified InfluxDB organization.
 */
function getDb() {
  if (!client) {
    throw new Error('InfluxDB client not connected or organization name missing. Call connect() and provide the organization name.');
  }
  const writeApi = client.getWriteApi('sentinel', 'audits', 'ns');
  writeApi.useDefaultTags({ env: process.env.NODE_ENV });

  return writeApi;
}

module.exports = { connect, getDb };
