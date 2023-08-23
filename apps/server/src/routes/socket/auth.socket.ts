import { Socket } from 'socket.io'
import { SocketEvents } from 'shared-utils/events'
import { redisClient } from '../../utils/redis'
import { ServiceFactory } from 'bpp-sdk'

const main = async (socket: Socket) => {
  socket.on(SocketEvents.LOGIN, async data => {
    console.log('login', data)
    const { id } = data

    const provider = new ServiceFactory('Provider')

    const providers = await provider.fetch(undefined)

    const current = providers.find((p: any) => {
      return p.descriptor.code == id
    })

    if (!current) {
      return
    }

    redisClient.hSet('users', socket.id, id)

    socket.join('authenticated')

    socket.emit(SocketEvents.LOGIN_SUCCESS, {
      id,
      provider: current
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    redisClient.hDel('users', socket.id)
    socket.leave('authenticated')
  })
}

export default main
