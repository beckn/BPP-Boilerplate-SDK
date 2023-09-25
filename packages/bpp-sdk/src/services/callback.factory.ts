import axios from 'axios'
import { BppSDK, createAuthorizationHeader } from '..'
import path from 'path'

export class CallbackFactory {
  // send()
  async send(message: any, headers: any, action: string, sdk: BppSDK) {
    console.log(`CallbackFactory.send() -> ${action}`)

    if (action === '/search') {
      const authHeader = await createAuthorizationHeader(message, sdk)

      const uri = sdk.options.gateway?.uri || ''

      const res = await axios.post(path.join(uri, 'search'), message, {
        headers: {
          ...headers,
          Authorization: `Bearer ${authHeader}`
        }
      })

      return res
    } else {
      const { bap_uri } = message.context
      const authHeader = await createAuthorizationHeader(message, sdk)

      if (!bap_uri) {
        throw new Error('BAP URI is not defined')
      }

      const res = await axios.post(path.join(bap_uri, action), message, {
        headers: {
          ...headers,
          Authorization: `Bearer ${authHeader}`
        }
      })

      return res
    }
  }
}
