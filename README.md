# Pushkin

A simple, interpreted programming language written in TypeScript.

Pushkin is designed to be approachable and easy to learn, with a familiar syntax inspired by modern languages. It runs on the Bun runtime and is built from scratch — lexer, parser, and interpreter — with no external parsing libraries.

## Installation

```bash
# Install globally via npm
npm install -g @asmelabs/pushkin

# Or with bun
bun add -g @asmelabs/pushkin
```

## Quick Start

Create a file called `hello.push`:

```
new greeting = 10;
new world = 20;
new result = greeting + world;
print(result);
```

Run it:

```bash
pushkin hello.push
```

Output:

```
30
```

## Language Guide

### Variable Declaration

Use the `new` keyword to declare variables. All variables are mutable.

```
new x = 10;
new y = 25;
```

### Assignment

Reassign variables by using the variable name without `new`.

```
new x = 10;
x = 50;
print(x);
// 50
```

### Number Operations

Pushkin currently supports addition and subtraction with numbers.

```
new a = 10;
new b = 3;

new sum = a + b;
new diff = a - b;

print(sum);
// 13

print(diff);
// 7
```

Operations can be chained and used inline.

```
new result = 10 + 20 - 5;
print(result);
// 25

print(100 - 50 + 25);
// 75
```

### Print

Use `print()` to output values to the console. You can pass variables or expressions directly.

```
new x = 42;
print(x);
// 42

print(10 + 20);
// 30
```

### Comments

Single-line comments start with `//`.

```
// this is a comment
new x = 10; // inline comment
```

## Error Handling

Pushkin provides clear error messages with line and column numbers.

```
new x = 10;
new x = 20;
// Error: Variable 'x' is already declared
```

```
print(y);
// Error: Variable 'y' is not declared
```

```
new a = 10
// Error: Expected Semicolon but got 'EOF' at line 1, column 11
```

## How It Works

Pushkin processes source code in three stages:

```
Source Code → Lexer → Tokens → Parser → AST → Interpreter → Output
```

**Lexer** takes the raw source string and breaks it into tokens — small units like keywords, numbers, operators, and identifiers.

**Parser** takes the flat list of tokens and builds an Abstract Syntax Tree (AST), a tree structure that represents the program's logic and hierarchy.

**Interpreter** walks the AST and executes each node directly, maintaining a variable environment and producing output.

## Roadmap

Pushkin is in early alpha. Here's what's planned:

- [ ] Strings and string interpolation
- [ ] Boolean type and `null`
- [ ] Multiplication, division, and modulo operators
- [ ] Comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`)
- [ ] Logical operators (`&&`, `||`, `!`)
- [ ] If/else conditionals
- [ ] For loops and for...in loops
- [ ] Functions with `fn` keyword
- [ ] Named function arguments
- [ ] Arrays and objects
- [ ] REPL (interactive mode)
- [ ] CLI for running `.push` files
- [ ] Standard library

## Development

```bash
# Clone the repo
git clone https://github.com/asmelabs/pushkin.git
cd pushkin

# Install dependencies
bun install

# Run the entry point
bun run src/index.ts

# Build
bun run build

# Run tests
bun test
```

### Contributing

Pushkin uses [conventional commits](https://www.conventionalcommits.org/) and [changesets](https://github.com/changesets/changesets) for versioning.

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes and commit: `git commit -m "feat: add my feature"`
3. Add a changeset: `bunx changeset`
4. Push and open a PR

## License

MIT
