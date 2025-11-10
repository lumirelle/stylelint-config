import { describe, expect, it } from 'vitest'
import { stylistic } from '../../src'
import { defaultStylisticConfig } from './default-config'

const customStylisticConfig = {
  indent: 'tab',
  quotes: 'double',
  maxLineLength: 200,
} as const

describe('stylistic config', () => {
  it('should generate empty config when stylistic is disabled', () => {
    expect(stylistic(false)).toEqual({})
  })

  it('should generate stylistic config with default settings', () => {
    expect(stylistic(true)).toEqual(defaultStylisticConfig)
    expect(stylistic({})).toEqual(defaultStylisticConfig)
  })

  it('should generate stylistic config with custom settings', () => {
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
