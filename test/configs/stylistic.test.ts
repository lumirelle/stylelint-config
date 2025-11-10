import { describe, expect, it } from 'vitest'
import { stylistic } from '../../src'
import { defaultStylisticConfig } from './default-config'

const customStylisticConfig = {
  indent: 'tab',
  quotes: 'double',
  maxLineLength: 200,
} as const

describe('stylistic config', () => {
  it('should be generated with nothing', () => {
    expect(stylistic(false)).toEqual({})
  })

  it('should be generated with stylistic correctly', () => {
    expect(stylistic(true)).toEqual(defaultStylisticConfig)
    expect(stylistic({})).toEqual(defaultStylisticConfig)
  })

  it('should be generated with stylistic and custom stylistic config correctly', () => {
    expect(stylistic(customStylisticConfig))
      .toEqual({
        ...defaultStylisticConfig,
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
})
