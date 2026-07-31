export interface ProjectDocEntry {
  id: string;
  title: string;
  section: string;
  file: string;
  summary: string;
  keyPoints: string[];
}

export const PROJECT_DOCS: ProjectDocEntry[] = [
  {
    id: "identity-kit",
    title: "Identity Kit",
    section: "Week 3",
    file: "assignments/week-03/identity-kit.md",
    summary:
      "The visual identity system for the portfolio and internship projects: Space Grotesk headings, Inter body text, a five-color token palette, the JC monogram, and five design principles.",
    keyPoints: [
      "Colors: Primary #2563EB, Accent #3B82F6, Background #FAFAFA, Text #111827, Border #E5E7EB.",
      "Design principles: simplicity over decoration, readability first, 4px/8px spacing rhythm, accessible contrast, components before custom styling.",
      "Standing instruction: AI-generated UI must follow this kit.",
    ],
  },
  {
    id: "through-line",
    title: "The Through-Line: Map Content & CTAs",
    section: "Week 3",
    file: "assignments/week-03/through-line.md",
    summary:
      "Content and CTA map for the portfolio across Home, About, Projects, Health, and Contact, plus the four ordered projects and the proof still needed.",
    keyPoints: [
      "One-line claim: builds fast, accessible web apps with modern frontend tools and AI-assisted workflows.",
      "Projects ordered strongest first: AI Career Navigator, SmartPOS AI, CRM Dashboard (Client Pulse), TradeIntel.",
      "Every page has a single clear CTA; no dead-end pages.",
    ],
  },
  {
    id: "build-core",
    title: "Build Core — Next.js Migration",
    section: "Week 3",
    file: "assignments/week-03/build-core.md",
    summary:
      "Migration of the FlyRank Capstone from a Vite React SPA to Next.js 15 App Router: routes, deployment, environment variables, and lessons learned.",
    keyPoints: [
      "Routes: /, /about, /projects, /contact (server) plus /settings (client) and /health.",
      "Deploy: push to GitHub, import to Vercel, set NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_API_URL.",
      "Tailwind v4 with Next.js uses @tailwindcss/postcss and the @theme directive.",
    ],
  },
  {
    id: "curate-your-images",
    title: "Curate Your Images",
    section: "Week 3",
    file: "assignments/week-03/curate-your-images.md",
    summary:
      "Image strategy for the portfolio: real browser screenshots as the source of proof, a narrow scope of AI-generated decorative assets, and rejected AI image concepts.",
    keyPoints: [
      "AI is used only for non-representational assets: favicon concepts, abstract hero background, small decorative graphics.",
      "Real screenshots at 375px/768px/1280px prove behavior.",
    ],
  },
  {
    id: "using-ai-effectively-react",
    title: "Using AI Effectively in React Development",
    section: "Week 3",
    file: "assignments/week-03/using-ai-effectively-react.md",
    summary:
      "Workshop writeup on integrating AI into a React workflow: the 8-step AI workflow, weak vs strong prompts, and the manual work that cannot be delegated.",
    keyPoints: [
      "Strong prompts include role, fields, tech stack, folder split, and explicit quality requirements.",
      "Manual-only areas: accessibility testing, performance measurement, responsive testing, business logic, security.",
    ],
  },
  {
    id: "three-roads",
    title: "Three Roads",
    section: "Week 4",
    file: "assignments/week-04/three-roads.md",
    summary:
      "Decision document comparing three portfolio stacks and choosing Next.js 15 static generation on Vercel against the stated constraints.",
    keyPoints: [
      "Vite SPA rejected as under-selling framework experience; full backend rejected as over-engineered.",
      "Final: Next.js 15 + React 19 + TypeScript + Tailwind v4, statically generated on Vercel Hobby tier.",
    ],
  },
  {
    id: "agent-and-mcp",
    title: "Agentic Systems & MCP",
    section: "Week 4",
    file: "assignments/week-04/agent-and-mcp.md",
    summary:
      "Explainer contrasting workflows vs agents, defining MCP, documenting the author's MCP connections, and proposing an Auto-Critique Agent.",
    keyPoints: [
      "The Draft → Critique → Revise pipeline is a workflow, not an agent, because it follows a fixed predetermined path.",
      "MCP is Anthropic's open standard for AI-to-tool connections.",
      "Proposed Auto-Critique Agent would run tsc --noEmit and next lint in the Revise step.",
    ],
  },
  {
    id: "workflow-as-a-service",
    title: "Workflow as a Service",
    section: "Week 4",
    file: "assignments/week-04/workflow-as-a-service.md",
    summary:
      "Deep-dive on the Draft → Critique → Revise pipeline: prompt templates, five real runs, time comparison, failure points, and required human review.",
    keyPoints: [
      "Time saved across 5 runs: 159 minutes against a ~20 minute template setup cost.",
      "Failure points include citation drift, overlong outputs, and regressions across revise cycles.",
    ],
  },
  {
    id: "fe-08-error-states",
    title: "FE-08: Error States, Empty States, and Edge Cases",
    section: "Week 5",
    file: "assignments/week-05/fe-08-error-states.md",
    summary:
      "Documents making the AI chat production-ready by handling empty, loading, streaming, error, no-results, and responsive states, plus a sabotage checklist.",
    keyPoints: [
      "Five distinct error types with icons: network, API 5xx, rate limit, timeout/abort, unknown.",
      "Sabotage helpers in lib/sabotage.ts simulate failures via window.__SABOTAGE or /chat?sabotage=...",
    ],
  },
  {
    id: "fl-06-personal-agent",
    title: "FL-06: Design Your Personal Agent",
    section: "Week 5",
    file: "assignments/week-05/fl-06-personal-agent.md",
    summary:
      "Design spec for the Study Coach personal agent: summarizes assignments, turns briefs into next steps, drafts submission notes, and explains concepts from the author's own docs.",
    keyPoints: [
      "Grounded only in uploaded docs: no RAG, no web search, no code execution.",
      "Chosen platform is Claude Project; Custom GPT rejected to avoid drift.",
    ],
  },
  {
    id: "fl-07-build-agent",
    title: "FL-07 — Build the Agent",
    section: "Week 5",
    file: "assignments/week-05/fl-07-build-agent.md",
    summary:
      "Submission writeup for the built Study Coach agent: the agent/demo.sh filesystem-connector demo, the workspace layout, and what remains rough.",
    keyPoints: [
      "Demo script covers 5 use cases: summarize, steps, draft, next, explain.",
      "No real MCP connector yet; the demo is prompt-preparation, not agent execution.",
    ],
  },
  {
    id: "pf-04-personal-website",
    title: "PF-04: Personal Website Live on the FlyRank Domain",
    section: "Week 5",
    file: "assignments/week-05/pf-04-personal-website.md",
    summary:
      "Documents the personal website deployment on Vercel and the pending FlyRank subdomain setup with a full DNS walkthrough.",
    keyPoints: [
      "Hosting on Vercel Hobby tier with automatic HTTPS and continuous deployment.",
      "Future subdomain juliochrist.flyrank.ai pending FlyRank DNS setup; no rebuild needed.",
    ],
  },
  {
    id: "agent-spec",
    title: "Study Coach Agent — Spec",
    section: "Agent",
    file: "agent/agent-spec.md",
    summary:
      "The condensed spec for the Study Coach agent: job-to-be-done, four core jobs, user, tools and data, and guardrails.",
    keyPoints: [
      "Core jobs: summarize assignments, turn briefs into next steps, draft submission notes, explain concepts from docs.",
      "Guardrails: confirm loaded docs and brief; never invent documents, change tone, or skip citations.",
    ],
  },
  {
    id: "agent-tool-map",
    title: "Study Coach Agent — Tool Map",
    section: "Agent",
    file: "agent/tool-map.md",
    summary:
      "Inventory of the Study Coach agent's tools and data sources with a Real/Planned marker, and an Access Realities table.",
    keyPoints: [
      "The agent does not read files automatically in production; docs are uploaded manually.",
      "The MCP connector is not live; agent/demo.sh simulates what it would provide.",
    ],
  },
  {
    id: "agent-build-log",
    title: "Study Coach Agent — Build Log",
    section: "Agent",
    file: "agent/build-log.md",
    summary:
      "Log of building the Study Coach agent across four builds, including what broke, what was cut, and what was tested.",
    keyPoints: [
      "Cut fzf (not installed on macOS by default) and API-key-dependent AI processing.",
      "Open items: real MCP filesystem connector, live agent session recording, automated eval.",
    ],
  },
  {
    id: "agent-instructions",
    title: "Study Coach Agent — Instructions",
    section: "Agent",
    file: "agent/instructions.md",
    summary:
      "The exact system prompt and per-task templates to paste into Claude Project for the Study Coach agent.",
    keyPoints: [
      "Ground every claim in uploaded docs; say 'I do not have that in your documents' rather than guessing.",
      "Mandates the Draft → Critique → Revise pattern with source citations.",
    ],
  },
];

export const DOC_SECTIONS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Agent"] as const;
export type DocSection = (typeof DOC_SECTIONS)[number];
