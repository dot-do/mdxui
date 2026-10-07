/**
 * @mdxui/admin: the CRUD App over Nouns, with List, Record and Form views.
 * Admin is a kind of App (ADR-0017 Q93), so it extends @mdxui/app. Placeholder.
 */

import type { App } from '@mdxui/app'

export type AdminView = 'list' | 'record' | 'form'

export interface Admin extends App {
  readonly kind: 'admin'
  readonly views: readonly AdminView[]
}
