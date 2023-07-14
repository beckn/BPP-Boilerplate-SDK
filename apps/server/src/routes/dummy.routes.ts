import { Router } from 'express'
import { DummyController } from '../controllers/dummy.controller'

const router = Router()

router.get('/', DummyController)
router.post('/', DummyController)
router.delete('/', DummyController)

export default router
