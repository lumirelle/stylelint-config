import { describe, expect, it } from 'vitest'
import { interopDefault, isPackageInScope } from '../src/utils'

describe('utils', () => {
  it('package should in scope', () => {
    expect(isPackageInScope('stylelint'))
      .toBe(true)
  })

  it('package should not in scope', () => {
    expect(isPackageInScope('non-existing-package-name-xyz'))
      .toBe(false)
  })

  it('should interop default correctly', () => {
    expect(interopDefault(import('vitest')))
      .toBeDefined()
  })
})
