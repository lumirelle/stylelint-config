// @ts-check
import { antfu } from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu(
  {
    type: 'app',
    toml: {
      overrides: {
        'toml/array-element-newline': ['error', 'consistent'],
        'toml/array-bracket-spacing': ['error', 'never'],
      },
    },
  },
  ...oxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
)
