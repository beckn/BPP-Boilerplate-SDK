import { Args, Command, Flags } from '@oclif/core'
import { config_env } from '../../config'
import { exec } from 'child_process'
import fs from 'fs/promises'
import { default as fsSync } from 'fs'

export default class Generator extends Command {
  static description = 'Generate Beckn BPP SDK Configurations'

  static examples = [`$ oex generate -d=dsep -o=test.yaml`]

  async promisifyExec(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          reject(err)
        }
        resolve(stdout)
      })
    })
  }

  async run(): Promise<void> {
    const curr = process.cwd()

    this.log(`Setting up starter template at ${curr}`)

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
        action: 'shell',
        command: `npm install`
      }
    ]

    for (const command of commands) {
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

    this.log('Done. Starter template setup successfully.')

    this.log('Setting up configurations')

    const file_path = 'apps/server/config/sdk.yaml'
  }
}
