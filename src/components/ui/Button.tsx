import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

export function Button({
  isLoading = false,
  variant = "primary",
  disabled,
  children,
  className = "",
  type = "submit",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed";

  const styles = {
    primary:
      "btn-primary disabled:opacity-50",
    secondary:
      "btn-secondary disabled:opacity-50",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Saving\u2026" : children}
    </button>
  );
}
