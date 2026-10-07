# mdxui

The mdxui workspace: the generated contract, the headless renderers, themes and templates.

| Package | Path | What it holds |
| --- | --- | --- |
| `mdxui` | `packages/mdxui` | Types and Zod only, generated from api.sb Component Nouns |
| `@mdxui/site` | `packages/site` | Headless site renderer |
| `@mdxui/app` | `packages/app` | Headless app renderer |
| `@mdxui/admin` | `packages/admin` | The CRUD App over Nouns; Admin extends App |
| `@mdxui/theme-*` | `packages/theme-*` | Themes (placeholder) |
| `@mdxui/template-*` | `packages/template-*` | Templates (placeholder) |

Every package is `private` until the next major is complete; nothing here publishes to npm.

The previous contents of this repository are kept on the [`legacy`](https://github.com/dot-do/mdxui/tree/legacy) branch.

```sh
pnpm install
pnpm typecheck
```
