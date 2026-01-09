import { describe, expect, it } from 'bun:test'
import { css } from '../../src'
import { useCSSRules } from '../../src/rules/css'
import { defaultCSSConfig } from './default-config'

describe('css config', () => {
  it('should generate config with default opinionated rules', async () => {
    expect(await css(false)).toEqual(defaultCSSConfig)
  })

  it('should generate config with pattern rules disabled', async () => {
    expect(await css({ pattern: true })).toEqual({
      ...defaultCSSConfig,
      rules: useCSSRules({ pattern: true }),
    })
  })

  it('should generate config with maintainability rules disabled', async () => {
    expect(await css({ maintainability: true })).toEqual({
      ...defaultCSSConfig,
      rules: useCSSRules({ maintainability: true }),
    })
  })

  it('should generate config with all opinionated rules disabled', async () => {
    expect(await css(true)).toEqual({
      ...defaultCSSConfig,
      rules: useCSSRules(true),
    })
  })
})
