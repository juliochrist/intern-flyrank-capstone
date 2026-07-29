import type { Metadata } from "next";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "Projects — FlyRank Capstone",
};

const projects = [
  {
    title: "AI Career Navigator",
    description:
      "AI-assisted career planning tool that helps users explore roles, identify skill gaps, and generate personalized learning paths.",
    url: "https://ai-career-navigator.vercel.app",
    tech: ["Next.js 15", "React 19", "TypeScript", "OpenAI API"],
    status: "Live",
  },
  {
    title: "SmartPOS AI",
    description:
      "Intelligent point-of-sale dashboard with AI-powered inventory management and sales analytics. Surfaces actionable insights — top inventory, restock alerts, and sales forecasts.",
    url: "https://smartpos-ai-seven.vercel.app",
    tech: ["React 19", "TypeScript", "Supabase"],
    status: "Live",
  },
  {
    title: "Client Pulse",
    description:
      "Client relationship management dashboard for tracking interactions, managing contacts, and monitoring engagement metrics.",
    url: "https://client-pulse-xi.vercel.app",
    tech: ["Next.js 15", "React 19", "TypeScript"],
    status: "Live",
  },
  {
    title: "TradeIntel",
    description:
      "AI-powered market analysis tool for traders with real-time data visualization and sentiment analysis.",
    url: "https://tradeintel-v2.vercel.app",
    tech: ["React 19", "TypeScript", "Supabase", "Chart.js"],
    status: "Live",
  },
  {
    title: "Life OS",
    description:
      "Personal productivity and life management system for tracking goals, habits, and daily tasks.",
    url: "https://life-os-beta-mocha.vercel.app",
    tech: ["React", "TypeScript"],
    status: "Live",
  },
  {
    title: "FE Playground",
    description:
      "Next.js experimental playground for testing new patterns, performance optimizations, and frontend features.",
    url: "https://fe-playground-nextjs.vercel.app",
    tech: ["Next.js", "TypeScript"],
    status: "Live",
  },
  {
    title: "FlyRank Capstone",
    description:
      "This portfolio site — built with Next.js 15, React 19, and Tailwind CSS v4. Features server components, accessible UI patterns, and AI-assisted development workflow documentation.",
    url: "/",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4"],
    status: "Live",
  },
];

export default function ProjectsPage() {
  return (
    <Container>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-lg text-muted">
            AI-powered web applications built during the FlyRank internship.
            Ordered by impact — strongest first.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h2>
                <span className="badge shrink-0">{project.status}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              {project.tech && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{
                        background: "rgba(124,106,255,0.15)",
                        color: "#7C6AFF",
                        border: "1px solid rgba(124,106,255,0.25)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {project.url && project.url !== "/" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-hover"
                >
                  Visit site
                  <span>&rarr;</span>
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  );
}
