import { DBOption, Option } from '../types/option'
import { MongoDB } from './mongo'

/**
 * DB Manager and Model Class
 */
class DBManager {
  db: DBOption | undefined
  constructor() {
    console.log('ModelClass')
  }

  async connect(db: DBOption) {
    this.db = db
    if (db.mongo) {
      await MongoDB.connect(db.mongo.mongo_uri)
      MongoDB.generate(db.mongo.tables)
    }
  }
}

export const dBManager = new DBManager()
