import { OpenAPISchema } from './openapi.types'
import { ITableJSON } from './schema'

export interface TableSchema {
  [key: string]: TableSchema | string
}

export interface ITable {
  name: string
  as: string
  schema: TableSchema
}

export interface DBOption {
  mongo?: {
    mongo_uri: string
  }
}

export interface Option {
  db?: DBOption
  path: string
  version: string
  tables?: ITable[]
}
