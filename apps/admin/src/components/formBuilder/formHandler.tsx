import { Form, Input, Switch } from 'antd'
import React from 'react'

function FormHandler({
  schema
}: {
  schema: {
    [key: string]: any
  }
}) {
  if (schema.type == 'string') {
    return (
      <Form.Item name={'Name'}>
        <Input placeholder={'Name'} />
      </Form.Item>
    )
  }

  if (schema.type == 'boolean') {
    return (
      <Form.Item name={'Name'}>
        <Switch />
      </Form.Item>
    )
  }

  if (schema.type == 'array') {
    return <React.Fragment></React.Fragment>
  }
}

export default FormHandler
