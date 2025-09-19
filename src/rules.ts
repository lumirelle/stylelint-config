export const LESS_OPINIONATED_RULES = {
  standard: [
    // Symbol pattern rules
    'custom-property-pattern',
    'keyframes-name-pattern',
    'selector-class-pattern',
    'selector-id-pattern',
    // Code cleanliness rules
    'block-no-empty',
    'no-empty-source',
    // Code maintainability rules
    'no-descending-specificity',
  ],
  scss: [
    // Symbol pattern rules
    'scss/at-mixin-pattern',
    'scss/dollar-variable-pattern',
    // Code cleanliness rules
    'scss/load-no-partial-leading-underscore',
    'scss/operator-no-unspaced',
    // Code maintainability rules
    'scss/at-extend-no-missing-placeholder',
    'scss/no-global-function-names',
  ],
}
