import { Request, Response } from 'express'
import multer from 'multer'

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
}
