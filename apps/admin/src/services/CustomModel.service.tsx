import { Button, Popconfirm, Space, message } from 'antd'
import { ColumnType } from 'antd/es/table'

export class CustomModelService {
  static getModelColumns(
    schema: {
      [key: string]: any
    },
    callbacks: {
      [key: string]: (data: any) => void
    }
  ) {
    const data: ColumnType<any>[] = []

    Object.keys(schema).forEach(key => {
      const isArray = schema[key].type.split('[]').length > 1
      const type = isArray ? schema[key].type.split('[]')[0] : schema[key].type

      if (!isArray && ['string', 'boolean', 'number', 'enum'].includes(type)) {
        data.push({
          title: key,
          dataIndex: key,
          key: key
        })
      }
    })

    data.push({
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => callbacks.edit(record)}>
            Edit
          </Button>
          <Button
            type="text"
            onClick={() => {
              callbacks.view(record)
            }}
          >
            View Beckn Object
          </Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            cancelText="No"
            okText="Yes"
            onConfirm={() => {
              callbacks.delete(record)
            }}
            onCancel={() => {
              message.info('Delete Operation canceled')
            }}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      )
    })

    return data
  }
}
