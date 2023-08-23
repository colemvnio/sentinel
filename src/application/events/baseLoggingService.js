const { Point } = require('@influxdata/influxdb-client');
const { getDb } = require('../../infrastructure/database/influx');
const logger = require('../../infrastructure/logger');

class BaseLoggingService {
    constructor() {
        this.influxWrite = getDb();
    }

    logEvent(eventName, documentId) {
        // Create a new Point for the event
        const point = new Point(eventName)
            .tag('transactionId', documentId)
            .floatField('value', 1.0)
            .timestamp(new Date())

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