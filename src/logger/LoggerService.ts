import winston from 'winston';
import { LogOptions } from './LoggerInterface';
import { Inject, Injectable } from '@xkairo/scrapy';

const useSpecificLevels = (...levels: string[]) => {
  return winston.format((info) => {
    if (levels.includes(info.level)) {
      return info;
    }

    return false;
  })();
};

export interface LoggerFilenamesInterface {
  info: string;
  error: string;
}

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(@Inject('loggerFilenames') filename?: LoggerFilenamesInterface) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          filename: filename?.error || 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          format: winston.format.combine(
            useSpecificLevels('info'),
            winston.format.timestamp(),
            winston.format.json(),
          ),
          filename: filename?.info || 'logs/info.log',
          level: 'info',
        }),
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      ],
    });
  }

  info(opts: LogOptions): void {
    this.logger.info(opts.message);
  }

  error(opts: LogOptions): void {
    this.logger.error(opts.message);
  }

  warn(opts: LogOptions): void {
    this.logger.warn(opts.message);
  }
}
