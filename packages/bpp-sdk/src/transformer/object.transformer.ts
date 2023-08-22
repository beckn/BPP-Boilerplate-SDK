import { BppSDK, ServiceFactory } from '..'
import { SchemaService } from '../services/schema.service'

export class ObjectTransformer {
  private static async customToBecknObject(fromSchema: any, data: any) {
    let state: {
      [key: string]: any
    } = {}

    console.log('customToBecknObject', fromSchema, data)
    await Promise.all(
      Object.keys(fromSchema).map(async key => {
        const isArray = fromSchema[key].type.split('[]').length > 1
        const type = isArray ? fromSchema[key].type.split('[]')[0] : fromSchema[key].type
        const as = fromSchema[key].as
        const splitAs = as.split('.')
        const asSize = as.split('.').length
        if (['string', 'boolean', 'number', 'enum', 'upload', 'uuid'].includes(type)) {
          const helper = async (value: string[], pos: number, obj: any) => {
            if (pos == value.length - 1) {
              obj[value[pos]] = data[key]
              return obj
            }

            if (obj[value[pos]] == undefined) obj[value[pos]] = {}

            obj[value[pos]] = await helper(value, pos + 1, obj[value[pos]])
            return obj
          }

          state = await helper(splitAs, 0, state)
        }

        if (type === 'object') {
          const helper = async (value: string[], pos: number, obj: any) => {
            if (pos == value.length - 1) {
              if (isArray) {
                obj[value[pos]] = []
                for (let i = 0; i < data[key].length; i++) {
                  obj[value[pos]].push(
                    await ObjectTransformer.customToBecknObject(fromSchema[key].children, data[key][i])
                  )
                }
              } else {
                obj[value[pos]] = await ObjectTransformer.customToBecknObject(fromSchema[key].children, data[key])
              }
              return obj
            }

            if (obj[value[pos]] == undefined) obj[value[pos]] = {}

            obj[value[pos]] = await helper(value, pos + 1, obj[value[pos]])
            return obj
          }

          state = await helper(splitAs, 0, state)
        }

        if (type === 'ref') {
          const table = fromSchema[key]['$ref']

          const service = new ServiceFactory(table)

          state[key] = await service.fetch(data[key])
        }
      })
    )

    return state
  }

  private static customFromBecknObject(fromSchema: any, data: any) {
    const state: {
      [key: string]: any
    } = {}

    // console.log('customFromBecknObject', fromSchema, data)

    Object.keys(fromSchema).forEach(key => {
      const isArray = fromSchema[key].type.split('[]').length > 1
      const type = isArray ? fromSchema[key].type.split('[]')[0] : fromSchema[key].type
      const as = fromSchema[key].as
      const splitAs = as.split('.')
      if (['string', 'boolean', 'number', 'enum', 'upload', 'uuid'].includes(type)) {
        const helper = (value: string[], pos: number, obj: any, schemaData: any) => {
          if (pos == value.length - 1) {
            console.log({ obj, schemaData, value, pos })
            obj = schemaData[value[pos]]
            return obj
          }

          if (obj[value[pos]] == undefined) obj[value[pos]] = {}

          console.log({ obj, schemaData, value, pos })
          obj = helper(value, pos + 1, obj[value[pos]], schemaData[value[pos]])
          return obj
        }

        console.log({ splitAs, data })
        state[key] = helper(splitAs, 0, { ...state }, { ...data })
      }

      if (type === 'object') {
        const helper = (value: string[], pos: number, obj: any, schemaData: any) => {
          // console.log('schemaData[value[pos]][i] Object', schemaData[value[pos]])
          if (pos == value.length - 1) {
            if (isArray) {
              obj = []
              console.log({ obj, schemaData, value, pos })
              for (let i = 0; i < schemaData[value[pos]].length; i++) {
                obj.push(ObjectTransformer.customFromBecknObject(fromSchema[key].children, schemaData[value[pos]][i]))
              }
            } else {
              obj = ObjectTransformer.customFromBecknObject(fromSchema[key].children, schemaData[value[pos]])
            }
            return obj
          }

          if (obj[value[pos]] == undefined) obj[value[pos]] = {}

          obj = helper(value, pos + 1, obj[value[pos]], schemaData[value[pos]])
          return obj
        }

        state[key] = helper(splitAs, 0, { ...state }, { ...data })
      }
    })

    return state
  }

  static async transformToBecknObject(from: string, data: any, sdk: BppSDK) {
    const fromSchema = SchemaService.getCustomSchema(from, sdk)
    // console.log("From Schema", fromSchema)
    const toSchema = SchemaService.getSchema(fromSchema.for)

    console.log('From Schema', fromSchema)

    const state = await ObjectTransformer.customToBecknObject(fromSchema.schema, data)
    return state
  }

  static transformFromBecknObject(to: string, data: any, sdk: BppSDK) {
    // const fromSchema = SchemaService.getSchema(from)
    const toSchema = SchemaService.getCustomSchema(to, sdk)

    // console.log("From Schema", fromSchema)
    // console.log("To Schema", toSchema)
    const state = ObjectTransformer.customFromBecknObject(toSchema.schema, data)
    return state
  }
}
