<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

# Agent Instructions

- Prefer shadcn-style UI primitives and local shadcn wrappers for common interface behavior before writing custom primitives.
- Prefer putting new components, helpers, and reusable logic in new files instead of adding them to existing files, unless the code is directly required to live in the same file.
- Keep changes scoped to the requested behavior and follow the existing app structure, styling tokens, and component conventions.
