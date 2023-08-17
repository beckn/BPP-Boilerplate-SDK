import { Router } from 'express'
import { OrderController } from '../controllers/order.controller'

const router = Router()

router.get('/', OrderController.fetchOrders)

export default router
