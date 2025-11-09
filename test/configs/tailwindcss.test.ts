import { describe, expect, it } from 'vitest'
import { tailwindcss } from '../../src'
import { tailwindcssIgnoreAtRules } from '../../src/configs/tailwindcss'
import { defaultTailwindCSSConfig } from './default-config'

describe('tailwindcss config', () => {
  it('should be generated with nothing', () => {
    expect(tailwindcss(false, false, false)).toEqual({})
  })

  it('should be generated correctly', () => {
    expect(tailwindcss(true, false, false)).toEqual(defaultTailwindCSSConfig)
  })

  it('should be generated with scss correctly', () => {
    expect(tailwindcss(true, true, false))
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

  it('should be generated with scss & vue correctly', () => {
    expect(tailwindcss(true, true, true))
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
