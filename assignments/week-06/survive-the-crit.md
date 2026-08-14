# Week 6: Survive the Crit — AI-Assisted Review of the Live Portfolio

Put the deployed portfolio in front of a tough reviewer, collect honest feedback, classify it as MUST-FIX vs NICE-TO-HAVE, and actually implement the fixes.

## How the critique ran

I asked Claude (via an opencode session) to review the live FlyRank portfolio the way a hiring manager and a senior frontend engineer would — not as a cheerleader, but as someone deciding whether to call me. The review covered every page reachable from the nav (`/`, `/about`, `/projects`, `/playground`, `/chat`, `/contact`), the shared Navbar/Footer, and the metadata that search engines and link-sharers see.

The reviewer was asked to judge four things:

1. **Identity** — does the site make clear who built it and why?
2. **Dead ends** — placeholder pages, "coming soon" text, broken or stale links.
3. **Proof** — is the flagship AI chat feature discoverable, not buried?
4. **Craft** — naming, copy, contrast, and consistency of the visual system.

## Findings: MUST-FIX

All MUST-FIX items were implemented. Each row lists the finding, why it hurt, and the exact fix.

| # | Finding | Why it hurt | Fix implemented | File(s) |
|---|---|---|---|---|
| MF-1 | The whole site was branded **"FlyRank Capstone"** — the person behind the work was invisible. Browser tab, brand mark, and footer all said the project name, not a name. | A hiring manager lands on the site and cannot tell who built it or how to credit the work. | Personal branding everywhere: tab title/description, "JC" monogram + "Julio Christianto" brand in the Navbar, footer copyright, and every page's metadata. | `app/layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/projects/page.tsx` |
| MF-2 | Nav and footer exposed **dead or unfinished pages** — `Settings` and `Health` in the nav, a `Health` footer link. | Empty pages are the fastest way to lose credibility; they imply the site is unfinished. | Removed `Settings` and `Health` from the nav and the `Health` footer link. | `components/Navbar.tsx`, `components/Footer.tsx` |
| MF-3 | Contact page had **placeholder cards** — "CV / Resume — Coming soon" and "Book a Call — Booking link coming soon". | Placeholders on the most conversion-critical page of a portfolio. | Removed both placeholder cards; kept only live channels (Email, LinkedIn, GitHub) and rebuilt the page around a single prominent email CTA. | `app/contact/page.tsx` |
| MF-4 | The email CTA was plain text; the **primary action was not the primary visual element**. | The one action you want visitors to take was easy to scroll past. | Redesigned the contact hero with a gradient "Email me" button and one-sentence call-to-action. | `app/contact/page.tsx` |

## Findings: NICE-TO-HAVE

All NICE-TO-HAVE items were also implemented.

| # | Finding | Fix implemented | File(s) |
|---|---|---|---|
| NH-1 | The flagship AI chat feature was **not discoverable** from the home or projects pages — the strongest proof of the internship lived behind a nav link. | Added a "Try the live AI chat" card on the home page and a full "Case study: an AI chat grounded in its own docs" section (Problem → What I did → Outcome) on the projects page, both linking to `/chat`. | `app/page.tsx`, `app/projects/page.tsx` |
| NH-2 | The hero tagline was generic ("AI-powered web applications built with purpose") and said nothing about who you are. | Hero now leads with the name and a sharper claim: "Frontend engineering, amplified by AI." Intro names Julio Christianto and what he ships. | `app/page.tsx` |
| NH-3 | The About bio read like a template. | Rewrote it first-person under "Who I am" with the internship context and current projects. | `app/about/page.tsx` |
| NH-4 | The footer GitHub link pointed at a **stale repository URL** (`flyrank-capstone` instead of `intern-flyrank-capstone`). | Fixed the URL and added a Contact footer link for a consistent exit path. | `components/Footer.tsx` |
| NH-5 | Contact/Projects copy repeated generic phrases ("Ordered by impact — strongest first", "If you are looking for someone who…"). | Rewrote both intros to be concrete and job-search specific; projects now note each card links to a live deployment. | `app/contact/page.tsx`, `app/projects/page.tsx` |

## What I deliberately did not change

- **Chat internals** (`lib/ai/*`, the streaming/tool lifecycle) were already validated in FE-07/FE-08 and were not part of this critique's scope. This round was about the presentation layer around them.
- **Visual identity** stays Cosmic (indigo/`#7C6AFF` on dark slate) — no reviewer flagged it, so I kept it consistent.
- **Existing week statuses** on the assignments page were untouched; this commit only completes the Week 6 "Survive the Crit" deliverable.

## Verification

- [x] `npx tsc --noEmit` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Nav and footer contain no links to removed pages (`Settings`, `Health`)
- [x] Every visible link on Home, About, Projects, Contact resolves to a live page or external URL
- [x] Metadata titles/descriptions personalized on every page
- [x] Home and Projects both link to the live AI chat (`/chat`)
