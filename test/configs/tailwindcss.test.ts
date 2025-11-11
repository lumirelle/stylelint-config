import { describe, expect, it } from 'vitest'
import { tailwindcss } from '../../src'
import { tailwindcssIgnoreAtRules } from '../../src/configs/tailwindcss'
import { defaultTailwindCSSConfig } from './default-config'

describe('tailwindcss config', () => {
  it('should generate empty config when Tailwind CSS is disabled', async () => {
    expect(await tailwindcss(false, false, false)).toEqual({})
  })

  it('should generate Tailwind CSS config with base rules when enabled', async () => {
    expect(await tailwindcss(true, false, false)).toEqual(defaultTailwindCSSConfig)
  })

  it('should generate Tailwind CSS config with SCSS overrides when SCSS is enabled', async () => {
    expect(await tailwindcss(true, true, false))
      .toEqual({
        ...defaultTailwindCSSConfig,
        overrides: [
          {
            files: ['**/*.scss'],
            rules: {
              'scss/at-rule-no-unknown': [true, { ignoreAtRules: tailwindcssIgnoreAtRules }],
            },
          },
        ],
      })
  })

  it('should generate Tailwind CSS config with SCSS overrides for both SCSS and Vue files', async () => {
    expect(await tailwindcss(true, true, true))
      .toEqual({
        ...defaultTailwindCSSConfig,
        overrides: [
          {
            files: ['**/*.vue', '**/*.scss'],
            rules: {
              'scss/at-rule-no-unknown': [true, { ignoreAtRules: tailwindcssIgnoreAtRules }],
            },
          },
        ],
      })
  })
})
