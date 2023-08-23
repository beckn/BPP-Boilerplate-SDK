import { OpenAPISchema } from './openapi.types'
import { ITableJSON } from './schema'

export interface TableSchema {
  [key: string]: TableSchema | string
}

export interface ITable {
  name: string
  for: string
  admin_ui: boolean
  schema: TableSchema
}

export interface ICustomModels {
  name: string
  schema: {
    [key: string]: {
      type: string
      ref?: string
      required?: boolean
    }
  }
}

export interface DBOption {
  mongo?: {
    mongo_uri: string
    models: ICustomModels[]
  }
}

export interface AppOption {
  id: string
  uri: string
  unique_id: string
  ttl: string
  city: string
  country: string
  private_key: string
  public_key: string
}

export interface GatewayOption {
  uri: string
  registry_uri: string
}

export interface Option {
  db?: DBOption
  path: string
  version: string
  domain: string
  tables?: ITable[]
  app?: AppOption
  gateway?: GatewayOption
}
