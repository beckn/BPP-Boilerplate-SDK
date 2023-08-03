import React, { useMemo } from 'react'
import { CustomModelService } from '../../services/CustomModel.service'
import { Table, Typography, message } from 'antd'
import { useQuery } from 'react-query'
import { instance } from '../../util/axiosInstance'

function DisplayData({
  modelData,
  label,
  onEdit,
  onDelete
}: {
  modelData: {
    [key: string]: any
  }
  label: string
  onEdit: (record: any) => void
  onDelete: (record: any) => Promise<void>
}) {
  const { data, isError, isLoading, refetch } = useQuery(['customModel', modelData], async () => {
    console.log('schema', modelData)
    const params = new URLSearchParams({
      id: 'all',
      model: modelData.for,
      to: label
    })
    console.log('params', params)
    const res = await instance.get(`custom-models?${params}`)
    console.log('res', res.data)

    const data = res.data.data.map((item: any) => ({
      ...item.table,
      key: item.id
    }))

    return data
  })

  const columns = useMemo(() => {
    if (!modelData) return []
    return CustomModelService.getModelColumns(modelData.schema, {
      edit: (record: any) => {
        onEdit(record)
        console.log('edit', record)
      },
      delete: (record: any) => {
        console.log('delete', record)
        onDelete(record).then(() => {
          refetch()
          message.success('Document Deleted')
        })
      }
    })
  }, [modelData, onDelete, onEdit, refetch])

  console.log('DisplayData', data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="w-full py-4">
      <Table columns={columns} dataSource={data} className="w-full" />
    </div>
  )
}

export default DisplayData
