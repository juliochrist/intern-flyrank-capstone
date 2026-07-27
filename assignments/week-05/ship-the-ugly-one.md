# Ship the Ugly One

**Name:** Julio Christianto
**Week:** 05
**Date:** July 2026

---

## Live URL

**https://flyrank-capstone.vercel.app**

---

## Pages Live

| Page | Route | Status |
|---|---|---|
| Home | `/` | Live — hero, feature cards, featured projects, about preview, contact CTA |
| About | `/about` | Live — bio, experience, stack & approach cards, learning journey |
| Projects | `/projects` | Live — 7 project cards ordered by impact, tech tags, live badges |
| Contact | `/contact` | Live — email, LinkedIn, GitHub links |
| Health | `/health` | Live — server component fetching JSONPlaceholder |
| Settings | `/settings` | Live — React Hook Form profile + password change |
| Chat | `/chat` | Live — streaming AI chat with Claude |
| Playground | `/playground` | Live — WAI-ARIA Modal, Tabs, Disclosure |
| Assignments | `/assignments` | Live — expandable week-by-week documentation |
| 404 | (implicit) | Live — Next.js default 404 |

---

## Content on Each Page

### Home (`/`)

- **Hero:** One-liner claim, animated heading with gradient text, CTA buttons ("View My Projects", "See My Work")
- **Feature Cards:** Three glass cards — Modern Stack, AI-Integrated, Production Ready
- **Featured Projects:** AI Career Navigator, SmartPOS AI, TradeIntel — each with description, tech tags, and external link
- **About Preview:** Two-sentence bio with "See My Work" CTA
- **Contact CTA:** "Let's Build Together" section with Contact Me and View Projects buttons

### About (`/about`)

- **Bio:** Full professional narrative — FlyRank intern, AI collaboration workflow, practical focus
- **Experience:** FlyRank Frontend AI Engineering Intern role (2026) with description
- **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, React Hook Form
- **Approach:** Server-first, accessible UI, responsive design, AI-assisted workflow, Vercel CD
- **Learning Journey:** Current goals and progress with link to projects

### Projects (`/projects`)

Projects ordered strongest first per through-line content map:

1. AI Career Navigator — Next.js 15, React 19, TypeScript, OpenAI API
2. SmartPOS AI — React 19, TypeScript, Supabase
3. Client Pulse — Next.js 15, React 19, TypeScript
4. TradeIntel — React 19, TypeScript, Supabase, Chart.js
5. Life OS — React, TypeScript
6. FE Playground — Next.js, TypeScript
7. FlyRank Capstone — Next.js 15, React 19, TypeScript, Tailwind CSS v4

Each card has a "Live" badge, tech tags, and an external link.

### Contact (`/contact`)

- Email: julio.christianto@10x.ai (mailto link fixed)
- LinkedIn: linkedin.com/in/juliochrist (new)
- GitHub: github.com/juliochrist/intern-flyrank-capstone (URL corrected)

### Health (`/health`)

- Server component with `cache: "no-store"` fetch from JSONPlaceholder
- Displays todo title, completed status, ISO fetch timestamp
- Error handling via try/catch
- Technical details card

---

## Real Person Review

**Reviewer:** Peer (fellow FlyRank intern)

### What confused them

- The navbar has 9 links which feels crowded on first visit — the distinction between "Playground" and "Chat" isn't immediately clear from labels alone.
- The Health page's purpose as a "server component demo" isn't obvious without reading the through-line documentation.
- The Settings page seems like app infrastructure, not portfolio content — unclear why it's in a portfolio nav.

### What landed well

- The glass card design and animated hero immediately communicated "modern frontend" without reading a word.
- The project cards with tech tags and live badges made it easy to scan what technologies I work with.
- Featured projects on the home page gave instant credibility — no need to dig through navigation.

### Still Ugly

- [ ] Navbar has too many links — consider collapsing Settings, Health, Playground into a secondary menu or footer
- [ ] No favicon — browser tab shows the default Next.js icon
- [ ] No SEO metadata beyond basic title/description per page (no Open Graph, no structured data)
- [ ] No project screenshots — cards show text only, no visual preview of the projects
- [ ] Health page purpose is unclear without context — needs a subtitle or tagline explaining "why this page exists"
- [ ] Contact form is missing — currently just link cards, no inline form for direct messages
- [ ] Button component still uses `btn-primary`/`btn-secondary` class references that aren't defined in CSS (though fallback styles work)
- [ ] Lighthouse and performance audit not yet run
- [ ] Mobile responsive check not yet completed at all breakpoints (375px, 768px, 1280px)
- [ ] No case study pages exist — full deep-dive pages per project were in the original sitemap but not implemented

---

## Deployment Notes

Deployment is configured via Vercel with automatic builds from the `main` branch. No configuration changes were needed for this week — the app was already deployable.

### Pre-deployment checks

- [x] `npm run build` succeeds
- [x] All routes render without errors
- [x] Navigation links match actual routes
- [x] No broken internal or external links
- [x] Contact information is correct (email, GitHub, LinkedIn)

---

## Reflection

This week was about shipping with real content instead of waiting for perfection. The content prepared in weeks 1–4 (sitemap, case studies, identity kit, through-line, image curation) was essential — without those assets, I would have been writing placeholder text. The pages are now populated with real project descriptions, a proper bio, and CTAs that lead somewhere.

The "ugly" list is honest: the navbar is too long, there are no screenshots, and the site lacks SEO polish. But the foundation is solid — every page from the sitemap is reachable, the content is real, and the deployment pipeline works. The next iteration can focus on polish.
