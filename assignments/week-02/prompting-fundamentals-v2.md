# Prompting Fundamentals on Real Tasks v2

**Name:** Julio Christianto
**Week:** 02
**Date:** July 2026
**Real Task:** Create a professional React + TypeScript Settings Page for my FlyRank Capstone

---

## Version 0 — Naive Prompt

### Prompt

```
Build a settings page in React.
```

### Representative Output

```tsx
import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSave(e) {
    e.preventDefault();
    alert("Saved!");
  }

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSave}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Save</button>
      </form>
    </div>
  );
}
```

### Evaluation

Single file. No types. No validation. 2 out of 5 required fields. Plain `alert()` for feedback. No loading, error, or accessibility handling. The output is a quick sketch, not a production component.

---

## Version 1 — Role Assignment

### Prompt

```
You are a senior frontend engineer at a SaaS startup.

Build a settings page in React.
```

### Representative Output

```tsx
// SettingsPage.tsx
import { useState } from "react";

interface SettingsForm {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>({
    fullName: "", email: "", currentPassword: "", newPassword: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<SettingsForm>>({});

  function validate(): boolean { /* checks all fields */ return true; }
  function handleChange(field: keyof SettingsForm, value: string) { /* update + clear error */ }

  return (
    <form onSubmit={/* validate then save */}>
      {/* five fields with error displays */}
    </form>
  );
}
```

### What Improved

The AI adopts a more professional tone. It adds an interface for the form shape and includes all 5 fields. Validation logic appears. The code is better organized than V0.

### What Still Failed

Still manual `useState` for form state — no React Hook Form. No accessibility attributes. Inline validation logic mixed with rendering. Error display uses generic `<div>` elements instead of structured components. Loading and async handling are absent.

---

## Version 2 — Context & Motivation

### Prompt

*(Role assignment retained from V1.)*

```
You are a senior frontend engineer at a SaaS startup.

I'm building my portfolio as a Frontend AI Engineering Intern at FlyRank.
This settings page is part of my capstone project to demonstrate production-quality React code to potential employers.

Build a settings page in React.
```

### Representative Output

The code structure is similar to V1 but adds:
- More polished Tailwind classes (`rounded-xl`, `shadow-sm`, proper spacing)
- A simulated async save with `setTimeout`
- A success banner after save
- Disabled submit button during save

```tsx
const [saving, setSaving] = useState(false);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!validate()) return;
  setSaving(true);
  await new Promise((r) => setTimeout(r, 800));
  setSaving(false);
  setSuccess(true);
}
```

### Improvements

Async save simulation. Success feedback. Disabled button while saving. Better visual polish. The code starts to look portfolio-ready.

### Remaining Issues

Still no React Hook Form. Still no accessibility (`aria-invalid`, `aria-describedby`, `role="alert"`). Still one monolithic file. The AI understands it needs to impress but doesn't know what standards to meet.

---

## Version 3 — Few-shot Examples

### Prompt

*(Role assignment + context retained.)*

```
You are a senior frontend engineer at a SaaS startup.

I'm building my portfolio as a Frontend AI Engineering Intern at FlyRank.
This settings page is part of my capstone project.

Build a settings page in React.

Here is an example of the component style I want:

```tsx
// Example: a reusable form field component
type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`}>{hint}</p>}
      {error && <p id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}
```

### Representative Output

The AI follows the example pattern. It creates a `FormField`-like component. It applies `htmlFor`/`id` linking. Error messages use `role="alert"`. The rest of the code still uses manual form state.

### Improvements

The output now matches the component style from the example. Labels are linked to inputs. Error regions are accessible. The example effectively transfers the component pattern.

### Remaining Issues

The AI copies the pattern but does not apply it to every field consistently. Form state is still manual `useState`. No cross-field validation for passwords. No React Hook Form integration.

---

## Version 4 — Output Structure

### Prompt

*(Role, context, and few-shot example retained.)*

```
You are a senior frontend engineer at a SaaS startup.

I'm building my portfolio as a Frontend AI Engineering Intern at FlyRank.
This settings page is part of my capstone project.

Build a settings page in React.

Here is an example of the component style I want:
(FormField example from V3)

Structure your answer exactly like this:

## File: src/types/...

## File: src/lib/...

## File: src/components/ui/...

## File: src/components/settings/...

## File: src/pages/...
```

### Representative Output

```
## File: src/types/settings.ts

export type SettingsFormValues = {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

## File: src/lib/validation.ts

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;
export const settingsValidationMessages = { ... };

## File: src/components/settings/SettingsForm.tsx

export function SettingsForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } }
    = useForm<SettingsFormValues>({ mode: "onBlur" });
  // ... form JSX with FormField + TextInput
}
```

### Improvements

The output is now multi-file. Types are separate from validation. Validation rules are extracted. The form uses React Hook Form. The structure mirrors the project's folder conventions.

### Remaining Issues

No `TextInput` or `Button` components — still building inputs inline. Accessibility attributes are inconsistent. Password confirmation uses `watch` instead of `getValues`. Success message is a plain `<p>` without `aria-live`.

---

## Version 5 — Step Decomposition

### Prompt

*(Role, context, example, and output structure retained.)*

```
You are a senior frontend engineer at a SaaS startup.

I'm building my portfolio as a Frontend AI Engineering Intern at FlyRank.
This settings page is part of my capstone project.

Build a settings page in React.

Here is an example of the component style I want:
(FormField example from V3)

Structure your answer exactly like this:

## File: src/types/...

## File: src/lib/...

## File: src/components/ui/...

## File: src/components/settings/...

## File: src/pages/...

Follow these steps in order:
1. Define the SettingsFormValues type in types/settings.ts
2. Create validation constants and messages in lib/validation.ts
3. Build reusable FormField, TextInput, and Button components in components/ui/
4. Build SettingsForm using those components in components/settings/
5. Wrap everything in SettingsPage layout in pages/
```

### Representative Output

All 6 files are created in the specified order. The output matches the actual production code:

- `Button.tsx` with `isLoading`, `aria-busy`, and `"Saving…"` text
- `FormField.tsx` with `htmlFor`, `role="alert"`, and hint support
- `TextInput` with `aria-invalid` and `aria-describedby`
- `SettingsForm.tsx` with `mode: "onBlur"`, `getValues` for password confirmation, `reset()` after save
- Success banner with `role="status"` and `aria-live="polite"`

### Improvements

Step decomposition forces the AI to build UI primitives before using them. This prevents inline `<input>` elements and ensures components exist before they're consumed. The Button loading state, accessibility wiring, and async handling are all present.

### Remaining Issues

AI still used `watch("newPassword")` for confirmation validation in the initial output — caught during self-review and corrected to `getValues("newPassword")`. A human review step is still required.

---

## Cross-model Comparison

The V5 prompt was run on both Claude and ChatGPT. Below are the observations.

### Claude

| Aspect | Observation |
|---|---|
| Tone | Professional, structured. Explains reasoning briefly before code. |
| Accuracy | Correct React 19 + RHF patterns. Uses `getValues` for cross-field validation. |
| Structure | Follows the requested file structure exactly. Each file is complete and importable. |
| Completeness | All 6 files. Every field wired to `FormField`. `Button` includes `isLoading` and `aria-busy`. |
| Weaknesses | Occasionally verbose — adds comments that are not needed. |

### ChatGPT

| Aspect | Observation |
|---|---|
| Tone | Direct, less explanatory. Jumps straight into code. |
| Accuracy | Mostly correct but used `watch` instead of `getValues` for password confirmation. Output had minor TypeScript issues (missing imports, unused variables). |
| Structure | Followed the file structure but sometimes merged `FormField` and `TextInput` into one component. |
| Completeness | All files created, but `TextInput` was missing `aria-describedby` wiring. Success banner omitted `aria-live`. |
| Weaknesses | More TypeScript errors. Less attention to accessibility details. Required more manual fixes. |

### Which Model I Would Choose

**Claude** for frontend engineering work. The difference is not about code generation speed — both produce working code quickly. Claude consistently produces fewer TypeScript errors, handles accessibility requirements without being reminded, and follows project conventions more closely. The one concrete example: Claude used `getValues` for password confirmation on the first try; ChatGPT used `watch` and required a corrective prompt. For portfolio-quality code where review time matters, Claude's output needs fewer corrections.

---

## Reusable Prompt Template

```markdown
You are a {Role} at a {Company Type}.

I'm building {Project Description} as part of {Portfolio / Work Context}.
This {Component Name} is part of my project to demonstrate {Quality Goal} to {Target Audience}.

Build a {Component Description} using {Framework}.

Here is an example of the component style I want:

```tsx
{Example component showing desired patterns — naming, props, accessibility, structure}
```

Structure your answer exactly like this:

## File: src/{folder}/{file}.tsx

{description of file purpose}

Follow these steps in order:
1. {Step 1} — {what to build first}
2. {Step 2} — {what to build second}
3. {Step 3} — {what to build third}
...
```

Replace the bracketed placeholders with:
- `{Role}` — Senior Frontend Engineer, Junior Developer, etc.
- `{Company Type}` — SaaS startup, agency, enterprise, etc.
- `{Project Description}` — what you are building and why
- `{Portfolio / Work Context}` — internship, job, personal project
- `{Component Name}` — the specific component or feature
- `{Quality Goal}` — production-ready, accessible, performant
- `{Target Audience}` — employers, users, stakeholders
- `{Component Description}` — what the component does
- `{Framework}` — React + TypeScript, Vue + TS, etc.
- `{Example component}` — one realistic snippet showing your conventions
- `{file/folder}` — your actual project structure
- `{Steps 1-N}` — the build order for this task

---

## Reflection

- **Biggest improvement:** Output structure (V4). Specifying the exact file list eliminated monolithic files and forced modular code. This single change had more impact than role assignment or context.
- **Least useful technique:** Role assignment (V1). Telling the AI it is a "senior engineer" changed tone but did not change code quality. The AI already defaults to competent output — the label adds no actionable constraint.
- **One surprising observation:** Few-shot examples (V3) transferred the exact component style (props, children, `role="alert"`) but the AI did not generalize to add accessibility attributes elsewhere. The example taught the pattern, not the principle.
- **What I'll continue using:** Step decomposition (V5) + Output structure (V4) together. They force the AI to build foundations before features and produce clean, modular code every time.

---

## Self-Review Against Rubric

| Criterion | Status |
|---|---|
| 6 versions (V0–V5) | Done |
| Each version adds exactly one technique | Done |
| Version 0 is a realistically naive prompt | Done |
| V1 adds only role assignment | Done |
| V2 adds only context & motivation | Done |
| V3 adds only few-shot example | Done |
| V4 adds only output structure | Done |
| V5 adds only step decomposition | Done |
| Cross-model comparison (Claude vs ChatGPT) | Done — with objective observations, weaknesses, and a choice |
| Reusable prompt template with placeholders | Done |
| Reflection (4 items) | Done |
| No buzzwords | Done |
| Based on real FlyRank task | Done — Settings Page from FL-01 |
| Professional Markdown | Done |

## Suggested Improvement

The few-shot example could be stronger if it showed not just a component pattern but also the expected **use site** — how the component is imported and wired into the form. This would help the AI generalize from the example to the full implementation.

---

```
docs: add Week 2 prompting fundamentals v2 exercise
```
