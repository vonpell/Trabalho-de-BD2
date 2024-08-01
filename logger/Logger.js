import { createLogger, format as _format, transports as _transports } from 'winston';

export default class Logger {
    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: _format.combine(
                _format.timestamp(),
                _format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} ${level}: ${message}`;
                })
            ),
            transports: [
                new _transports.Console(),
                new _transports.File({ filename: 'logs.log' })
            ]
        });
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }
}
