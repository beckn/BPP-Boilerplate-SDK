import mongoose from 'mongoose'
import { OpenAPISchemaProperty, SchemaPropertyRef } from '../../types/openapi.types'
import { openAPIManager } from '../../openapi/OpenAPI.manager'
import { ITableSchema, ITableSchemaObject, SchemaType } from '../../types/mongoose.types'
import { SpecParser } from '../../openapi/spec_parser'

export class MongoDBModel {
  map: Map<string, mongoose.Model<any, any>> = new Map()

  async connect(uri: string) {
    try {
      await mongoose.connect(uri)
      console.log('Connected to DB')
    } catch (error) {
      console.log(error)
    }
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
    const mongoKeys = ['Order', 'Catalog', 'Descriptor']
    console.log('Generating Models', mongoKeys)
    Promise.all(
      mongoKeys.map(async value => {
        const property = openAPIManager.spec?.components.schemas[value].properties

        if (property) {
          const res = SpecParser.specParse(property)
          openAPIManager.map.set(value, res)

          await this.createModel(res, value)
          console.log('Generated ', value)
        }
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
    console.log(JSON.stringify(spec?.descriptor, null, 2))
    const model = mongoose.model(title, schema)
    this.map.set(title, model)
  }
}

export const MongoDB = new MongoDBModel()
