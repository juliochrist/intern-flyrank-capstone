import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

export default function Button({
  isLoading = false,
  variant = "primary",
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed";

  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
    secondary:
      "text-foreground hover:bg-white/10 disabled:opacity-50",
  };

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${base} ${styles[variant]} ${className}`}
      style={
        variant === "secondary"
          ? {
              background: "rgba(35,33,44,0.35)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }
          : undefined
      }
      {...props}
    >
      {isLoading ? "Loading\u2026" : children}
    </button>
  );
}
