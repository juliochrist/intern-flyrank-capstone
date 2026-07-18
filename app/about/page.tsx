import type { Metadata } from "next";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "About — FlyRank Capstone",
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
            Frontend AI Engineering Intern building AI-powered web applications.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
      </Section>
    </Container>
  );
}
