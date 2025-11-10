import { describe, expect, it } from 'vitest'
import { formatter } from '../../src'
import { prettierFormatterConfig, stylisticFormatterConfig } from './default-config'

const customStylisticConfig = {
  indent: 'tab',
  quotes: 'double',
  maxLineLength: 200,
} as const

describe('formatter config', () => {
  it('should be generated with nothing', () => {
    expect(formatter(false, {})).toEqual({})
  })

  it('should be generated with stylistic correctly', () => {
    expect(formatter(true, {})).toEqual(stylisticFormatterConfig)
    expect(formatter('stylistic', {})).toEqual(stylisticFormatterConfig)
  })

  it('should be generated with stylistic and custom stylistic config correctly', () => {
    expect(formatter(true, customStylisticConfig))
      .toEqual({
        ...stylisticFormatterConfig,
        rules: {
          '@stylistic/indentation': 'tab',
          '@stylistic/string-quotes': 'double',
          '@stylistic/max-line-length': 200,
          '@stylistic/block-closing-brace-newline-after': ['always', {
            ignoreAtRules: ['if', 'else'],
          }],
        },
      })
    expect(formatter('stylistic', customStylisticConfig))
      .toEqual({
        ...stylisticFormatterConfig,
        rules: {
          '@stylistic/indentation': 'tab',
          '@stylistic/string-quotes': 'double',
          '@stylistic/max-line-length': 200,
          '@stylistic/block-closing-brace-newline-after': ['always', {
            ignoreAtRules: ['if', 'else'],
          }],
        },
      })
  })

  it('should be generated with prettier correctly', () => {
    expect(formatter('prettier', {})).toEqual(prettierFormatterConfig)
  })

  it('should be generated with prettier and custom config correctly', () => {
    expect(formatter('prettier', customStylisticConfig))
      .toEqual({
        ...prettierFormatterConfig,
        rules: {
          'prettier/prettier': [true, {
            singleQuote: false,
            useTabs: true,
            tabWidth: undefined,
            printWidth: 200,
          }],
        },
      })
  })
})
