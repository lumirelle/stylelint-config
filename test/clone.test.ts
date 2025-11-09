import cloneDeep from 'lodash.clonedeep'
import { describe, expect, it } from 'vitest'

describe('cloneDeep', () => {
  it('should clone', () => {
    const a = {
      b: [1, 2],
      c: { d: [4, 5] },
      d: () => 42,
    }
    const result = cloneDeep(a)

    expect(result)
      .toEqual(a)
    expect(result)
      .not
      .toBe(a)
    expect(result.b)
      .not
      .toBe(a.b)
    expect(result.c)
      .toEqual(a.c)
    expect(result.c)
      .not
      .toBe(a.c)
    expect(result.b)
      .toEqual(a.b)
    expect(result.d)
      .toBe(a.d)
  })
})
