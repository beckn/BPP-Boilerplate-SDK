import { Request, Response } from 'express'
import { CatalogResponse } from '../types/catalog'
import { BPPCatalogService } from 'bpp-sdk'

/**
 * Catalog Controller - Handles all catalog related requests
 */
export class CatalogController {
  static async FetchCatalogs(req: Request, res: Response) {
    const { id } = req.params

    try {
      const obj = await BPPCatalogService.fetchCatalogs(id)

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
      const obj = await BPPCatalogService.updateCatalog(id, data)

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
      const obj = await BPPCatalogService.addCatalog(data)

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
      const obj = await BPPCatalogService.deleteCatalog(id)

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
