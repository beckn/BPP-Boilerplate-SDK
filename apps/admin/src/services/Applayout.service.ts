import { IRoute } from '../routes'

export class AppLayoutService {
  map = new Map<string, IRoute[]>()
  flatRoutes: IRoute[] = []
  constructor(routes: IRoute[]) {
    this.flatRoutes = this.flattenRoutes(routes)
    this.map = new Map<string, IRoute[]>()
    this.mapRoutes()
  }

  public mapRoutes() {
    this.flatRoutes.forEach(route => {
      if (route.parent) {
        this.map.set(route.parent, [...(this.map.get(route.parent) || []), route])
      }
    })
  }

  public flattenRoutes(routes: IRoute[]) {
    const flatRoutes: IRoute[] = []
    routes.forEach(route => {
      flatRoutes.push(route)
      if (route.children) {
        flatRoutes.push(...this.flattenRoutes(route.children))
      }
    })

    return flatRoutes
  }

  generateSidebar() {
    const sidebar: IRoute[] = []
    this.flatRoutes.forEach(route => {
      if (route.showInSidebar && !route.parent) {
        sidebar.push({
          ...route,
          children: this.map.get(route.id) || undefined
        })
      }
    })

    return sidebar
  }

  findRouteById(id: string) {
    return this.flatRoutes.find(route => route.id === id)
  }
}
