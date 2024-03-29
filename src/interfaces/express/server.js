const express = require('express');
const morgan = require('morgan');
const UAParser = require('ua-parser-js');

const logger = require('../../infrastructure/logger');

const routes = require('./routes');

async function startServer() {
  logger.info('Starting server');
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(morgan((tokens, req, res) => {
    const msg = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res), '-',
      tokens.res(req, res, 'content-length'), '-',
      tokens['user-agent'](req, res), '-',
      tokens['response-time'](req, res), 'ms',

    ].join(' ');
    logger.http(msg);
  }));

  // Inject device information
  app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser();
    req.deviceInfo = parser.setUA(userAgent).getResult();
    next();
  });

  // Routes
  app.use(routes);

  // Error handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
    next(err);
  });

  // Default error handling
  app.use((req, res) => {
    res.status(404).json({ error: 'Something went wrong' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
}

module.exports = startServer;
