# Deployment Checklist — Week 5

## Routes

- [x] `/` — Home
- [x] `/about` — About
- [x] `/projects` — Projects
- [x] `/contact` — Contact
- [x] `/health` — Health
- [x] `/settings` — Settings
- [x] `/chat` — Chat
- [x] `/playground` — Playground
- [x] `/assignments` — Assignments
- [x] `/api/chat` — API route (POST)

## Navigation

- [x] All 9 nav links point to existing routes
- [x] Active link highlighting works via `usePathname()`
- [x] Mobile hamburger menu opens/closes correctly
- [x] All routes sit behind shared layout (Navbar + Footer)

## Screenshots

- [ ] Home page — desktop (1280px)
- [ ] Home page — mobile (375px)
- [ ] About page
- [ ] Projects page
- [ ] Contact page
- [ ] Health page (with live data)
- [ ] Mobile menu open state

## Live URL

**https://flyrank-capstone.vercel.app**

## Mobile Check

- [ ] Home hero stacks properly
- [ ] Featured projects become single column
- [ ] About cards stack vertically
- [ ] Navbar hamburger replaces full nav
- [ ] Touch targets are at least 44×44px
- [ ] No horizontal scroll at 375px

## Pre-deploy

- [x] `npm run build` passes
- [x] No TypeScript errors
- [x] `npm run lint` passes (if configured)
- [x] Environment variables set in Vercel dashboard
- [x] GitHub repository pushed to `main`
