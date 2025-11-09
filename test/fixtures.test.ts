import type { OptionsConfig } from '../src/types'

import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { x } from 'tinyexec'

import { glob } from 'tinyglobby'
import { afterAll, beforeAll, it } from 'vitest'

const isWindows = process.platform === 'win32'
const timeout = isWindows ? 300_000 : 30_000

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('css', {
  css: true,
  scss: false,
  tailwindcss: false,
  html: false,
  vue: false,
  formatter: false,
  ordered: false,
}, 'css.css')
runWithConfig('css+scss', {
  css: true,
  scss: true,
  tailwindcss: false,
  html: false,
  vue: false,
  formatter: false,
  ordered: false,
}, '(css.css|scss.scss)')
runWithConfig('css+html', {
  css: true,
  scss: false,
  tailwindcss: false,
  html: true,
  vue: false,
  formatter: false,
  ordered: false,
}, '(css.css|css.html)')
runWithConfig('css+vue', {
  css: true,
  scss: false,
  tailwindcss: false,
  html: false,
  vue: true,
  formatter: false,
  ordered: false,
}, '(css.css|css.vue)')
runWithConfig('css+vue+scss', {
  css: true,
  scss: true,
  tailwindcss: false,
  html: false,
  vue: true,
  formatter: false,
  ordered: false,
}, '(css.css|scss.scss|css.vue|scss.vue)')
runWithConfig('stylistic', {
  css: true,
  scss: true,
  tailwindcss: false,
  html: true,
  vue: true,
  formatter: 'stylistic',
  ordered: false,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('prettier', {
  css: true,
  scss: true,
  tailwindcss: false,
  html: true,
  vue: true,
  formatter: 'prettier',
  ordered: false,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('ordered', {
  css: true,
  scss: true,
  tailwindcss: false,
  html: true,
  vue: true,
  formatter: false,
  ordered: true,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('tailwind-no-output', {
  css: true,
  scss: true,
  tailwindcss: true,
  html: true,
  vue: true,
  formatter: false,
  ordered: false,
}, 'tailwind*')
runWithConfig('all', {
  css: true,
  scss: true,
  tailwindcss: true,
  html: true,
  vue: true,
  formatter: 'stylistic',
  ordered: true,
}, '*.*')

function runWithConfig(name: string, configs: OptionsConfig, filePatterns: string = './*.{css,scss,vue}') {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

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
