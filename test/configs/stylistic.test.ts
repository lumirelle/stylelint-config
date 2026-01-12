import { describe, expect, it } from 'bun:test'
import { stylistic } from '../../src'
import { setup } from './setup'

setup()

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
            "path/to/@stylistic/stylelint-config",
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
            "path/to/@stylistic/stylelint-config",
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
            "path/to/@stylistic/stylelint-config",
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
