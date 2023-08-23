import { Router } from 'express'
import { CustomModelController } from '../controllers/custom_model.controller'

const router = Router()

router.get('/tables', CustomModelController.getTable)
router.post('/', CustomModelController.addToCustomModel)
router.get('/', CustomModelController.fetchCustomModel)
router.delete('/', CustomModelController.deleteCustomModel)

export default router
