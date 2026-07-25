# Empty but Live

**Name:** Julio Christianto
**Week:** 04
**Date:** July 2026

---

## Live Project

- **Live URL:** https://flyrank-capstone.vercel.app
- **Repository:** https://github.com/juliochrist/intern-flyrank-capstone
- **Platform:** Vercel

---

## Verification

- [x] Project successfully deployed
- [x] Public URL is reachable
- [x] Opened on a second device (phone)
- [x] Uses the selected stack (Next.js + React + TypeScript)
- [x] HTTPS enabled

The deployment was triggered by pushing to the `main` branch. Vercel automatically detected the Next.js framework, built the project, and provisioned an SSL certificate. The URL is responsive on desktop and mobile without additional configuration.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel (Git integration) |
| AI SDK | Vercel AI SDK (@ai-sdk/react, @ai-sdk/anthropic) |
| Fonts | Inter + JetBrains Mono (next/font) |

---

## Claude Project Preparation

The Claude Project now contains the following reference documents:

- **Identity Kit** — color palette, typography, design principles, and visual language decisions
- **Content Map** — page-by-page section breakdown with CTAs and purpose
- **Case Studies** — four project narratives structured as Problem → Action → Outcome
- **Project Ideas** — backlog of potential portfolio features and improvements
- **Style Guide** — component patterns, accessibility rules, and naming conventions
- **Week 3 documentation** — build decisions from the Next.js migration and settings page

Having these documents prepared speeds up future development because Claude can reference them each session without re-explaining the project's visual language, component conventions, or content strategy. Instead of describing "use the glass card style with the indigo gradient" in every prompt, I reference the Identity Kit. Instead of re-listing page sections, I link the Content Map. This shifts each session from setup to execution — the first message already has full project context.

---

## Reflection

Deploying early reduces project risk because it exposes infrastructure and configuration issues before they become blockers. A misconfigured `next.config.ts`, missing environment variables, or incorrect API routes are trivial to fix on day one but costly to debug after twenty commits of feature work.

A live URL provides faster feedback than local development alone. Team members, stakeholders, or AI assistants can interact with the real application — not a localhost screenshot. Mobile testing becomes practical: pulling the URL on a phone reveals layout quirks, touch targets, and font rendering that a desktop browser's responsive mode cannot fully replicate.

The most important lesson from getting this application online before adding features was about iteration velocity. The deploy-to-preview cycle with Vercel takes seconds per push. Every change lands in a production-like environment immediately. This aligns with modern frontend workflows where continuous deployment is the default and staging environments are ephemeral. Building features on top of a live foundation eliminates the surprise of "it worked on my machine" and keeps the feedback loop tight from the first commit.

---

## Deliverables

### Desktop Screenshot

![Desktop screenshot placeholder](./images/week-04-desktop.png)

### Mobile Screenshot

![Mobile screenshot placeholder](./images/week-04-mobile.png)

### Links

- **Live URL:** https://flyrank-capstone.vercel.app
- **Repository:** https://github.com/juliochrist/intern-flyrank-capstone
