import { AcknowledgementService, CallbackFactory, ServiceFactory, contextBuilder } from 'bpp-sdk'
import { Request, Response } from 'express'
import { bppSDK } from '../models'
import socket from '../index.socket'
import { redisClient } from '../utils/redis'
import { SocketEvents } from 'shared-utils/events'

const callBack = new CallbackFactory()
const service = new ServiceFactory('Provider')
export class BecknController {
  /** Helpers */
  static async updateLocation(providerData: any, _id: string) {
    const provider = new ServiceFactory('Provider')

    await provider.update(_id, providerData)
  }

  /** Beckn APIs */

  static async search(req: Request, res: Response) {
    const { context, message } = req.body

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

    const providers = await provider.fetch(undefined)

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

    const _provider = message.order.provider

    const provider = new ServiceFactory('Provider')

    console.log('provider', _provider)

    const providerData = await provider.fetch(_provider._id)

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

    console.log('init', data)
    const callbackContext = await contextBuilder(data, bppSDK)

    const order = message.order

    const callbackMessage = {
      context: callbackContext,
      message: {
        order: {
          ...order,
          items: order.items,
          offers: [],
          quote: order.quote,
          billing: order.billing
        }
      }
    }

    await callBack.send(callbackMessage, {}, '/on_init', bppSDK)

    return res.json(new AcknowledgementService().getAck())
  }

  static async confirm(req: Request, res: Response) {
    const context = req.body.context
    const message = req.body.message

    const _provider = message.order.provider

    const provider = new ServiceFactory('Provider')

    console.log('provider', _provider)

    const providerData = await provider.fetch(_provider._id)

    if (providerData) {
      const code = providerData.descriptor.code

      const users = await redisClient.hGetAll('users')
      const user = Object.keys(users).find((key: any) => users[key] === code)
      if (user) {
        socket.io.to(user).emit(SocketEvents.ON_CONFIRM, {
          _id: providerData._id,
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

    const callbackMessage = {
      context: callbackContext,
      message: {
        order
      }
    }

    await callBack.send(callbackMessage, {}, '/on_confirm', bppSDK)
  }
}
