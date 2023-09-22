import { Button, Form, Space, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { FormBuilderContext } from '..'
import _ from 'lodash'
import { ReloadOutlined } from '@ant-design/icons'
import uniqid from 'uniqid'

function UUIDHandler({
  label
}: {
  schema: {
    [key: string]: any
  }
  label: string
  isArray?: boolean
}) {
  const { getValueByLabel, updateFormStateByLabel } = useContext(FormBuilderContext)
  const [value, setValue] = useState(getValueByLabel(label))

  useEffect(() => {
    updateFormStateByLabel(label, value)
  }, [label, updateFormStateByLabel, value])

  return (
    <div>
      <Form.Item name={label} label={label.split('.')[label.split('.').length - 1]} key={label}>
        <Space>
          <Typography.Text>{value}</Typography.Text>
          <Button
            onClick={() => {
              const id = uniqid()
              updateFormStateByLabel(label, id)

              setValue(id)
            }}
          >
            <ReloadOutlined />
          </Button>
        </Space>
      </Form.Item>
    </div>
  )
}

export default UUIDHandler
