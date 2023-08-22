import mongoose from 'mongoose'

export class BPPCatalogService {
  static async addCatalog(data: object) {
    const Model = mongoose.models['Catalog']
    if (!Model) {
      throw new Error('Model not found')
    }

    const catalog = new Model(data)

    console.log(catalog)

    await catalog.save()

    console.log('Catalog saved : ', catalog)

    return catalog
  }

  static async fetchCatalogs(id: string | undefined) {
    const Model = mongoose.models['Catalog']
    if (id) {
      const catalog = await Model.findById(id)
      return catalog
    } else {
      const catalogs = await Model.find()
      return catalogs
    }
  }

  static async updateCatalog(id: string, data: object) {
    const Model = mongoose.models['Catalog']
    await Model.updateOne({ _id: id }, data)
    return true
  }

  static async deleteCatalog(id: string) {
    const Model = mongoose.models['Catalog']
    await Model.deleteOne({ _id: id })
    return true
  }
}
