# mdxui

The mdxui workspace: the generated contract and the headless, unstyled renderers.

| Package | Path | What it holds |
| --- | --- | --- |
| `mdxui` | `packages/mdxui` | Types and Zod only, generated from api.sb Component Nouns |
| `@mdxui/site` | `packages/site` | Headless, unstyled site renderer (placeholder) |
| `@mdxui/app` | `packages/app` | Headless, unstyled app renderer; Admin extends App (placeholder) |

Styled, branded component sets (templates) and themes are not kept here.

Every package is `private` until the next major is complete; nothing here publishes to npm.

The previous contents of this repository are kept on the [`legacy`](https://github.com/dot-do/mdxui/tree/legacy) branch.

```sh
pnpm install
pnpm typecheck
```
