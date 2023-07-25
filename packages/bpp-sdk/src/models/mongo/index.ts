import mongoose from 'mongoose'
import { ITableJSON } from '../../types/schema'

export class MongoDBModel {
  map: Map<string, mongoose.Model<any, any>> = new Map()
  constructor() {}

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

  generate(config: ITableJSON[]) {
    config.forEach(table => {
      const schema = new mongoose.Schema(table.schema)
      if (mongoose.models.hasOwnProperty(table.name)) {
        delete mongoose.models[table.name]
      }
      const model = mongoose.model(table.name, schema)
      this.map.set(table.name, model)
    })

    console.log('Generated Models')
  }
}

export const MongoDB = new MongoDBModel()
