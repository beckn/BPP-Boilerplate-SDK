import fetch from 'node-fetch'
import { config_env } from '../../config'
import prompt from 'prompts'
import YAML from 'yaml'

export class ConfigGenerator {
  static config: any
  constructor() {
    console.log('ConfigGenerator')
  }

  static async fetch_config() {
    const domain = await prompt({
      type: 'select',
      name: 'domain',
      message: 'Select the domain',

      choices: [
        {
          title: 'Ride Hailing',
          value: 'ride-hailing'
        },
        {
          title: 'DSEP',
          value: 'dsep'
        }
      ]
    })

    const res = await (await fetch(`${config_env.config_path}/${domain.domain}.yaml`)).text()

    console.log('Fetched Config')

    this.config = YAML.parse(res)
  }

  static async prompt_env() {
    const data: any = await prompt([
      {
        type: 'text',
        name: 'MONGO_URI',
        message: 'Enter the mongo uri',
        initial: 'mongodb://localhost:27017/beckn'
      },
      {
        type: 'text',
        name: 'GATEWAY_URI',
        message: 'Enter the gateway uri',
        initial: 'https://gateway.becknprotocol.io/bg'
      },
      {
        type: 'text',
        name: 'GATEWAY_REGISTER_URI',
        message: 'Enter the gateway register uri',
        initial: 'https://registry.becknprotocol.io/subscribers'
      },
      {
        type: 'text',
        name: 'APP_SUBSCRIBE_URI',
        message: 'Enter the subscribe uri',
        validate: (value: string) => (value.length > 0 ? true : 'Please enter a valid subscribe uri')
      },
      {
        type: 'text',
        name: 'APP_UNIQUE_ID',
        message: 'Enter the app unique id',
        validate: (value: string) => (value.length > 0 ? true : 'Please enter a valid app unique id')
      },
      {
        type: 'text',
        name: 'APP_URI',
        message: 'Enter the app uri',
        validate: (value: string) => (value.length > 0 ? true : 'Please enter a valid app uri')
      },
      {
        type: 'text',
        name: 'APP_PUBLIC_KEY',
        message: 'Enter the app public key',
        validate: (value: string) => (value.length > 0 ? true : 'Please enter a valid app public key')
      },
      {
        type: 'text',
        name: 'APP_PRIVATE_KEY',
        message: 'Enter the app private key',
        validate: (value: string) => (value.length > 0 ? true : 'Please enter a valid app private key')
      },
      {
        type: 'text',
        name: 'OPEN_API_SPEC_PATH',
        message: 'Enter the OPEN API SPEC Path',
        initial: 'https://raw.githubusercontent.com/Sarfraz-droid/Beckn-BPP-SDK-Configurations/main/transaction.yaml'
      }
    ])

    // Setup Mongo
    this.config.db.mongo.mongo_uri = data.MONGO_URI

    // Setup Gateway
    this.config.gateway.uri = data.GATEWAY_URI
    this.config.gateway.registry_uri = data.GATEWAY_REGISTER_URI

    // Setup App
    this.config.app.id = data.APP_SUBSCRIBE_URI
    this.config.app.unique_id = data.APP_UNIQUE_ID
    this.config.app.uri = data.APP_URI
    this.config.app.public_key = data.APP_PUBLIC_KEY
    this.config.app.private_key = data.APP_PRIVATE_KEY

    this.config.path = data.OPEN_API_SPEC_PATH
  }
}
