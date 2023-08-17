import { ServiceFactory } from 'bpp-sdk'
import { Request, Response } from 'express'

const orderService = new ServiceFactory('Order')
export class OrderController {
  static async fetchOrders(req: Request, res: Response) {
    const orders = await orderService.fetch(undefined)
    return res.json(orders)
  }
}
