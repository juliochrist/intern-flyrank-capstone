"use client";

import { useState } from "react";
import { Modal } from "../../playground/Modal";
import { Tabs, TabsList, TabsTab, TabsPanel } from "../../playground/Tabs";
import { Disclosure, Accordion } from "../../playground/Disclosure";
import { SendButtonDemo } from "../../playground/SendButtonDemo";
import Container from "../../components/Container";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Preview({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(35,33,44,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <p className="mb-4 text-xs font-medium tracking-wide uppercase text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function PlaygroundPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState("tab1");

  return (
    <Container className="py-16 sm:py-22">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <p className="text-sm font-medium text-primary">
            Week 04 — FE-05
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            React Playground
          </h1>
          <p className="mt-3 text-lg text-muted">
            Accessible UI components built from scratch following WAI-ARIA
            Authoring Practices.
          </p>
        </div>

        <Section title="Modal Dialog">
          <div className="grid gap-6 sm:grid-cols-2">
            <Preview label="Controlled">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #7C6AFF 0%, #6A58E8 100%)",
                  boxShadow: "0 4px 16px rgba(124,106,255,0.3)",
                }}
              >
                Open Modal
              </button>
            </Preview>
            <Preview label="Props">
              <div className="space-y-1.5 text-xs font-mono text-muted">
                <p>
                  <span className="text-accent">role</span>=&ldquo;dialog&rdquo;
                </p>
                <p>
                  <span className="text-accent">aria-modal</span>=&ldquo;true&rdquo;
                </p>
                <p>
                  <span className="text-accent">aria-labelledby</span> → h2
                </p>
                <p>
                  <span className="text-accent">aria-describedby</span> → p
                </p>
                <p>
                  <span className="text-accent">ESC</span> closes · focus
                  trap · click outside closes
                </p>
              </div>
            </Preview>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Action"
            description="This action cannot be undone. Please review before confirming."
          >
            <p>
              Are you sure you want to proceed with this action? All related
              data will be permanently modified.
            </p>
          </Modal>
        </Section>

        <Section title="Tabs">
          <div className="grid gap-6 sm:grid-cols-2">
            <Preview label="Controlled">
              <Tabs value={tabValue} onValueChange={setTabValue}>
                <TabsList aria-label="Controlled tabs example">
                  <TabsTab value="tab1">Overview</TabsTab>
                  <TabsTab value="tab2">Details</TabsTab>
                  <TabsTab value="tab3" disabled>
                    Disabled
                  </TabsTab>
                  <TabsTab value="tab4">Settings</TabsTab>
                </TabsList>
                <TabsPanel value="tab1">
                  <p>
                    This is the overview panel. It contains a summary of key
                    information about the current topic.
                  </p>
                </TabsPanel>
                <TabsPanel value="tab2">
                  <p>
                    Detailed information goes here. Additional context, metrics,
                    and supporting data are displayed in this panel.
                  </p>
                </TabsPanel>
                <TabsPanel value="tab3">
                  <p>This panel is disabled and should not be reachable.</p>
                </TabsPanel>
                <TabsPanel value="tab4">
                  <p>
                    Configure your preferences, notifications, and display
                    options in the settings panel.
                  </p>
                </TabsPanel>
              </Tabs>
            </Preview>
            <Preview label="Props">
              <div className="space-y-1.5 text-xs font-mono text-muted">
                <p>
                  <span className="text-accent">role</span>=&ldquo;tablist&rdquo;
                </p>
                <p>
                  <span className="text-accent">role</span>=&ldquo;tab&rdquo;
                </p>
                <p>
                  <span className="text-accent">role</span>=&ldquo;tabpanel&rdquo;
                </p>
                <p>
                  <span className="text-accent">aria-selected</span> ·
                  aria-controls
                </p>
                <p>
                  <span className="text-accent">← → Home End</span> keyboard
                  nav
                </p>
              </div>
            </Preview>
          </div>

          <div className="mt-6">
            <Preview label="Uncontrolled (default first tab active)">
              <Tabs defaultValue="a">
                <TabsList aria-label="Uncontrolled tabs example">
                  <TabsTab value="a">First</TabsTab>
                  <TabsTab value="b">Second</TabsTab>
                  <TabsTab value="c">Third</TabsTab>
                </TabsList>
                <TabsPanel value="a">
                  <p>First tab content — uncontrolled mode.</p>
                </TabsPanel>
                <TabsPanel value="b">
                  <p>Second tab content — uncontrolled mode.</p>
                </TabsPanel>
                <TabsPanel value="c">
                  <p>Third tab content — uncontrolled mode.</p>
                </TabsPanel>
              </Tabs>
            </Preview>
          </div>
        </Section>

        <Section title="Stateful Send Button (FE-AA1)">
          <Preview label="Send button lifecycle — deterministic demo">
            <SendButtonDemo />
          </Preview>
        </Section>

        <Section title="Disclosure / Accordion">
          <div className="grid gap-6 sm:grid-cols-2">
            <Preview label="Single Disclosure">
              <Disclosure title="What is this playground?">
                <p>
                  This playground demonstrates accessible React components built
                  from scratch using only React and TypeScript — no component
                  libraries.
                </p>
              </Disclosure>
              <div className="mt-3">
                <Disclosure title="How do I navigate with a keyboard?">
                  <p>
                    Use <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-foreground">Tab</kbd>{" "}
                    to focus the button, then <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-foreground">Enter</kbd>{" "}
                    or <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-foreground">Space</kbd>{" "}
                    to toggle.
                  </p>
                </Disclosure>
              </div>
            </Preview>
            <Preview label="Accordion (multiple)">
              <Accordion>
                <Disclosure title="Chapter 1: Getting Started" defaultOpen>
                  <p>
                    Begin by setting up your development environment. Install
                    Node.js and a code editor of your choice.
                  </p>
                </Disclosure>
                <Disclosure title="Chapter 2: Core Concepts">
                  <p>
                    Learn about React components, hooks, and declarative UI
                    patterns.
                  </p>
                </Disclosure>
                <Disclosure title="Chapter 3: Accessibility">
                  <p>
                    Understand WAI-ARIA, semantic HTML, keyboard navigation, and
                    screen reader support.
                  </p>
                </Disclosure>
              </Accordion>
            </Preview>
          </div>
        </Section>
      </div>
    </Container>
  );
}
