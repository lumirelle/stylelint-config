export const LESS_OPINIONATED_RULES = {
  standard: {
    pattern: [
      'custom-property-pattern',
      'keyframes-name-pattern',
      'selector-class-pattern',
      'selector-id-pattern',
    ],
    cleanliness: ['block-no-empty', 'no-empty-source'],
    maintainability: ['no-descending-specificity'],
  },
  scss: {
    pattern: [
      'scss/at-mixin-pattern',
      'scss/dollar-variable-pattern',
    ],
    cleanliness: [
      'scss/load-no-partial-leading-underscore',
      'scss/operator-no-unspaced',
    ],
    maintainability: [
      'scss/at-extend-no-missing-placeholder',
      'scss/no-global-function-names',
    ],
  },
}
