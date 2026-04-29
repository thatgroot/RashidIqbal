/**
 * Migrate filesystem blog posts → CMS, then delete the markdown files.
 *
 * For each .md/.mdx file in content/blog/:
 *   1. If a row with the same slug already exists in cms_blog_posts,
 *      leave the DB alone (DB is source of truth from now on).
 *   2. If not present, parse the frontmatter + body and insert.
 *   3. Either way, delete the source markdown file.
 *
 * After this runs, the only place blog content lives is the DB.
 *
 *   bun scripts/migrate-blog-to-cms.ts
 */

import { config } from "dotenv";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";

config({ path: ".env.local" });
config({ path: ".env" });

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { db, schema } = require("../db/client") as typeof import("../db/client");
import { inArray } from "drizzle-orm";

async function main() {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) {
    console.log("content/blog/ does not exist — nothing to migrate.");
    return;
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  if (files.length === 0) {
    console.log("No markdown files in content/blog/ — nothing to migrate.");
    return;
  }

  const allSlugs = files.map((f) => f.replace(/\.(md|mdx)$/i, ""));

  // Find which slugs are already in the DB.
  const existingRows = await db
    .select({ slug: schema.cmsBlogPosts.slug })
    .from(schema.cmsBlogPosts)
    .where(inArray(schema.cmsBlogPosts.slug, allSlugs));
  const inDb = new Set(existingRows.map((r) => r.slug));

  console.log(
    `\n→ ${files.length} markdown files · ${inDb.size} already in DB · ${
      files.length - inDb.size
    } need to be moved\n`
  );

  let inserted = 0;
  let skipped = 0;
  let deleted = 0;

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const filePath = path.join(dir, file);

    if (!inDb.has(slug)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const fm = data as {
        title?: string;
        description?: string;
        date?: string;
        tags?: string[];
        category?: string;
        coverImage?: string;
        seoTitle?: string;
        seoDescription?: string;
        featured?: boolean;
        published?: boolean;
      };
      const publishedAt =
        fm.published === false
          ? null
          : fm.date
            ? new Date(fm.date)
            : new Date();

      await db.insert(schema.cmsBlogPosts).values({
        slug,
        title: fm.title ?? slug,
        description: fm.description ?? null,
        body: content.trim(),
        coverImage: fm.coverImage ?? null,
        seoTitle: fm.seoTitle ?? null,
        seoDescription: fm.seoDescription ?? null,
        tags: fm.tags ?? [],
        category: fm.category ?? "General",
        featured: !!fm.featured,
        publishedAt,
      });
      inserted++;
      console.log(`  + inserted ${slug}`);
    } else {
      skipped++;
    }

    // Delete the file regardless — DB is now source of truth.
    fs.unlinkSync(filePath);
    deleted++;
  }

  console.log(`\n  inserted: ${inserted}`);
  console.log(`  skipped (already in DB): ${skipped}`);
  console.log(`  deleted markdown files: ${deleted}`);

  // Try to remove the now-empty directory; ignore failure.
  try {
    const remaining = fs.readdirSync(dir);
    if (remaining.length === 0) {
      fs.rmdirSync(dir);
      console.log("  removed empty content/blog/ directory");
    } else {
      console.log(`  content/blog/ still has ${remaining.length} non-md files; leaving directory in place`);
    }
  } catch {
    /* ignore */
  }

  console.log("\n✓ Done.\n");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
