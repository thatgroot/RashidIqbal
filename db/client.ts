import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Single shared connection across hot-reloads in dev. In serverless/production
// every cold start gets a fresh connection — that's fine because Neon's
// pooler endpoint handles the actual pooling.

declare global {
  // eslint-disable-next-line no-var
  var __aesthoDb: ReturnType<typeof postgres> | undefined;
}

const url = process.env.DATABASE_URL;
if (!url) {
  // Defer the throw to first use so build-time imports don't fail when env
  // isn't loaded (e.g. running `next build` without .env.local).
  console.warn("[db] DATABASE_URL not set; queries will fail at runtime");
}

const client =
  global.__aesthoDb ??
  postgres(url || "postgres://localhost/missing", {
    prepare: false, // pgbouncer/pooler-friendly
    ssl: "require",
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__aesthoDb = client;
}

export const db = drizzle(client, { schema });
export { schema };
