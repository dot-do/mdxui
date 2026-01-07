/**
 * TDD RED Phase: Directory Structure Tests
 *
 * These tests verify that the unified src/ directory structure exists.
 * They should FAIL initially (RED phase) as the structure doesn't exist yet.
 *
 * Expected structure:
 * src/
 *   types/      - Business-level type abstractions (Zod, Workers.do types)
 *   components/ - React MDX documentation components
 *   playground/ - Interactive code playground
 *   site/       - Documentation site building
 *   app/        - Application-level components
 */

import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

const SRC_ROOT = join(__dirname, '..')

describe('mdxui src/ directory structure', () => {
  describe('core directories exist', () => {
    it('should have src/types/ directory', () => {
      const typesDir = join(SRC_ROOT, 'types')
      expect(existsSync(typesDir), `Expected ${typesDir} to exist`).toBe(true)
      expect(statSync(typesDir).isDirectory()).toBe(true)
    })

    it('should have src/components/ directory', () => {
      const componentsDir = join(SRC_ROOT, 'components')
      expect(existsSync(componentsDir), `Expected ${componentsDir} to exist`).toBe(true)
      expect(statSync(componentsDir).isDirectory()).toBe(true)
    })

    it('should have src/playground/ directory', () => {
      const playgroundDir = join(SRC_ROOT, 'playground')
      expect(existsSync(playgroundDir), `Expected ${playgroundDir} to exist`).toBe(true)
      expect(statSync(playgroundDir).isDirectory()).toBe(true)
    })

    it('should have src/site/ directory', () => {
      const siteDir = join(SRC_ROOT, 'site')
      expect(existsSync(siteDir), `Expected ${siteDir} to exist`).toBe(true)
      expect(statSync(siteDir).isDirectory()).toBe(true)
    })

    it('should have src/app/ directory', () => {
      const appDir = join(SRC_ROOT, 'app')
      expect(existsSync(appDir), `Expected ${appDir} to exist`).toBe(true)
      expect(statSync(appDir).isDirectory()).toBe(true)
    })
  })

  describe('entry points exist', () => {
    it('should have src/index.ts as main entry', () => {
      const mainEntry = join(SRC_ROOT, 'index.ts')
      expect(existsSync(mainEntry), `Expected ${mainEntry} to exist`).toBe(true)
    })

    it('should have src/types/index.ts entry', () => {
      const typesEntry = join(SRC_ROOT, 'types', 'index.ts')
      expect(existsSync(typesEntry), `Expected ${typesEntry} to exist`).toBe(true)
    })

    it('should have src/components/index.ts entry', () => {
      const componentsEntry = join(SRC_ROOT, 'components', 'index.ts')
      expect(existsSync(componentsEntry), `Expected ${componentsEntry} to exist`).toBe(true)
    })

    it('should have src/playground/index.ts entry', () => {
      const playgroundEntry = join(SRC_ROOT, 'playground', 'index.ts')
      expect(existsSync(playgroundEntry), `Expected ${playgroundEntry} to exist`).toBe(true)
    })

    it('should have src/site/index.ts entry', () => {
      const siteEntry = join(SRC_ROOT, 'site', 'index.ts')
      expect(existsSync(siteEntry), `Expected ${siteEntry} to exist`).toBe(true)
    })

    it('should have src/app/index.ts entry', () => {
      const appEntry = join(SRC_ROOT, 'app', 'index.ts')
      expect(existsSync(appEntry), `Expected ${appEntry} to exist`).toBe(true)
    })
  })

  describe('types/ subdirectory structure', () => {
    it('should have src/types/zod/ for Zod schemas', () => {
      const zodDir = join(SRC_ROOT, 'types', 'zod')
      expect(existsSync(zodDir), `Expected ${zodDir} to exist`).toBe(true)
      expect(statSync(zodDir).isDirectory()).toBe(true)
    })

    it('should have src/types/zod/index.ts entry', () => {
      const zodEntry = join(SRC_ROOT, 'types', 'zod', 'index.ts')
      expect(existsSync(zodEntry), `Expected ${zodEntry} to exist`).toBe(true)
    })
  })
})
