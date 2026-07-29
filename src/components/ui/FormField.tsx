import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground/80"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  hasError?: boolean;
  describedBy?: string;
};

export function TextInput({
  id,
  hasError,
  describedBy,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={`w-full rounded-xl px-4 py-2.5 text-sm text-foreground outline-none backdrop-blur-sm transition placeholder:text-muted-foreground focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        hasError
          ? "border border-error/50 focus:border-error focus:ring-error/20"
          : "border focus:border-primary/50 focus:ring-primary/20"
      } ${className}`}
      style={{
        background: "rgba(35,33,44,0.35)",
        borderColor: hasError ? undefined : "rgba(255,255,255,0.08)",
      }}
      {...props}
    />
  );
}
