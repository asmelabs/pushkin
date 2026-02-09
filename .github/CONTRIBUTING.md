# Contributing to Pushkin

Thanks for your interest in contributing to Pushkin! Here's how to get started.

## Setup

1. Fork and clone the repo:

```bash
git clone https://github.com/asmelabs/pushkin.git
cd pushkin
```

2. Install dependencies:

```bash
bun install
```

3. Make sure everything works:

```bash
bun run build
bun test
```

## Development Workflow

1. Create a branch from `main`:

```bash
git checkout -b feat/my-feature
```

2. Make your changes.

3. Commit using [conventional commits](https://www.conventionalcommits.org/):

```
feat: add string interpolation
fix: resolve parser error on empty blocks
docs: update README with loop examples
refactor: simplify lexer token matching
```

Common prefixes: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

4. Add a changeset if your change affects the published package:

```bash
bunx changeset
```

Not every PR needs a changeset. Skip it for documentation, CI, or internal refactors that don't affect the language behavior.

5. Push and open a PR against `main`.

## Project Structure

```
src/
├── index.ts              # Entry point
├── lexer/
│   ├── tokens.ts         # Token types and keywords
│   ├── lexer.ts          # Tokenizer
│   └── index.ts
├── parser/
│   ├── ast.ts            # AST node types
│   ├── parser.ts         # Recursive descent parser
│   └── index.ts
└── interpreter/
    ├── interpreter.ts    # Tree-walking interpreter
    └── index.ts
```

## Code Style

This project uses [Biome](https://biomejs.dev/) for formatting and linting. It runs automatically on commit via lint-staged, but you can run it manually:

```bash
bunx biome check --write .
```

If you use VS Code or Cursor, install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) — the repo includes workspace settings that configure it as the default formatter.

## Adding a Language Feature

If you're adding a new language feature, here's the general flow:

1. **Lexer** — Add any new token types to `tokens.ts` and handle them in `lexer.ts`.
2. **Parser** — Add new AST node types to `ast.ts` and parsing logic to `parser.ts`.
3. **Interpreter** — Handle the new AST nodes in `interpreter.ts`.
4. **Tests** — Add tests covering the new feature.

## Reporting Issues

Open an issue on GitHub. Include:

- What you expected to happen
- What actually happened
- A minimal `.push` code example that reproduces the problem
- Your environment (OS, Bun version)

## Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.
