import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const logDir: string = join(__dirname, '../logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`,
      filename: '%DATE%.log',
      maxFiles: 10,
      json: false,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`,
      filename: '%DATE%.log',
      maxFiles: 10,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
