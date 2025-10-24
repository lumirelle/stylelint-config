import { describe, expect, it } from 'vitest'
import { defu } from '../src/defu'

describe('defu', () => {
  it('should merge nullish correctly', () => {
    expect(defu({ a: 1, b: 2 }, { a: null, b: undefined })).toEqual({
      a: 1,
      b: 2,
    })
    expect(defu({ a: null, b: undefined }, { a: 1, b: 2 })).toEqual({
      a: null,
      b: undefined,
    })
    expect(defu({ a: { b: null } }, { a: { b: 1 } })).toEqual({
      a: { b: null },
    })
  })
})
