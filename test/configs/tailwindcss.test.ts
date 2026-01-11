import { describe, expect, it } from 'bun:test'
import { tailwindcss } from '../../src'

describe('tailwindcss config', () => {
  it('should generate empty config when Tailwind CSS is disabled', async () => {
    expect(await tailwindcss(false, false, false))
      .toBeNull()
  })

  it('should generate Tailwind CSS config with base rules when enabled', async () => {
    expect(await tailwindcss(true, false, false))
      .toMatchInlineSnapshot(`
        {
          "rules": {
            "at-rule-no-unknown": [
              true,
              {
                "ignoreAtRules": [
                  "tailwind",
                  "theme",
                  "source",
                  "utility",
                  "layer",
                  "variant",
                  "custom-variant",
                  "reference",
                  "config",
                  "plugin",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Tailwind CSS config with SCSS overrides when SCSS is enabled', async () => {
    expect(await tailwindcss(true, true, false))
      .toMatchInlineSnapshot(`
        {
          "overrides": [
            {
              "files": [
                "**/*.scss",
              ],
              "rules": {
                "scss/at-rule-no-unknown": [
                  true,
                  {
                    "ignoreAtRules": [
                      "tailwind",
                      "theme",
                      "source",
                      "utility",
                      "layer",
                      "variant",
                      "custom-variant",
                      "reference",
                      "config",
                      "plugin",
                    ],
                  },
                ],
              },
            },
          ],
          "rules": {
            "at-rule-no-unknown": [
              true,
              {
                "ignoreAtRules": [
                  "tailwind",
                  "theme",
                  "source",
                  "utility",
                  "layer",
                  "variant",
                  "custom-variant",
                  "reference",
                  "config",
                  "plugin",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Tailwind CSS config with SCSS overrides for both SCSS and Vue files', async () => {
    expect(await tailwindcss(true, true, true))
      .toMatchInlineSnapshot(`
        {
          "overrides": [
            {
              "files": [
                "**/*.vue",
                "**/*.scss",
              ],
              "rules": {
                "scss/at-rule-no-unknown": [
                  true,
                  {
                    "ignoreAtRules": [
                      "tailwind",
                      "theme",
                      "source",
                      "utility",
                      "layer",
                      "variant",
                      "custom-variant",
                      "reference",
                      "config",
                      "plugin",
                    ],
                  },
                ],
              },
            },
          ],
          "rules": {
            "at-rule-no-unknown": [
              true,
              {
                "ignoreAtRules": [
                  "tailwind",
                  "theme",
                  "source",
                  "utility",
                  "layer",
                  "variant",
                  "custom-variant",
                  "reference",
                  "config",
                  "plugin",
                ],
              },
            ],
          },
        }
      `)
  })
})
