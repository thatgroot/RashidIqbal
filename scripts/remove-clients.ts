/**
 * One-shot: remove the case studies and testimonials for the 5 named
 * clients (Composio, RevolutionAI, Relace, Equals, Hevn).
 *
 * Idempotent — re-running deletes nothing because the rows are already
 * gone.
 *
 *   bun scripts/remove-clients.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { db, schema } = require("../db/client") as typeof import("../db/client");
import { inArray, or, ilike } from "drizzle-orm";

async function main() {
  const REMOVE_CASE_SLUGS = ["relace", "equals", "hevn"];

  // Testimonials — match by either company keyword in title field
  // (e.g. "CEO of RevolutionAI") or by the author name we know matches.
  const REMOVE_TESTIMONIAL_AUTHORS = [
    "Jonathan Clavet-Grenier", // RevolutionAI
    "Preston Zhou",            // Relace
    "Ben McRedmond",           // Equals
    "Peter Volnov",            // Hevn
    "Abhi Arya",               // Composio
  ];

  // Also nuke any testimonial where the title field mentions the brand,
  // even if the author isn't on the explicit list above.
  const TITLE_PATTERNS = ["%Composio%", "%RevolutionAI%", "%Relace%", "%Equals%", "%Hevn%"];

  console.log("\n→ Removing 5 clients from CMS\n");

  const deletedCases = await db
    .delete(schema.cmsCaseStudies)
    .where(inArray(schema.cmsCaseStudies.slug, REMOVE_CASE_SLUGS))
    .returning({ slug: schema.cmsCaseStudies.slug });
  console.log(`  ✓ case studies deleted: ${deletedCases.length}`);
  deletedCases.forEach((c) => console.log(`     - ${c.slug}`));

  const deletedByAuthor = await db
    .delete(schema.cmsTestimonials)
    .where(inArray(schema.cmsTestimonials.author, REMOVE_TESTIMONIAL_AUTHORS))
    .returning({ author: schema.cmsTestimonials.author });

  const titleClauses = TITLE_PATTERNS.map((p) =>
    ilike(schema.cmsTestimonials.title, p)
  );
  const orClause = titleClauses.length > 1 ? or(...titleClauses) : titleClauses[0];
  const deletedByTitle = orClause
    ? await db
        .delete(schema.cmsTestimonials)
        .where(orClause)
        .returning({ author: schema.cmsTestimonials.author })
    : [];

  const all = [...deletedByAuthor, ...deletedByTitle];
  console.log(`  ✓ testimonials deleted: ${all.length}`);
  all.forEach((t) => console.log(`     - ${t.author}`));

  console.log("\n✓ Done.\n");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
