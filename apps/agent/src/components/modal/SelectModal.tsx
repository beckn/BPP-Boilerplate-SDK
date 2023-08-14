import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

function SelectModal({ onSend, data }: { onSend: (quote: string) => void; data: any }) {
  const [quote, setQuote] = useState('')

  return (
    <View className="flex-1 bg-black/20 items-center justify-center">
      <View className="bg-white h-1/2 w-5/6 rounded-lg p-5 justify-center items-center">
        <Text>Transaction ID: {data?.transactionId}</Text>
        <Text>Send an offer to the customer</Text>
        <TextInput
          placeholder="Add your Quote here"
          className="border border-gray-400 w-full p-2 rounded-lg my-2"
          onChangeText={setQuote}
        />

        <Button title="Send" onPress={() => onSend(quote)} />
      </View>
    </View>
  )
}

export default SelectModal
