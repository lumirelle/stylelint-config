import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/rules/*.ts', 'src/**/index.ts', 'src/types.ts'],
    },
  },
})
