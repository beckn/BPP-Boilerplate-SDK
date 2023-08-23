/// <reference types="nativewind/types" />
import { Socket } from 'socket.io-client'
// import {IntrinsicClassAttributes} from 'react-native'

export {}

declare global {
  interface Window {
    socket: Socket | undefined
  }
}
