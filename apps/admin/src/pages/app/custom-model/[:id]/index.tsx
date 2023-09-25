import { Button, Modal, Typography, notification } from 'antd'
import { useRecoilState } from 'recoil'
import { selectedModelAtom } from '../../../../atom/selectedmodel.atom'
import { useQuery } from 'react-query'
import { instance } from '../../../../util/axiosInstance'
import FormBuilder from '../../../../components/formBuilder'
import { useParams } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import DisplayData from '../../../../components/customModels/DisplayData'
import { queryClient } from '../../../../main'

function CustomModel() {
  const { id: modelName } = useParams()

  console.log('CustomModel', modelName)
  const [api, contextHolder] = notification.useNotification()
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelAtom)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [defaultState, setDefaultState] = useState<{
    [key: string]: any
  }>({})

  const { data, isLoading, isError } = useQuery(
    ['customModel', selectedModel],
    async () => {
      if (!selectedModel) return null
      const res = (
        await instance.get('custom-models/tables', {
          params: {
            model: modelName
          }
        })
      ).data.data
      return res
    },
    {
      onSuccess: data => {
        console.log('onSuccess', data)
        if (!modelName) return
        setSelectedModel({
          ...selectedModel,
          name: modelName
        })
      }
    }
  )

  const submitHandler = async (formState: object) => {
    const res = await instance.post('custom-models', {
      model: {
        name: data.name,
        for: data.for
      },
      data: formState,
      id: defaultState?.key
    })

    if (res.status == 200) {
      console.log(res.data)
      api.success({
        message: 'Model Saved'
      })
    }

    setIsModalVisible(false)
    setDefaultState({})
    queryClient.invalidateQueries('customModel')
  }

  if (isLoading || data == null) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log(data)

  return (
    <div className="flex flex-col items-center py-10 w-full h-full">
      {contextHolder}
      <Typography.Title>{modelName}</Typography.Title>
      <Typography.Text type="secondary">{data.for}</Typography.Text>
      <div className="w-full flex">
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setDefaultState({})
            setIsModalVisible(true)
          }}
        >
          Add {modelName}
        </Button>
      </div>

      {modelName && data && (
        <DisplayData
          modelData={data}
          label={modelName}
          onEdit={(record: any) => {
            console.log('edit', record)
            setDefaultState(record)
            setIsModalVisible(true)
          }}
          onDelete={async (record: any) => {
            console.log('delete', record)
            const res = await instance.delete(`custom-models`, {
              params: {
                id: record.key,
                model: data.for
              }
            })
            console.log('delete', res)
            api.success({
              message: 'Document Deleted'
            })
          }}
        />
      )}

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title={`Add ${modelName}`}
        footer={null}
        key={defaultState ? (defaultState as any)['key'] : 'default'}
      >
        {data && isModalVisible && (
          <FormBuilder
            schema={data.schema}
            onSubmit={submitHandler}
            defaultState={defaultState}
            selectedID={defaultState ? (defaultState as any)['key'] : 'default'}
          />
        )}
      </Modal>
    </div>
  )
}

export default CustomModel
