import http from 'http'
import { Server } from 'socket.io'
import authMain from './routes/socket/auth.socket'

class SocketService {
  io: Server
  httpServer: http.Server
  port: number

  constructor(port: number) {
    this.httpServer = http.createServer()
    this.io = new Server(this.httpServer)
    this.port = port
  }

  async main() {
    const becknMain = (await import('./routes/socket/beckn.socket')).default

    this.io.on('connection', socket => {
      console.log('a user connected')

      socket.onAny(event => {
        console.log(`got ${event}`)
      })

      authMain(socket)
      becknMain(socket)

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  }

  listen() {
    console.log(`listening on *:${this.port}`)
    this.io.listen(this.port)
  }
}

const socket = new SocketService(parseInt(process.env.SOCKET_PORT || '0'))

export default socket
