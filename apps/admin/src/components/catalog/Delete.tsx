import { Button, Space, Typography, message } from 'antd'
import React from 'react'
import { instance } from '../../util/axiosInstance'

function DeleteCatalog({ onComplete, record }: { onComplete: () => void; record: any }) {
  const [messageApi, contextHolder] = message.useMessage()
  const [buttonState, setButtonState] = React.useState({
    loading: false,
    disabled: false
  })

  const handleDelete = async () => {
    setButtonState({
      ...buttonState,
      loading: true,
      disabled: true
    })
    const response = await instance.delete(`/catalog/${record._id}`)

    if (response.status === 200) {
      messageApi.success('Catalog deleted successfully')
      onComplete()
    } else {
      messageApi.error('Something went wrong')
    }

    setButtonState({
      ...buttonState,
      loading: false,
      disabled: false
    })
  }

  return (
    <div>
      {contextHolder}
      <Space direction="vertical">
        <Typography.Title>Are you sure you want to delete this catalog?</Typography.Title>
        <Typography.Text>This action cannot be undone.</Typography.Text>

        <Space>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            loading={buttonState.loading}
            disabled={buttonState.disabled}
          >
            Yes
          </Button>
          <Button type="primary" onClick={onComplete}>
            No
          </Button>
        </Space>
      </Space>
    </div>
  )
}

export default DeleteCatalog
