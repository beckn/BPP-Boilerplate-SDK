import { Request, Response } from 'express'
import { CatalogResponse } from '../types/catalog'
import { ServiceFactory } from 'bpp-sdk'

const catalogService = new ServiceFactory('Catalog')

/**
 * Catalog Controller - Handles all catalog related requests
 */
export class CatalogController {
  static async FetchCatalogs(req: Request, res: Response) {
    const { id } = req.params

    try {
      const obj = await catalogService.fetch(id)

      return res.status(200).json({
        message: 'Catalog fetched',
        catalog: obj
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to fetch catalog'
        }
      })
    }
  }

  static async UpdateCatalog(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body as CatalogResponse

    try {
      const obj = await catalogService.update(id, data)

      return res.status(200).json({
        message: 'Catalog updated',
        catalog: obj
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to update catalog'
        }
      })
    }
  }

  static async CreateCatalog(req: Request, res: Response) {
    const data = req.body as CatalogResponse

    try {
      const obj = await catalogService.add(data)

      return res.status(200).json({
        message: 'Catalog created',
        catalog: obj
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to create catalog'
        }
      })
    }
  }

  static async DeleteCatalog(req: Request, res: Response) {
    const { id } = req.params

    try {
      const obj = await catalogService.delete(id)

      return res.status(200).json({
        message: 'Catalog deleted',
        catalog: obj
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to delete catalog'
        }
      })
    }
  }
}
