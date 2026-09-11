import { describe, expect, it } from 'vitest'
import { tailwindcss } from '../../src'

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
