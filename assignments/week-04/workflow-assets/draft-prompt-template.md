# Draft Prompt Template

Use this for Step 1 (Draft) of the Draft → Critique → Revise pipeline.

```
You are a senior frontend engineer at a SaaS startup.

Build {what to build — component, page, or feature}.

This project uses:
- React 19 + TypeScript + {Vite / Next.js 15}
- Tailwind CSS v4
- React Hook Form for all form state
- {folder structure: e.g., pages/ for layout, components/ for feature logic, components/ui/ for primitives, lib/ for validation, types/ for types}

Create these files:
- {file path 1} — {description}
- {file path 2} — {description}
- {file path 3} — {description}

Follow these steps in order:
1. {Step 1 — e.g., Define types}
2. {Step 2 — e.g., Create validation rules}
3. {Step 3 — e.g., Build UI primitives}
4. {Step 4 — e.g., Wire form logic}
5. {Step 5 — e.g., Assemble page layout}

Quality requirements:
- Zero TypeScript errors (strict mode)
- Every input has id + matching label htmlFor
- aria-invalid and aria-describedby wired to errors and hints
- role="alert" on error messages, aria-live="polite" on success messages
- React Hook Form mode: onBlur (not onSubmit)
- Cross-field validation uses getValues (not watch)
- Async submit with simulated delay
- Button disabled while isSubmitting, shows "Saving…"
- Edge cases: {list specific edge cases relevant to this feature}
```

## Placeholder Reference

| Placeholder | Example |
|-------------|---------|
| `{what to build}` | a settings page with name, email, and password fields |
| `{Vite / Next.js 15}` | Next.js 15 (App Router) |
| `{folder structure}` | app/ for routes, components/ for shared, src/ for client components |
| `{file path 1}` | src/types/settings.ts |
| `{Step 1}` | Define SettingsFormValues type |
| `{edge cases}` | empty submit, invalid email, short password, double-click |

## Source

Derived from the Prompt Ladder V5 and Prompting Fundamentals V5 exercises.
See `assignments/week-02/prompt-ladder.md` and `assignments/week-02/prompting-fundamentals-v2.md`.
