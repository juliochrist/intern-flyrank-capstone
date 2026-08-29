import type { Metadata } from "next";
import { Mail, BriefcaseBusiness, Globe } from "lucide-react";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";
import ContactForm from "../../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Julio Christianto",
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
            I build AI-powered web applications and I am looking for a
            frontend engineering role where I can keep doing it.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(35,33,44,0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-xl font-semibold text-foreground">
                  Let&rsquo;s build together
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Fill out the form or email me directly — I&rsquo;ll get back to you.
                </p>
              </div>
              <a
                href="mailto:julio.christianto@10x.ai"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #7C6AFF 0%, #6A58E8 100%)",
                  boxShadow: "0 4px 20px rgba(124,106,255,0.35)",
                }}
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(35,33,44,0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <h2 className="text-xl font-semibold text-foreground">Send a message</h2>
            <p className="mt-2 text-sm text-muted">
              Or use the form below — it goes straight to my inbox.
            </p>
            <ContactForm className="mt-6" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <a
                href="https://linkedin.com/in/juliochrist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  LinkedIn
                </h2>
                <p className="mt-2 text-sm text-muted">
                  linkedin.com/in/juliochrist
                  <span className="ml-1 text-primary">&rarr;</span>
                </p>
              </a>
            </Card>
            <Card>
              <a
                href="https://github.com/juliochrist/intern-flyrank-capstone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  GitHub
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Where this portfolio and the AI chat are built
                  <span className="ml-1 text-primary">&rarr;</span>
                </p>
              </a>
            </Card>
          </div>
        </div>
      </Section>
    </Container>
  );
}