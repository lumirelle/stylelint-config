import { afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import * as localPkg from 'local-pkg'
import { tailwindcss } from '../../src'
import { setup } from './setup'

setup()

let spiedGetPackageInfoSync: ReturnType<typeof spyOn<typeof localPkg, 'getPackageInfoSync'>>

beforeEach(() => {
  spiedGetPackageInfoSync = spyOn(localPkg, 'getPackageInfoSync')
})

afterEach(() => {
  spiedGetPackageInfoSync.mockRestore()
})

describe('tailwindcss config', () => {
  it('should generate empty config when Tailwind CSS is disabled', async () => {
    expect(await tailwindcss(false))
      .toBeNull()
  })

  it('should generate Tailwind CSS config when enabled', async () => {
    expect(await tailwindcss(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/@dreamsicle.io/stylelint-config-tailwindcss",
          ],
        }
      `)
  })
})
