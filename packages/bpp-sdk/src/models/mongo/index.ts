import mongoose from 'mongoose'
import { OpenAPISchemaProperty, SchemaPropertyRef } from '../../types/openapi.types'
import { openAPIManager } from '../../openapi/OpenAPI.manager'
import { ITableSchema, ITableSchemaObject, SchemaType } from '../../types/mongoose.types'
import { SpecParser } from '../../openapi/spec_parser'
import { Option } from '../../types/option.types'

export class MongoDBModel {
  map: Map<string, mongoose.Model<any, any>> = new Map()
  options: Option | undefined

  async connect(uri: string) {
    try {
      await mongoose.connect(uri)
      console.log('Connected to DB')
    } catch (error) {
      console.log(error)
    }
  }

  setOptions(options: Option) {
    this.options = options
  }

  async disconnect() {
    try {
      await mongoose.disconnect()
      console.log('Disconnected from DB')
    } catch (error) {
      console.log(error)
    }
  }

  async generateModel() {
    if (!this.options) throw new Error('Error Occurred Parsing Open API Spec')

    /********************* Generating Open API Specification Models *********************/
    await Promise.all(
      Object.keys(openAPIManager.spec?.components.schemas || {}).map(async value => {
        const property = openAPIManager.spec?.components.schemas[value].properties

        if (property) {
          console.log('Generating Model', value, property)
          const res = SpecParser.specParse(property)
          openAPIManager.map.set(value, res)

          await this.createModel(res, value)
          console.log('Generated ', value)
        }
      })
    )

    console.log('------------------Generated Custom Models------------------')

    /********************* Generating Custom Models *********************/
    await Promise.all(
      (this.options.db?.mongo?.models || []).map(async items => {
        console.log('Generating Model', items.name)

        await this.createModel(items.schema, items.name)
      })
    )
  }

  // Generates the mongoose models from the parsed specifications
  async createModel(spec: ITableSchema, title: string) {
    const schema = new mongoose.Schema(spec)
    if (mongoose.models[title]) {
      delete mongoose.models[title]
    }
    console.log('Creating Model', title)
    console.log('Schema', schema)
    const model = mongoose.model(title, schema)
    this.map.set(title, model)
  }
}

export const MongoDB = new MongoDBModel()
