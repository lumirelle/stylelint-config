import type { DefaultStylelintConfig, OptionsConfig, StylelintConfig } from './types'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { GLOB_EXCLUDE } from './globs'
import { mergeConfigs } from './merge'
import { setup as setupFormatter } from './modules/formatter'
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
  ignoreFiles: [],
  allowEmptyInput: true,
  formatter: 'stylistic',
  scss: ScssPackages.some(pkg => isPackageExists(pkg)),
  tailwindcss: false,
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
export function lumirelle(options: OptionsConfig = {}, ...userConfigs: StylelintConfig[]): ConfigComposer {
  const mergedOptions = { ...defaultOptions, ...options }

  const config: DefaultStylelintConfig = {
    extends: [],
    rules: {},
    ignoreFiles: [...GLOB_EXCLUDE],
  }

  // Base configuration
  if (mergedOptions.allowEmptyInput) {
    config.allowEmptyInput = mergedOptions.allowEmptyInput
  }
  if (mergedOptions.ignoreFiles) {
    if (Array.isArray(mergedOptions.ignoreFiles)) {
      config.ignoreFiles.push(...mergedOptions.ignoreFiles)
    }
    else {
      config.ignoreFiles.push(mergedOptions.ignoreFiles)
    }
  }

  // Formatter
  setupFormatter(mergedOptions, config)
  // Core rules
  setupStandard(mergedOptions, config)
  // SCSS support
  setupScss(mergedOptions, config)
  // Tailwind CSS support
  setupTailwindCSS(mergedOptions, config)
  // Vue support
  setupVue(mergedOptions, config)
  // Ordered properties
  setupOrdered(mergedOptions, config)

  // Merged user config
  const finalConfig = mergeConfigs(config, ...userConfigs)

  return new ConfigComposer(finalConfig)
}
