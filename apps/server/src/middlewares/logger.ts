import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${req.method}] ${req.path}`)
  next()
}
