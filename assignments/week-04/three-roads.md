# Three Roads

**Name:** Julio Christianto
**Week:** 04
**Date:** July 2026

---

## My Constraints

1. **Free only** — Zero monthly spend. No paid hosting, no paid databases, no paid API tiers.
2. **Honest skill level** — Frontend AI engineering intern. Comfortable with React, TypeScript, Tailwind CSS, and Next.js basics. Still learning backend architecture, databases, and deployment beyond Vercel.
3. **Portfolio needs** — Must show image galleries, embedded demos / live previews, code repository links, and long-form case studies.
4. **Honest about dynamic needs** — If a feature doesn't need a server at this stage, I won't pretend it does.

---

## Three Stack Options

### Option 1: Pure Static Site (Vite + React)

- **How I would build it:** Scaffold with Vite, write pages as React components, keep content in local markdown files or JSON. Use React Router for navigation. No build-time data fetching or SSR.
- **Host:** GitHub Pages or Cloudflare Pages — both free, both handle static assets with global CDN.
- **Backend?** No. Everything compiles to HTML, CSS, and JS at build time.
- **Real trade-off:** No server-side rendering means worse SEO on blog/case study pages. No server components. To change a project description, I edit a file and re-deploy — no CMS, no database, but no overhead either. Also doesn't showcase that I can work with a modern meta-framework.
- **Shows my work:** Passably. Galleries and links work fine. But a hiring manager seeing a plain Vite SPA won't know I can handle Next.js, routing, or server-side patterns — which most production frontend roles expect.

### Option 2: Next.js Static Generation (Current Approach)

- **How I would build it:** Already built — Next.js 15 with App Router, Server Components by default, all pages statically rendered at build time. Content in `app/` pages and markdown. Contact form handled by a third-party service (e.g., Formspree or EmailJS) — no self-hosted API route needed.
- **Host:** Vercel (Hobby tier — free, includes HTTPS, CDN, automatic deploys from GitHub).
- **Backend?** No. The portfolio itself doesn't persist data. Projects, case studies, and images are static. The contact form delegates to an external service.
- **Real trade-off:** More framework than a static site needs, but it's the expected stack for modern frontend work. `next build` produces static HTML that Vercel serves like a CDN — there's no runtime server cost. The overhead is learning Next.js conventions (file-based routes, layouts, server/client boundaries), which I've already done in Week 3.
- **Shows my work:** Well. Demonstrates Next.js + App Router, TypeScript strict mode, Tailwind v4, responsive design, and deployment CI — exactly what a frontend role asks for.

### Option 3: Full Next.js + Backend Integration

- **How I would build it:** Next.js API routes for a contact form (sends email on submit), Supabase (free tier) for storing blog posts or project data, authentication if needed. Content editable via a simple CMS or direct database writes.
- **Host:** Vercel (free) + Supabase (free tier — 500 MB database, 2 GB bandwidth).
- **Backend?** Yes. API routes handle form submissions. Supabase stores dynamic content. Auth provider if adding private sections.
- **Real trade-off:** Genuine maintenance burden. Supabase schema migrations, API route error handling, rate limiting, environment variable management, potential cold starts on serverless functions. For a portfolio that shows 4–6 projects and a few case studies, this is over-engineered. I would spend more time wiring backend infrastructure than on the work samples themselves.
- **Shows my work:** Impressively — proves full-stack capability. But if the backend features aren't actually necessary, the complexity signals poor judgment, not skill.

---

## Pressure Test

Front-runner: **Option 2 — Next.js Static Generation (Current Approach)**

### What breaks if I pick the simplest?

If I switch to a plain Vite SPA (Option 1), nothing functionally breaks — galleries, links, and case studies all render fine. But I lose the opportunity to show proficiency with Next.js, which is the framework most frontend teams use. The portfolio would under-represent my actual skill set. SEO on long-form case studies also suffers because search engines see an empty HTML shell before JavaScript hydrates.

### What do I maintain if I pick the most powerful?

With Option 3, I maintain:
- A Supabase database schema (tables, indexes, row-level security policies)
- API route error handling and validation
- Environment variable hygiene across local and production
- Potential cold-start delays on serverless functions
- A local development setup that requires running Supabase locally or mocking it

None of this serves the portfolio's primary goal: showing my work. A contact form does not need a database. Case studies do not need a CMS — markdown files version-controlled in git are more appropriate for a developer portfolio.

### Can I finish in two weeks?

Yes. The Next.js site is already deployed (see [`empty-but-live.md`](./empty-but-live.md)). Adding image galleries, project detail pages, case study content, and embedded live previews is frontend work I'm comfortable with — React components, Tailwind styling, and static data. No backend blocking dependencies.

### Does it show my work the way it needs to be shown?

Yes. The portfolio needs to display images, link to live demos and GitHub repos, and present long-form case studies. Next.js with static generation handles all of these well. Image galleries are `<img>` tags in a grid. Live previews are external links or iframes. Code links are anchor tags. Case studies are markdown-rendered pages or individual route segments. Every requirement is a frontend concern, and the chosen stack handles frontend well.

---

## Final Decision

**Chosen stack: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4, statically generated, hosted on Vercel (Hobby tier).**

**I did not choose** the plain Vite SPA (Option 1) because it would under-sell my actual framework experience — I know Next.js, so my portfolio should show it. I did not choose the full-stack version (Option 3) because the portfolio has no genuine need for a backend, and adding one would increase maintenance time without improving how my work is presented.

The two projects that *do* need backends (TradeIntel, SmartPOS AI) have their own repositories and deployments — they can each use Supabase or whatever backend they need independently. The portfolio's job is to describe and link to those projects, not to re-implement their backends.

**Can I maintain this?** Yes. Static Next.js on Vercel requires near-zero maintenance. No database migrations, no API route failures, no environment variable drift. I push to `main`, Vercel rebuilds, and the site updates.

**Does it show my work well?** Yes. The portfolio is a presentation layer for projects that live elsewhere. Case studies and galleries are content problems, solved with React components and markdown — exactly where my skills are strongest.

---

## Reflection

- Deciding what *not* to build was harder than deciding what to build. The full-stack option felt more impressive until I realised it solves a problem I don't have.
- My portfolio needs a backend about as much as a resume needs a database — the content is authored once and presented many times. Static is the right default.
- I already had the front-runner stack deployed (Week 4 kicked off with [`empty-but-live.md`](./empty-but-live.md)). This exercise confirmed I was on the right path rather than discovering a new one.
- The honest answer to "does this need to be dynamic?" is liberating. I don't have to invent complexity to sound sophisticated — I can just say "no" and move on.
- Separating the portfolio (static presentation) from the projects (which may need backends) keeps each system simple. One stack decision does not need to cover every project's requirements.
