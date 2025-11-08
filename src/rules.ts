export const LESS_OPINIONATED_RULES = {
  standard: {
    pattern: [
      'selector-class-pattern',
      'selector-id-pattern',
    ],
    cleanliness: [],
    maintainability: ['no-descending-specificity'],
  },
  scss: {
    pattern: [],
    cleanliness: [
      'scss/load-no-partial-leading-underscore',
    ],
    maintainability: [
      'scss/at-extend-no-missing-placeholder',
      'scss/no-global-function-names',
    ],
  },
}
