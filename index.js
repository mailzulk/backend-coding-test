
const port = 8010;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
const winston = require('winston');
const app = require('./src/app');

// Logger configuration
const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: './logs/example-2.log',
    }),
  ],
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

const buildSchemas = require('./src/schemas');

db.serialize(() => {
  buildSchemas(db);

  const appRun = app(db);

  appRun.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
