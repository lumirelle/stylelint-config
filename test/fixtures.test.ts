import type { OptionsConfig } from '../src/types'

import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { execa } from 'execa'
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

runWithConfig('standard', {
  standard: true,
  scss: false,
  tailwindcss: false,
  html: false,
  vue: false,
  formatter: false,
  ordered: false,
}, 'css.css')
runWithConfig('standard+scss', {
  standard: true,
  scss: true,
  tailwindcss: false,
  html: false,
  vue: false,
  formatter: false,
  ordered: false,
}, '(css.css|scss.scss)')
runWithConfig('standard+html', {
  standard: true,
  scss: false,
  tailwindcss: false,
  html: true,
  vue: false,
  formatter: false,
  ordered: false,
}, '(css.css|css.html)')
runWithConfig('standard+vue', {
  standard: true,
  scss: false,
  tailwindcss: false,
  html: false,
  vue: true,
  formatter: false,
  ordered: false,
}, '(css.css|css.vue)')
runWithConfig('standard+vue+scss', {
  standard: true,
  scss: true,
  tailwindcss: false,
  html: false,
  vue: true,
  formatter: false,
  ordered: false,
}, '(css.css|scss.scss|css.vue|scss.vue)')
runWithConfig('stylistic', {
  standard: true,
  scss: true,
  tailwindcss: false,
  html: true,
  vue: true,
  formatter: 'stylistic',
  ordered: false,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('ordered', {
  standard: true,
  scss: true,
  tailwindcss: false,
  html: true,
  vue: true,
  formatter: false,
  ordered: true,
}, '(css.css|scss.scss|css.html|css.vue|scss.vue)')
runWithConfig('tailwind-no-output', {
  standard: true,
  scss: true,
  tailwindcss: true,
  html: true,
  vue: true,
  formatter: false,
  ordered: false,
}, 'tailwind*')
runWithConfig('all', {
  standard: true,
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

    await execa('npx', ['stylelint', filePatterns, '--fix'], {
      cwd: target,
      stdio: 'pipe',
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
