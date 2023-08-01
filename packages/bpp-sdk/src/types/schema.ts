import { ITableSchema } from './mongoose.types'

export interface ITableJSON {
  name: string
  schema: {
    [key: string]: ITableSchema
  }
}
