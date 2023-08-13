import yaml from 'yaml'
import fs from 'fs'
import { Option } from '../types/option.types'
import { OpenAPISchemaProperty, OpenAPISpec } from '../types/openapi.types'
import { ITableSchema, ITableSchemaObject, SchemaType } from '../types/mongoose.types'

export class OpenAPIManager {
  version: string | undefined
  path: string | undefined
  spec: OpenAPISpec | undefined
  map: Map<string, ITableSchema | ITableSchemaObject | [ITableSchema] | [ITableSchemaObject]> = new Map()

  init(options: Option) {
    this.version = options.version
    this.path = options.path
  }

  parseOpenAPISpec() {
    if (!this.path) throw new Error('Error Occurred Parsing Open API Spec')

    const json = yaml.parse(fs.readFileSync(this.path, 'utf-8'))
    console.log(json)
    this.spec = json as OpenAPISpec
  }

  getSchemaPropertyFromRef(ref: string) {
    console.log(ref)
    if (ref == undefined) {
      console.log('ref is undefined', ref)
      return
    }
    const arr = ref.split('/').slice(1)

    if (!this.spec) throw new Error('Error Occurred Parsing Open API Spec')

    let schema: any = this.spec

    for (let i = 0; i < arr.length; i++) {
      schema = schema[arr[i]] as any
    }

    if (schema.type === 'string') {
      return {
        type: SchemaType['string']
      } as OpenAPISchemaProperty
    }

    return schema.properties
  }
}

export const openAPIManager = new OpenAPIManager()
