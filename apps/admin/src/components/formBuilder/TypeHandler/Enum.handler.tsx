import React, { useContext } from 'react'
import { FormBuilderContext } from '..'
import { Form, Select } from 'antd'

function EnumHandler({
  schema,
  label,
  isArray
}: {
  schema: {
    [key: string]: any
  }
  label: string
  isArray?: boolean
}) {
  const { updateFormStateByLabel, getValueByLabel } = useContext(FormBuilderContext)

  return (
    <div>
      <Form.Item name={label} label={label.split('.')[label.split('.').length - 1]}>
        <Select
          allowClear
          options={schema.enum?.map((item: any) => {
            return {
              label: item.code,
              value: item.code
            }
          })}
          placeholder={label.split('.')[label.split('.').length - 1]}
          onChange={value => {
            updateFormStateByLabel(label, value)
          }}
          defaultValue={getValueByLabel(label)}
        />
        <div className="hidden">{getValueByLabel(label)}</div>
      </Form.Item>
    </div>
  )
}

export default EnumHandler
