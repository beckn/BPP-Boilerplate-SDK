import { Request, Response } from 'express'
import { bppSDK } from '../models'
import { ObjectTransformer, SchemaService, ServiceFactory } from 'bpp-sdk'

export class CustomModelController {
  static async getTable(req: Request, res: Response) {
    const tables = bppSDK.options.tables

    console.log('tables', tables)

    const { model } = req.query

    if (!tables) {
      throw new Error('Tables not defined')
    }

    if (model) {
      return res.status(200).json({
        data: tables.find(table => table.name == model)
      })
    }

    return res.status(200).json({
      data: tables.filter(table => table.admin_ui)
    })
  }

  static async addToCustomModel(req: Request, res: Response) {
    const { data, model, id } = req.body

    if (!data || !model) {
      throw new Error('Data not defined')
    }

    const beckn_data = await ObjectTransformer.transformToBecknObject(model.name, data, bppSDK)

    console.log('beckn_data', JSON.stringify({ beckn_data, data, model }, null, 2))

    const dbService = new ServiceFactory(model.for)

    if (id) {
      const update_data = await dbService.update(id, beckn_data)

      return res.status(200).json({
        data: update_data
      })
    } else {
      const save_data = await dbService.add(beckn_data)

      return res.status(200).json({
        data: save_data
      })
    }
  }

  static async fetchCustomModel(req: Request, res: Response) {
    console.log('req.query', req.query)
    // const {model, to} = req.query
    const { id, model, to } = req.query as {
      id: string
      model: string
      to: string
    }

    if (!id || !model || !to) {
      res.status(400).json({
        message: 'id, model, to is required'
      })
    }

    const dbService = new ServiceFactory(model)

    if (id == 'all') {
      const data = (await dbService.fetch(undefined)) as any[]

      const beckn_data = data.map(item => {
        const table = ObjectTransformer.transformFromBecknObject(to, JSON.parse(JSON.stringify(item)), bppSDK)

        return {
          id: item._id,
          table
        }
      })

      return res.status(200).json({
        data: beckn_data
      })
    } else {
      const data = await dbService.fetch(id)

      const beckn_data = ObjectTransformer.transformToBecknObject(to, JSON.parse(JSON.stringify(data)), bppSDK)

      return res.status(200).json({
        data: beckn_data
      })
    }
  }

  static async deleteCustomModel(req: Request, res: Response) {
    const { id, model } = req.query as {
      id: string
      model: string
    }

    if (!id || !model) {
      res.status(400).json({
        message: 'id, model is required'
      })
    }

    const dbService = new ServiceFactory(model)

    const data = await dbService.delete(id)

    return res.status(200).json({
      data
    })
  }
}
