import { Catalog } from '@prisma/client'
import { APIResponse } from './api'

export interface CatalogResponse extends APIResponse {
  message: string
  catalog?: Catalog
  catalogs?: Catalog[]
}

export interface FetchCatalogRequest extends APIResponse {
  id?: string
}

export interface CreateCatalogRequest extends APIResponse {
  catalog: Catalog
}
