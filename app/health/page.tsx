import type { Metadata } from "next";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "Health — FlyRank Capstone",
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getTodo(): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function HealthPage() {
  const fetchedAt = new Date().toISOString();
  let todo: Todo | null = null;
  let error: string | null = null;

  try {
    todo = await getTodo();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch";
  }

  return (
    <Container>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Health Check
          </h1>
          <p className="mt-3 text-lg text-muted">
            Server component fetching data from JSONPlaceholder API.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  error ? "bg-error" : "bg-success"
                }`}
              />
              Status
            </h2>
            {error ? (
              <p className="mt-4 text-sm text-error">{error}</p>
            ) : (
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Title</dt>
                  <dd className="font-medium text-foreground">
                    {todo?.title}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Completed</dt>
                  <dd className="font-medium text-foreground">
                    {todo?.completed ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Fetched at</dt>
                  <dd className="font-mono text-xs text-muted-foreground">
                    {fetchedAt}
                  </dd>
                </div>
              </dl>
            )}
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary ring-1 ring-primary/20">
                i
              </span>
              Details
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Render strategy: Server Component
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Data source: JSONPlaceholder API
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Cache: no-store (dynamic)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Error handling: try/catch in component
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
