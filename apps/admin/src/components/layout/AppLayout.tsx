import { Layout, Menu, Space, Typography, theme } from 'antd'
import { IRoutePaths, getRoutePath } from '../../routes'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { selectedModelAtom } from '../../atom/selectedmodel.atom'
import { useQuery } from 'react-query'
import { instance } from '../../util/axiosInstance'

function AppLayout() {
  const location = useLocation()
  const navigator = useNavigate()

  const [selectedValue, setSelectedValue] = useRecoilState(selectedModelAtom)

  console.log(location.pathname)

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { data: customModels } = useQuery(['customModels'], async () => {
    const res = (await instance.get('custom-models/tables')).data.data

    if (!res) {
      throw new Error('No custom models found')
    }

    console.log(res)

    return res
  })

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

  return (
    <Layout className="min-h-screen">
      <Layout.Sider>
        <Space direction="vertical" className="w-full h-full p-2">
          <Typography.Title level={3} className="text-center">
            BPP Admin
          </Typography.Title>

          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: '1',
                label: 'Services',
                children:
                  customModels &&
                  customModels.map((model: any, key: number) => {
                    return {
                      key: `1.${key}`,
                      label: model.name,
                      onClick: () => {
                        setSelectedValue({
                          ...selectedValue,
                          name: model.name
                        })
                        navigator(getRoutePath(IRoutePaths.CUSTOM_MODEL, [model.name]))
                      }
                    }
                  })
              },
              {
                key: '2',
                label: 'Orders',
                onClick: () => {
                  navigator(getRoutePath(IRoutePaths.ORDER))
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
