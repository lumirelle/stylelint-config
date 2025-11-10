import { describe, expect, it } from 'vitest'
import { less } from '../../src'
import { defaultLessConfig } from './default-config'

describe('less config', () => {
  it('should generate empty config when Less is disabled', () => {
    expect(less(false)).toEqual({})
  })

  it('should generate Less config with all rules when enabled', () => {
    expect(less(true)).toEqual(defaultLessConfig)
  })
})
