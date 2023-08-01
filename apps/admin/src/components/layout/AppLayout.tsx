import { Layout, Menu, Space, Typography, theme } from 'antd'
import React, { useMemo, useCallback } from 'react'
import routes, { IRoute, IRoutePaths, IRoutes } from '../../routes'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { AppLayoutService } from '../../services/Applayout.service'
import { useRecoilState } from 'recoil'
import { selectedModelAtom } from '../../atom/selectedmodel.atom'

type MenuItem = Required<MenuProps>['items'][number]

function AppLayout() {
  const location = useLocation()
  const navigator = useNavigate()

  const [selectedValue, setSelectedValue] = useRecoilState(selectedModelAtom)

  console.log(location.pathname)

  const {
    token: { colorBgContainer, colorBgBase }
  } = theme.useToken()

  // const addItems: (routes: IRoutes) => MenuItem[] = useCallback(routes => {
  //   const items: MenuItem[] = routes.map((route: IRoute) => {
  //     return {
  //       key: route.id,
  //       label: route.label,
  //       children: route.children ? addItems(route.children) : undefined
  //     } as MenuItem
  //   })
  //   return items
  // }, [])

  // const menuManager = useMemo(() => {
  //   const layout = new AppLayoutService(routes)
  //   return {
  //     items: addItems(layout.generateSidebar()),
  //     layout
  //   }
  // }, [addItems])

  const menuManager = useMemo(() => {
    return {
      items: []
    }
  }, [])

  return (
    <Layout className="min-h-screen">
      <Layout.Sider>
        <Space direction="vertical" className="w-full h-full p-2">
          <Typography.Title level={3} className="text-center">
            BPP Admin
          </Typography.Title>
          {/* <Menu
            theme="dark"
            items={menuManager.items}
            mode="inline"
            onClick={({ key }) => {
              const route = menuManager.layout.findRouteById(key)
              if (route) {
                navigator(route.path)
              }
            }}
            selectedKeys={[location.pathname]}
          /> */}
          <Menu
            theme="dark"
            items={[
              {
                key: '1',
                label: 'User Catalog',
                onClick: () => {
                  setSelectedValue({
                    name: 'User Catalog'
                  })
                  navigator(IRoutePaths.CUSTOM_MODEL)
                }
              }
            ]}
          />
        </Space>
      </Layout.Sider>
      <Layout.Content
        className="p-2"
        style={{
          backgroundColor: colorBgContainer
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default AppLayout
