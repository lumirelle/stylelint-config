import type { OptionsConfig, StylelintConfig, StylelintConfigWithDefaults, StylelintOverrideConfig } from './types'
import { toArray } from '@antfu/utils'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { defu } from './defu'
import { GLOB_EXCLUDE } from './globs'
import { setup as setupFormatter } from './modules/formatter'
import { setup as setupHtml } from './modules/html'
import { setup as setupOrdered } from './modules/ordered'
import { setup as setupScss } from './modules/scss'
import { setup as setupStandard } from './modules/standard'
import { setup as setupTailwindCSS } from './modules/tailwindcss'
import { setup as setupVue } from './modules/vue'

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
 * Default options
 */
const defaultOptions: OptionsConfig = {
  allowEmptyInput: true,
  formatter: 'stylistic',
  scss: ScssPackages.some(pkg => isPackageExists(pkg)),
  tailwindcss: false,
  html: true,
  vue: VuePackages.some(pkg => isPackageExists(pkg)),
  ordered: true,
  lessOpinionated: false,
}

/**
 * Constructs a Stylelint configuration object.
 *
 * @param options Options to generate the configuration
 * @param userConfigs Additional user-defined Stylelint configuration objects to merge
 * @returns The generated Stylelint configuration object
 */
export function lumirelle(options: OptionsConfig = {}, ...userConfigs: (StylelintConfig | StylelintOverrideConfig)[]): ConfigComposer {
  const mergedOptions = defu(options, defaultOptions)

  // Base configuration
  const config: StylelintConfigWithDefaults = {
    allowEmptyInput: mergedOptions.allowEmptyInput,
    ignoreFiles: [...GLOB_EXCLUDE, ...toArray(mergedOptions.ignoreFiles)],
    extends: [],
    rules: {},
  }

  // Formatter
  setupFormatter(mergedOptions, config)
  // Core rules
  setupStandard(mergedOptions, config)
  // SCSS support
  setupScss(mergedOptions, config)
  // Tailwind CSS support
  setupTailwindCSS(mergedOptions, config)
  // HTML syntax support
  setupHtml(mergedOptions, config)
  // Vue support
  setupVue(mergedOptions, config)
  // Ordered properties
  setupOrdered(mergedOptions, config)

  // Merged user config
  let finalConfig: StylelintConfig = config
  for (let i = 0; i < userConfigs.length; i++) {
    const userConfig = userConfigs[i]
    if ('files' in userConfig) {
      finalConfig = defu({ overrides: [userConfig] }, finalConfig)
    }
    else {
      finalConfig = defu(userConfig, finalConfig)
    }
  }

  return new ConfigComposer(finalConfig)
}
