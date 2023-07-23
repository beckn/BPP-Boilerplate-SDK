import { Divider, Image, Typography } from 'antd'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { instance } from '../../../../util/axiosInstance'
import Table, { ColumnsType } from 'antd/es/table'
import { ICatalog } from '../../../../types/model'

function ViewCatalog() {
  const { data, isLoading, isError } = useQuery(
    'view-catalog',
    async () => {
      const res = await instance.get('/catalog')

      return res.data?.catalogs
    },
    {}
  )

  const columns: ColumnsType<ICatalog> = useMemo(
    () =>
      [
        {
          dataIndex: 'id',
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
        }
      ] as ColumnsType<ICatalog>,
    []
  )

  if (isLoading) return <Typography.Text>Loading...</Typography.Text>
  if (isError) return <Typography.Text>Error</Typography.Text>

  return (
    <React.Fragment>
      <Typography.Title level={3}>View Catalog</Typography.Title>
      <Divider />
      <Table dataSource={data} columns={columns} />
    </React.Fragment>
  )
}

export default ViewCatalog
