import { SocketEvents } from 'shared-utils/events'
import { Socket } from 'socket.io'
import { BecknController } from '../../controllers/beckn.controller'

const main = async (socket: Socket) => {
  socket.on(SocketEvents.ON_SELECT, data => {
    console.log('on-select', data)

    BecknController.onSelect(data.context, data.items, [], data.quote)
  })
}

export default main
