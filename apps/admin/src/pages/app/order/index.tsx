import { useMemo, useState } from 'react'
import { Button, Modal, Popover, Space, Typography } from 'antd'
import { useQuery } from 'react-query'
import { instance } from '../../../util/axiosInstance'
import Table from 'antd/es/table'
import OrderDetails from '../../../components/order/OrderDetails'
import Loader from '../../../components/ui/Loader'

function OrderPage() {
  const [modalData, setModalData] = useState<{
    visible: boolean
    order_id: string
  }>({
    visible: false,
    order_id: ''
  })

  const { data, isLoading, isError } = useQuery(['orders'], async () => {
    const res = (
      await instance.get('models', {
        params: {
          model: 'Transaction'
        }
      })
    ).data.data

    if (!res) {
      throw new Error('No orders found')
    }

    return res
  })

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        render: (id: string) => <Popover content={id}>{id.slice(0, 10)}...</Popover>
      },
      {
        title: 'Transaction ID',
        dataIndex: 'txn_id',
        key: 'txn_id',
        render: (id: string) => <Popover content={id}>{id.slice(0, 10)}...</Popover>
      },
      {
        title: 'Order ID',
        dataIndex: 'order_id',
        key: 'order_id',
        render: (id: string) => <Popover content={id}>{id.slice(0, 10)}...</Popover>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => <Typography.Text>{status}</Typography.Text>
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, record: any) => (
          <Space>
            <Button
              onClick={() => {
                setModalData({
                  visible: true,
                  order_id: record.order_id
                })
              }}
            >
              View Order
            </Button>
          </Space>
        )
      }
    ],
    []
  )

  if (isLoading) {
    return <Loader className="h-full" />
  }

  if (isError) {
    return <Typography.Text>Error</Typography.Text>
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full py-2">
      <Typography.Title level={3}>Order Page</Typography.Title>

      <Table className="w-full mx-10" columns={columns} dataSource={data} />

      <Modal
        open={modalData.visible}
        onCancel={() => {
          setModalData({
            visible: false,
            order_id: ''
          })
        }}
        className="w-full h-full"
        width={'80%'}
        footer={null}
      >
        {modalData.visible && <OrderDetails order_id={modalData.order_id} />}
      </Modal>
    </div>
  )
}

export default OrderPage
