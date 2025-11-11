import { describe, expect, it } from 'vitest'
import { stylistic } from '../../src'
import { defaultStylisticConfig } from './default-config'

const customStylisticConfig = {
  indent: 'tab',
  quotes: 'double',
  maxLineLength: 200,
} as const

describe('stylistic config', () => {
  it('should generate empty config when stylistic is disabled', async () => {
    expect(await stylistic(false)).toEqual({})
  })

  it('should generate stylistic config with default settings', async () => {
    expect(await stylistic(true)).toEqual(defaultStylisticConfig)
    expect(await stylistic({})).toEqual(defaultStylisticConfig)
  })

  it('should generate stylistic config with custom settings', async () => {
    expect(await stylistic(customStylisticConfig))
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
