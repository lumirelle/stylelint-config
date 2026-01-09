import type { OptionsConfig } from '../src/types'

import { afterAll, beforeAll, it } from 'bun:test'
import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'

import { x } from 'tinyexec'
import { glob } from 'tinyglobby'

const isWindows = process.platform === 'win32'
const timeout = isWindows ? 300_000 : 30_000

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('should format basic CSS files', 'css', {
  css: true,
  scss: false,
  less: false,
  tailwindcss: false,
  html: false,
  vue: false,
  stylistic: false,
  ordered: false,
}, 'css.css')
runWithConfig('should format CSS and SCSS files together', 'css+scss', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: false,
  html: false,
  vue: false,
  stylistic: false,
  ordered: false,
}, '(css.css|scss.scss)')
runWithConfig('should format CSS and Less files together', 'css+less', {
  css: true,
  scss: false,
  less: true,
  tailwindcss: false,
  html: false,
  vue: false,
  stylistic: false,
  ordered: false,
}, '(css.css|less.less)')
runWithConfig('should format CSS files with HTML support', 'css+html', {
  css: true,
  scss: false,
  less: false,
  tailwindcss: false,
  html: true,
  vue: false,
  stylistic: false,
  ordered: false,
}, '(css.css|css.html)')
runWithConfig('should format CSS in Vue components', 'css+vue', {
  css: true,
  scss: false,
  less: false,
  tailwindcss: false,
  html: false,
  vue: true,
  stylistic: false,
  ordered: false,
}, '(css.css|css.vue)')
runWithConfig('should format CSS and SCSS in Vue components', 'css+vue+scss', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: false,
  html: false,
  vue: true,
  stylistic: false,
  ordered: false,
}, '(css.css|scss.scss|css.vue|scss.vue)')
runWithConfig('should format CSS and Less in Vue components', 'css+vue+less', {
  css: true,
  scss: false,
  less: true,
  tailwindcss: false,
  html: false,
  vue: true,
  stylistic: false,
  ordered: false,
}, '(css.css|less.less|css.vue|less.vue)')
runWithConfig('should apply stylistic rules with SCSS support', 'stylistic+scss', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: false,
  html: true,
  vue: true,
  stylistic: true,
  ordered: false,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('should apply stylistic rules with Less support', 'stylistic+less', {
  css: true,
  scss: false,
  less: true,
  tailwindcss: false,
  html: true,
  vue: true,
  stylistic: true,
  ordered: false,
}, '(css.css|less.less|css.html|css.vue|less.vue)')
runWithConfig('should order properties with SCSS support', 'ordered+scss', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: false,
  html: true,
  vue: true,
  stylistic: false,
  ordered: true,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('should order properties with Less support', 'ordered+less', {
  css: true,
  scss: false,
  less: true,
  tailwindcss: false,
  html: true,
  vue: true,
  stylistic: false,
  ordered: true,
}, '(css.css|less.less|css.html|css.vue|less.vue)')
runWithConfig('should allow Tailwind CSS at-rules', 'tailwind-no-output', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: true,
  html: true,
  vue: true,
  stylistic: false,
  ordered: false,
}, 'tailwind*')
runWithConfig('should apply all features with SCSS support', 'all+scss', {
  css: true,
  scss: true,
  less: false,
  tailwindcss: true,
  html: true,
  vue: true,
  stylistic: true,
  ordered: true,
}, '*.{css,scss,html,vue,js}')
runWithConfig('should apply all features with Less support', 'all+less', {
  css: true,
  scss: false,
  less: true,
  tailwindcss: true,
  html: true,
  vue: true,
  stylistic: true,
  ordered: true,
}, '*.{css,less,html,vue,js}')

function runWithConfig(displayName: string, dirName: string, configs: OptionsConfig, filePatterns: string = './*.{css,scss,vue}') {
  it.concurrent(displayName, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', dirName)
    const target = resolve('_fixtures', dirName)

    await fs.cp(from, target, {
      recursive: true,
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await fs.writeFile(join(target, 'stylelint.config.js'), `
import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle(
  ${JSON.stringify(configs)},
)
`)

    await x('npx', ['stylelint', filePatterns, '--fix'], {
      nodeOptions: {
        cwd: target,
        stdio: 'pipe',
      },
    })

    const files = await glob('**/*', {
      ignore: [
        'node_modules',
        'stylelint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      const outputPath = join(output, file)
      if (content === source) {
        await fs.rm(outputPath, { force: true })
        return
      }
      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, timeout)
}
