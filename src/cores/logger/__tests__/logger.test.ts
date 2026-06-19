import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Logger } from '../logger';
import { ILogTransport, LogEntry } from '../types';

describe('Logger Core Service', () => {
  let mockTransport: ILogTransport;
  let loggedEntries: LogEntry[];

  beforeEach(() => {
    loggedEntries = [];
    mockTransport = {
      write: (entry) => {
        loggedEntries.push(entry);
      },
    };
    vi.restoreAllMocks();
  });

  it('should format and write logs to registered transports', () => {
    const logger = new Logger('TestContext', [mockTransport], true);
    
    logger.info('Hello world', { userId: 123 });

    expect(loggedEntries).toHaveLength(1);
    expect(loggedEntries[0]!.message).toBe('Hello world');
    expect(loggedEntries[0]!.level).toBe('info');
    expect(loggedEntries[0]!.context).toBe('TestContext');
    expect(loggedEntries[0]!.metadata).toEqual({ userId: 123 });
  });

  it('should support child context namespacing', () => {
    const rootLogger = new Logger('Root', [mockTransport], true);
    const childLogger = rootLogger.child('ChildService');
    const grandChildLogger = childLogger.child('GrandChild');

    grandChildLogger.debug('Nested log');

    expect(loggedEntries).toHaveLength(1);
    expect(loggedEntries[0]!.context).toBe('Root:ChildService:GrandChild');
    expect(loggedEntries[0]!.level).toBe('debug');
  });

  it('should forward all logs to transports irrespective of mode', () => {
    const logger = new Logger('Prod', [mockTransport], false);

    logger.debug('debug log');
    logger.info('info log');
    logger.warn('warn log');

    expect(loggedEntries).toHaveLength(3);
    expect(loggedEntries[0]!.level).toBe('debug');
    expect(loggedEntries[1]!.level).toBe('info');
    expect(loggedEntries[2]!.level).toBe('warn');
  });

  it('should filter console outputs correctly in production mode', () => {
    const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Production mode (isDevMode = false)
    const logger = new Logger('Prod', [], false);

    logger.debug('debug console');
    logger.info('info console');
    logger.warn('warn console');
    logger.error('error console');
    logger.fatal('fatal console');

    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2); // error and fatal both go to console.error
  });

  it('should tolerate transport errors without crashing application flow', () => {
    const badTransport: ILogTransport = {
      write: () => {
        throw new Error('Transport write failure');
      },
    };
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const logger = new Logger('TestCrash', [badTransport], true);

    // This should run and catch error inside logger write()
    expect(() => logger.info('Test log')).not.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Logger transport failure:'),
      expect.any(Error)
    );
  });
});
