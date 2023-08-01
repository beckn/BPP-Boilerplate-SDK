import { Form } from 'antd'
import React from 'react'
import FormHandler from './formHandler'

function FormBuilder({
  schema
}: {
  schema: {
    [key: string]: any
  }
}) {
  return (
    <div>
      <Form>
        {Object.keys(schema).map(key => {
          return <FormHandler key={key} schema={schema[key]} />
        })}
      </Form>
    </div>
  )
}

export default FormBuilder
