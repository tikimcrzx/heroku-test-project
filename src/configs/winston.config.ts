import * as winston from 'winston';

export const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.colorize(),
    ),
  }),
  new winston.transports.File({
    filename: 'info.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.colorize(),
    ),
  }),
];
