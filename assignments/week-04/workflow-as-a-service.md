# Workflow as a Service

**Name:** Julio Christianto
**Week:** 04
**Date:** July 2026

---

## Pipeline Chosen

**Pipeline:** Draft → Critique → Revise (the Settings Page pattern)

**Why:** This is the most-documented and most-used AI workflow in this repository. It was applied across 6 prompt versions in the Prompt Ladder (V0–V5), the Prompting Fundamentals exercise, and the Round 1 vs Round 2 comparison in WORKFLOW.md. It is not a toy — it produced the actual production SettingsForm component now deployed on the capstone site.

The other candidate ("source-grounded study notes") fits my React learning habit, but Draft → Critique → Revise is more general and has more real runs to draw from in this repo. I use this pipeline for writing code, documentation, case studies, and commit messages — it is the single most leveraged pattern in my AI workflow.

---

## Why This Workflow Matters

Chaining steps produces better output than one-shot prompting for two reasons:

1. **Each step adds a different kind of constraint.** The Draft step generates broadly; the Critique step applies quality criteria (accessibility, edge cases, TypeScript strictness); the Revise step narrows the output toward production-ready. One-shot prompts try to do all three at once and typically miss one category.

2. **Human judgment goes between steps, not after the final output.** In a one-shot workflow, I review a single output and either accept or reject. In a chained workflow, I see the draft, decide what criteria matter most, apply the critique, see the revised version, and then do a final review. The intermediate outputs give me more control.

The documented evidence from WORKFLOW.md supports this: Round 2 (detailed, structured prompting with implicit critique) required ~15 min review vs ~30 min for the vague one-shot Round 1 — despite producing 316 more lines of code.

---

## Step Diagram

```
Input (task + constraints)
  │
  ▼
┌─────────────────────────────────────────────────────┐
│ 1. DRAFT                                           │
│    Write structured prompt with:                   │
│    - role + goal + tech stack                      │
│    - exact file list (output structure)            │
│    - build order (step decomposition)              │
│    Generate initial output from AI                 │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 2. CRITIQUE                                        │
│    Run AI self-review with quality criteria:        │
│    - TypeScript strict mode errors?                 │
│    - Accessibility attributes present?              │
│    - All edge cases handled?                        │
│    - API usage correct? (e.g. getValues vs watch)   │
│    Flag issues for revision                         │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 3. REVISE                                          │
│    Feed critique back to AI:                        │
│    - "Fix issue #1: replace X with Y"               │
│    - "Add missing Z"                                │
│    - "Regenerate file W with corrections"           │
│    Produce corrected output                         │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│ 4. REVIEW (Human)                                  │
│    Manual checks:                                   │
│    - Open in browser / run the code                 │
│    - Tab through interactive elements               │
│    - Test edge cases manually                       │
│    - Verify business logic                          │
│    Accept or loop back to Critique                  │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
              Final Output
```

---

## Tools Used

| Tool | Step | Why |
|------|------|-----|
| **Claude** | Draft, Critique, Revise | Better at frontend code, accessibility patterns, and following output structure. Used `getValues` correctly on first try. |
| **ChatGPT** | Draft (occasional) | Used for comparison runs (Prompting Fundamentals V5). Less consistent on TypeScript and accessibility. |
| **Claude Project** | All steps | Stores identity kit, content map, case studies, and project instructions so I don't re-describe context every session. |

I do not use NotebookLM or custom GPTs for this pipeline. Claude Project with saved reference documents is sufficient.

---

## Prompts / Configuration

### Draft Prompt Template

```
You are a senior frontend engineer at a SaaS startup.

Build {what to build}.

This project uses:
- React 19 + TypeScript + {Vite / Next.js}
- Tailwind CSS v4
- React Hook Form for all form state
- {folder structure conventions}

Create these files:
- {file path 1} — {description}
- {file path 2} — {description}
- {file path 3} — {description}

Follow these steps in order:
1. {Step 1}
2. {Step 2}
3. {Step 3}

Quality requirements:
- Zero TypeScript errors (strict mode)
- Every input has id + matching label htmlFor
- aria-invalid and aria-describedby wired to errors and hints
- role="alert" on error messages, aria-live="polite" on success messages
- {framework-specific requirements}
- {edge cases to handle}
```

### Critique Prompt

```
Review the code below against these criteria:
{list of quality criteria the draft was given}

Specifically check:
- Are all file paths and imports correct?
- Are there any TypeScript errors?
- Is every accessibility attribute wired correctly (aria-invalid, aria-describedby, role, aria-live)?
- Are all edge cases handled?
- Is the API usage correct? (e.g., getValues not watch for cross-field RHF validation)

List each issue found with:
- File name
- Line or area
- What is wrong
- How to fix
```

### Revise Prompt

```
Apply these fixes to the original output:

{list of issues from Critique}

Update the affected files and return the corrected versions.
Keep all existing code that does not need to change.
```

---

## Five Real Runs

### Run 1 — SettingsForm Component

**Input topic:** Build a settings page with full name, email, and password change fields using React Hook Form.

**Output summary:** 6 files (types, validation, FormField, Button, SettingsForm, SettingsPage) with full React Hook Form integration, onBlur validation mode, cross-field password confirmation using `getValues`, async submit with loading state, and accessibility attributes on every input.

**What worked:** Generated all files in correct structure. Accessibility attributes were present. Validation rules extracted to a shared module. Button component included `isLoading` and `aria-busy`.

**What broke:** AI used `watch("newPassword")` for confirmation validation instead of `getValues("newPassword")`. Caught during Critique step. Also, initial success message lacked `aria-live="polite"`.

**Human still had to check:** Cross-field validation API usage. Success message `aria-live` attribute. Responsive layout at 375px breakpoint. That password fields clear after save while profile fields persist.

**Documented in:** `assignments/week-02/prompt-ladder.md` (V5), `assignments/week-02/prompting-fundamentals-v2.md` (V5)

---

### Run 2 — FormField / TextInput / Button UI Primitives

**Input topic:** Build reusable form field components with label, error, and hint support, plus a submit button with loading state.

**Output summary:** `FormField.tsx` (wrapper with `htmlFor`, `role="alert"`, hint/error sections), `TextInput` (with `aria-invalid` and `aria-describedby` wiring), `Button.tsx` (with `isLoading`, `variant`, `aria-busy`).

**What worked:** Component structure was clean. `aria-describedby` IDs were generated dynamically using `${id}-hint` and `${id}-error` conventions. Button disabled state was wired to `isSubmitting`.

**What broke:** AI generated `aria-describedby` that referenced error IDs the fieldset pattern didn't support. The `Button` variant prop was not typed as a union — it used `any`. `aria-busy` was added on the `<button>` but not removed when loading finished.

**Human still had to check:** `aria-describedby` target IDs exist in the DOM. Button `variant` prop is properly typed (`"primary" | "secondary" | "ghost"`). `aria-busy` toggling matches loading state cycle.

**Documented in:** `assignments/week-03/ai-react-development/ai-assistance.md`

---

### Run 3 — Validation Rules Module

**Input topic:** Create a shared validation module with email regex, password length constant, and typed error messages for the settings form.

**Output summary:** `src/lib/validation.ts` with `EMAIL_PATTERN` regex, `MIN_PASSWORD_LENGTH = 8`, and `settingsValidationMessages` object with `required`, `email`, `minPassword`, `passwordMismatch` keys.

**What worked:** Regex was correct (rejected `"test@"` and `"a@b"` while accepting proper emails). Constants were exported. Error messages were human-readable without being verbose.

**What broke:** AI included an unused `validatePassword` helper function. The regex was slightly stricter than needed — rejected valid plus-addressed emails (`user+tag@domain.com`). Not a problem for this project, but would fail if email formats needed to support plus-addressing.

**Human still had to check:** The regex matches the project's email requirements (not blocking valid addresses). All error message strings are correct. No unused exports remain.

**Documented in:** `assignments/week-02/prompt-ladder.md` (V5), source at `src/lib/validation.ts`

---

### Run 4 — README Documentation Draft

**Input topic:** Draft a README for the FlyRank Capstone repository covering what the project is, how to run it, and the tech stack.

**Output summary:** A README with project description, setup instructions (clone, install, run), architecture notes, and links to assignments.

**What worked:** Structure was good — sections in logical order. Commands were correct (`npm install`, `npm run dev`). Links to Vercel deployment and GitHub were included.

**What broke:** AI described the project as "a full-stack application with API routes" — incorrect, the portfolio is static Next.js with no API routes. AI assumed Supabase was integrated (it is planned but not set up). Version numbers were guesses (React 18 instead of 19). Setup instructions missed the Next.js specific config (`.env.example`).

**Human still had to check:** All factual claims about the project (what it does, what it uses, what it doesn't use). Version numbers against `package.json`. Setup steps match the actual workflow. No features claimed that don't exist yet.

**Documented in:** Workflow audit (README generation listed as "Fully Automate" with review), corrected version at `README.md`

---

### Run 5 — Git Commit Message Generation

**Input topic:** Generate a conventional commit message for a batch of changes: adding a settings form, validation module, and UI components.

**Output summary:** `feat(settings): add settings page with form validation and accessible UI components`

**What worked:** Correct conventional commit format (`type(scope): description`). Accurate scope based on the diff. Description was concise and informative. Body listed the key changes in bullet points.

**What broke:** AI sometimes chose the wrong type (`feat` vs `fix` vs `docs`). For documentation-only changes, AI occasionally used `feat` instead of `docs`. The scope was sometimes too broad (`feat(core)` instead of `feat(settings)`). AI sometimes included co-author trailers that were not appropriate.

**Human still had to check:** Type matches the actual change. Scope matches the most specific affected area. Description accurately reflects what changed. No fabricated trailers or metadata.

**Documented in:** Workflow audit (Git commit messages listed as "Fully Automate" with review)

---

## Time Comparison

Times are based on documented work from the Prompt Ladder and Prompting Fundamentals exercises.

| Task | Manual (no AI) | Workflow (Draft→Critique→Revise) | Setup (one-time) | Time Saved per Run |
|------|---------------|----------------------------------|------------------|-------------------|
| SettingsForm (6 files) | 90 min | 30 min (10 draft + 10 critique + 10 revise) | 20 min template | 60 min |
| UI Primitives (3 components) | 60 min | 20 min (8 + 6 + 6) | — | 40 min |
| Validation module | 30 min | 8 min (3 + 3 + 2) | — | 22 min |
| README draft | 45 min | 12 min (5 + 4 + 3) | — | 33 min |
| Commit message | 5 min | 1 min | — | 4 min |

**Setup cost:** The Draft Prompt Template took ~20 min to develop across V0–V5 of the Prompt Ladder. This is a one-time investment that applies to every future run.

**Total time saved across 5 runs:** 159 min (2h 39min) against a one-time setup cost of 20 min.

**Honest note:** The workflow time includes only AI interaction. It does not include the human Review step at the end, which still takes 5–15 min per run depending on complexity. The saving is in generation speed, not in eliminating review.

---

## Failure Points

1. **Weak source quality in the prompt.** If the task description is vague or omits key constraints, the Draft output is generic. Every missing detail in the prompt becomes a bug or missing feature in the output. This is the most common failure.

2. **Citation drift in the Critique step.** When AI self-reviews, it sometimes fabricates issues that don't exist ("This line has a missing import" — checking the file, the import is present). The critique must be verified before being applied in the Revise step.

3. **Overlong outputs.** The worst case was an AI draft that produced ~400 lines of SettingsForm when 150 lines would suffice. It duplicated validation logic across client and server boundaries that didn't exist. Long outputs take longer to review, erasing some of the time savings.

4. **Missing edge cases despite being prompted.** Even with explicit edge case requirements, AI sometimes handles the listed cases but misses unlisted ones. For example, the SettingsForm handled empty submit, invalid email, and short passwords — but not the case where the user clears `newPassword` after `confirmPassword` is already filled. The error message on `confirmPassword` becomes stale.

5. **Formatting problems across iterative revisions.** After 2–3 revise cycles, AI may reintroduce issues that were already fixed, or add new code that duplicates existing functions. Each Revise step risks regressing the previous fix.

6. **Model inconsistency.** ChatGPT's critique step caught fewer accessibility issues than Claude's. If I switch models mid-pipeline, the quality of each step varies. Sticking with one model per run is safer.

---

## Human Review Required

| Check | Why AI Cannot Do It |
|-------|-------------------|
| **Factual accuracy** | AI describes what it *thinks* the project does, not what it *actually* does. It guessed "full-stack with API routes" for a static portfolio. |
| **Business logic** | AI does not understand the domain. It cannot verify that validation rules, data transformations, or conditional logic match real requirements. |
| **Tone and voice** | AI documentation and case studies tend toward verbose, buzzword-heavy language. I rewrite or remove at least 30% of AI-generated prose. |
| **API version correctness** | AI guessed React 18 instead of 19. I must verify version numbers, package names, and API signatures against `package.json` and docs. |
| **Edge case completeness** | AI handles the edge cases I listed in the prompt but misses unlisted ones. Only a human familiar with the feature can think of the cases the prompt didn't specify. |
| **Accessibility in practice** | AI adds correct `aria-*` attributes but cannot test with a screen reader. I tab through every element and verify focus order, visible indicators, and announcements. |
| **Responsive layout** | AI generates responsive classes but does not resize the viewport. I test at 375px, 768px, and 1280px. |
| **Commit scope/type accuracy** | AI sometimes chooses wrong conventional commit type. I verify the commit message matches the diff before pushing. |

---

## Final Workflow Summary

The Draft → Critique → Revise pipeline is a three-step AI interaction model followed by a mandatory human review:

1. **Draft:** Write a structured prompt with role, goal, tech stack, exact file list, build order, and quality criteria. Generate the initial output from AI.
2. **Critique:** Run AI self-review against the same quality criteria. List each issue with file, location, problem, and fix. Verify the critique itself — AI sometimes flags false positives.
3. **Revise:** Feed verified issues back to AI for correction. Repeat Critique → Revise as needed until the output meets all criteria.
4. **Review (Human):** Run the code, test edge cases, check accessibility with a screen reader, verify factual accuracy, and confirm the output matches the original goal.

This pipeline consistently produces production-quality code and documentation. The one-time setup cost of writing the prompt template (~20 min) pays for itself after 2–3 runs. The biggest risk is skipping or rushing the human review step — AI-generated output always contains at least one issue that only a human can catch.

---

## Reflection

- **The Critique step is where the value is created, not the Draft.** Anyone can get AI to generate a first pass. The skill is knowing what to check in the critique and which issues to prioritize in the revision. The Prompt Ladder showed that adding quality criteria (V5) improved output more than any other single change.
- **The human review step is not optional, but it is smaller than writing from scratch.** Across 5 runs, human review took 5–15 min per run. Writing the same code manually would take 30–90 min. The savings are real.
- **I caught the `watch` vs `getValues` bug during Critique — this proves the pipeline works.** A one-shot prompt would have shipped the bug. Chaining steps gave me an intermediate checkpoint to catch it before the final output.
- **Setup cost is real but front-loaded.** Writing the template took 20 min across 6 prompt versions. Now I use it for every code generation task. The per-run cost of the pipeline is just the interaction time.
- **The biggest time saver was not code generation — it was the Critique step catching issues before human review.** In WORKFLOW.md, Round 2's review time was half of Round 1's, even though the codebase was 316 lines larger. The Critique step pre-resolved issues that would otherwise surface during human review.
