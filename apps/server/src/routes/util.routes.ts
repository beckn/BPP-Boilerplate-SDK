import { Router } from 'express'
import { UtilityController } from '../controllers/util.controller'
import { upload } from '../utils/multer'

const router = Router()

router.post('/upload', upload.single('file'), UtilityController.uploadFile)

export default router
