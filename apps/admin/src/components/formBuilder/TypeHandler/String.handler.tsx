import { Form, Input } from 'antd'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FormBuilderContext } from '..'

const StringRender = ({
  type,
  label,
  onChange
}: {
  type: string
  label: string
  onChange?: (value: string) => void
}) => {
  const { getValueByLabel } = useContext(FormBuilderContext)

  const [value, setValue] = useState(getValueByLabel(label))

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value, onChange])

  return (
    <Form.Item name={label} label={label.split('.')[label.split('.').length - 1]} key={label}>
      <Input
        placeholder={label.split('.')[label.split('.').length - 1]}
        onChange={e => {
          setValue(e.target.value)
        }}
        defaultValue={getValueByLabel(label)}
      />
      <div className="hidden">{getValueByLabel(label)}</div>
    </Form.Item>
  )
}

function StringFormHandler({
  schema,
  label,
  isArray,
  value
}: {
  schema: {
    [key: string]: any
  }
  label: string
  isArray?: boolean
  value?: any
}) {
  const { updateFormStateByLabel } = useContext(FormBuilderContext)

  return (
    <React.Fragment>
      <StringRender
        type={schema.type}
        label={label}
        onChange={value => {
          updateFormStateByLabel(label, value)
        }}
      />
    </React.Fragment>
  )
}

export default StringFormHandler
