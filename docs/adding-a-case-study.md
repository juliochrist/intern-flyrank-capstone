# Adding a New Case Study

Short guide for adding the next project case study to this portfolio. The goal is a
10-minute, single-file edit — not a rebuild.

---

## Where a case study lives

This portfolio is a Next.js 15 App Router app. There is **no** `src/content/projects/`
folder — project data is plain TypeScript arrays that the pages map over. There are two
places a project can appear:

| Place | File | Notes |
|---|---|---|
| **Projects page (full list)** | `app/projects/page.tsx` | The `projects` array at the top of the file. Every entry renders as a card automatically. |
| **Home page (Featured Projects)** | `app/page.tsx` | The `featuredProjects` array. Only the top 2–3 projects should live here. |

**Cheapest setup (recommended, optional one-time refactor):** both arrays are currently
inline in their page files. If you want future additions to be a single-file edit, extract
the `projects` array into `src/content/projects.ts` with a typed `Project` type, then have
`app/projects/page.tsx` import it. After that, adding a case study never touches a page file
again.

---

## The 3-beat format (required for every case study)

Every case study — whether the short card description or the full write-up — must follow
three beats. A case study without all three is a feature list, not a case study.

1. **Problem** — the real situation before the work. What was broken, missing, or slow?
   Name the user and the pain.
2. **What I did** — the build. Stack, architecture, and the decisions that mattered.
   Own your choices.
3. **What came of it** — result and impact, **with numbers/metrics where available**
   (load time, uptime, users, tasks automated). If you don't have a number, say what the
   outcome was functionally rather than inventing a metric.

Card description on the Projects page should be 1–2 sentences that cover the *problem →
outcome* arc. The full 3-beat draft lives in the write-up (see below).

---

## Concrete steps to add a case

1. **Create the write-up** (optional but recommended): copy an existing assignment doc as a
   template — e.g. `assignments/week-06/explain-it-like-you-built-it.md` — into
   `docs/case-studies/<project-slug>.md` and fill in the three beats. Keep the same heading
   structure so the doc style stays consistent.
2. **Add the project to the list** — in `app/projects/page.tsx`, copy the shape of an
   existing entry in the `projects` array and edit it:

   ```ts
   {
     title: "TradeIntel",
     description: "1–2 sentences: problem → outcome.",
     url: "https://tradeintel-v2.vercel.app",
     tech: ["React 19", "TypeScript", "Supabase", "Chart.js"],
     status: "Live",
   }
   ```

   The page renders the card for you — no component work needed. The card is
   `components/Card.tsx`; you never edit it for a new case.
3. **Feature it on Home (only if it's a top-2/3 project)**: add the same entry to
   `featuredProjects` in `app/page.tsx`.
4. **Add the screenshot**: save a real browser capture to `public/projects/<slug>.png`
   (1280px viewport, full-page) and reference it in the write-up. Real screenshots, not
   AI-generated mockups.
5. **Link the write-up** where it's visible — the Projects page case-study section or a
   "Case study" link on the card.

---

## Pre-publish checklist

- [ ] Write-up exists in `docs/case-studies/<slug>.md` and follows the 3-beat format
- [ ] Entry added to the `projects` array in `app/projects/page.tsx`
- [ ] Featured on `app/page.tsx` only if it's a top project
- [ ] Real screenshot added to `public/projects/` and referenced
- [ ] Project link tested (visits the live deployment, returns 200)
- [ ] Added to nav/index if it warrants a dedicated page (most cases: not needed)
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass