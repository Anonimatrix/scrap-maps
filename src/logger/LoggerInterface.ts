export interface LogOptions {
  message: string;
  details?: string;
}

export interface LoggerInterface {
  info(opts: LogOptions): void;
  error(opts: LogOptions): void;
  warn(opts: LogOptions): void;
}
