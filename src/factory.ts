import type { OptionsConfig, StylelintConfig, StylelintOverrideConfig } from './types'
import { toArray } from '@antfu/utils'
import { isPackageExists } from 'local-pkg'
import { ConfigComposer } from './composer'
import { css } from './configs/css'
import { formatter } from './configs/formatter'
import { html } from './configs/html'
import { ordered } from './configs/ordered'
import { scss } from './configs/scss'
import { tailwindcss } from './configs/tailwindcss'
import { vue } from './configs/vue'
import { defu } from './defu'
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
  ...userConfigs: (StylelintConfig | StylelintOverrideConfig)[]
): ConfigComposer {
  const {
    formatter: formatterOptions = 'stylistic',
    scss: scssOptions = ScssPackages.some(pkg => isPackageExists(pkg)),
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

  // Base configuration
  const configs: (StylelintConfig | StylelintOverrideConfig)[] = [
    {
      allowEmptyInput: true,
      ignoreFiles: [...GLOB_EXCLUDE, ...toArray(options.ignoreFiles)],
    },
  ]

  // Additional configurations
  configs.push(
    css(lessOpinionatedOptions),
    scss(scssOptions),
    html(htmlOptions),
    vue(vueOptions, scssOptions),
    tailwindcss(tailwindcssOptions, scssOptions, vueOptions),
    formatter(formatterOptions, stylisticOptions),
    ordered(orderedOptions),
    ...userConfigs,
  )

  // Merged user config
  return new ConfigComposer(mergeConfigs(configs))
}

export function mergeConfigs(configs: (StylelintConfig | StylelintOverrideConfig)[]): StylelintConfig {
  let finalConfig: StylelintConfig = {}
  for (const config of configs) {
    if ('files' in config) {
      finalConfig = defu({ overrides: [config] }, finalConfig)
    }
    else {
      finalConfig = defu(config, finalConfig)
    }
  }
  return finalConfig
}
