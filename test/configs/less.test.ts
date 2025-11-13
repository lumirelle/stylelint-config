import { describe, expect, it } from 'vitest'
import { less } from '../../src'
import { useLessRules } from '../../src/rules/less'
import { defaultLessConfig } from './default-config'

describe('less config', () => {
  it('should generate empty config when Less is disabled', async () => {
    expect(await less(false, false, false)).toEqual(null)
  })

  it('should generate Less config with all rules when enabled', async () => {
    expect(await less(true, false, false)).toEqual(defaultLessConfig)
  })

  it('should generate Less config with less opinionated pattern rules correctly', async () => {
    expect(await less(true, { pattern: true }, false)).toEqual({
      ...defaultLessConfig,
      rules: useLessRules({ pattern: true }),
    })
  })

  it('should generate Less config with less opinionated maintainability rules correctly', async () => {
    expect(await less(true, { maintainability: true }, false)).toEqual({
      ...defaultLessConfig,
      rules: useLessRules({ maintainability: true }),
    })
  })

  it('should generate Less config with all less opinionated rules correctly', async () => {
    expect(await less(true, true, false)).toEqual({
      ...defaultLessConfig,
      rules: useLessRules(true),
    })
  })
})
