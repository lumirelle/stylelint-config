import { describe, expect, it } from 'bun:test'
import { stylistic } from '../../src'

describe('stylistic config', () => {
  it('should generate empty config when stylistic is disabled', async () => {
    expect(await stylistic(false))
      .toBeNull()
  })

  it('should generate stylistic config with default settings', async () => {
    expect(await stylistic(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "C:\\Users\\Lumirelle\\i\\stylelint-config\\node_modules\\.bun\\@stylistic+stylelint-config@3.0.1+a6183ed6e7f65258\\node_modules\\@stylistic\\stylelint-config\\stylelint.config.js",
          ],
          "rules": {
            "@stylistic/block-closing-brace-newline-after": [
              "always",
              {
                "ignoreAtRules": [
                  "if",
                  "else",
                ],
              },
            ],
            "@stylistic/indentation": 2,
            "@stylistic/max-line-length": 120,
            "@stylistic/string-quotes": "single",
          },
        }
      `)
    expect(await stylistic({}))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "C:\\Users\\Lumirelle\\i\\stylelint-config\\node_modules\\.bun\\@stylistic+stylelint-config@3.0.1+a6183ed6e7f65258\\node_modules\\@stylistic\\stylelint-config\\stylelint.config.js",
          ],
          "rules": {
            "@stylistic/block-closing-brace-newline-after": [
              "always",
              {
                "ignoreAtRules": [
                  "if",
                  "else",
                ],
              },
            ],
            "@stylistic/indentation": 2,
            "@stylistic/max-line-length": 120,
            "@stylistic/string-quotes": "single",
          },
        }
      `)
  })

  it('should generate stylistic config with custom settings', async () => {
    expect(await stylistic({ indent: 'tab', quotes: 'double', maxLineLength: 200 }))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "C:\\Users\\Lumirelle\\i\\stylelint-config\\node_modules\\.bun\\@stylistic+stylelint-config@3.0.1+a6183ed6e7f65258\\node_modules\\@stylistic\\stylelint-config\\stylelint.config.js",
          ],
          "rules": {
            "@stylistic/block-closing-brace-newline-after": [
              "always",
              {
                "ignoreAtRules": [
                  "if",
                  "else",
                ],
              },
            ],
            "@stylistic/indentation": "tab",
            "@stylistic/max-line-length": 200,
            "@stylistic/string-quotes": "double",
          },
        }
      `)
  })
})
