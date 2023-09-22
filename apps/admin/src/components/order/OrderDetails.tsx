import { useQuery } from 'react-query'
import { instance } from '../../util/axiosInstance'
import Loader from '../ui/Loader'
import ErrorComponent from '../ui/Error'
import ReactJson from 'react-json-view'

function OrderDetails({ order_id }: { order_id: string }) {
  const { data, isLoading, isError } = useQuery(['order-get', order_id], async () => {
    const res = (
      await instance.get('/models', {
        params: {
          id: order_id,
          model: 'Order'
        }
      })
    ).data.data

    if (!res) {
      throw new Error('No order found')
    }

    return res
  })

  if (isLoading) {
    return <Loader className="h-60" />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <div className="overflow-auto">
      <ReactJson src={data} theme={'monokai'} />
    </div>
  )
}

export default OrderDetails
