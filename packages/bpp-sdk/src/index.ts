import { dBManager } from './models'
import { Option } from './types/option'
export * from './services/index.service'
/**
 * BPP SDK - SDK Root Class
 */
export class BppSDK {
  options: Option

  constructor(options: Option) {
    this.options = options
  }

  initializeDB() {
    console.log('Initializing DB')
    dBManager.connect(this.options.db)
  }
}

export type IBPPSDK = typeof BppSDK
