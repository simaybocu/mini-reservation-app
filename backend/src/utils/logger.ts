import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.colorize(),
    format.printf(({ level, message, timestamp, stack }) => {
      const log = `${timestamp} [${level}]: ${message}`;
      return stack ? `${log}\n${stack}` : log;
    })
  ),
  transports: [new transports.Console()]
});


