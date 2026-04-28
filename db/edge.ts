import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Edge-runtime Drizzle client. The Node-runtime postgres-js client in
// db/client.ts cannot run inside `runtime: "edge"` route handlers because
// it imports node:net. Use this one for /api/track and any other edge
// route. For Node runtimes (dashboard pages, regular API routes), keep
// using db/client.ts — pooler-backed and prepared statements work there.

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn("[db/edge] DATABASE_URL not set");
}

const sql = neon(url || "postgres://localhost/missing");
export const dbEdge = drizzle(sql, { schema });
export { schema };
