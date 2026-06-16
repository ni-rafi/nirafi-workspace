---
name: commit-message
description: Generates Conventional Commit messages following project rules. Use when creating git commits or preparing commit messages.
---

# Commit Message

Generates Conventional Commit messages.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Rules

- Header max 72 characters
- Imperative mood ("add" not "added")
- No period at end
- Lowercase type/scope
- **DO NOT use full file paths or absolute paths in the body.** Use only the filename or a relative path if necessary.
- **DO NOT generate Markdown links for files.** Use plain text.
- **DO NOT mention the files directly on the commit message. This will insert full path of the file which is wrong.**
- **The commit message MUST be written inside a markdown code block.**

## Types

| Type | Use For |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting (no logic change) |
| `refactor` | Restructuring |
| `perf` | Performance |
| `test` | Tests |
| `chore` | Dependencies, configs |

## Scopes

**Backend**: auth, api, db, security, monitoring, config

**Frontend**: ui, auth, routing, state, api, security, theme

**Shared**: deps, ci, docker, docs, tests

## Examples

```
feat(api): add user profile endpoint

- Implement GET /api/users/{id}/profile
- Add profile validation schema
- Include avatar URL in response

Closes #234
```

```
fix(ui): resolve calendar date picker overflow

Edge case where December dates extended beyond container.
```

```
refactor(state): migrate userStore to Zustand

No functional changes, improves maintainability.
```

## Don'ts

- ❌ "fixed bug" (vague)
- ❌ "Added feature" (past tense)
- ❌ "WIP" (uncommitted work)
- ❌ Commit secrets
- ❌ `[File.ts](path/to/File.ts)` (no links or absolute paths)
