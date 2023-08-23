const startExpressServer = require('./interfaces/express/server');
const { connect: connectMongoDB } = require('./infrastructure/database/mongo');
const { connect: connectInfluxDB } = require('./infrastructure/database/influx');
const logger = require('./infrastructure/logger');

async function initializeApp() {
    logger.info('Initializing app');
    try {
        await Promise.all([
            connectInfluxDB(),
            connectMongoDB()
        ]);
        await startExpressServer();

        logger.info('App initialized successfully');
    } catch (error) {
        logger.error('Error initializing app:', error);
        process.exit(1);
    }
}

initializeApp();