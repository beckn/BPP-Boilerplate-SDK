import { ITableSchema, ITableSchemaObject, SchemaType } from '../types/mongoose.types'
import { OpenAPISchemaProperty, SchemaPropertyRef } from '../types/openapi.types'
import { openAPIManager } from './OpenAPI.manager'

export class SpecParser {
  // Parses the API specifications form the OpenAPI file
  static specParse(spec: { [key: string]: OpenAPISchemaProperty }): ITableSchema {
    const res: ITableSchema = {}

    // console.log(spec)

    Object.keys(spec).forEach(key => {
      const table = spec[key]

      const data = this.parseProperty(table)

      openAPIManager.map.set(key, data)

      res[key] = data
    })

    return res
  }

  // Parses properties of an OpenAPI Spec
  static parseProperty(table: OpenAPISchemaProperty): ITableSchema | ITableSchemaObject {
    if (table?.items) {
      if ((table.items as SchemaPropertyRef).$ref != undefined) {
        // Reference the other table
        const data = openAPIManager.getSchemaPropertyFromRef((table.items as SchemaPropertyRef).$ref as string)

        if ('type' in data) {
          return this.parseProperty(data as OpenAPISchemaProperty)
        }

        return this.specParse(data)
      } else {
        const data = table.items as OpenAPISchemaProperty

        return this.parseProperty(data)
      }
    } else if (table?.$ref != undefined) {
      const data = openAPIManager.getSchemaPropertyFromRef(table.$ref as string)
      if ('type' in data) {
        return this.parseProperty(data as OpenAPISchemaProperty)
      }

      return this.specParse(data)
    } else if (table?.allOf) {
      // Reference the other table
      const data = openAPIManager.getSchemaPropertyFromRef(table.allOf[0].$ref)

      if ('type' in data) {
        return this.parseProperty(data as OpenAPISchemaProperty)
      }

      return this.specParse(data)
    } else {
      const data: ITableSchemaObject = {
        type: table.type in SchemaType ? SchemaType[table.type as keyof typeof SchemaType] : SchemaType['string']
      }

      if (table.enum) {
        data.enum = table.enum
      }

      return data
    }
  }
}
