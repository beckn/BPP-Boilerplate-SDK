import { BppSDK } from '..'
import { openAPIManager } from '../openapi/OpenAPI.manager'

export class SchemaService {
  static getSchema(name: string) {
    const schema = openAPIManager.map.get(name)

    if (!schema) {
      throw new Error(`Schema not found for ${name}`)
    }
    return schema
  }

  static getCustomSchema(name: string, sdk: BppSDK) {
    const data = sdk.options.tables?.find(table => table.name === name)

    if (!data) {
      throw new Error(`Custom Schema not found for ${name}`)
    }

    return data
  }
}
