/**
 * @file Stylelint configuration for verifying fixture outputs
 */

import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle({
  // scss: true,
  // less: true,
  vue: true,
  ignoreFiles: [
    '!output/**',
  ],
})
