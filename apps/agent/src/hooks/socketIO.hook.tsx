import React from 'react'
import { Socket, io } from 'socket.io-client'

function useSocket() {
  const [socket, setSocket] = React.useState<Socket | null>(null)

  React.useEffect(() => {
    const socket = io('http://localhost:4001')
    console.log('socket', socket)
    setSocket(socket)
    window.socket = socket
    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    socket
  }
}

export default useSocket
