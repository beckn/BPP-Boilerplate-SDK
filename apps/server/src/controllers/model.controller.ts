import { ServiceFactory } from 'bpp-sdk'
import { Request, Response } from 'express'

export class ModelControllerService {
  static async get(req: Request, res: Response) {
    const { model, id } = req.query as {
      id?: string
      model: string
    }

    if (!model) {
      return res.status(400).json({
        message: 'model is required'
      })
    }

    const dbService = new ServiceFactory(model)

    const data = await dbService.fetch(id)

    return res.status(200).json({
      data
    })
  }
}
