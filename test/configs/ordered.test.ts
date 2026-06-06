import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { ordered } from '../../src'

beforeAll(() => {
  vi.mock(import('../../src/resolve'), async (importOriginal) => {
    const original = await importOriginal()
    return {
      ...original,
      resolvePackagePath: vi.fn((packageName: string) => `path/to/${packageName}`),
    }
  })
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('ordered config', () => {
  it('should generate empty config when property ordering is disabled', async () => {
    expect(await ordered(false))
      .toBeNull()
  })

  it('should generate ordered config with property ordering rules when enabled', async () => {
    expect(await ordered(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-recess-order",
          ],
        }
      `)
  })
})
