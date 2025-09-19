/**
 * These patterns are followed the `micromatch` syntax to exclude files and directories.
 *
 * @see https://github.com/micromatch/micromatch
 */
export const GLOB_EXCLUDE = [
  '**/node_modules/**',
  '**/dist/**',

  '**/output/**',
  '**/temp/**',
  '**/.temp/**',
  '**/tmp/**',
  '**/.tmp/**',
  '**/.vitepress/cache/**',
  '**/.nuxt/**',
  '**/.next/**',
  '**/.svelte-kit/**',
  '**/.vercel/**',
  '**/.idea/**',
  '**/.cache/**',
  '**/.output/**',
  '**/.vite-inspect/**',
  '**/.yarn/**',

  '**/*.min.*',
  '**/__snapshots__/**',

  '*.{c,m,}js{,x}',
  '*.{c,m,}ts{,x}',
  '*.json{,c}',
  '*.{x,y,ya,to}ml',
  '*.md{,x}',
]
