import { DBOption, Option } from '../types/option.types'
import { MongoDB } from './mongo'
import yaml from 'yaml'
import fs from 'fs'
import { OpenAPISchemaProperty, OpenAPISpec } from '../types/openapi.types'
import { openAPIManager } from '../openapi/OpenAPI.manager'
import { SpecParser } from '../openapi/spec_parser'

/**
 * DB Manager and Model Class
 */
class DBManager {
  db: DBOption | undefined
  options: Option | undefined
  spec: OpenAPISpec | undefined
  constructor() {
    console.log('ModelClass')
  }

  init(option: Option) {
    this.db = option.db
    this.options = option
    MongoDB.setOptions(option)
  }

  async parseOpenAPISpec() {
    if (!this.options) throw new Error('Error Occurred Parsing Open API Spec')

    const json = yaml.parse(fs.readFileSync(this.options.path, 'utf-8')) as OpenAPISpec

    this.spec = json
  }

  async connect() {
    console.log('Connecting to DB')

    if (this.db && this.db.mongo) {
      await MongoDB.connect(this.db.mongo.mongo_uri)
      console.log('Connected to DB')
    }

    await MongoDB.generateModel()
  }
}

export const dBManager = new DBManager()
