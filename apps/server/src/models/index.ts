import { BppSDK } from 'bpp-sdk'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

export const bppSDK = new BppSDK(yaml.parse(fs.readFileSync(path.resolve('config/sdk.yaml'), 'utf8')))
