import { Form, Switch } from 'antd'
import React, { useContext } from 'react'
import { FormBuilderContext } from '..'

function BooleanFormHandler({
  schema
}: {
  schema: {
    [key: string]: any
  }
  label: string
  additional?: any[]
  isArray?: boolean
}) {
  const { formState, setFormState } = useContext(FormBuilderContext)
  return (
    <React.Fragment>
      <Form.Item name={schema.as.split('.')} label={schema.as.split('.')}>
        <Switch
          defaultChecked={(formState as any)[schema.as as string] || false}
          onChange={value => {
            setFormState({
              ...formState,
              [schema.as as string]: value
            })
          }}
        />
      </Form.Item>
    </React.Fragment>
  )
}

export default BooleanFormHandler
