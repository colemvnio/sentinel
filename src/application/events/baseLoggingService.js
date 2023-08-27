const { Point } = require('@influxdata/influxdb-client');

const { getDb } = require('../../infrastructure/database/influx');
const logger = require('../../infrastructure/logger');

class BaseLoggingService {
  constructor() {
    this.influxWrite = getDb();
  }

  logEvent(eventName, { name = 'transactionId', identifier }) {
    // TODO: Refactor the handling of points/data
    const point = new Point(eventName)
      .tag(name, identifier)
      .floatField('value', 1.0)
      .timestamp(new Date());

    try {
      this.influxWrite.writePoint(point);

      // Log success and return the event object
      logger.info(JSON.stringify({ timestamp: point.time, event: eventName }));
    } catch (error) {
      logger.error('Error logging event:', error);
      throw error;
    }
  }
}

module.exports = BaseLoggingService;
