/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config'
import express, { Request, Response } from 'express'
import { logger } from './utils/logger'
import { loggerMiddleware } from './middlewares/logger'
import info from 'bpp-sdk'
import cors from 'cors'
import { bppSDK } from './models'
import { openAPIManager } from 'bpp-sdk'

logger.info(JSON.stringify(info))

const app = express()

const main = async () => {
  try {
    logger.debug('Connecting to database')

    openAPIManager.parseOpenAPISpec()

    await bppSDK.initializeDB()

    logger.debug('Connected to database')

    app.use(
      cors({
        origin: '*'
      })
    )
    app.use(express.json())

    app.use(express.static('public'))

    app.use((req, res, next) => {
      setTimeout(() => {
        next()
      }, 1000)
    })

    app.use(loggerMiddleware)

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World')
    })

    app.use('/catalog', require('./routes/catalog.routes').default)
    app.use('/util', require('./routes/util.routes').default)
    app.use('/custom-models', require('./routes/custom.routes').default)
    app.use('/models', require('./routes/model.routes').default)

    app.listen(process.env.PORT, () => {
      logger.info(`Server is listening on port ${process.env.PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

main()
