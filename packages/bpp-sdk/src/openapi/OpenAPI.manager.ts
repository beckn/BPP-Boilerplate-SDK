import yaml from 'yaml'
import fs from 'fs'
import fetch from 'node-fetch'
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

  async parseOpenAPISpec() {
    if (!this.path) throw new Error('Error Occurred Parsing Open API Spec')

    const res = await fetch(this.path)
    const text = await res.text()

    const json = yaml.parse(text)
    // console.log(json)
    this.spec = json as OpenAPISpec
  }

  getSchemaPropertyFromRef(ref: string) {
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

    // console.log('Schema', schema)

    if (schema.type === 'string') {
      return {
        type: SchemaType['string']
      } as OpenAPISchemaProperty
    }

    return schema.properties
  }
}

export const openAPIManager = new OpenAPIManager()
