import cloneDeep from 'lodash.clonedeep'
import { useCSSRules } from './css'

const scssRules = {
  ...useCSSRules(),
  // Recommended
  'annotation-no-unknown': null,
  'at-rule-descriptor-no-unknown': null,
  'at-rule-descriptor-value-no-unknown': null,
  'at-rule-no-unknown': null,
  'at-rule-prelude-no-invalid': null,
  'color-no-invalid-hex': true,
  'comment-no-empty': null,
  'declaration-property-value-no-unknown': null,
  'function-linear-gradient-no-nonstandard-direction': true,
  'function-no-unknown': null,
  'media-feature-name-value-no-unknown': null,
  'media-query-no-invalid': null,
  'nesting-selector-no-missing-scoping-root': [
    true,
    {
      ignoreAtRules: ['mixin'],
    },
  ],
  'no-invalid-position-at-import-rule': [
    true,
    {
      ignoreAtRules: ['use', 'forward'],
    },
  ],
  'string-no-newline': true,
  'unit-no-unknown': true,
  'scss/at-extend-no-missing-placeholder': true,
  'scss/at-if-no-null': true,
  'scss/at-rule-no-unknown': true,
  'scss/comment-no-empty': true,
  'scss/declaration-nested-properties-no-divided-groups': true,
  'scss/dollar-variable-no-missing-interpolation': true,
  'scss/function-quote-no-quoted-strings-inside': true,
  'scss/function-unquote-no-unquoted-strings-inside': true,
  'scss/load-no-partial-leading-underscore': true,
  'scss/load-partial-extension': 'never',
  'scss/no-duplicate-mixins': true,
  'scss/no-global-function-names': true,
  'scss/operator-no-newline-after': true,
  'scss/operator-no-newline-before': true,
  'scss/operator-no-unspaced': true,
  // Standard
  'at-rule-empty-line-before': [
    'always',
    {
      except: ['blockless-after-blockless', 'first-nested'],
      ignore: ['after-comment'],
      ignoreAtRules: ['else'],
    },
  ],
  'import-notation': 'string',
  'length-zero-no-unit': [
    true,
    {
      ignore: ['custom-properties'],
      ignorePreludeOfAtRules: ['function', 'mixin'],
    },
  ],
  'scss/at-else-empty-line-before': 'never',
  'scss/at-else-if-parentheses-space-before': 'always',
  'scss/at-function-parentheses-space-before': 'never',
  'scss/at-function-pattern': [
    '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    {
      message: 'Expected function name to be kebab-case',
    },
  ],
  'scss/at-mixin-argumentless-call-parentheses': 'never',
  'scss/at-mixin-parentheses-space-before': 'never',
  'scss/at-mixin-pattern': [
    '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    {
      message: 'Expected mixin name to be kebab-case',
    },
  ],
  'scss/at-rule-conditional-no-parentheses': true,
  'scss/dollar-variable-colon-space-after': 'always-single-line',
  'scss/dollar-variable-colon-space-before': 'never',
  'scss/dollar-variable-empty-line-before': [
    'always',
    {
      except: ['after-dollar-variable', 'first-nested'],
      ignore: ['after-comment', 'inside-single-line-block'],
    },
  ],
  'scss/dollar-variable-pattern': [
    '^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    {
      message: `Expected variable name to be kebab-case, start with "--" or nothing.`,
    },
  ],
  'scss/double-slash-comment-empty-line-before': [
    'always',
    {
      except: ['first-nested'],
      ignore: ['between-comments', 'stylelint-commands'],
    },
  ],
  'scss/double-slash-comment-whitespace-inside': 'always',
  'scss/percent-placeholder-pattern': [
    '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    {
      message: 'Expected placeholder to be kebab-case',
    },
  ],
} as const

export function useSCSSRules(): typeof scssRules {
  return cloneDeep(scssRules)
}
