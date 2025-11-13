import postcssLess from 'postcss-less'
import postcssSCSS from 'postcss-scss'
import { GLOB_EXCLUDE, resolvePackagePath } from '../../src'
import { tailwindcssIgnoreAtRules } from '../../src/configs/tailwindcss'
import { useCSSRules } from '../../src/rules/css'
import { useLessRules } from '../../src/rules/less'
import { useSCSSRules } from '../../src/rules/scss'

export const defaultCSSConfig = {
  rules: useCSSRules(false),
}

export const defaultStylisticConfig = {
  extends: [resolvePackagePath('@stylistic/stylelint-config')],
  rules: {
    '@stylistic/indentation': 2,
    '@stylistic/string-quotes': 'single',
    '@stylistic/max-line-length': 120,
    '@stylistic/block-closing-brace-newline-after': ['always', {
      ignoreAtRules: ['if', 'else'],
    }],
  },
}

export const defaultHTMLConfig = {
  extends: [resolvePackagePath('stylelint-config-html')],
}

export const defaultOrderedConfig = {
  extends: [resolvePackagePath('stylelint-config-recess-order')],
}

export const defaultSCSSConfig = {
  files: ['**/*.scss'],
  customSyntax: postcssSCSS,
  plugins: [resolvePackagePath('stylelint-scss')],
  rules: useSCSSRules(false),
}

export const defaultLessConfig = {
  files: ['**/*.less'],
  customSyntax: postcssLess,
  plugins: [resolvePackagePath('stylelint-less')],
  rules: useLessRules(false),
}

export const defaultTailwindCSSConfig = {
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: tailwindcssIgnoreAtRules }],
  },
}

export const defaultVueConfig = {
  files: ['**/*.vue'],
  extends: [resolvePackagePath('stylelint-config-html')],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted'] },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] },
    ],
    'value-keyword-case': [
      'lower',
      { ignoreFunctions: ['v-bind'] },
    ],
  },
}

export const defaultConfig = {
  allowEmptyInput: true,
  extends: [
    ...defaultHTMLConfig.extends,
    ...defaultStylisticConfig.extends,
    ...defaultOrderedConfig.extends,
  ],
  ignoreFiles: [
    ...GLOB_EXCLUDE,
  ],
  rules: {
    ...defaultStylisticConfig.rules,
    ...defaultCSSConfig.rules,
  },
  overrides: [
    defaultSCSSConfig,
    {
      ...defaultVueConfig,
      plugins: [resolvePackagePath('stylelint-scss')],
      rules: {
        ...defaultSCSSConfig.rules,
        ...defaultVueConfig.rules,
      },
    },
  ],
}
