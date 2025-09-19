import type { Config as StylelintConfig } from 'stylelint'
import type { OptionsConfig, OptionsStylelint } from './types'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { GLOB_EXCLUDE } from './globs'
import { mergeConfigs } from './merge'
import { resolvePackagePath } from './resolve'
import { LESS_OPINIONATED_RULES } from './rules'

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
 * @param userConfigs Additional user-defined Stylelint configuration objects to merge
 * @returns The generated Stylelint configuration object
 */
export function lumirelle(options: OptionsConfig = {}, ...userConfigs: OptionsStylelint[]): ConfigComposer {
  const {
    ignoreFiles: userIgnoreFiles = [],
    allowEmptyInput = true,
    stylistic: enableStylistic = true,
    standard: enableStandard = true,
    scss: enableScss = ScssPackages.some(pkg => isPackageExists(pkg)),
    vue: enableVue = VuePackages.some(pkg => isPackageExists(pkg)),
    ordered: enableOrdered = true,
    lessOpinionated = false,
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
    config.extends.push(resolvePackagePath('@stylistic/stylelint-config'))
    config.rules['@stylistic/max-line-length'] = null
  }

  // Core rules
  if (enableStandard) {
    config.extends.push(resolvePackagePath('stylelint-config-standard'))

    if (lessOpinionated) {
      LESS_OPINIONATED_RULES.standard.forEach((rule) => {
        config.rules![rule] = null
      })
    }
  }

  // SCSS support
  if (enableScss) {
    config.extends.push(resolvePackagePath('stylelint-config-standard-scss'))
    config.rules['scss/at-if-closing-brace-space-after'] = null
    config.rules['scss/at-if-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-space-after'] = null

    if (lessOpinionated) {
      LESS_OPINIONATED_RULES.scss.forEach((rule) => {
        config.rules![rule] = null
      })
    }
  }

  // Vue support
  if (enableVue) {
    if (enableScss) {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue/scss'))
    }
    else {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue'))
    }
  }

  // Ordered properties
  if (enableOrdered) {
    config.extends.push(resolvePackagePath('stylelint-config-recess-order'))
  }

  // Merged user config
  const finalConfig = mergeConfigs(config, ...userConfigs)

  return new ConfigComposer(finalConfig)
}
