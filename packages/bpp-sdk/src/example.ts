import path from 'path'
import { BppSDK } from './index'
import { dBManager } from './models'
import { openAPIManager } from './openapi/OpenAPI.manager'

const bpp = new BppSDK({
  path: path.resolve('./src/specifications/1.1.0/api/transaction/build/transaction.yaml'),
  version: '1.1.0',
  db: {
    mongo: {
      mongo_uri: 'mongodb://localhost:27017/bpp'
    }
  }
})

const main = async () => {
  openAPIManager.parseOpenAPISpec()

  await bpp.initializeDB()

  console.log(openAPIManager.map.get('Order'))
}

main()
