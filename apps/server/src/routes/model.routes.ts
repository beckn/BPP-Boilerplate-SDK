import { Router } from 'express'
import { ModelControllerService } from '../controllers/model.controller'

const router = Router()

router.get('/', ModelControllerService.get)

export default router
