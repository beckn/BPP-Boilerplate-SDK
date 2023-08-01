import { Typography } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedModelAtom } from '../../../atom/selectedmodel.atom'
import { useQuery } from 'react-query'
import { instance } from '../../../util/axiosInstance'

function CustomModel() {
  const selectedModel = useRecoilValue(selectedModelAtom)

  const { data, isLoading, isError } = useQuery(['customModel', selectedModel], async () => {
    const res = (await instance.get('util/custom-models')).data.data

    if (!res) {
      throw new Error('No custom models found')
    }

    console.log(res)

    return res.find((model: any) => model.name === selectedModel.name)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  console.log(data)

  return (
    <div>
      <Typography.Text>Custom Model</Typography.Text>
    </div>
  )
}

export default CustomModel
