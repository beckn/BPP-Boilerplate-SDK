import React from 'react'
import { Space } from 'antd'
import { Outlet } from 'react-router-dom'

function CatalogLayout() {
  return (
    <React.Fragment>
      <Space direction="vertical" className={'pl-10 w-full'}>
        <Outlet />
      </Space>
    </React.Fragment>
  )
}

export default CatalogLayout
