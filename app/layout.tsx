import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julio Christianto — Frontend AI Engineering",
  description:
    "Julio Christianto builds AI-powered web applications with React, TypeScript, and Next.js — Frontend AI Engineering portfolio and internship work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <div className="stars" aria-hidden="true" />

        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="pointer-events-none absolute inset-0 max-w-full max-h-full"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(124,106,255,0.25) 0%, transparent 50%)",
              animation: "nebula-drift 25s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 max-w-full max-h-full"
            style={{
              background:
                "radial-gradient(circle at 80% 80%, rgba(107,138,255,0.18) 0%, transparent 50%)",
              animation: "nebula-drift-2 22s ease-in-out infinite reverse",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 max-w-full max-h-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(180,120,255,0.15) 0%, transparent 50%)",
              animation: "nebula-drift 20s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 max-w-full max-h-full"
            style={{
              background:
                "radial-gradient(circle at 10% 60%, rgba(124,106,255,0.12) 0%, transparent 50%)",
              animation: "nebula-drift-2 28s ease-in-out infinite reverse",
            }}
          />
        </div>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
