import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Socket, io } from 'socket.io-client'

function SocketWrapper({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    console.log('window', window.socket)
    if (window.socket) {
      console.log('window.socket', window.socket)

      window.socket.connect()

      if (window.socket.connected) {
        console.log('connected')
        setConnected(true)
      }
      window.socket.on('connect', () => {
        console.log('connected')
        setConnected(true)
      })
    } else {
      console.log(`window.socket not found! Connecting to ${process.env['EXPO_PUBLIC_SOCKET']}`)
      const _socket = io(process.env['EXPO_PUBLIC_SOCKET'] || '', {
        autoConnect: false
      })
      setSocket(_socket)
      window.socket = _socket
    }

    return () => {
      if (window.socket) {
        window.socket.off('connect')
      }
    }
  }, [socket])

  if (!connected) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    )
  }

  return children
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SocketWrapper
