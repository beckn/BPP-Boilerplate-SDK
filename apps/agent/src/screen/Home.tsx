import React, { useEffect, useState } from 'react'
import { Button, Modal, Pressable, Text, TextInput, View } from 'react-native'
import { SocketEvents } from 'shared-utils/events'
import SelectModal from '../components/modal/SelectModal'
import { useDebounce } from '../hooks/useDebounce.hook'
import ConfirmModal from '../components/modal/ConfirmModal'

function Home() {
  const [status, setStatus] = useState(false)
  const [providerId, setProviderId] = useState('')
  const [provider, setProvider] = useState<any>({})

  const [type, setType] = useState(SocketEvents.ON_INIT)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState<any>(null)
  const value = useDebounce(provider, 1000)

  useEffect(() => {
    console.log('value', value)

    if (!window.socket) return

    window.socket.emit(SocketEvents.UPDATE_LOCATION, {
      provider: provider
    })
  }, [value])

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
      setProvider(data.provider)
    })

    return () => {
      if (!window.socket) return
      window.socket.off(SocketEvents.LOGIN_SUCCESS)
    }
  }, [status])

  useEffect(() => {
    if (!window.socket) return

    window.socket.on(SocketEvents.ON_CONFIRM, data => {
      console.log('ON_CONFIRM', data)
      setType(SocketEvents.ON_CONFIRM)
      setModalData(data)
      setModalVisible(true)
    })
  }, [])

  useEffect(() => {
    if (!window.socket) return

    window.socket.on(SocketEvents.ON_SELECT, data => {
      console.log('ON_SELECT', data)
      setType(SocketEvents.ON_SELECT)
      setModalData(data)
      setModalVisible(true)
    })
  }, [])

  const sendDataToCustomer = (quote: string) => {
    const _quote = {
      id: Math.random().toString(36).slice(2, 9),
      price: {
        value: quote
      }
    }

    window.socket?.emit(SocketEvents.ON_SELECT, {
      ...modalData,
      quote: _quote
    })
  }

  const sendConfirmToCustomer = () => {
    window.socket?.emit(SocketEvents.ON_CONFIRM, {
      ...modalData
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

      <View className="w-3/4 justify-center items-center gap-2 mt-5">
        <TextInput
          className="border border-gray-400 w-full p-2 rounded-lg my-3"
          placeholder="GPS Location"
          value={provider?.locations?.[0]?.gps}
          onChangeText={text => {
            setProvider({
              ...provider,
              locations: [
                {
                  gps: text
                }
              ]
            })
          }}
        />
        {/* <Button
          title="Send GPS Location"
        /> */}
      </View>

      <View className="flex flex-row justify-center items-center gap-2 mt-5">
        <Text>Status:</Text>
        <Text className={status ? 'text-green-500' : 'text-red-500'}>{status ? 'Connected' : 'Disconnected'}</Text>
      </View>

      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        {type === SocketEvents.ON_SELECT ? (
          <SelectModal
            onSend={quote => {
              console.log('quote', quote)
              sendDataToCustomer(quote)
              setModalVisible(false)
            }}
            onCancel={() => setModalVisible(false)}
            data={modalData}
          />
        ) : (
          <ConfirmModal
            onConfirm={() => {
              sendConfirmToCustomer()
              setModalVisible(false)
            }}
            onDecline={() => {
              setModalVisible(false)
            }}
          />
        )}
      </Modal>
    </View>
  )
}

export default Home
