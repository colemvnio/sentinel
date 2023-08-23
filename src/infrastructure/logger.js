const { format, createLogger, transports } = require('winston');
// TODO: Add Sentry
// const SentryTransport = require('winston-sentry');

/**
 * Logger Instance
 *
 * Log Levels:
 *
 * 0 - Error: Critical problem, recoverable, no effect on other operations.
 * 1 - Warn: Unusual system exception, provides context for possible errors.
 * 2 - Info: Major events, informative messages about application's state.
 * 3 - HTTP: Logs HTTP request-related messages.
 * 4 - Verbose: Detailed messages, may contain sensitive info.
 * 5 - Debug: For debugging, disable in production.
 * 6 - Silly: Prints stack trace of calling function, useful for debugging.
 */
const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(
          (info) => `[${process.env.NODE_ENV.toUpperCase()}] ${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  );
}

logger.info('Logging started');

module.exports = logger;
