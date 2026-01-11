import { describe, expect, it } from 'bun:test'
import { configDefu } from '../src/defu'

describe('defu', () => {
  it('should merge nullish values correctly', () => {
    expect(configDefu({ a: 1, b: 2 }, { a: null, b: undefined }))
      .toEqual({ a: 1, b: 2 })
    expect(configDefu({ a: null, b: undefined }, { a: 1, b: 2 }))
      .toEqual({ a: null as any, b: undefined as any })
    expect(configDefu({ a: { b: null } }, { a: { b: 1 } }))
      .toEqual({ a: { b: null as any } })
  })

  it('should merge arrays in correct order', () => {
    expect(configDefu({ a: [2] }, { a: [1] }))
      .toEqual({ a: [1, 2] })
  })
})
