import { describe, expect, it } from 'vitest'
import { css } from '../../src'
import { defaultCSSConfig } from './default-config'

describe('css config', () => {
  it('should generate config with default opinionated rules', () => {
    expect(css(false)).toEqual(defaultCSSConfig)
  })

  it('should generate config with pattern rules disabled', () => {
    expect(css({ pattern: true })).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
      },
    })
  })

  it('should generate config with maintainability rules disabled', () => {
    expect(css({ maintainability: true })).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'no-descending-specificity': null,
      },
    })
  })

  it('should generate config with all opinionated rules disabled', () => {
    expect(css(true)).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'no-descending-specificity': null,
      },
    })
  })
})
