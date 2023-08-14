import React, { useEffect, useState } from 'react'
import { Button, Modal, Pressable, Text, TextInput, View } from 'react-native'
import { SocketEvents } from 'shared-utils/events'
import SelectModal from '../components/modal/SelectModal'

function Home() {
  const [status, setStatus] = useState(false)
  const [providerId, setProviderId] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState<any>(null)

  const sendProviderId = () => {
    if (!window.socket) return
    console.log('sendProviderId', providerId)

    window.socket.emit(SocketEvents.LOGIN, {
      id: providerId
    })
  }

  useEffect(() => {
    if (!window.socket) return
    window.socket.on(SocketEvents.LOGIN_SUCCESS, data => {
      console.log('LOGIN_SUCCESS', data)
      setStatus(true)
    })

    return () => {
      if (!window.socket) return
      window.socket.off(SocketEvents.LOGIN_SUCCESS)
    }
  }, [status])

  useEffect(() => {
    if (!window.socket) return

    window.socket.on(SocketEvents.ON_SELECT, data => {
      console.log('ON_SELECT', data)
      setModalData(data)
      setModalVisible(true)
    })
  }, [])

  const sendDataToCustomer = (quote: string) => {
    const _quote = {
      id: Math.random().toString(36).slice(2, 9),
      price: quote
    }

    window.socket?.emit(SocketEvents.ON_SELECT, {
      ...modalData,
      quote: _quote
    })
  }

  return (
    <View className="flex-1 bg-white items-center ">
      <Text className="text-2xl font-bold my-5">Enter your Provider ID</Text>
      <View className="gap-2 w-full justify-center items-center flex flex-row">
        <TextInput
          className="border border-gray-400 w-1/2 p-2 rounded-lg"
          placeholder="Provider ID"
          onChangeText={text => setProviderId(text)}
          value={providerId}
        />
        <View className="ml-2">
          <Button title="Send" onPress={sendProviderId} />
        </View>
      </View>

      <View className="flex flex-row justify-center items-center gap-2 mt-5">
        <Text>Status:</Text>
        <Text className={status ? 'text-green-500' : 'text-red-500'}>{status ? 'Connected' : 'Disconnected'}</Text>
      </View>

      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <SelectModal
          onSend={quote => {
            console.log('quote', quote)
            sendDataToCustomer(quote)
            setModalVisible(false)
          }}
          data={modalData}
        />
      </Modal>
    </View>
  )
}

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })

export default Home
