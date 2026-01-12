import { describe, expect, it } from 'bun:test'
import { html } from '../../src'
import { setup } from './setup'

setup()

describe('html config', () => {
  it('should generate empty config when HTML support is disabled', async () => {
    expect(await html(false))
      .toBeNull()
  })

  it('should generate HTML config with all rules when enabled', async () => {
    expect(await html(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html",
          ],
        }
      `)
  })
})
