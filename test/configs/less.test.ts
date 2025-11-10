import { describe, expect, it } from 'vitest'
import { less } from '../../src'
import { defaultLessConfig } from './default-config'

describe('less config', () => {
  it('should be generated with nothing', () => {
    expect(less(false)).toEqual({})
  })

  it('should be generated correctly', () => {
    expect(less(true)).toEqual(defaultLessConfig)
  })
})
