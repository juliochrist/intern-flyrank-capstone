import type { Metadata } from "next";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "Projects — FlyRank Capstone",
};

const projects = [
  {
    title: "TradeIntel",
    description:
      "AI-powered market analysis tool for traders. Built with React, TypeScript, and Supabase.",
    url: "https://tradeintel-v2.vercel.app",
    status: "Live",
  },
  {
    title: "SmartPOS AI",
    description:
      "Intelligent point-of-sale dashboard with AI-powered inventory and sales analytics.",
    url: "https://smartpos-ai-seven.vercel.app",
    status: "Live",
  },
  {
    title: "Client Pulse",
    description:
      "CRM dashboard for managing client relationships and tracking interactions.",
    url: "https://client-pulse-xi.vercel.app",
    status: "Live",
  },
  {
    title: "Life OS",
    description: "Personal productivity and life management system.",
    url: "https://life-os-beta-mocha.vercel.app",
    status: "Live",
  },
  {
    title: "FE Playground",
    description:
      "Next.js experimental playground for testing new patterns and features.",
    url: "https://fe-playground-nextjs.vercel.app",
    status: "Live",
  },
  {
    title: "Portfolio Website",
    description:
      "This site — a Next.js starter with server components, accessibility, and responsive design.",
    url: "https://porto-web-taupe.vercel.app",
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
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-hover"
                >
                  Visit site
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  );
}
