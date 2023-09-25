import { Command } from '@oclif/core'
import { config_env } from '../../config'
import { exec } from 'child_process'
import fs from 'fs/promises'
import { default as fsSync } from 'fs'
import { ConfigGenerator } from '../../scripts/generate'
import YAML from 'yaml'
import cliProgress from 'cli-progress'
import path from 'path'

export default class Generator extends Command {
  static description = 'Generate Beckn BPP SDK Configurations'

  static examples = [`$ oex generate -d=dsep -o=test.yaml`]

  async promisifyExec(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout) => {
        if (err) {
          reject(err)
        }
        resolve(stdout)
      })
    })
  }

  async run(): Promise<void> {
    const curr = process.cwd()

    this.log(`Setting up starter template at ${curr}\n\n`)

    const bar1 = new cliProgress.SingleBar(
      {
        format: '{bar}' + '| {percentage}%'
      },
      cliProgress.Presets.shades_classic
    )

    const commands = [
      {
        action: 'custom',
        async render() {
          if (fsSync.existsSync('.git')) await fs.rm('.git', { recursive: true })
        }
      },
      {
        action: 'shell',
        command: `git clone ${config_env.template} .`
      },
      {
        action: 'shell',
        command: `git checkout ${config_env.branch}`
      },
      {
        action: 'shell',
        command: `git pull origin ${config_env.branch}`
      },
      {
        action: 'custom',
        async render() {
          await fs.rm('.git', { recursive: true })
        }
      },
      {
        action: 'custom',
        async render() {
          if (fsSync.existsSync('.github')) await fs.rm('.github', { recursive: true })
        }
      },
      {
        action: 'shell',
        command: `git init`
      },
      {
        action: 'custom',
        async render() {
          const configENV = {
            PORT: 4000,
            REST_SUBDOMAIN: 'sarfraz-bpp',
            SOCKET_PORT: 4001,
            SOCKET_SUBDOMAIN: 'beckn-sdk-socket'
          } as any

          let env = ''

          for (const key in configENV) {
            env += `${key}=${configENV[key]}\n`
          }

          const file_path = path.resolve('apps/server/.env')

          await fs.writeFile(file_path, env)
        }
      },
      {
        action: 'custom',
        async render() {
          const configENV = {
            EXPO_PUBLIC_REST: 'https://beckn-sdk-express.loca.lt',
            EXPO_PUBLIC_SOCKET: 'https://beckn-sdk-socket.loca.lt'
          } as any

          let env = ''

          for (const key in configENV) {
            env += `${key}=${configENV[key]}\n`
          }

          const file_path = path.resolve('apps/agent/.env')

          await fs.writeFile(file_path, env)
        }
      }
      // {
      //   action: 'shell',
      //   command: `npm install --legacy-peer-deps`,
      //   async run() {
      //     bar1.update(80, {
      //       action: 'Installing dependencies'
      //     })
      //   }
      // }
    ]

    bar1.start(commands.length, 0)
    let i = 0

    for (const command of commands) {
      bar1.update(i++)

      switch (command.action) {
        case 'shell':
          if (command.command) {
            await this.promisifyExec(command.command)
          }
          break

        case 'custom':
          if (command.render) {
            await command.render()
          }
      }
    }

    bar1.update(commands.length)

    bar1.stop()

    this.log('Done. Starter template setup successfully.')

    this.log('Setting up configurations')

    const file_path = 'apps/server/config/sdk.yaml'

    await ConfigGenerator.fetch_config()
    await ConfigGenerator.prompt_env()

    const res = ConfigGenerator.config

    await fs.writeFile(file_path, YAML.stringify(res))

    this.log('Done. SDK Configurations generated successfully.')

    this.log('\nRun npm install --legacy-peer-deps to install dependencies')

    return
  }
}
