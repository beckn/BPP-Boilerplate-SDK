import { ConfigProvider, theme } from 'antd'
import React from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes, { IRoute } from './routes'

function generateRoutes(routes: IRoute[]): any[] {
  return routes.map((route: IRoute) => {
    return {
      path: route.path,
      element: route.component ? <route.component /> : <Outlet />,
      children: route.children ? generateRoutes(route.children) : undefined
    } as any
  }) as any[]
}

function App() {
  const router = createBrowserRouter(generateRoutes(routes))

  console.log(router)

  return (
    <React.Fragment>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.Fragment>
  )
}

export default App
