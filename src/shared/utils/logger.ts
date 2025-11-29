import { cyan, green, magenta, red, yellow } from 'yoctocolors';

export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
    NONE = 6,
}

export interface LoggerConfig {
    level: LogLevel;
    prefix?: string;
    timestamp?: boolean;
    colours?: boolean;
}

export class Logger {
    private config: LoggerConfig;
    private static instance: Logger;

    constructor(confg?: Partial<LoggerConfig>) {
        this.config = {
            level: LogLevel.INFO,
            prefix: '[TSFX]',
            timestamp: true,
            colours: true,
            ...confg,
        };
    }

    static getInstance(config?: Partial<LoggerConfig>): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(config);
        }

        return Logger.instance;
    }

    setLevel(level: LogLevel): void {
        this.config.level = level;
    }

    getLevel(): LogLevel {
        return this.config.level;
    }

    setPrefix(prefix: string): void {
        this.config.prefix = prefix;
    }

    setTimestamp(enabled: boolean): void {
        this.config.timestamp = enabled;
    }

    setColours(enabled: boolean): void {
        this.config.colours = enabled;
    }

    trace(message: string, ...args: unknown[]): void {
        this.log(LogLevel.TRACE, message, ...args);
    }

    debug(message: string, ...args: unknown[]): void {
        this.log(LogLevel.DEBUG, message, ...args);
    }

    info(message: string, ...args: unknown[]): void {
        this.log(LogLevel.INFO, message, ...args);
    }

    warn(message: string, ...args: unknown[]): void {
        this.log(LogLevel.WARN, message, ...args);
    }

    error(message: string, ...args: unknown[]): void {
        this.log(LogLevel.ERROR, message, ...args);
    }

    fatal(message: string, ...args: unknown[]): void {
        this.log(LogLevel.FATAL, message, ...args);
    }

    private log(level: LogLevel, message: string, ...args: unknown[]): void {
        if (level < this.config.level) return;

        let output = '';

        if (this.config.timestamp) {
            output += `[${this.getTimestamp()}] `;
        }

        if (this.config.prefix) {
            output += `${this.config.prefix} `;
        }

        const levelString = this.getLevelString(level);

        if (this.config.colours) {
            output += this.colourize(levelString, level);
        } else {
            output += levelString;
        }

        output += ` ${message}`;

        switch (level) {
            case LogLevel.TRACE:
            case LogLevel.DEBUG:
            case LogLevel.INFO:
                console.log(output, ...args);
                break;
            case LogLevel.WARN:
                console.warn(output, ...args);
                break;
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                console.error(output, ...args);
                break;
        }
    }

    private getTimestamp(): string {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ms = String(now.getMilliseconds()).padStart(3, '0');

        return `${hours}:${minutes}:${seconds}:${ms}`;
    }

    private getLevelString(level: LogLevel): string {
        switch (level) {
            case LogLevel.TRACE:
                return '[TRACE]';
            case LogLevel.DEBUG:
                return '[DEBUG]';
            case LogLevel.INFO:
                return '[INFO]';
            case LogLevel.WARN:
                return '[WARN]';
            case LogLevel.ERROR:
                return '[ERROR]';
            case LogLevel.FATAL:
                return '[FATAL]';
            default:
                return '[UNKNOWN]';
        }
    }

    private colourize(text: string, level: LogLevel): string {
        if (!this.config.colours) {
            return text;
        }

        switch (level) {
            case LogLevel.DEBUG:
                return cyan(text);
            case LogLevel.INFO:
                return green(text);
            case LogLevel.WARN:
                return yellow(text);
            case LogLevel.ERROR:
                return red(text);
            case LogLevel.FATAL:
                return magenta(text);
            default:
                return text;
        }
    }

    child(prefix: string): Logger {
        return new Logger({
            ...this.config,
            prefix: `${this.config.prefix} ${prefix}`,
        });
    }
}

export const logger = new Logger();
