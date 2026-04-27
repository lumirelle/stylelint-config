import { describe, expect, it } from 'bun:test'
import { existsSync } from 'node:fs'
import { generateApiSnapshot } from 'tsnapi'
import { exports, name as pkgName } from '../package.json'

const testCases = Object.keys(exports).filter(key => !key.endsWith('.json'))

describe.each(testCases)(`exports-snapshot/${pkgName}`, (pkgEntry) => {
  const isDistExists = existsSync('dist')

  it('dist should exist', () => {
    expect(isDistExists, 'dist directory does not exist, please run `bun run build` first').toBe(true)
  })

  it.if(isDistExists)(`${pkgName}/${pkgEntry}/runtime`, async () => {
    const api = await generateApiSnapshot(process.cwd())
    expect(api[pkgEntry]?.runtime).toMatchSnapshot()
  })

  it.if(isDistExists)(`${pkgName}/${pkgEntry}/dts`, async () => {
    const api = await generateApiSnapshot(process.cwd())
    expect(api[pkgEntry]?.dts).toMatchSnapshot()
  })
})
