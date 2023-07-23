import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import React from 'react'
import { IRoutePaths } from '../../routes'

function AppHome() {
  const navigator = useNavigate()

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          navigator(IRoutePaths.CATALOG)
        }}
      >
        Add Catalogs
      </Button>
    </React.Fragment>
  )
}

export default AppHome
