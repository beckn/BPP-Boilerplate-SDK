import CatalogLayout from './pages/app/catalog/layout'
import Catalog from './pages/app/catalog'
import AppLayout from './components/layout/AppLayout'
import AppHome from './pages/app'
import HomePage from './pages'

export enum IRoutePaths {
  HOME = '/',
  APP_HOME = '/app',
  CATALOG = '/app/catalog',
  ADD_CATALOG = '/app/catalog/add',
  VIEW_CATALOG = '/app/catalog/view'
}

export interface IRoute {
  id: string
  path: string
  component?: any
  showInSidebar: boolean
  label: string
  parent?: string
  children?: IRoute[]
}

const routes: IRoute[] = [
  {
    id: '1',
    path: IRoutePaths.HOME,
    component: HomePage,
    showInSidebar: false,
    label: 'Home'
  },
  {
    id: '2',
    path: IRoutePaths.APP_HOME,
    component: AppLayout,
    showInSidebar: false,
    label: 'App Layout',
    children: [
      {
        id: '2.1',
        path: IRoutePaths.APP_HOME,
        component: AppHome,
        showInSidebar: true,
        label: 'App Home'
      },
      {
        id: '2.2',
        path: IRoutePaths.CATALOG,
        showInSidebar: true,
        label: 'Catalog',
        component: CatalogLayout,
        children: [
          {
            id: '2.2.2',
            path: IRoutePaths.CATALOG,
            component: Catalog,
            showInSidebar: true,
            label: 'View Catalog',
            parent: '2.2'
          }
        ]
      }
    ]
  }
]

export default routes

export type IRoutes = typeof routes
