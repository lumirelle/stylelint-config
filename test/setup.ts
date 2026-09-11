import { vi } from 'vitest'

// Deterministic package paths for every test file, so snapshots don't depend
// on the absolute location of `node_modules`.
vi.mock('../src/resolve', async (importOriginal) => {
  const original = await importOriginal<typeof import('../src/resolve')>()
  return {
    ...original,
    resolvePackagePath: vi.fn((packageName: string) => `path/to/${packageName}`),
  }
})
