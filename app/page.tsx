"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Braces, Rocket, ArrowRight, ExternalLink } from "lucide-react";
import Container from "../components/Container";

const features = [
  {
    icon: Braces,
    title: "Modern Stack",
    description:
      "Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.",
  },
  {
    icon: Cpu,
    title: "AI-Integrated",
    description:
      "Developed using AI collaboration tools for faster iteration and quality code.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description:
      "Deployed on Vercel with server components, accessibility, and responsive design.",
  },
];

const featuredProjects = [
  {
    title: "AI Career Navigator",
    description:
      "AI-assisted career planning tool that helps users explore roles, identify skill gaps, and generate personalized learning paths.",
    url: "https://ai-career-navigator.vercel.app",
    tech: ["Next.js 15", "React 19", "TypeScript", "OpenAI API"],
  },
  {
    title: "SmartPOS AI",
    description:
      "Intelligent point-of-sale dashboard with AI-powered inventory management and sales analytics.",
    url: "https://smartpos-ai-seven.vercel.app",
    tech: ["React 19", "TypeScript", "Tailwind CSS", "Supabase"],
  },
  {
    title: "TradeIntel",
    description:
      "AI-powered market analysis tool for traders with real-time data visualization and sentiment analysis.",
    url: "https://tradeintel-v2.vercel.app",
    tech: ["React 19", "TypeScript", "Supabase", "Chart.js"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function GlassCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Braces;
  title: string;
  description: string;
}) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
      style={{
        background: "rgba(35,33,44,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(124,106,255,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      }}
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:bg-primary/20 group-hover:ring-primary/35"
        style={{
          background: "rgba(124,106,255,0.15)",
          color: "#7C6AFF",
          boxShadow: "0 0 0 1px rgba(124,106,255,0.25)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 60%)",
              filter: "blur(80px)",
              top: "-200px",
              right: "-100px",
              animation: "nebula-drift 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(107,138,255,0.08) 0%, transparent 60%)",
              filter: "blur(60px)",
              bottom: "-100px",
              left: "-50px",
              animation: "nebula-drift-2 25s ease-in-out infinite reverse",
            }}
          />
        </div>

        <Container>
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-medium tracking-wide uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(35,33,44,0.35)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                color: "#A0A0B8",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#7C6AFF", boxShadow: "0 0 6px rgba(124,106,255,0.6)" }}
              />
              Frontend AI Engineering
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Frontend engineering,
              <br />
              <span
                className="bg-gradient-to-r from-[#7C6AFF] to-[#6B8AFF] bg-clip-text text-transparent"
              >
                amplified by AI.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              I&rsquo;m Julio Christianto, a Frontend AI Engineering intern at
              FlyRank. I build accessible, production-ready web apps with
              React, TypeScript, and AI-assisted workflows — and ship them to
              Vercel.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #7C6AFF 0%, #6A58E8 100%)",
                  boxShadow: "0 4px 20px rgba(124,106,255,0.35)",
                }}
              >
                View My Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(35,33,44,0.35)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <motion.div
            className="grid items-stretch gap-6 sm:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              animate: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="h-full"
                variants={{
                  initial: { opacity: 0, y: 32 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GlassCard icon={f.icon} title={f.title} description={f.description} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="border-t pb-20 pt-16 sm:pb-28 sm:pt-24" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-muted">
              AI-powered applications built during the FlyRank internship.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView="animate"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ animate: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
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
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
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
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary-hover"
                  >
                    Explore Project <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { opacity: 1 } }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-hover"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="mx-auto mt-8 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <Link
              href="/chat"
              className="group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(35,33,44,0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <p className="text-sm font-semibold text-foreground">
                Try the live AI chat
                <span className="ml-2 text-primary transition group-hover:translate-x-0.5 inline-block">
                  &rarr;
                </span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                This site ships an AI chat grounded in this project&rsquo;s own
                docs — ask it anything and watch the tool results render live.
              </p>
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className="border-t pb-20 pt-16 sm:pb-28 sm:pt-24" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              About Me
            </motion.h2>
            <motion.p
              className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              I build AI-powered web applications with React, TypeScript, and
              modern frontend tools. As a Frontend AI Engineering Intern at
              FlyRank, I ship production code by combining strong fundamentals
              with AI collaboration.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary-hover"
              >
                Read my full profile <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <section
        className="border-t pb-20 pt-16 sm:pb-28 sm:pt-24"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(124,106,255,0.04) 100%)",
        }}
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Let&rsquo;s Build Together
            </motion.h2>
            <motion.p
              className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              If you are looking for someone who can build AI-powered web
              applications, I would love to talk.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView="animate"
              viewport={{ once: true }}
              variants={{ animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #7C6AFF 0%, #6A58E8 100%)",
                  boxShadow: "0 4px 20px rgba(124,106,255,0.35)",
                }}
              >
                Contact Me
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(35,33,44,0.35)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
