"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Braces, Rocket } from "lucide-react";
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-250 hover:-translate-y-0.5 sm:p-8"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.3), 0 0 32px rgba(108,99,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
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

      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:bg-[rgba(99,102,241,0.2)] group-hover:ring-[rgba(99,102,241,0.35)]"
        style={{
          background: "rgba(99,102,241,0.1)",
          color: "#6c63ff",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.2)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#f1f5f9]">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-[#94a3b8]">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28">
        <Container>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-medium tracking-wide uppercase"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#94a3b8",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#6c63ff" }}
              />
              AI Frontend Engineering Capstone
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-[#f1f5f9] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              AI-powered{" "}
              <span
                className="bg-gradient-to-r from-[#6c63ff] to-[#22d3ee] bg-clip-text text-transparent"
              >
                web applications
              </span>
              <br />
              built with purpose.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94a3b8] sm:text-lg"
            >
              FlyRank Capstone showcases AI-powered web applications built with
              React, TypeScript, and Next.js.
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
                  background:
                    "linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)",
                  boxShadow: "0 4px 16px rgba(108,99,255,0.3)",
                }}
              >
                View Projects
              </Link>
              <Link
                href="/health"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-[#f1f5f9] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Health Check
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
    </>
  );
}
