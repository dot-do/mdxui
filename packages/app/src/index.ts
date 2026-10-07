/**
 * @mdxui/app: the headless, unstyled app renderer. Placeholder.
 */

/** An App: a named surface over a set of Nouns. */
export interface App {
  readonly name: string
  readonly nouns: readonly string[]
}

export type AdminView = 'list' | 'record' | 'form'

/** Admin is a kind of App: the CRUD App over its Nouns, with List, Record and Form views. */
export interface Admin extends App {
  readonly kind: 'admin'
  readonly views: readonly AdminView[]
}
