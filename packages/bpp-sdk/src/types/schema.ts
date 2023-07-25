export interface ITableSchema {
  type: string
  default?: string
}

export interface ITableJSON {
  name: string
  schema: {
    [key: string]: ITableSchema
  }
}
