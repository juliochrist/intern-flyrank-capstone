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
  title: "FlyRank Capstone",
  description:
    "AI-powered web applications built with React, TypeScript, and Next.js",
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
            className="pointer-events-none absolute"
            style={{
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(124,106,255,0.25) 0%, transparent 65%)",
              filter: "blur(120px)",
              top: "-300px",
              left: "-200px",
              animation: "nebula-drift 25s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(107,138,255,0.18) 0%, transparent 65%)",
              filter: "blur(100px)",
              bottom: "-150px",
              right: "-150px",
              animation: "nebula-drift-2 22s ease-in-out infinite reverse",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(180,120,255,0.15) 0%, transparent 65%)",
              filter: "blur(90px)",
              top: "40%",
              left: "55%",
              animation: "nebula-drift 20s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(124,106,255,0.12) 0%, transparent 65%)",
              filter: "blur(80px)",
              top: "60%",
              left: "10%",
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
