import type { OptionsConfig } from '../src/types'
import { afterAll, beforeAll, expect, it } from 'bun:test'
import fs from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const isWindows = process.platform === 'win32'
const timeout = isWindows ? 300_000 : 30_000

beforeAll(() => {
  fs.rmSync('_fixtures', { recursive: true, force: true })
})
afterAll(() => {
  fs.rmSync('_fixtures', { recursive: true, force: true })
})

runWithConfig(
  'should fix CSS',
  'css',
  {
    css: true,
    scss: false,
    less: false,
    tailwindcss: false,
    html: false,
    vue: false,
    stylistic: false,
    ordered: false,
  },
  'css.css',
)
runWithConfig(
  'should fix CSS and SCSS',
  'css+scss',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: false,
    html: false,
    vue: false,
    stylistic: false,
    ordered: false,
  },
  '(css.css|scss.scss)',
)
runWithConfig(
  'should fix CSS and Less',
  'css+less',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: false,
    html: false,
    vue: false,
    stylistic: false,
    ordered: false,
  },
  '(css.css|less.less)',
)

runWithConfig(
  'should fix CSS and CSS in HTML',
  'css+html',
  {
    css: true,
    scss: false,
    less: false,
    tailwindcss: false,
    html: true,
    vue: false,
    stylistic: false,
    ordered: false,
  },
  '(css.css|css.html)',
)
runWithConfig(
  'should fix CSS and CSS in Vue',
  'css+vue',
  {
    css: true,
    scss: false,
    less: false,
    tailwindcss: false,
    html: false,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(css.css|css.vue)',
)
runWithConfig(
  'should fix CSS, SCSS, CSS in HTML',
  'css+scss+html',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(css.css|scss.scss|css.html)',
)
runWithConfig(
  'should fix CSS, SCSS, CSS in Vue and SCSS in Vue',
  'css+scss+vue',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: false,
    html: false,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(css.css|scss.scss|css.vue|scss.vue)',
)
runWithConfig(
  'should fix CSS, Less, CSS in HTML',
  'css+less+html',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(css.css|less.less|css.html)',
)
runWithConfig(
  'should fix CSS, Less, CSS in Vue and Less in Vue',
  'css+less+vue',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: false,
    html: false,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(css.css|less.less|css.vue|less.vue)',
)

runWithConfig(
  'should fix CSS with stylistic enabled',
  'css+stylistic',
  {
    css: true,
    scss: false,
    less: false,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: true,
    ordered: false,
  },
  '(css.css|css.html|css.vue)',
)
runWithConfig(
  'should fix CSS, SCSS with stylistic enabled',
  'css+scss+stylistic',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: true,
    ordered: false,
  },
  '(css.css|css.html|css.vue|scss.scss|scss.vue)',
)
runWithConfig(
  'should fix CSS, Less with stylistic enabled',
  'css+less+stylistic',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: true,
    ordered: false,
  },
  '(css.css|css.html|css.vue|less.less|less.vue)',
)

runWithConfig(
  'should fix CSS, SCSS with ordering enabled',
  'css+scss+ordered',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: false,
    ordered: true,
  },
  '(css.css|css.html|css.vue|scss.scss|scss.vue)',
)
runWithConfig(
  'should fix CSS, Less with ordering enabled',
  'css+less+ordered',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: false,
    html: true,
    vue: true,
    stylistic: false,
    ordered: true,
  },
  '(css.css|css.html|css.vue|less.less|less.vue)',
)

runWithConfig(
  'should fix CSS, in HTML and Vue with Tailwind CSS enabled',
  'css+tailwind-should-not-output',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: true,
    html: true,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(tailwind.css|tailwind-css.html|tailwind-css.vue)',
)
runWithConfig(
  'should fix CSS, SCSS, in HTML and Vue with Tailwind CSS enabled',
  'css+scss+tailwind-should-not-output',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: true,
    html: true,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(tailwind.css|tailwind-css.html|tailwind-css.vue|tailwind.scss|tailwind-scss.vue)',
)
runWithConfig(
  'should fix CSS, Less, in HTML and Vue with Tailwind CSS enabled',
  'css+less+tailwind-should-not-output',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: true,
    html: true,
    vue: true,
    stylistic: false,
    ordered: false,
  },
  '(tailwind.css|tailwind-css.html|tailwind-css.vue|tailwind.less|tailwind-less.vue)',
)

runWithConfig(
  'should apply all features with SCSS enabled',
  'all (scss)',
  {
    css: true,
    scss: true,
    less: false,
    tailwindcss: true,
    html: true,
    vue: true,
    stylistic: true,
    ordered: true,
  },
  '(css.css|css.html|css.vue|scss.scss|scss.vue|tailwind.css|tailwind-css.html|tailwind-css.vue|tailwind.scss|tailwind-scss.vue|js.js)',
)
runWithConfig(
  'should apply all features with Less enabled',
  'all (less)',
  {
    css: true,
    scss: false,
    less: true,
    tailwindcss: true,
    html: true,
    vue: true,
    stylistic: true,
    ordered: true,
  },
  '(css.css|css.html|css.vue|less.less|less.vue|tailwind.css|tailwind-css.html|tailwind-css.vue|tailwind.less|tailwind-less.vue|js.js)',
)

function runWithConfig(displayName: string, dirName: string, configs: OptionsConfig, filePatterns: string = './*.{css,scss,vue}') {
  it.concurrent(displayName, async () => {
    const input = resolve('fixtures/input')
    const output = resolve('fixtures/output', dirName)
    const processed = resolve('_fixtures', dirName)

    fs.cpSync(input, processed, {
      recursive: true,
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await Bun.write(join(processed, 'stylelint.config.js'), `
import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle(
  ${JSON.stringify(configs)},
)
`)

    await Bun.spawn(['bun', 'stylelint', filePatterns, '--fix'], {
      cwd: processed,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).stdout.text()

    const files = fs.globSync('**/*', {
      exclude: [
        'node_modules',
        'stylelint.config.js',
      ],
      cwd: processed,
    })

    await Promise.all(files.map(async (file) => {
      const content = await Bun.file(join(processed, file)).text()
      const source = await Bun.file(join(input, file)).text()
      const outputPath = join(output, file)
      if (content === source) {
        fs.rmSync(outputPath, { force: true })
        return
      }
      fs.mkdirSync(join(dirname(outputPath)), { recursive: true })
      await Bun.write(outputPath, content)
      const expected = await Bun.file(outputPath).text()
      expect(content).toBe(expected)
    }))
  }, timeout)
}
