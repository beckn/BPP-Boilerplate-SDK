import { SocketEvents } from 'shared-utils/events'
import { Socket } from 'socket.io'
import { BecknController } from '../../controllers/beckn.controller'
import { ServiceFactory } from 'bpp-sdk'

const main = async (socket: Socket) => {
  socket.on(SocketEvents.ON_SELECT, async data => {
    console.log('on-select', data)

    const _id = data._id

    const provider = new ServiceFactory('Provider')

    const providerData = await provider.fetch(_id)

    BecknController.onSelect(data.context, {
      itmes: data.items,
      offers: [],
      quote: data.quote,
      provider: providerData
    })
  })

  socket.on(SocketEvents.ON_CONFIRM, async data => {
    console.log('on-confirm', data)

    const _id = data._id

    const provider = new ServiceFactory('Provider')

    const providerData = await provider.fetch(_id)

    BecknController.onConfirm(data.context, {
      itmes: data.items,
      offers: [],
      quote: data.quote,
      provider: providerData
    })
  })

  socket.on(SocketEvents.UPDATE_LOCATION, async data => {
    console.log('update-location', data)

    await BecknController.updateLocation(data.provider, data.provider._id)

    socket.emit(SocketEvents.UPDATE_LOCATION, {
      _id: data.provider._id,
      provider: data.provider
    })
  })
}

export default main
