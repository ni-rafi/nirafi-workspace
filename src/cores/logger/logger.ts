import { ILogger, LogEntry, LogLevel, ILogTransport } from './types';

const isDev = typeof import.meta !== 'undefined' && import.meta.env
  ? !!import.meta.env.DEV
  : true;

const COLORS: Record<LogLevel, string> = {
  debug: 'color: #6b7280; font-weight: 500;',
  info: 'color: #0ea5e9; font-weight: bold;',
  warn: 'color: #f97316; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  fatal: 'color: #d946ef; font-weight: bold; background-color: #fdf2ff; padding: 1px 3px; border-radius: 2px;',
};

const EMOJIS: Record<LogLevel, string> = {
  debug: '🐛',
  info: 'ℹ️',
  warn: '⚠️',
  error: '🚨',
  fatal: '💀',
};

export class Logger implements ILogger {
  private context: string;
  private transports: ILogTransport[];
  private isDevelopment: boolean;

  constructor(context: string = 'App', transports: ILogTransport[] = [], isDevMode?: boolean) {
    this.context = context;
    this.transports = transports;
    this.isDevelopment = isDevMode !== undefined ? isDevMode : isDev;
  }

  public debug(message: string, metadata?: Record<string, unknown>): void {
    this.write('debug', message, metadata);
  }

  public info(message: string, metadata?: Record<string, unknown>): void {
    this.write('info', message, metadata);
  }

  public warn(message: string, metadata?: Record<string, unknown>): void {
    this.write('warn', message, metadata);
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    this.write('error', message, metadata);
  }

  public fatal(message: string, metadata?: Record<string, unknown>): void {
    this.write('fatal', message, metadata);
  }

  public child(subContext: string): Logger {
    return new Logger(`${this.context}:${subContext}`, this.transports, this.isDevelopment);
  }

  public addTransport(transport: ILogTransport): void {
    this.transports.push(transport);
  }

  public removeTransport(transport: ILogTransport): void {
    this.transports = this.transports.filter((t) => t !== transport);
  }

  public clearTransports(): void {
    this.transports.length = 0;
  }

  private write(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      context: this.context,
      message,
      metadata,
    };

    const shouldConsoleLog = this.isDevelopment || level === 'warn' || level === 'error' || level === 'fatal';

    if (shouldConsoleLog) {
      const emoji = EMOJIS[level];
      const color = COLORS[level];
      const timeStr = entry.timestamp.toLocaleTimeString(undefined, { hour12: false });
      const contextPrefix = `[${this.context}]`;

      const consoleArgs: unknown[] = [
        `%c${emoji} [${timeStr}] ${contextPrefix} ${message}`,
        color,
      ];

      if (metadata && Object.keys(metadata).length > 0) {
        consoleArgs.push(metadata);
      }

      switch (level) {
        case 'debug':
          console.debug(...consoleArgs);
          break;
        case 'info':
          console.info(...consoleArgs);
          break;
        case 'warn':
          console.warn(...consoleArgs);
          break;
        case 'error':
        case 'fatal':
          console.error(...consoleArgs);
          break;
      }
    }

    for (const transport of this.transports) {
      try {
        transport.write(entry);
      } catch (err) {
        console.error('Logger transport failure:', err);
      }
    }
  }
}

export const logger = new Logger();
export default logger;
