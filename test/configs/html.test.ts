import { describe, expect, it } from 'bun:test'
import { html } from '../../src'

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
            "C:\\Users\\Lumirelle\\i\\stylelint-config\\node_modules\\.bun\\stylelint-config-html@1.1.0+03b7fe24d9de6d69\\node_modules\\stylelint-config-html\\index.js",
          ],
        }
      `)
  })
})
