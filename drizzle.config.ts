import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// Drizzle CLI runs outside Next.js, so we need to load .env.local explicitly.
config({ path: ".env.local" });
config({ path: ".env" });

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
} satisfies Config;
