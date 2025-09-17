import type { Config as StylelintConfig } from 'stylelint'
import type { OptionsConfig } from './types'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { GLOB_EXCLUDE } from './globs'

const ScssPackages = [
  'node-sass',
  'sass',
  'sass-embedded',
]

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]

/**
 * Constructs a Stylelint configuration object.
 *
 * @param options Options to generate the configuration
 * @returns The generated Stylelint configuration object
 */
export function lumirelle(options: OptionsConfig & Pick<StylelintConfig, 'ignoreFiles' | 'allowEmptyInput'> = {}): ConfigComposer {
  const {
    ignoreFiles: userIgnoreFiles = [],
    allowEmptyInput = true,
    stylistic: enableStylistic = true,
    standard: enableStandard = true,
    scss: enableScss = ScssPackages.some(pkg => isPackageExists(pkg)),
    vue: enableVue = VuePackages.some(pkg => isPackageExists(pkg)),
    ordered: enableOrdered = true,
  } = options

  const config: StylelintConfig = {}

  config.ignoreFiles = [
    ...GLOB_EXCLUDE,
    ...(Array.isArray(userIgnoreFiles) ? userIgnoreFiles : [userIgnoreFiles]),
  ]

  // Base configuration
  config.allowEmptyInput = allowEmptyInput

  config.extends = []
  config.rules = {}

  // Stylistic rules
  if (enableStylistic) {
    config.extends.push('@stylistic/stylelint-config')
    config.rules['@stylistic/max-line-length'] = null
  }

  // Core rules
  if (enableStandard) {
    config.extends.push('stylelint-config-standard')
    config.rules['block-no-empty'] = [true, { severity: 'warning' }]
    config.rules['keyframes-name-pattern'] = null
    config.rules['no-descending-specificity'] = null
    config.rules['no-empty-source'] = null
    config.rules['selector-class-pattern'] = null
    config.rules['selector-id-pattern'] = null
  }

  // SCSS support
  if (enableScss) {
    config.extends.push('stylelint-config-standard-scss')
    config.rules['scss/at-if-closing-brace-space-after'] = null
    config.rules['scss/at-if-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-space-after'] = null
    config.rules['scss/dollar-variable-pattern'] = null
    /**
     * Enable for better dev experience, warning for it doesn't provide automatic fix.
     * @see https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/load-no-partial-leading-underscore
     */
    config.rules['scss/load-no-partial-leading-underscore'] = [true, { severity: 'warning' }]
    /**
     * You should use `%placeholder` to define the style should be reused and extend it instead of other selectors.
     * @see https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/at-extend-no-missing-placeholder
     */
    config.rules['scss/at-extend-no-missing-placeholder'] = [true, { severity: 'warning' }]
  }

  // Vue support
  if (enableVue) {
    if (enableScss) {
      config.extends.push('stylelint-config-standard-vue/scss')
    }
    else {
      config.extends.push('stylelint-config-standard-vue')
    }
  }

  // Ordered properties
  if (enableOrdered) {
    config.extends.push('stylelint-config-recess-order')
  }

  return new ConfigComposer(config)
}
