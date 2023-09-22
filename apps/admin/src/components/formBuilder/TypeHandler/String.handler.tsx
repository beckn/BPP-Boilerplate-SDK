import { Form, Input } from 'antd'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FormBuilderContext } from '..'
import _ from 'lodash'

const StringRender = ({ label, onChange }: { type: string; label: string; onChange?: (value: string) => void }) => {
  const { getValueByLabel } = useContext(FormBuilderContext)

  const [value, setValue] = useState(getValueByLabel(label))

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value, onChange])

  const cleanLabel = useMemo(() => {
    const _label = label.split('.')[label.split('.').length - 1]

    return _.words(_label)
      .map(l => _.capitalize(l))
      .join(' ')
  }, [label])

  return (
    <Form.Item name={label} label={cleanLabel} key={label}>
      <Input
        placeholder={cleanLabel}
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
  label
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
