export interface SchemaPropertyRef {
  $ref: string
}

export interface SchemaProperty {
  [key: string]: any
}

export interface OpenAPISchemaProperty {
  $ref?: string
  type: string
  description?: string
  enum?: string[]
  items?: SchemaPropertyRef | OpenAPISchemaProperty
  allOf?: SchemaPropertyRef[]
}

export interface OpenAPISchema {
  name: string
  type: string
  properties: {
    [key: string]: OpenAPISchemaProperty
  }
}

export interface OpenAPISpec {
  openapi: string
  info: {
    title: string
    description: string
    version: string
  }
  paths: {
    [key: string]: any
  }
  components: {
    schemas: {
      [key: string]: {
        type: string
        properties: {
          [key: string]: OpenAPISchemaProperty
        }
      }
    }
  }
}
