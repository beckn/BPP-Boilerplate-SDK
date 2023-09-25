import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Socket, io } from 'socket.io-client'

function SocketWrapper({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [socketURL, setSocketURL] = useState<string | null>(null)

  useEffect(() => {
    if (window.socket) {
      console.log('window.socket found!')

      window.socket.connect()

      if (window.socket.connected) {
        console.log('connected')
        setConnected(true)
      }
      window.socket.on('connect', () => {
        console.log('connected')
        setConnected(true)
      })

      window.socket.on('disconnect', () => {
        console.log('disconnect')
        setConnected(false)
      })

      window.socket.on('connect_failed', function () {
        document.write('Sorry, there seems to be an issue with the connection!')
      })
    }

    return () => {
      if (window.socket) {
        window.socket.off('connect')
      }
    }
  }, [socket])

  const connect = () => {
    try {
      console.log(`window.socket not found! Connecting to socketURL: ${socketURL}`)
      const _socket = io(socketURL || '', {
        autoConnect: false,
        path: '/socket'
      })
      setSocket(_socket)
      window.socket = _socket
    } catch {}
  }

  if (!connected) {
    return (
      <View style={styles.container} className="gap-3">
        <Text className="text-lg opacity-50">Enter your Socket URL</Text>
        <TextInput
          placeholder="Socket URL"
          onChangeText={text => setSocketURL(text)}
          className="p-3 border rounded-lg w-3/4 border-gray-300"
        />
        <View className="w-3/4">
          <Button
            title="Connect"
            onPress={() => {
              connect()
            }}
          />
        </View>
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
