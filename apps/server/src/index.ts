import 'dotenv/config'
import express, { Request, Response } from 'express'
import { db } from './model'
import { logger } from './utils/logger'
import { loggerMiddleware } from './middlewares/logger'
import info from 'bpp-sdk'

logger.info(JSON.stringify(info))

const app = express()

const main = async () => {
  try {
    logger.debug('Connecting to database')
    await db.$connect()
    logger.debug('Connected to database')

    app.use(express.json())

    app.use(loggerMiddleware)

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World')
    })

    app.use('/dummy', require('./routes/dummy.routes').default)

    app.listen(process.env.PORT, () => {
      logger.info(`Server is listening on port ${process.env.PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

main()
