import { afterAll, beforeAll, spyOn } from 'bun:test'
import * as resolve from '../../src/resolve'

export function setup(): void {
  let spiedResolvePackagePath: ReturnType<typeof spyOn<typeof resolve, 'resolvePackagePath'>>

  beforeAll(() => {
    spiedResolvePackagePath = spyOn(resolve, 'resolvePackagePath')
    spiedResolvePackagePath.mockImplementation((pkgName: string) => `path/to/${pkgName}`)
  })

  afterAll(() => {
    spiedResolvePackagePath.mockRestore()
  })
}
