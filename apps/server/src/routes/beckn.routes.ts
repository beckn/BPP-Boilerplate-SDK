import { Router } from 'express'
import { BecknController } from '../controllers/beckn.controller'

const router = Router()

router.post('/search', BecknController.search)
router.post('/select', BecknController.select)
router.post('/init', BecknController.init)
router.post('/confirm', BecknController.confirm)
router.post('/status', BecknController.status)

export default router
