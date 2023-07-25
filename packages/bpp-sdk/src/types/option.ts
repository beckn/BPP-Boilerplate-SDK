import { ITableJSON } from './schema'

export interface DBOption {
  mongo?: {
    mongo_uri: string
    tables: ITableJSON[]
  }
}

export interface Option {
  db: DBOption
}
