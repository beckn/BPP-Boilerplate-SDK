import path from 'path'
import { BppSDK, ServiceFactory } from '../index'
import { dBManager } from '../models'
import { openAPIManager } from '../openapi/OpenAPI.manager'
import yaml from 'yaml'
import fs from 'fs'
import { ObjectTransformer } from '../transformer/object.transformer'
import mongoose from 'mongoose'

const bpp = new BppSDK(yaml.parse(fs.readFileSync(path.resolve('./src/example/example.yaml'), 'utf8')))

const main = async () => {
  openAPIManager.parseOpenAPISpec()

  await bpp.initializeDB()

  // const model = (mongoose.model as any)['Order'] as mongoose.Model<any> | undefined

  // console.log(model?.schema)

  // const res =  ObjectTransformer.transformToBecknObject('User Catalog', {
  //   "title": "title",
  //   "description": "sdjfhk",
  //   "images": {
  //     "icon": "http://localhost:4000/uploads/fa5a634f-9505-4ac0-bf90-94617a4b3be2.png"
  //   },
  //   "category": "1"
  // }, bpp)

  // console.log(JSON.stringify(res, null, 2))
  // const res2 = ObjectTransformer.transformFromBecknObject('Catalog', 'User Catalog',res, bpp)

  // console.log(res2)

  const dbService = new ServiceFactory('Catalog')

  const data = (await dbService.fetch(undefined)) as any[]

  const res = data.map(item => {
    console.log(item)
    return ObjectTransformer.transformFromBecknObject('User_Catalog', JSON.parse(JSON.stringify(item)), bpp)
  })

  console.log(JSON.stringify(res, null, 2))
}

main()
