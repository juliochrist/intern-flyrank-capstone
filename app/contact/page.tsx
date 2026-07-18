import type { Metadata } from "next";
import { Mail, Globe } from "lucide-react";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "Contact — FlyRank Capstone",
};

export default function ContactPage() {
  return (
    <Container>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-lg text-muted">
            If you are looking for someone who can build AI-powered web
            applications, I would love to talk.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Email
            </h2>
            <p className="mt-2 text-sm text-muted">
              <a
                href="mailto:julio@example.com"
                className="text-primary transition hover:text-primary-hover"
              >
                julio.christianto@10x.ai
              </a>
            </p>
          </Card>
          <Card>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              GitHub
            </h2>
            <p className="mt-2 text-sm text-muted">
              <a
                href="https://github.com/juliochrist/flyrank-capstone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition hover:text-primary-hover"
              >
                github.com/juliochrist/flyrank-capstone
              </a>
            </p>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
