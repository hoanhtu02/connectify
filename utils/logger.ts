// setup pino logger vs pino pretty

import pino from "pino"

const logger =
    process.env.NODE_ENV === "production"
        ? // JSON in production
        pino({ level: "warn" })
        : // Pretty print in development
        pino({
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                },
            },
            level: "debug",
        })
logger.debug("called");

export { logger }