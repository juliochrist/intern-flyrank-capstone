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

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <SettingsForm />
        </div>
      </div>
    </Container>
  );
}
