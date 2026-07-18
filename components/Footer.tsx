import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
          <Sparkles className="h-4 w-4 text-[#6c63ff]" />
          <span>&copy; {new Date().getFullYear()} FlyRank Capstone</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/health"
            className="text-[#94a3b8] transition hover:text-[#f1f5f9]"
          >
            Health
          </Link>
          <a
            href="https://github.com/juliochrist/flyrank-capstone"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#94a3b8] transition hover:text-[#f1f5f9]"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
