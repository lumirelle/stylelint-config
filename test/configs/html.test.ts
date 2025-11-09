import { describe, expect, it } from 'vitest'
import { html } from '../../src'
import { defaultHTMLConfig } from './default-config'

describe('html config', () => {
  it('should be generated with nothing', () => {
    expect(html(false)).toEqual({})
  })

  it('should be generated correctly', () => {
    expect(html(true)).toEqual(defaultHTMLConfig)
  })
})
