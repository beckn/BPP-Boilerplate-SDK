import { Router } from 'express'
import { CatalogController } from '../controllers/catalog.controller'

const router = Router()

router.get('/', CatalogController.FetchCatalogs)
router.get('/:id', CatalogController.FetchCatalogs)
router.post('/', CatalogController.CreateCatalog)
router.put('/:id', CatalogController.UpdateCatalog)
router.delete('/:id', CatalogController.DeleteCatalog)

export default router
