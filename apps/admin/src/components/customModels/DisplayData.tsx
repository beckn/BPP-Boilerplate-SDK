import { useMemo, useState } from 'react'
import { CustomModelService } from '../../services/CustomModel.service'
import { Modal, Table, message } from 'antd'
import { useQuery } from 'react-query'
import { instance } from '../../util/axiosInstance'
import Loader from '../ui/Loader'
import ReactJson from 'react-json-view'

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
  const [modalData, setModalData] = useState({
    visible: false,
    data: null
  } as {
    visible: boolean
    data: any
  })

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
      edit: async (record: any) => {
        onEdit(record)
        console.log('edit', record)
      },
      view: async (record: any) => {
        console.log('view', record)

        setModalData({
          visible: true,
          data: null
        })

        const res = await instance.get(`models`, {
          params: {
            id: record.key,
            model: modelData.for
          }
        })

        setModalData({
          visible: true,
          data: res.data.data
        })
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
    return <Loader />
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="w-full py-4">
      <Table columns={columns} dataSource={data} className="w-full" />

      <Modal
        title="View"
        open={modalData.visible}
        onCancel={() => {
          setModalData({
            visible: false,
            data: {}
          })
        }}
        footer={null}
        width={'80%'}
      >
        {modalData.data == null ? <Loader /> : <ReactJson src={modalData.data} theme={'monokai'} collapsed />}
      </Modal>
    </div>
  )
}

export default DisplayData
