/**
 * TDD RED Phase: Package.json Conditional Exports Tests
 *
 * These tests verify that the package.json exports field is configured correctly
 * and that all specified entry points are importable.
 *
 * Expected exports:
 * - 'mdxui'              -> ./src/index.ts
 * - 'mdxui/types'        -> ./src/types/index.ts
 * - 'mdxui/site'         -> ./src/site/index.ts
 * - 'mdxui/app'          -> ./src/app/index.ts
 * - 'mdxui/zod'          -> ./src/types/zod/index.ts
 * - 'mdxui/components'   -> ./src/components/index.ts
 * - 'mdxui/playground'   -> ./src/playground/index.ts
 *
 * These tests should FAIL initially (RED phase) as the exports are not configured yet.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, it, expect, beforeAll } from 'vitest'

const PACKAGE_ROOT = join(__dirname, '..', '..')

interface PackageJson {
  name: string
  exports?: Record<string, string | { import?: string; require?: string; types?: string; default?: string }>
}

describe('mdxui package.json conditional exports', () => {
  let packageJson: PackageJson

  beforeAll(() => {
    const packageJsonPath = join(PACKAGE_ROOT, 'package.json')
    expect(existsSync(packageJsonPath), 'package.json should exist').toBe(true)
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  })

  describe('exports field configuration', () => {
    it('should have exports field in package.json', () => {
      expect(packageJson.exports).toBeDefined()
      expect(typeof packageJson.exports).toBe('object')
    })

    it('should export "." (main entry) from src/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const mainExport = packageJson.exports!['.']
      expect(mainExport).toBeDefined()

      // Check if it points to src/index.ts (string or object format)
      const exportPath = typeof mainExport === 'string' ? mainExport : mainExport?.import || mainExport?.default
      expect(exportPath).toMatch(/src\/index\.ts$/)
    })

    it('should export "./types" from src/types/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const typesExport = packageJson.exports!['./types']
      expect(typesExport, 'Expected "./types" export to be defined').toBeDefined()

      const exportPath = typeof typesExport === 'string' ? typesExport : typesExport?.import || typesExport?.default
      expect(exportPath).toMatch(/src\/types\/index\.ts$/)
    })

    it('should export "./site" from src/site/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const siteExport = packageJson.exports!['./site']
      expect(siteExport, 'Expected "./site" export to be defined').toBeDefined()

      const exportPath = typeof siteExport === 'string' ? siteExport : siteExport?.import || siteExport?.default
      expect(exportPath).toMatch(/src\/site\/index\.ts$/)
    })

    it('should export "./app" from src/app/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const appExport = packageJson.exports!['./app']
      expect(appExport, 'Expected "./app" export to be defined').toBeDefined()

      const exportPath = typeof appExport === 'string' ? appExport : appExport?.import || appExport?.default
      expect(exportPath).toMatch(/src\/app\/index\.ts$/)
    })

    it('should export "./zod" from src/types/zod/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const zodExport = packageJson.exports!['./zod']
      expect(zodExport, 'Expected "./zod" export to be defined').toBeDefined()

      const exportPath = typeof zodExport === 'string' ? zodExport : zodExport?.import || zodExport?.default
      expect(exportPath).toMatch(/src\/types\/zod\/index\.ts$/)
    })

    it('should export "./components" from src/components/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const componentsExport = packageJson.exports!['./components']
      expect(componentsExport, 'Expected "./components" export to be defined').toBeDefined()

      const exportPath = typeof componentsExport === 'string' ? componentsExport : componentsExport?.import || componentsExport?.default
      expect(exportPath).toMatch(/src\/components\/index\.ts$/)
    })

    it('should export "./playground" from src/playground/index.ts', () => {
      expect(packageJson.exports).toBeDefined()
      const playgroundExport = packageJson.exports!['./playground']
      expect(playgroundExport, 'Expected "./playground" export to be defined').toBeDefined()

      const exportPath = typeof playgroundExport === 'string' ? playgroundExport : playgroundExport?.import || playgroundExport?.default
      expect(exportPath).toMatch(/src\/playground\/index\.ts$/)
    })
  })

  describe('exported files exist', () => {
    const expectedExports = [
      { name: '.', path: 'src/index.ts' },
      { name: './types', path: 'src/types/index.ts' },
      { name: './site', path: 'src/site/index.ts' },
      { name: './app', path: 'src/app/index.ts' },
      { name: './zod', path: 'src/types/zod/index.ts' },
      { name: './components', path: 'src/components/index.ts' },
      { name: './playground', path: 'src/playground/index.ts' },
    ]

    for (const { name, path } of expectedExports) {
      it(`should have file for "${name}" export at ${path}`, () => {
        const fullPath = join(PACKAGE_ROOT, path)
        expect(existsSync(fullPath), `Expected ${fullPath} to exist for export "${name}"`).toBe(true)
      })
    }
  })
})
