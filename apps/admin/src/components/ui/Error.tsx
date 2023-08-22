import { Alert } from 'antd'
import React from 'react'

function ErrorComponent() {
  return (
    <React.Fragment>
      <Alert message="Error" description="An error occured" type="error" showIcon />
    </React.Fragment>
  )
}

export default ErrorComponent
