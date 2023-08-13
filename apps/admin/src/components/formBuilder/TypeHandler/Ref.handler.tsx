import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { instance } from '../../../util/axiosInstance'
import { Form, Select } from 'antd'
import { FormBuilderContext } from '..'

function ReferenceHandler({
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
  console.log({ schema, label, isArray })

  const [optionList, setOptionList] = React.useState<any[]>([])

  const { updateFormStateByLabel } = useContext(FormBuilderContext)

  const { data, isError, isLoading } = useQuery(
    ['reference', schema, label],
    async () => {
      const params = new URLSearchParams({
        model: schema['$ref']
      })

      const res = await instance.get(`models?${params}`)

      console.log(res.data)

      return res.data as any
    },
    {
      onSuccess(data) {
        setOptionList(data.data)
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log(data)

  return (
    <div className="w-full">
      <Form.Item>
        <Select
          options={optionList.map((item: any) => {
            return {
              label: item[schema['$ref_key']],
              value: item['_id']
            }
          })}
          onChange={value => {
            console.log('Reference on CHange', value)
            updateFormStateByLabel(label, value)
          }}
          showSearch
          placeholder="Choose your option"
          className="w-full"
        />
      </Form.Item>
    </div>
  )
}

export default ReferenceHandler
