import { AcknowledgementService, CallbackFactory, ServiceFactory, contextBuilder } from 'bpp-sdk'
import { Request, Response } from 'express'
import { bppSDK } from '../models'
import socket from '../index.socket'
import { redisClient } from '../utils/redis'
import { SocketEvents } from 'shared-utils/events'
import { logger } from '../utils/logger'
import { flattenObject } from '../utils/flattenObject.util'

const callBack = new CallbackFactory()
const ProviderService = new ServiceFactory('Provider')
const transactionService = new ServiceFactory('Transaction')
const orderService = new ServiceFactory('Order')

export class BecknController {
  /** Helpers */
  static async updateLocation(providerData: any, _id: string) {
    const provider = new ServiceFactory('Provider')

    await provider.update(_id, providerData)
  }

  /** Beckn APIs */

  static async search(req: Request, res: Response) {
    const { context, message } = req.body

    console.log('search', req.body)

    const callbackContext = await contextBuilder(
      {
        action: '/on_search',
        transactionId: context.transaction_id || '',
        messageId: context.message_id || '',
        targetId: context.bap_id || '',
        targetUri: context.bap_uri || ''
      },
      bppSDK
    )

    const provider = new ServiceFactory('Provider')

    const descriptor = {
      descriptor: message.intent.descriptor
    }

    const obj = flattenObject(descriptor)

    console.log('obj', obj)

    const providers = await provider.query(obj)

    const callbackMessage = {
      context: callbackContext,
      catalog: {
        descriptor: {
          name: 'Test Provider'
        },
        provider: providers,
        fulfillment: message.fulfillment
      }
    }

    await callBack.send(callbackMessage, {}, '/on_search', bppSDK)

    return res.json(new AcknowledgementService().getAck())
  }

  static async select(req: Request, res: Response) {
    const { context, message } = req.body

    // const _provider = message.order.provider

    // const provider = new ServiceFactory('Provider')

    // console.log('provider', _provider)

    const providerData = message.order.provider

    if (providerData) {
      const code = providerData.descriptor.code

      const users = await redisClient.hGetAll('users')
      const user = Object.keys(users).find((key: any) => users[key] === code)
      if (user) {
        socket.io.to(user).emit(SocketEvents.ON_SELECT, {
          _id: providerData._id,
          transactionId: context.transaction_id,
          context,
          items: message.order.items
        })
      }
    }

    return res.json(new AcknowledgementService().getAck())
  }

  static async onSelect(context: any, order: any) {
    const callbackContext = await contextBuilder(
      {
        action: '/on_select',
        transactionId: context.transaction_id || '',
        messageId: context.message_id || '',
        targetId: context.bap_id || '',
        targetUri: context.bap_uri || ''
      },
      bppSDK
    )

    const callbackMessage = {
      context: callbackContext,
      message: {
        order
      }
    }

    await callBack.send(callbackMessage, {}, '/on_select', bppSDK)
  }

  static async init(req: Request, res: Response) {
    const context = req.body.context
    const message = req.body.message

    const data = {
      action: '/on_init',
      transactionId: context?.transaction_id || '',
      messageId: context?.message_id || '',
      targetId: context?.bap_id || '',
      targetUri: context?.bap_uri || ''
    }

    const callbackContext = await contextBuilder(data, bppSDK)

    const order = {
      ...message.order
    }

    console.log('order', order)

    const orderData = await orderService.add(order)

    const transactionData = await transactionService.add({
      txn_id: context.transaction_id,
      order_id: orderData._id
    })

    logger.info('Transaction Data saved', transactionData._id)

    const callbackMessage = {
      context: callbackContext,
      message: {
        order: order
      }
    }

    await callBack.send(callbackMessage, {}, '/on_init', bppSDK)

    return res.json(new AcknowledgementService().getAck())
  }

  static async confirm(req: Request, res: Response) {
    const context = req.body.context
    const message = req.body.message

    const providerData = message.order.provider

    if (providerData) {
      const code = providerData.descriptor.code

      const users = await redisClient.hGetAll('users')

      console.log('users', users, code)
      const user = Object.keys(users).find((key: any) => users[key] === code)
      if (user) {
        socket.io.to(user).emit(SocketEvents.ON_CONFIRM, {
          transactionId: context.transaction_id,
          context,
          items: message.order.items
        })
      }
    }

    return res.json(new AcknowledgementService().getAck())
  }

  static async onConfirm(context: any, order: any) {
    const callbackContext = await contextBuilder(
      {
        action: '/on_confirm',
        transactionId: context.transaction_id || '',
        messageId: context.message_id || '',
        targetId: context.bap_id || '',
        targetUri: context.bap_uri || ''
      },
      bppSDK
    )

    const transactionData = await transactionService.update({ txn_id: context.transaction_id }, { status: 'confirmed' })

    logger.info(`Transaction Data updated ${JSON.stringify(transactionData)}`)

    const callbackMessage = {
      context: callbackContext,
      message: {
        order
      }
    }

    await callBack.send(callbackMessage, {}, '/on_confirm', bppSDK)
  }

  static async status(req: Request, res: Response) {
    console.log('status', req.body)

    const { context, message } = req.body

    BecknController.onStatus(context, message.order_id)

    return res.json(new AcknowledgementService().getAck())
  }

  static async onStatus(context: any, order_id: any) {
    console.log('onStatus', context, order_id)
    const callbackContext = await contextBuilder(
      {
        action: '/on_status',
        transactionId: context.transaction_id || '',
        messageId: context.message_id || '',
        targetId: context.bap_id || '',
        targetUri: context.bap_uri || ''
      },
      bppSDK
    )

    const order = await orderService.fetch(order_id)

    const callbackMessage = {
      context: callbackContext,
      message: {
        order
      }
    }

    await callBack.send(callbackMessage, {}, '/on_status', bppSDK)
  }
}
