import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "About — Julio Christianto",
};

export default function AboutPage() {
  return (
    <Container>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About
          </h1>
          <p className="mt-3 text-lg text-muted">
            Julio Christianto — a Frontend AI Engineering intern building
            AI-powered web applications.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">
              Who I am
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              I&rsquo;m Julio Christianto. I build AI-powered web applications
              with React, TypeScript, and modern frontend tools. As a
              Frontend AI Engineering Intern at FlyRank, I ship production
              code by combining strong fundamentals with AI collaboration —
              using Claude and ChatGPT to generate, review, and improve my
              work. I focus on practical outcomes: accessible UI, clean
              architecture, and features that solve real business problems.
              My current projects include an AI-powered market analysis tool
              (TradeIntel) and this portfolio site, both built with strict
              TypeScript, React Hook Form, and Tailwind CSS v4.
            </p>
          </Card>

          <div id="experience">
            <h2 className="text-xl font-semibold text-foreground">
              Experience
            </h2>
            <div className="mt-4 space-y-4">
              <Card>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Frontend AI Engineering Intern
                    </h3>
                    <p className="text-sm text-muted">FlyRank</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2026</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Building production-ready web applications using React,
                  TypeScript, and Next.js with AI-assisted development
                  workflows. Shipping accessible, responsive, and performant
                  frontend features while documenting how AI influences
                  architecture and implementation decisions.
                </p>
              </Card>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/20">
                  S
                </span>
                Stack
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Next.js 15 — App Router
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  React 19 — Server & Client Components
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  TypeScript — Strict mode
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Tailwind CSS v4 — Design tokens
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  React Hook Form — Form state
                </li>
              </ul>
            </Card>
            <Card>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent ring-1 ring-accent/20">
                  A
                </span>
                Approach
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Server components by default
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Accessible UI with ARIA attributes
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Responsive design at all breakpoints
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  AI-assisted development workflow
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  Continuous deployment via Vercel
                </li>
              </ul>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">
              Learning Journey
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Currently deepening my expertise in AI-assisted development
              workflows, server components, and accessible UI patterns through
              the FlyRank internship. I am focused on shipping production
              applications while documenting the impact of AI collaboration on
              code quality, iteration speed, and architecture decisions.
            </p>
            <div className="mt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary-hover"
              >
                See My Work <span>&rarr;</span>
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
