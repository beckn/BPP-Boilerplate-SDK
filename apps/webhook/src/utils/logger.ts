import winston, { format } from 'winston'

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    })
  )
}
