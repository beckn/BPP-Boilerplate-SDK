import { AcknowledgementService, CallbackFactory, ServiceFactory, contextBuilder } from 'bpp-sdk'
import { Request, Response } from 'express'
import { bppSDK } from '../models'
import socket from '../index.socket'
import { redisClient } from '../utils/redis'
import { SocketEvents } from 'shared-utils/events'

const callBack = new CallbackFactory()
const service = new ServiceFactory('Provider')
export class BecknController {
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
        provider: providers
      }
    }

    await callBack.send(callbackMessage, {}, '/on_search', bppSDK)

    return res.json(new AcknowledgementService().getAck())
  }

  static async select(req: Request, res: Response) {
    const { context } = req.body
    const providers = await service.fetch(undefined)

    providers.forEach(async (provider: any) => {
      const items = provider.items || []

      console.log('provider', provider)

      const code = provider.descriptor.code
      // socket.io.to('')

      // const users = await redisClient.hGetAll('users')

      const users = await redisClient.hGetAll('users')

      console.log('users', users)
      console.log('code', code)
      const user = Object.keys(users).find((key: any) => users[key] === code)

      if (user) {
        socket.io.to(user).emit(SocketEvents.ON_SELECT, {
          transactionId: context.transaction_id,
          context,
          items: provider.items
        })
      }

      // const quote = {
      //   id: 'quote_id',
      //   price: 0
      // }

      // items.forEach((item: any) => {
      //   quote.price += parseFloat(item.price.value)
      // })

      // BecknController.onSelect(context, provider.items, [], quote)
    })

    return res.json(new AcknowledgementService().getAck())
  }

  static async onSelect(context: any, items: any, offers: any, quote: any) {
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
        order: {
          items,
          offers,
          quote
        }
      }
    }

    await callBack.send(callbackMessage, {}, '/on_select', bppSDK)
  }

  static async init(req: Request, res: Response) {
    const { context, message } = req.body
    const callbackContext = await contextBuilder(
      {
        action: '/init',
        transactionId: context.transaction_id || '',
        messageId: context.message_id || '',
        targetId: context.bap_id || '',
        targetUri: context.bap_uri || ''
      },
      bppSDK
    )

    const order = message.order

    const payment = {
      url: 'https://www.google.com',
      type: 'ONLINE'
    }

    const callbackMessage = {
      context: callbackContext,
      message: {
        order: {
          items: order.items,
          offers: [],
          quote: {
            id: 'quote_id',
            price: order.items.reduce((acc: any, item: any) => {
              return acc + parseFloat(item.price.value)
            }, 0)
          },
          billing: order.billing,
          payment
        }
      }
    }

    await callBack.send(callbackMessage, {}, '/on_init', bppSDK)

    return res.json(new AcknowledgementService().getAck())
  }
}
