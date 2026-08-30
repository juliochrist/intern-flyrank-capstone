"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Container from "../../components/Container";

const GITHUB_BASE =
  "https://github.com/juliochrist/intern-flyrank-capstone/blob/main/assignments";

type AssignmentItem = {
  title: string;
  filePath: string;
  summary?: string;
  status: "completed" | "in-progress";
  subItems?: AssignmentSubItem[];
};

type AssignmentSubItem = {
  title: string;
  filePath: string;
  summary: string;
  status: "completed" | "in-progress";
};

type WeekData = {
  week: number;
  label: string;
  status: "completed" | "in-progress";
  items: AssignmentItem[];
};

const weeks: WeekData[] = [
  {
    week: 1,
    label: "AI Fluency & Portfolio Planning",
    status: "completed",
    items: [
      {
        title: "AI Workflow Audit",
        filePath: "week-01/workflow-audit.md",
        summary:
          "Catalogued 12 recurring tasks across learning, building, and career preparation, classifying each by AI involvement level — from fully automatable (commit messages, documentation) to human-only (trading decisions, career choices). Documented my AI toolkit (ChatGPT, Claude, Anthropic Academy), Claude project configuration, and three target tasks with definitions of done.",
        status: "completed",
      },
      {
        title: "Portfolio Sitemap",
        filePath: "week-01/portfolio-sitemap.md",
        summary:
          "Designed a 6-page portfolio architecture (Home, About, Projects, Project Detail, Blog, Contact) with a shared layout, sitemap diagram, and notes on alternative structures like replacing the blog with an external writing section.",
        status: "completed",
      },
      {
        title: "AI Pressure Test",
        filePath: "week-01/pressure-test.md",
        summary:
          "Stress-tested AI across three prompt types: code generation (paginated table component), debugging (useEffect double-invoke in Strict Mode), and planning (portfolio folder structure). Each prompt was evaluated for correctness, completeness, readability, and edge-case handling.",
        status: "completed",
      },
      {
        title: "Proof Statement",
        filePath: "week-01/proof-statement.md",
        summary:
          "Articulated a single claim ('I build AI-powered web applications that solve real business problems'), identified the target audience (startup founders and engineering managers), and defined one clear CTA ('Contact me for an interview'). Includes reflection on why the claim, audience, and CTA choices strengthen the portfolio.",
        status: "completed",
      },
    ],
  },
  {
    week: 2,
    label: "Case Studies & Prompt Engineering",
    status: "completed",
    items: [
      {
        title: "Frame It as Cases",
        filePath: "week-02/frame-it-as-cases.md",
        summary:
          "Wrote four case studies (FlyRank Capstone, TradeIntel, SmartPOS AI, Portfolio Website) using a Problem → What I Did → Outcome structure. Includes a voice card, bio, contact CTA, before-vs-after editing comparison, and reflection on how the case study format reveals gaps in project narratives.",
        status: "completed",
      },
      {
        title: "Prompt Ladder",
        filePath: "week-02/prompt-ladder.md",
        summary:
          "Built a 5-layer prompt ladder for a React settings page: Baseline → Clear Goal → Audience → Project Context → Output Format → Quality Criteria. Each layer adds one constraint, demonstrating how prompt specificity directly improves code quality. Includes a reusable prompt template and a rubric review.",
        status: "completed",
      },
      {
        title: "Prompting Fundamentals v2",
        filePath: "week-02/prompting-fundamentals-v2.md",
        summary:
          "Extended the prompt ladder with 6 versions testing different techniques: Role Assignment, Context & Motivation, Few-shot Examples, Output Structure, and Step Decomposition. Includes a cross-model comparison (Claude vs ChatGPT), a reusable prompt template with placeholders, and reflection on which techniques had the most impact.",
        status: "completed",
      },
    ],
  },
  {
    week: 3,
    label: "Identity, Content & Next.js Migration",
    status: "completed",
    items: [
      {
        title: "Identity Kit",
        filePath: "week-03/identity-kit.md",
        summary:
          "Defined the visual language for the portfolio: typography (Space Grotesk for headings, Inter for body), color palette (primary blue #2563EB, near-white background), logo/monogram design principles, and five design principles focused on simplicity, readability, consistent spacing, accessible contrast, and component-first styling.",
        status: "completed",
      },
      {
        title: "Curate Your Images",
        filePath: "week-03/curate-your-images.md",
        summary:
          "Created an image inventory across all pages, documented which screenshots are real browser captures vs AI-generated, rejected three AI image concepts with reasoning, made five 'Real Over AI' decisions, and included the exact prompts used for AI-generated assets (hero background, favicon).",
        status: "completed",
      },
      {
        title: "Using AI Effectively in React Development",
        filePath: "week-03/using-ai-effectively-react.md",
        summary:
          "Workshop write-up covering an 8-step AI workflow, weak vs strong prompt comparison, complete prompt example for a React component, AI for debugging and code review with real code examples, 10 key takeaways, and 12 Q&A pairs covering practical AI-in-React topics.",
        status: "completed",
      },
      {
        title: "Build Core — Next.js Migration",
        filePath: "week-03/build-core.md",
        summary:
          "Migrated the FlyRank Capstone from Vite + React SPA to Next.js 15 App Router. Documents the folder structure, route table, deployment steps for Vercel, environment variables, health check pattern, responsive strategy, and lessons learned about Server Components, Tailwind v4, and coexistence with existing src/ files.",
        status: "completed",
      },
      {
        title: "Through-Line: Map Content & CTAs",
        filePath: "week-03/through-line.md",
        summary:
          "Mapped every page's sections, purpose, and CTA into a unified content strategy. Defined a one-line claim, ordered projects by impact, identified missing proofs, and explained why the structure works for hiring manager expectations.",
        status: "completed",
      },
      {
        title: "AI React Development Assignment",
        filePath: "week-03/ai-react-development",
        summary:
          "A collection of documents from the AI-assisted development of the FlyRank Capstone Settings page: prompts used, AI assistance log, manual improvements made after generation, and required screenshots for documentation.",
        subItems: [
          {
            title: "AI Assistance in Development",
            filePath: "week-03/ai-react-development/ai-assistance.md",
            summary:
              "Documents how AI accelerated the Settings page development: scaffolding, validation logic, accessibility templates, component refactoring, and code review. Also covers what required manual work — naming, folder structure, token alignment, edge cases, and responsive fixes.",
            status: "completed",
          },
          {
            title: "Manual Improvements After AI",
            filePath: "week-03/ai-react-development/manual-improvements.md",
            summary:
              "Lists every manual improvement made after AI generation: folder restructuring, component refactoring, better naming, UI refinements, TypeScript fixes, responsive adjustments, and accessibility improvements. Ends with a final pre-commit checklist.",
            status: "completed",
          },
          {
            title: "Prompts Used During Development",
            filePath: "week-03/ai-react-development/prompts-used.md",
            summary:
              "A log of every prompt used throughout the development of the Settings page, organized by category: building, refactoring, accessibility, validation, code review, and performance.",
            status: "completed",
          },
          {
            title: "Screenshots",
            filePath: "week-03/ai-react-development/screenshots.md",
            summary:
              "Placeholder document listing all required screenshots for documentation: app preview, settings page with fields, validation errors, success message, responsive layouts at 375/768/1280px, navbar active state, and ARIA attributes in dev tools.",
            status: "completed",
          },
        ],
        status: "completed",
      },
    ],
  },
  {
    week: 4,
    label: "Playground Components & AI Chat",
    status: "completed",
    items: [
      {
        title: "Empty but Live",
        filePath: "week-04/empty-but-live.md",
        summary:
          "Documented the live deployment on Vercel, verified HTTPS and mobile responsiveness, prepared Claude Project context, and reflected on why deploying early reduces risk and accelerates feedback.",
        status: "completed",
      },
      {
        title: "FE-05: Accessible React Playground Components",
        filePath: "../playground",
        summary:
          "Built three accessible UI components from scratch: Modal Dialog (focus trap, ESC/backdrop close, aria-modal), Tabs (controlled/uncontrolled, keyboard nav, roving tabindex), and Disclosure/Accordion (aria-expanded, CSS animation). Includes NOTES.md comparing implementation against shadcn/ui.",
        status: "completed",
      },
      {
        title: "FE-06: Streaming AI Chat Interface",
        filePath: "../components/chat",
        summary:
          "Implemented a production-quality streaming chat UI using Vercel AI SDK v4 with Claude. Features token-by-token streaming, stop/regenerate, markdown rendering with syntax highlighting, auto-scroll with jump-to-latest, animated thinking indicator, and multi-turn conversation history.",
        status: "completed",
      },
      {
        title: "Three Roads",
        filePath: "week-04/three-roads.md",
        summary:
          "Evaluated three stack options (Vite SPA, Next.js SSG, full Next.js + backend) against real constraints: free hosting, frontend skill level, portfolio needs, and honest dynamic requirements. Chose Next.js static generation on Vercel with the rationale that the portfolio needs no backend — projects that do (TradeIntel, SmartPOS) live in separate repos.",
        status: "completed",
      },
      {
        title: "Workflow as a Service",
        filePath: "week-04/workflow-as-a-service.md",
        summary:
          "Documented the Draft → Critique → Revise pipeline used across the internship. Includes 5 real runs (SettingsForm, UI primitives, validation module, README, commit messages), time comparison showing 159 min saved across runs, 6 failure points, human review checklist, and a reusable prompt template in workflow-assets/.",
        status: "completed",
      },
      {
        title: "Agentic Systems & MCP",
        filePath: "week-04/agent-and-mcp.md",
        summary:
          "Classified the FL-04 pipeline as a workflow (not agent), explained MCP core concepts (tools, resources, prompts), documented two active MCP connections (opencode tools + Vercel AI SDK/Anthropic), showed 3 tool-based tasks from this session, and outlined one concrete agent upgrade: auto-critique with tsc/lint integration.",
        status: "completed",
      },
    ],
  },
  {
    week: 5,
    label: "Ship the Ugly One & Personal Agent",
    status: "completed",
    items: [
      {
        title: "Ship the Ugly One",
        filePath: "week-05/ship-the-ugly-one.md",
        summary:
          "Turned the portfolio into a live public website with real content from earlier weeks. Populated every page with actual work, case studies, and images. Added featured projects, bio, experience, tech tags, and fixed broken links and CSS. Includes real-person review notes and a 'still ugly' list of remaining polish items.",
        status: "completed",
      },
      {
        title: "FL-06: Design Your Personal Agent",
        filePath: "week-05/fl-06-personal-agent.md",
        summary:
          "Designed a study coach agent grounded in my own notes and assignment documents. Covers JTBD, usage frequency, tools/data needs, draft instructions, 5 eval cases, risks and guardrails, and platform choice (Claude Project with connectors and skills).",
        status: "completed",
      },
      {
        title: "FL-07: Build the Agent",
        filePath: "week-05/fl-07-build-agent.md",
        summary:
          "Built the narrowest working version of the study coach agent. Created a full agent workspace (spec, instructions, eval cases, tool map, build log, run capture notes) and a lightweight filesystem demo script that reads local assignment files and prepares structured context for Claude Project.",
        status: "completed",
      },
{
        title: "FE-07: Tool Results & Structured Output",
        filePath: "week-05/fe-07-tool-results.md",
        summary:
          "Added one real server-side tool to the AI chat: searchProjectDocs, a deterministic search over a distilled index of this repo's docs (lib/ai/projectDocsData.ts). Wire protocol streams the tool-call input and returns structured findings rendered as a result card. The UI renders all four tool lifecycle states (input streaming, input ready, output, error) with retry; the `!fail` query prefix forces a tool error for testing.",
        status: "completed",
      },
    ],
  },
  {
    week: 6,
    label: "Explain It Like You Built It + Open It on Your Phone",
    status: "completed",
    items: [
      {
        title: "Explain It Like You Built It — The AI Chat Flow",
        filePath: "week-06/explain-it-like-you-built-it.md",
        summary:
          "Explained the AI chat end-to-end using the real implementation, not a generic tutorial: the user's message → Next.js API route → AI SDK streamText → dynamic tool execution → UI rendering. Covers the toModelMessage translation layer (UI message vs model message format), the two-step agent loop guarded by isStepCount(3), where the search tool actually runs (server-side), and why dynamicTool streams the tool input. Includes the final plain-English submission plus a Bahasa Indonesia version.",
        status: "completed",
      },
      {
        title: "Survive the Crit — AI-Assisted Review & Fixes",
        filePath: "week-06/survive-the-crit.md",
        summary:
          "Ran an AI-assisted critique of the live portfolio as a hiring manager. Categorized findings into MUST-FIX and NICE-TO-HAVE and implemented all of them: personal branding everywhere instead of 'FlyRank Capstone', removed dead placeholder links (Settings, Health, CV/booking 'coming soon'), rebuilt the Contact page around a single email CTA, surfaced the flagship AI chat on Home and Projects, and fixed a stale GitHub URL. Verified with tsc, lint, and build.",
        status: "completed",
      },
      {
        title: "FE-AA1: Buttons with a Brain — Motion & State Micro-interactions",
        filePath: "week-06/fe-aa1-buttons-with-a-brain.md",
        summary:
          "Rebuilt the AI chat's send control as a single morphing SendButton with an explicit phase lifecycle (idle → loading → success → error → idle). Motion is limited to transform/opacity on a fixed footprint, every state keeps icon + colour + label + aria-live feedback, and reduced motion is handled both via a matchMedia hook (data-reduced) and a CSS media-query fallback. ChatInput gained a rapid-click dedup guard, a stop-vs-success race fix, and timed feedback. 48 Vitest tests + 2 Playwright E2E + tsc/lint/build all pass; a deterministic demo lives on /playground.",
        status: "completed",
      },
      {
        title: "FE-09: Testing Pass",
        filePath: "week-06/fe-09-testing-pass.md",
        summary:
          "Set up the project's automated testing foundation: Vitest + React Testing Library (35 tests across the chat message renderer, tool result card, composer, error banner, empty/loading states, and the full chat integration), an AI-route mock so tests never call a real model, a deterministic Playwright E2E test of the primary chat flow (plain message + searchProjectDocs tool), and a GitHub Actions CI pipeline running tsc, lint, Vitest, Playwright, and build on every push/PR with no API keys. All suites pass.",
        status: "completed",
      },
      {
        title: "Make It Do Something — Working Contact Form",
        filePath: "week-06/make-it-do-something.md",
        summary:
          "Implemented a fully working contact form on the Contact page using React Hook Form + Zod for validation, a Next.js API route for server-side handling, and Resend for email delivery. The form validates client and server side, handles loading/success/error states with full accessibility (aria-live, role=alert, proper labels), and sends submissions to a real email inbox. Resend free tier (3,000 emails/month) keeps the API key server-side only. Verified end-to-end with a live test submission.",
        status: "completed",
      },
    ],
  },
];

function StatusBadge({ status }: { status: "completed" | "in-progress" }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
        <CheckCircle2 className="h-3 w-3" />
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
      <Clock className="h-3 w-3" />
      In Progress
    </span>
  );
}

function ExpandIcon({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <ChevronDown className="h-4 w-4 text-muted" />
    </motion.div>
  );
}

function AssignmentRow({
  title,
  summary = "",
  filePath,
  status,
  isSubItem,
}: AssignmentItem & { isSubItem?: boolean }) {
  const [open, setOpen] = useState(false);
  const url = `${GITHUB_BASE}/${filePath}`;

  return (
    <div className={isSubItem ? "ml-6" : ""}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/5"
      >
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            status === "completed" ? "bg-success" : "bg-warning"
          }`}
        />
        <span className="flex-1 text-sm font-medium text-foreground">
          {title}
        </span>
        <ExpandIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="ml-5 space-y-3 pb-3 pl-6 pt-1"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {summary && (
                <p className="text-sm leading-relaxed text-muted">{summary}</p>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:text-primary-hover"
              >
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WeekSection({ week }: { week: WeekData }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl transition-all duration-250"
      style={{
        background: "rgba(35,33,44,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-6 text-left transition hover:bg-white/5 sm:p-8"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/25">
          {week.week}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              Week {week.week}
            </h2>
            <StatusBadge status={week.status} />
          </div>
          <p className="mt-0.5 text-sm text-muted">{week.label}</p>
        </div>

        <ExpandIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="space-y-1 px-4 pb-4 pt-2 sm:px-6 sm:pb-6"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {week.items.map((item) => (
                <div key={item.filePath}>
                  <AssignmentRow {...item} />
                  {"subItems" in item && item.subItems && (
                    <div className="mt-1 space-y-1">
                      {(item.subItems as AssignmentSubItem[]).map((sub) => (
                        <AssignmentRow
                          key={sub.filePath}
                          {...sub}
                          isSubItem
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AssignmentsPage() {
  return (
    <Container className="py-16 sm:py-22">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-primary">FlyRank Internship</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Assignments
          </h1>
          <p className="mt-3 text-lg text-muted">
            Weekly internship deliverables documenting my progress through the
            FlyRank AI Engineering program — from workflow audits and case
            studies to the full Next.js portfolio build.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {weeks.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 * i }}
            >
              <WeekSection week={week} />
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
