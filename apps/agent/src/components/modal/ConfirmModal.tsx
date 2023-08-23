import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function ConfirmModal({ onConfirm, onDecline }: { onConfirm: () => void; onDecline: () => void }) {
  return (
    <View className="flex-1 bg-black/20 items-center justify-center">
      <View className="bg-white h-1/2 flex flex-col w-5/6 rounded-lg p-5 justify-center items-center">
        <Text className="my-6 font-bold">Do you want to accept this request?</Text>

        <View className="flex flex-row gap-2">
          <TouchableOpacity onPress={onConfirm}>
            <Text className="p-2 bg-green-600 rounded-md text-white">Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDecline}>
            <Text className="p-2 bg-slate-200 rounded-md">Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ConfirmModal
