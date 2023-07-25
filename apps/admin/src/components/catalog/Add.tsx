import { Button, Form, Input, Select, Typography, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { ICatalog } from '../../types/model'
import { instance } from '../../util/axiosInstance'

function AddCatalog({
  onComplete,
  defaultValues,
  type
}: {
  onComplete: () => void
  defaultValues?: any
  type: 'update' | 'add'
}) {
  const [messageApi, contextHolder] = message.useMessage()
  const [icon, setIcon] = useState<string | null>(null)
  const [buttonState, setButtonState] = useState({
    loading: false,
    disabled: false,
    text: `${type.toUpperCase()} CATALOG`
  })

  useEffect(() => {
    setButtonState({
      ...buttonState,
      text: `${type.toUpperCase()} CATALOG`
    })
  }, [type])

  const [form] = Form.useForm()

  useEffect(() => {
    if (defaultValues) {
      form.resetFields()
      form?.setFieldsValue(defaultValues)
      if (defaultValues.icon) {
        setIcon(defaultValues.icon)
      } else {
        setIcon(null)
      }
    }
  }, [defaultValues, form])

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    setButtonState({
      ...buttonState,
      loading: true,
      disabled: true,
      text: 'Adding Catalog'
    })

    const data: ICatalog = {
      title: values.title,
      category: values.category,
      description: values.description,
      icon: icon as string,
      price: Number(values.price),
      quantity: Number(values.quantity)
    }

    let response
    if (type === 'update') {
      response = await instance.put(`/catalog/${defaultValues._id}`, data)
    } else {
      response = await instance.post('/catalog', data)
    }

    if (response.status === 200) {
      messageApi.success('Catalog added successfully')
      form?.resetFields()
      onComplete()
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
      <Form labelAlign="left" className="w-full justify-start items-start" onFinish={onFinish} form={form}>
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
        <Form.Item label="Catalog Icon" name="Upload">
          <Upload
            action={'http://localhost:4000/util/upload'}
            maxCount={1}
            onChange={info => {
              console.log(info.file.status)
              if (info.file.status === 'done') {
                form.setFieldValue('icon', info.file.response.path)
                setIcon(info.file.response.path)
                messageApi.success('File uploaded successfully')
              }
            }}
          >
            <Button> Upload File </Button>
          </Upload>
        </Form.Item>

        <Typography.Text>
          Uploaded File: <b>{icon}</b>
        </Typography.Text>

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
