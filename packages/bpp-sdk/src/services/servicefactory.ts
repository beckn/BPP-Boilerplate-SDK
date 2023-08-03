import mongoose from 'mongoose'

export class ServiceFactory {
  model: mongoose.Model<any>
  constructor(model_str: string) {
    if (mongoose.models[model_str]) {
      this.model = mongoose.models[model_str]
    } else {
      throw new Error('Model not found')
    }
  }

  async add(data: object) {
    const modelData = new this.model(data)
    await modelData.save()
    return modelData
  }

  async fetch(id: string | undefined) {
    if (id) {
      const data = await this.model.findById(id)
      return data
    } else {
      const data = await this.model.find()
      return data
    }
  }

  async update(id: string, data: object) {
    const updated_data = await this.model.findByIdAndUpdate(id, data)
    return updated_data
  }

  async delete(id: string) {
    await this.model.deleteOne({ _id: id })
    return true
  }
}
