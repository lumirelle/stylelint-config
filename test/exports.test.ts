import { Glob, YAML } from 'bun'
import { describe, expect, it } from 'bun:test'
import { dirname, join } from 'node:path'
import { getPackageExportsManifest } from 'vitest-package-exports'
import { workspaces } from '../package.json'

describe('exports-snapshot', async () => {
  const root = join(import.meta.dir, '..')
  /**
   * FIXME: If `bun` support command like `pnpm ls --only-projects`, we may no longer need this, see https://github.com/oven-sh/bun/issues/25114
   */
  for (const pkg of workspaces.packages) {
    const glob = new Glob(`${pkg}/package.json`)
    for await (const pkgJsonPath of glob.scan({ cwd: root, absolute: true })) {
      const pkgJson = await import(pkgJsonPath).then(m => m.default)
      if (!pkgJson.name || pkgJson.private)
        continue
      it(`${pkgJson.name}`, async () => {
        const manifest = await getPackageExportsManifest({
          importMode: 'src',
          cwd: dirname(pkgJsonPath),
        })
        expect(YAML.stringify(manifest.exports))
        // .toMatchFileSnapshot(`./exports/${pkg.name}.yaml`)
        // TODO: Workaround. Bun currently does not support file snapshot like Vitest, see https://github.com/oven-sh/bun/issues/13096
          .toMatchInlineSnapshot()
      })
    }
  }
})
