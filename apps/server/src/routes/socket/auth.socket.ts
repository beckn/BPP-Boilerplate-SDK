import { Socket } from 'socket.io'
import { SocketEvents } from 'shared-utils/events'
import { redisClient } from '../../utils/redis'

const main = async (socket: Socket) => {
  socket.on(SocketEvents.LOGIN, data => {
    console.log('login', data)
    const { id } = data

    redisClient.hSet('users', socket.id, id)
    socket.join('authenticated')

    socket.emit(SocketEvents.LOGIN_SUCCESS, { id })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    redisClient.hDel('users', socket.id)
    socket.leave('authenticated')
  })
}

export default main
