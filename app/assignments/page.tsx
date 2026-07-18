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
  "https://github.com/juliochrist/flyrank-capstone/blob/main/assignments";

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
    status: "in-progress",
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
            status: "in-progress",
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
            status: "in-progress",
          },
        ],
        status: "in-progress",
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
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-glass-bg"
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
            <div className="border-l border-glass-border ml-5 space-y-3 pb-3 pl-6 pt-1">
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
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top-edge light gradient */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-6 text-left transition hover:bg-glass-bg sm:p-8"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
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
            <div className="border-t border-glass-border space-y-1 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
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
