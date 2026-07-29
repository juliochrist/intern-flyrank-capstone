import type { Metadata } from "next";
import Container from "../../components/Container";
import { SettingsForm } from "../../src/components/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Settings — FlyRank Capstone",
};

export default function SettingsPage() {
  return (
    <Container className="py-16 sm:py-22">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-8">
          <p className="text-sm font-medium text-primary">Account</p>
          <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-muted">
            Update your profile information and password.
          </p>
        </header>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: "rgba(35,33,44,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <SettingsForm />
        </div>
      </div>
    </Container>
  );
}
