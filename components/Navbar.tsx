"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/assignments", label: "Assignments" },
  { href: "/contact", label: "Contact" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10,10,15,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-[#f1f5f9]"
        >
          <Sparkles className="h-4 w-4 text-[#6c63ff]" />
          FlyRank
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    active
                      ? "inline-flex items-center rounded-full bg-[rgba(99,102,241,0.15)] px-4 py-1.5 text-sm font-medium text-[#6c63ff] ring-1 ring-inset ring-[rgba(99,102,241,0.25)] transition hover:bg-[rgba(99,102,241,0.2)] hover:ring-[rgba(99,102,241,0.35)]"
                      : "inline-flex items-center px-1 py-1.5 text-sm font-medium text-[#94a3b8] transition hover:text-[#f1f5f9]"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center p-2 text-[#94a3b8] hover:text-[#f1f5f9] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <ul className="flex flex-col gap-1 px-4 pb-4 pt-2">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[rgba(99,102,241,0.15)] text-[#6c63ff]"
                        : "text-[#94a3b8] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f1f5f9]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
