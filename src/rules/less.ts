import cloneDeep from 'lodash.clonedeep'
import { useCSSRules } from './css'

const lessRules = {
  ...useCSSRules(),
  // Recommended
  'at-rule-no-unknown': null,
  'declaration-property-value-no-unknown': null,
  'function-no-unknown': null,
  'media-query-no-invalid': null,
  'no-invalid-position-at-import-rule': null,
  'less/color-no-invalid-hex': true,
  'less/no-duplicate-variables': true,
  // Standard
  'selector-pseudo-class-no-unknown': [
    true,
    {
      ignorePseudoClasses: ['global'],
    },
  ],
  'import-notation': 'string',
} as const

export function useLessRules(): typeof lessRules {
  return cloneDeep(lessRules)
}
