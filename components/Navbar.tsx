"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/about#experience", label: "Experience" },
  { href: "/assignments", label: "Assignments" },
  { href: "/playground", label: "Playground" },
  { href: "/chat", label: "Chat" },
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
        background: "rgba(35,33,44,0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          FlyRank
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    active
                      ? "inline-flex items-center rounded-full bg-primary/15 px-3.5 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/25 transition hover:bg-primary/20 hover:ring-primary/35"
                      : "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="flex items-center justify-center p-2 text-muted hover:text-foreground md:hidden"
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

      {mobileOpen && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
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
                        ? "bg-primary/15 text-primary"
                        : "text-muted hover:bg-white/5 hover:text-foreground"
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
