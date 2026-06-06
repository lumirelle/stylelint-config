import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { tailwindcss } from '../../src'

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

describe('tailwindcss config', () => {
  it('should generate empty config when Tailwind CSS is disabled', async () => {
    expect(await tailwindcss(false))
      .toBeNull()
  })

  it('should generate Tailwind CSS config when enabled', async () => {
    expect(await tailwindcss(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/@dreamsicle.io/stylelint-config-tailwindcss",
          ],
        }
      `)
  })
})
