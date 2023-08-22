export interface ITableSchemaObject {
  type: string
  enum?: string[]
  min?: number
  max?: number
  default?: any
  of?: string
}

export interface ITableSchema {
  [key: string]: ITableSchemaObject | ITableSchema | [ITableSchemaObject] | [ITableSchema]
}

export enum SchemaType {
  string = 'String',
  number = 'Number',
  boolean = 'Boolean',
  integer = 'Number',
  array = 'Array',
  object = 'Object'
}
