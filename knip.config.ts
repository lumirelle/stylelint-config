import type { KnipConfig } from 'knip'

export default {
  ignoreFiles: [
    // Fixtures
    'fixtures/**',

    // Snapshots
    'test/__snapshots__/**',

    // TODO(Lumirelle): Create a pull request to add taze plugin for knip.
    'taze.config.ts',
  ],
  ignoreDependencies: [
    // Build tools
    'tsdown',

    // Check tools
    '@lumirelle/oxlint-config',
    '@arethetypeswrong/cli',
    'publint',

    // Dependencies manager
    'taze',

    // Releasing tools
    'bumpp',
    'changelogithub',
    'pkg-pr-new',
    'npm',

    // ...?
    '@dreamsicle.io/stylelint-config-tailwindcss',
    '@stylistic/stylelint-config',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-less',
    'stylelint-scss',
  ],
} as KnipConfig
