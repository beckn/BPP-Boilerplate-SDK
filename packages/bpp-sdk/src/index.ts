import { dBManager } from './models'
import { openAPIManager } from './openapi/OpenAPI.manager'
import { Option } from './types/option.types'
export * from './services/index.service'
export * from './openapi/OpenAPI.manager'
export * from './transformer/index.transformer'
export * from './middlewares/index'
export * from './util/index.util'

/**
 * BPP SDK - SDK Root Class
 */
export class BppSDK {
  options: Option

  constructor(options: Option) {
    this.options = options
    dBManager.init(this.options)
    openAPIManager.init(this.options)
  }

  async initializeDB() {
    console.log('Initializing DB')
    // if(!this.options.db) {
    //   throw new Error('DB Option is not defined')
    // }
    await dBManager.connect()
  }
}

export type IBPPSDK = typeof BppSDK
