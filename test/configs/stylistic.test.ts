import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { stylistic } from '../../src'

beforeAll(() => {
  vi.mock(import('../../src/resolve'), async (importOriginal) => {
    const original = await importOriginal()
    return {
      ...original,
      resolvePackagePath: vi.fn((packageName: string) => `path/to/${packageName}`),
    }
  })
})

afterAll(() => {
  vi.restoreAllMocks()
})

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
