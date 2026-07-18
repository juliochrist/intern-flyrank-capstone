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
        {/* Background gradient blobs for glass refraction */}
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div
            className="pointer-events-none absolute"
            style={{
              width: "700px",
              height: "700px",
              background:
                "radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)",
              filter: "blur(120px)",
              top: "-250px",
              left: "-200px",
              animation: "float-slow 20s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "550px",
              height: "550px",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)",
              filter: "blur(120px)",
              bottom: "-150px",
              right: "-150px",
              animation: "float-slow 18s ease-in-out infinite reverse",
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              width: "450px",
              height: "450px",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
              filter: "blur(100px)",
              top: "40%",
              left: "55%",
              animation: "blob-drift 22s ease-in-out infinite",
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
