# 📝 Commit Message Rules

## Format (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Header rules:**
- Max 72 characters
- Lowercase type/scope
- Imperative mood ("add" not "added")
- No period at end
- Scope optional but recommended

**Body (optional):**
- Blank line after header
- Wrap at 72 chars
- Explain **what** and **why**
- Use bullet points
- Reference issues

**Footer (optional):**
- Breaking changes: `BREAKING CHANGE: description`
- Issue refs: `Closes #123`, `Fixes #456`

---

## Commit Types

### Primary Types (Use These)

| Type | Description | When to Use |
|------|-------------|-------------|
| `feat` | New feature | Adding new functionality |
| `fix` | Bug fix | Fixing a bug or error |
| `docs` | Documentation | README, comments, JSDoc, docstrings |
| `style` | Code style | Formatting, semicolons, whitespace (no logic change) |
| `refactor` | Code refactoring | Restructuring without changing behavior |
| `perf` | Performance | Improving performance |
| `test` | Tests | Adding or updating tests |
| `chore` | Maintenance | Dependencies, configs, build scripts |

### Secondary Types (Use Sparingly)

| Type | Description | When to Use |
|------|-------------|-------------|
| `build` | Build system | Webpack, Vite, Docker configs |
| `ci` | CI/CD | GitHub Actions, pipeline configs |
| `revert` | Revert commit | Reverting a previous commit |

---

## Scopes

Use these standard scopes to indicate which part of the codebase is affected:

### Backend Scopes
- `auth` - Authentication and authorization
- `api` - API routes and endpoints
- `db` - Database, migrations, models
- `security` - Security features (CSP, CORS, rate limiting)
- `monitoring` - Logging, tracing, metrics
- `cache` - Caching logic
- `validation` - Input validation
- `config` - Configuration and settings

### Frontend Scopes
- `ui` - UI components
- `auth` - Authentication and session
- `routing` - React Router, navigation
- `state` - State management (Zustand, React Query)
- `api` - API client, services
- `security` - XSS protection, sanitization
- `bootstrap` - App initialization
- `logging` - Logging and monitoring
- `theme` - Theming and styling

### Shared Scopes
- `deps` - Dependencies
- `ci` - CI/CD pipeline
- `docker` - Docker and compose
- `docs` - Documentation
- `tests` - Testing infrastructure

---

## Examples

```
feat(auth): implement SuperTokens session management

Add SuperTokens integration with httpOnly cookies.
- Configure client in bootstrap
- Add session validation middleware
- Implement RBAC and multi-tab sync

Closes #234
```

```
fix(api): resolve race condition in user creation

- Add database unique constraint on email
- Implement idempotency key checking
- Add proper error handling

Fixes #567
```

```
refactor(ui): extract UserCard component

Extract logic into reusable component.
No functional changes, improves maintainability.
```

```
perf(api): optimize database queries with eager loading

- Add selectinload for user roles
- Implement joinedload for profile
- Add indexes on foreign keys

Reduces response time from 450ms to 80ms.
```

```
feat(api): migrate to Pydantic v2

BREAKING CHANGE: Update all models to Pydantic v2 API

- Replace Config with ConfigDict
- Update validators to @field_validator
- Migrate from_orm to model_validate

Migration guide: docs/PYDANTIC_V2_MIGRATION.md
Closes #1001
```

---

## Rules and Best Practices

### DO ✅

1. **Use imperative mood**: "add feature" not "added feature"
2. **Be specific**: "fix login validation" not "fix bug"
3. **Reference issues**: Include issue numbers when applicable
4. **Explain why**: Not just what changed, but why
5. **Keep header short**: Under 72 characters
6. **Use body for details**: Explain complex changes
7. **One logical change**: One commit = one logical change
8. **Test before commit**: Ensure code works and tests pass

### DON'T ❌

1. **Don't use vague messages**: "fix stuff", "update code", "wip"
2. **Don't mix unrelated changes**: Keep commits focused
3. **Don't commit broken code**: Always test first
4. **Don't use past tense**: "added" ❌ use "add" ✅
5. **Don't skip the type**: Every commit needs a type
6. **Don't write novels**: Keep it concise but informative
7. **Don't commit secrets**: Check for API keys, passwords
8. **Don't use generic scopes**: Be specific about the area

---

## Git Template

Save as `.gitmessage`:
```
# <type>(<scope>): <subject> (max 72 chars)

# Why this change? (wrap at 72 chars)

# Closes #23, Fixes #45

# Types: feat, fix, docs, style, refactor, perf, test, chore
# Use imperative mood, no period at end
```

Configure: `git config commit.template .gitmessage`

---

## Checklist

- [ ] Header < 72 chars
- [ ] Valid type (feat/fix/docs/etc)
- [ ] Relevant scope (auth/api/ui/etc)
- [ ] Imperative mood
- [ ] Body explains why (if complex)
- [ ] Issue refs in footer
- [ ] No secrets

---

## Enforcement

**Commitlint** (`commitlint.config.js`):
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'build', 'ci', 'revert']],
    'scope-enum': [2, 'always', ['auth', 'api', 'db', 'ui', 'routing', 'state', 'security', 'monitoring', 'cache', 'deps', 'ci', 'docker', 'docs', 'tests', 'config', 'bootstrap']],
    'header-max-length': [2, 'always', 72]
  }
};
```

**Husky** (`.husky/commit-msg`):
```bash
#!/bin/sh
npx --no -- commitlint --edit "$1"
```

---

## Quick Reference

**Good:** `feat(auth): add password reset`, `fix(api): resolve CORS issue`, `perf(db): add indexes`

**Bad:** `fixed bug` ❌ (no type), `Added feature` ❌ (past tense), `WIP` ❌ (vague), `update` ❌ (no type/scope)

**Answer these:**
1. What changed? (subject)
2. Why? (body)
3. Impact? (body/footer)
