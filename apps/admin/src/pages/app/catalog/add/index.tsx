import { Button, Divider, Form, Input, Select, Typography, Upload, message } from 'antd'
import React from 'react'
import { ICatalog } from '../../../../types/model'
import { instance } from '../../../../util/axiosInstance'

function AddCatalog() {
  const [messageApi, contextHolder] = message.useMessage()
  const [buttonState, setButtonState] = React.useState({
    loading: false,
    disabled: false,
    text: 'Add Catalog'
  })

  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    setButtonState({
      ...buttonState,
      loading: true,
      disabled: true,
      text: 'Adding Catalog'
    })

    const icon = values.icon?.file?.response?.path

    if (!icon) return messageApi.error('Please upload your catalog icon')

    const data: ICatalog = {
      title: values.title,
      category: values.category,
      description: values.description,
      icon: icon,
      price: Number(values.price),
      quantity: Number(values.quantity)
    }

    const response = await instance.post('/catalog', data)

    if (response.status === 200) {
      messageApi.success('Catalog added successfully')
      form?.resetFields()
    } else {
      messageApi.error('Something went wrong')
    }
    setButtonState({
      loading: false,
      disabled: false,
      text: 'Add Catalog'
    })
  }

  return (
    <React.Fragment>
      {contextHolder}
      <Typography.Title level={3}>Add Catalog</Typography.Title>
      <Typography.Text className="italic text-gray-500">Add your catalog here</Typography.Text>
      <Divider />

      <Form
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6 }}
        className="w-full justify-start items-start"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Catalog Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your catalog title'
            }
          ]}
        >
          <Input placeholder="Catalog Title" />
        </Form.Item>

        <Form.Item
          label="Catalog Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your catalog description'
            }
          ]}
        >
          <Input.TextArea placeholder="Catalog Description" />
        </Form.Item>

        <Form.Item
          label="Catalog Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input your catalog price'
            }
          ]}
        >
          <Input placeholder="Catalog Price" type="number" />
        </Form.Item>
        <Form.Item
          label="Catalog Type"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please select your catalog type'
            }
          ]}
        >
          <Select
            placeholder="Select Catalog Type"
            options={[
              {
                label: 'Catalog Type 1',
                value: 'catalog-type-1'
              },
              {
                label: 'Catalog Type 2',
                value: 'catalog-type-2'
              },
              {
                label: 'Catalog Type 3',
                value: 'catalog-type-3'
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Catalog Icon"
          name="icon"
          rules={[
            {
              required: true,
              message: 'Please upload your catalog image'
            }
          ]}
        >
          <Upload action={'http://localhost:4000/util/upload'}>
            <Button> Upload File </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: 'Please input your quantity'
            }
          ]}
        >
          <Input placeholder="Quantity" type="number" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={buttonState.loading} disabled={buttonState.disabled}>
          {buttonState.text}
        </Button>
      </Form>
    </React.Fragment>
  )
}

export default AddCatalog
