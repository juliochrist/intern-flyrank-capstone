"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import type { HTMLAttributes } from "react";
import Button from "../Button";
import { contactValidationMessages } from "@/lib/validation";
import type { ContactFormValues } from "@/types/contact";

const contactSchema = z.object({
  name: z.string().min(2, contactValidationMessages.minName),
  email: z.string().email(contactValidationMessages.email),
  message: z.string().min(10, contactValidationMessages.minMessage),
});

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ContactFormProps = HTMLAttributes<HTMLFormElement>;

export default function ContactForm({ className, ...props }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  if (submitStatus === "success") {
    return (
      <div role="alert" className="rounded-xl bg-success/10 border border-success/20 p-6" aria-live="polite">
        <div className="flex items-start gap-3">
          <svg
            className="h-6 w-6 shrink-0 text-success mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-success">Message sent!</h3>
            <p className="mt-1 text-sm text-muted">
              Thanks for reaching out. I&rsquo;ll get back to you soon.
            </p>
            <Button
              variant="secondary"
              onClick={() => setSubmitStatus("idle")}
              className="mt-4"
            >
              Send another message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`space-y-5 ${className ?? ""}`}
      {...props}
    >
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          autoComplete="name"
          disabled={submitStatus === "submitting"}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`
            w-full rounded-xl px-4 py-2.5 text-sm text-foreground bg-white/5 border transition-colors
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            ${errors.name ? "border-destructive focus:ring-destructive" : "border-white/10"}
          `}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          autoComplete="email"
          disabled={submitStatus === "submitting"}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`
            w-full rounded-xl px-4 py-2.5 text-sm text-foreground bg-white/5 border transition-colors
            placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            ${errors.email ? "border-destructive focus:ring-destructive" : "border-white/10"}
          `}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          disabled={submitStatus === "submitting"}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`
            w-full rounded-xl px-4 py-2.5 text-sm text-foreground bg-white/5 border transition-colors
            placeholder:text-muted-foreground resize-y min-h-[120px]
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            ${errors.message ? "border-destructive focus:ring-destructive" : "border-white/10"}
          `}
          placeholder="What&rsquo;s on your mind?"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitStatus === "error" && (
        <div role="alert" className="rounded-xl bg-destructive/10 border border-destructive/20 p-4" aria-live="assertive">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 shrink-0 text-destructive mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        </div>
      )}

      <Button type="submit" isLoading={submitStatus === "submitting"} className="w-full sm:w-auto">
        {submitStatus === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}