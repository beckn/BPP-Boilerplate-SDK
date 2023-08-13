import { AcknowledgementService, CallbackFactory, ServiceFactory, contextBuilder } from 'bpp-sdk'
import { Request, Response } from 'express'
import { bppSDK } from '../models'

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
    const { context, message } = req.body
    const providers = await service.fetch(undefined)

    providers.forEach((provider: any) => {
      const items = provider.items || []

      const quote = {
        id: 'quote_id',
        price: 0
      }

      items.forEach((item: any) => {
        quote.price += parseFloat(item.price.value)
      })

      BecknController.onSelect(context, provider.items, [], quote)
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
