# Next Case Study: TradeIntel

**Project:** TradeIntel
**Live demo:** https://tradeintel-v2.vercel.app
**Stack:** React 19, TypeScript, Supabase, Chart.js
**Target date:** 2026-09-30

---

## 3-beat draft

### Problem

Traders drown in scattered market data — prices in one tab, news and sentiment somewhere
else, analysis stitched together by hand. The gap: a single view that turns raw market data
into something a trader can act on fast. TradeIntel started as the answer to "how do I
consolidate real-time data, visualization, and sentiment in one screen?"

### What I did

Built an AI-powered market analysis tool in **React 19 + TypeScript** with a **Supabase**
backend and **Chart.js** for real-time data visualization:

- Real-time market data pulled into a live dashboard view.
- **Sentiment analysis** layer that surfaces market mood alongside price data.
- Chart.js visualizations so trends are visible at a glance instead of buried in numbers.
- Strict TypeScript across the app to keep the data layer (Supabase responses → chart
  inputs) typed end-to-end.

### What came of it

- Deployed live at tradeintel-v2.vercel.app and reachable for a recruiter demo.
- Turned a raw data feed into a decision view: price + sentiment + charts on one screen.
- Proved the full-stack pattern — typed data flow from Supabase through to Chart.js
  rendering — that the FlyRank capstone reuses.
- **Metrics to fill in before publish:** load time, number of symbols/sources tracked,
  any usage or user numbers. Verify these from the deployed app rather than estimating.

---

## Open questions to resolve while drafting the write-up

- What data sources feed the "real-time" view (API, webhook, polling)?
- Where does the sentiment analysis run (client, Supabase edge function, external API)?
- Any numbers I can honestly quote for the result beat?