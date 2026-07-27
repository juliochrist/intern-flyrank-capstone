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
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed";

  const styles = {
    primary:
      "bg-[#6c63ff] text-white hover:bg-[#5a52e0] disabled:opacity-50",
    secondary:
      "border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-50",
  };

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading\u2026" : children}
    </button>
  );
}
