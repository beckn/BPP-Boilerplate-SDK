import { Request, Response } from 'express'
import { bppSDK } from '../models'

/**
 * Utility Controller - Handles all utility related requests
 */
export class UtilityController {
  static async uploadFile(req: Request, res: Response) {
    try {
      const file = req.file as Express.Multer.File

      if (!file) throw new Error('File is required')

      console.log(file)
      return res.status(200).json({
        message: 'File uploaded',
        path: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Unable to upload file'
        }
      })
    }
  }

  static async customModels(req: Request, res: Response) {
    try {
      const tables = bppSDK.options.tables

      if (!tables) throw new Error('Tables not defined')

      return res.status(200).json({
        data: tables
      })
    } catch (e: any) {
      return res.status(500).json({
        error: {
          message: e.message || 'Error Occured'
        }
      })
    }
  }
}
