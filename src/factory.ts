import type { Awaitable } from '@antfu/utils'
import type { OptionsConfig, StylelintConfig, StylelintOverrideConfig } from './types'
import { toArray } from '@antfu/utils'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { less } from './configs'
import { css } from './configs/css'
import { html } from './configs/html'
import { ordered } from './configs/ordered'
import { scss } from './configs/scss'
import { stylistic } from './configs/stylistic'
import { tailwindcss } from './configs/tailwindcss'
import { vue } from './configs/vue'
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
 * Constructs a StyleLint configuration object.
 *
 * @param {OptionsConfig} options
 *   The options for generating the StyleLint configuration.
 * @param {(StylelintConfig | StylelintOverrideConfig)[]} userConfigs
 *   The user configurations to be mixed into the generated configuration.
 * @returns {Promise<StylelintConfig>}
 *   The mixed StyleLint configuration object.
 */
export function lumirelle(
  options: OptionsConfig = {},
  ...userConfigs: Awaitable<StylelintConfig | StylelintOverrideConfig>[]
): ConfigComposer {
  const {
    scss: userScssOptions,
    less: userLessOptions,
    tailwindcss: tailwindcssOptions = false,
    html: htmlOptions = true,
    vue: vueOptions = VuePackages.some(pkg => isPackageExists(pkg)),
    ordered: orderedOptions = true,
    lessOpinionated: lessOpinionatedOptions = false,
    stylistic: stylisticOptions = {
      indent: 2,
      quotes: 'single',
      maxLineLength: 120,
    },
  } = options

  let scssOptions = userScssOptions ?? false
  let lessOptions = userLessOptions ?? false
  if (userScssOptions == null && userLessOptions == null && ScssPackages.some(pkg => isPackageExists(pkg)))
    scssOptions = true
  if (userScssOptions && userLessOptions) {
    lessOptions = false
    console.warn('[@lumirelle/stylelint-config] You should not enable both SCSS and LESS support at the same time, LESS support is disabled.')
  }

  // Base configuration
  const configs: Awaitable<StylelintConfig | StylelintOverrideConfig>[] = [
    {
      allowEmptyInput: true,
      ignoreFiles: [...GLOB_EXCLUDE, ...toArray(options.ignoreFiles)],
    },
  ]

  // Additional configurations
  configs.push(
    css(lessOpinionatedOptions),
    scss(scssOptions),
    less(lessOptions),
    html(htmlOptions),
    vue(vueOptions, scssOptions, lessOptions),
    tailwindcss(tailwindcssOptions, scssOptions, vueOptions),
    stylistic(stylisticOptions),
    ordered(orderedOptions),
    ...userConfigs,
  )

  // Merged user config
  return new ConfigComposer(...configs)
}
