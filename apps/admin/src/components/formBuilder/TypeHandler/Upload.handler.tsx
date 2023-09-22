import { Button, Form, Upload } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { FormBuilderContext } from '..'

function UploadHandler({
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

  const [value, setValue] = useState(getValueByLabel(label))

  // const value = useMemo(() => {
  //   return getValueByLabel(label)
  // },[getValueByLabel])

  useEffect(() => {
    updateFormStateByLabel(label, value)
  }, [value, updateFormStateByLabel, label])

  return (
    <div>
      <Form.Item name={label} label={label.split('.')[label.split('.').length - 1]}>
        <Upload
          action={'http://localhost:4000/util/upload'}
          maxCount={isArray ? 10 : 1}
          onChange={info => {
            console.log(info.file.status)
            if (info.file.status === 'done') {
              console.log({ label, path: info.file.response.path })
              setValue(info.file.response.path)
              // updateFormStateByLabel(label, info.file.response.path)
            }
          }}
          showUploadList={false}
        >
          <Button> Upload {label.split('.')[label.split('.').length - 1]} </Button>
        </Upload>
        <div>{value}</div>
      </Form.Item>
    </div>
  )
}

export default UploadHandler
