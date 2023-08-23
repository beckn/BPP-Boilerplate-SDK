import path from 'path'
import { BppSDK, CallbackFactory, ServiceFactory } from '../index'
import { dBManager } from '../models'
import { openAPIManager } from '../openapi/OpenAPI.manager'
import yaml from 'yaml'
import fs from 'fs'
import { ObjectTransformer } from '../transformer/object.transformer'
import mongoose from 'mongoose'
import { SpecParser } from '../openapi/spec_parser'
import { flattenObject } from '../util/flattenObject.util'

const bpp = new BppSDK(yaml.parse(fs.readFileSync(path.resolve('./src/example/example.yaml'), 'utf8')))

const main = async () => {
  // openAPIManager.parseOpenAPISpec()

  // console.log(openAPIManager.spec?.components.schemas['Payments'])

  // const spec = SpecParser.specParse(openAPIManager.spec?.components.schemas['Order'].properties as any)

  // console.log(spec)
  // console.log(spec.quote as any)

  openAPIManager.parseOpenAPISpec()

  await bpp.initializeDB()

  const intent = {
    descriptor: {
      code: 'sarfraz'
    }
  }

  const obj = flattenObject(intent)

  const provide = new ServiceFactory('Provider')
  const data = await provide.query(obj)

  console.log(data)
  //
  // const order = {
  //   provider: {
  //     descriptor: {
  //       name: 'Sarfraz Alam',
  //       code: 'sarfraz-alam',
  //       images: [],
  //       media: []
  //     },
  //     category_id: 'AUTO',
  //     fulfillments: [],
  //     payments: [],
  //     items: [],
  //     categories: [],
  //     locations: [],
  //     offers: [],
  //     tags: [],
  //     __v: 0
  //   },
  //   items: [
  //     {
  //       descriptor: [],
  //       creator: [],
  //       price: [],
  //       id: '13497dkhi88678',
  //       add_ons: [],
  //       cancellation_terms: [],
  //       replacement_terms: [],
  //       return_terms: [],
  //       tags: [],
  //     }
  //   ],
  //   payments: [ { collected_by: 'BPP', status: 'NOT_PAID' } ],
  //   quote: { id: 'znoqrq0', price: { value: '300' } }
  // }

  // const orderService = new ServiceFactory('Order')

  // console.log(openAPIManager.map.get('Order'))
  // const res = await orderService.add(order)

  // console.log('res', res)

  // const model = (mongoose.model as any)['Order'] as mongoose.Model<any> | undefined

  // console.log(model?.schema)

  //   console.log((openAPIManager.map.get('Provider') as any).items)

  //   const data = {
  //     "name": "Sarfraz",
  //     "code": "2031",
  //     "images": [
  //         {
  //             "icon": "http://localhost:4000/uploads/9ce707ec-1f82-4225-8e42-ee6709cb13cc.jpg"
  //         }
  //     ],
  //     "category": "AUTO",
  //     "items": [
  //         {
  //             "id": "20",
  //             "code": "6465",
  //             "images": [
  //                 {
  //                     "icon": "http://localhost:4000/uploads/d601fc1d-42dd-455d-bb73-0ff5a0ab0249.jpg"
  //                 }
  //             ],
  //             "price": {
  //                 "value": "200"
  //             }
  //         }
  //     ]
  // }

  //   const obj = await ObjectTransformer.transformToBecknObject('Provider', data, bpp)

  //   console.log('obj', obj)

  // const serviceFactory = new ServiceFactory('Provider')

  //   const res = await serviceFactory.add(obj)

  //   console.log('res', res)

  // const res = await serviceFactory.fetch(undefined)

  // res.map((item : any) => {
  //   // console.log()

  //   const obj = ObjectTransformer.transformFromBecknObject('Provider', JSON.parse(JSON.stringify(item)), bpp)
  // })

  // const callback = new CallbackFactory()
}

main()
