import { describe, expect, it } from 'vitest'
import { defu } from '../src/defu'

describe('defu', () => {
  it('should merge nullish correctly', () => {
    expect(defu({ a: {
      b: null,
    } }, { a: {
      b: 1,
    } })).toEqual({ a: {
      b: null,
    } })
  })
})
