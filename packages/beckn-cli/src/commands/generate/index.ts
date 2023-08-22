import { Args, Command, Flags } from '@oclif/core'
import fs from 'fs/promises'
import path from 'path'
import fetch from 'node-fetch'
import { config_env } from '../../config'
import { ConfigGenerator } from '../../scripts/generate'
import YAML from 'yaml'
export default class Generator extends Command {
  static description = 'Generate Beckn BPP SDK Configurations'

  static examples = [`$ oex generate -d=dsep -o=test.yaml`]

  static flags = {
    output: Flags.string({
      char: 'o',
      description: 'output directory',
      required: true
    })
  }
  async run(): Promise<void> {
    const { args, flags } = await this.parse(Generator)

    const domain = flags.domain
    const output = flags.output

    this.log(`Generating ${domain} configurations in ${output}`)

    const curr = process.cwd()

    this.log(curr)

    this.log(path.resolve())

    // const res = await (await fetch(`${config_env.config_path}/${domain}.yaml`)).text()
    await ConfigGenerator.fetch_config()
    await ConfigGenerator.prompt_env()

    const res = ConfigGenerator.config

    const target = path.resolve(output)

    this.log('Writing File')

    console.log(res)

    await fs.writeFile(target, YAML.stringify(res))

    this.log('Done. SDK Configurations generated successfully.')
  }
}
