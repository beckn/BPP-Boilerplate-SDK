import { Button, Divider, Image, Modal, Space, Typography } from 'antd'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { instance } from '../../../util/axiosInstance'
import Table, { ColumnsType } from 'antd/es/table'
import { ICatalog } from '../../../types/model'
import AddCatalog from '../../../components/catalog/Add'
import DeleteCatalog from '../../../components/catalog/Delete'

function ViewCatalog() {
  const [modal, setModal] = React.useState({
    open: false,
    deleted: false,
    edit: false,
    values: {}
  })

  const toggleModal = (type: 'open' | 'deleted') => () =>
    setModal({
      ...modal,
      [type]: !modal[type]
    })

  const { data, isLoading, isError, refetch } = useQuery(
    'view-catalog',
    async () => {
      const res = await instance.get('/catalog')

      return res.data?.catalog
    },
    {}
  )

  const columns: ColumnsType<ICatalog> = useMemo(
    () =>
      [
        {
          dataIndex: '_id',
          title: 'ID'
        },
        {
          dataIndex: 'title',
          title: 'Title'
        },
        {
          dataIndex: 'category',
          title: 'Category'
        },
        {
          dataIndex: 'description',
          title: 'Description'
        },
        {
          dataIndex: 'icon',
          title: 'Icon',
          render: (icon: string) => <Image width={50} src={icon} />
        },
        {
          dataIndex: 'price',
          title: 'Price'
        },
        {
          dataIndex: 'quantity',
          title: 'Quantity'
        },
        {
          dataIndex: 'actions',
          title: 'Actions',
          render: (_, record) => (
            <Space>
              <Button
                type="primary"
                onClick={() =>
                  setModal({
                    open: true,
                    deleted: false,
                    edit: true,
                    values: record
                  })
                }
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() =>
                  setModal({
                    open: false,
                    deleted: true,
                    edit: false,
                    values: record
                  })
                }
              >
                Delete
              </Button>
            </Space>
          )
        }
      ] as ColumnsType<ICatalog>,
    []
  )

  console.log(data)

  if (isLoading) return <Typography.Text>Loading...</Typography.Text>
  if (isError) return <Typography.Text>Error</Typography.Text>

  return (
    <React.Fragment>
      <Typography.Title level={3}>View Catalog</Typography.Title>
      <Divider />
      <Space direction="vertical" className="w-full">
        <Button
          type="primary"
          onClick={() => {
            setModal({
              open: true,
              deleted: false,
              edit: false,
              values: {}
            })
          }}
        >
          Add Catalog
        </Button>
        <Table dataSource={data} columns={columns} />
      </Space>
      <Modal title="Add Catalog" open={modal.open} onCancel={toggleModal('open')} footer={null}>
        <AddCatalog
          defaultValues={modal.values}
          type={modal.edit ? 'update' : 'add'}
          onComplete={() => {
            refetch()
            toggleModal('open')()
          }}
        />
      </Modal>

      <Modal title="Delete Catalog" open={modal.deleted} onCancel={toggleModal('open')} footer={null}>
        <DeleteCatalog
          record={modal.values}
          onComplete={() => {
            refetch()
            toggleModal('deleted')()
          }}
        />
      </Modal>
    </React.Fragment>
  )
}

export default ViewCatalog
