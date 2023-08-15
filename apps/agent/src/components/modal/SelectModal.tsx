import React, { useState } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'

function SelectModal({ onSend, onCancel, data }: { onSend: (quote: string) => void; onCancel: () => void; data: any }) {
  const [quote, setQuote] = useState('')

  return (
    <View className="flex-1 bg-black/20 items-center justify-center">
      <View className="bg-white h-1/2 w-5/6 rounded-lg p-5 justify-center items-center">
        <Text className="text-xs flex flex-row italic opacity-50 my-5">{data?.transactionId}</Text>
        <Text>Send an offer to the customer</Text>
        <TextInput
          placeholder="Add your Quote here"
          className="border border-gray-400 w-full p-2 rounded-lg my-2"
          onChangeText={setQuote}
        />

        <View className=" flex-row gap-2 w-full justify-center items-center">
          <TouchableOpacity onPress={onCancel}>
            <Text className="text-white bg-red-500 py-2 px-8 rounded-md">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSend(quote)}>
            <Text className="bg-green-600 py-2 px-8 text-white  rounded-md">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SelectModal
