import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { db } from '../model'
import { CatalogResponse } from '../types/catalog'
import { APIResponse } from '../types/api'
import { logger } from '../utils/logger'

export class CatalogController {
  static async FetchCatalogs(req: Request, res: Response) {
    const id = req.params.id

    if (id) {
      const catalog = await db.catalog.findUnique({
        where: {
          id: id
        }
      })

      if (!catalog) {
        return res.status(404).json({
          error: {
            message: 'Catalog not found'
          }
        } as APIResponse)
      }

      return res.status(200).json({
        message: 'Catalog found',
        catalog
      } as CatalogResponse)
    }

    const catalogs = await db.catalog.findMany()

    return res.status(200).json({
      message: 'Catalogs found',
      catalogs
    } as CatalogResponse)
  }

  static async UpdateCatalog(req: Request, res: Response) {
    const id: string = req.params.id
    const data: Prisma.CatalogUpdateInput = req.body

    try {
      if (!id) throw new Error('Catalog id is required')

      const catalog = await db.catalog.update({
        where: {
          id: id
        },
        data: data
      })

      return res.status(200).json({
        message: 'Catalog updated',
        catalog
      } as CatalogResponse)
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to update catalog'
        }
      })
    }
  }

  static async CreateCatalog(req: Request, res: Response) {
    const data: Prisma.CatalogCreateInput = req.body

    try {
      logger.debug(JSON.stringify(data))
      const catalog = await db.catalog.create({
        data: data
      })

      return res.status(200).json({
        message: 'Catalog created',
        catalog
      } as CatalogResponse)
    } catch (e) {
      console.log(e)
      return res.status(500).json({
        error: {
          message: 'Unable to create catalog'
        }
      } as APIResponse)
    }
  }

  static async DeleteCatalog(req: Request, res: Response) {
    const id = req.params.id

    try {
      if (!id) throw new Error('Catalog id is required')

      const catalog = await db.catalog.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json({
        message: 'Catalog deleted',
        catalog
      } as CatalogResponse)
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to delete catalog'
        }
      })
    }
  }
}
