import { useContext, useMemo } from 'react'
import { FormBuilderContext } from '..'
import { Form, Select } from 'antd'
import _ from 'lodash'

function EnumHandler({
  schema,
  label
}: {
  schema: {
    [key: string]: any
  }
  label: string
  isArray?: boolean
}) {
  const { updateFormStateByLabel, getValueByLabel } = useContext(FormBuilderContext)

  const cleanLabel = useMemo(() => {
    const _label = label.split('.')[label.split('.').length - 1]

    return _.words(_label)
      .map(l => _.capitalize(l))
      .join(' ')
  }, [label])

  return (
    <div>
      <Form.Item name={label} label={cleanLabel} className="my-5">
        <Select
          allowClear
          options={schema.enum?.map((item: any) => {
            return {
              label: item.code,
              value: item.code
            }
          })}
          placeholder={cleanLabel}
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
