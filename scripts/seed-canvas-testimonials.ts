/**
 * Adds 9 new testimonials to cms_testimonials. Idempotent — keyed on
 * (author, first 50 chars of quote). Re-running is safe.
 *
 *   bun scripts/seed-canvas-testimonials.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { db, schema } = require("../db/client") as typeof import("../db/client");

const NEW_TESTIMONIALS = [
  {
    quote:
      "This partnership has effectively redefined GAM's identity and product. Aligning them with our core values of scientific innovation and trustworthiness in the healthcare space.",
    author: "Will Bruhn",
    title: "Co-Founder of GAM",
    avatarUrl:
      "https://framerusercontent.com/images/tALhpZjylDe28jXvUvRMOV01XuU.jpeg?width=600&height=600",
    accent: "bg-emerald-600",
    rating: 5,
    sortOrder: 200,
  },
  {
    quote:
      "Rashid Iqbal brought our brand to life with expert design and professionalism, helping us stand out and connect with clients. His work made a real impact, and I highly recommend him.",
    author: "Olivia Parkes",
    title: "CEO of TheSystemsBoss",
    avatarUrl:
      "https://framerusercontent.com/images/R61plDW6X3ecM1F8k2NbttaxOs.png?width=1044&height=1121",
    accent: "bg-rose-500",
    rating: 5,
    sortOrder: 210,
  },
  {
    quote:
      "Rashid Iqbal's process was hugely beneficial in defining our brand and business goals. The subsequent designs helped us demonstrate our position as a credible leader in the industry. We're incredibly happy with the results.",
    author: "Craig MacAlpine",
    title: "Founder of Expert Insights",
    avatarUrl:
      "https://framerusercontent.com/images/MQ8avZC4eK2RNywdx19TSJt14.jpeg?width=800&height=754",
    accent: "bg-indigo-600",
    rating: 5,
    sortOrder: 220,
  },
  {
    quote:
      "Rashid Iqbal delivered sleek, user-friendly product and website designs that perfectly captured our brand. The final result looks amazing, functions flawlessly, and exceeded our expectations. Highly recommend!",
    author: "Tony Pao",
    title: "Co-Founder of SocialLead",
    avatarUrl:
      "https://framerusercontent.com/images/pidrl18jXMYGFRR1wQvT5GBxt0.jpeg?width=766&height=800",
    accent: "bg-sky-600",
    rating: 5,
    sortOrder: 230,
  },
  {
    quote:
      "Rashid Iqbal is really the best designer you can get. He pays attention to details, acts professionally, and asks insightful questions that ultimately lead to outstanding designs that match the ethos of the brand.",
    author: "Jonathan Clavet-Grenier",
    title: "CEO of RevolutionAI",
    avatarUrl:
      "https://framerusercontent.com/images/OUqdOKVjHKXIZbsd1C63N5Os.jpeg?width=390&height=390",
    accent: "bg-violet-600",
    rating: 5,
    sortOrder: 240,
  },
  {
    quote:
      "The branding workshop was a concise and valuable way to refine our brand. Rashid Iqbal simplified complex ideas into clear, visually appealing designs, and we were thrilled with the outcome.",
    author: "Zach van Driel",
    title: "Co-Founder of Miri Marketing",
    avatarUrl:
      "https://framerusercontent.com/images/vDr4z0i2ojGlcZvJJAjCJVcG3AU.jpeg?width=373&height=406",
    accent: "bg-amber-600",
    rating: 5,
    sortOrder: 250,
  },
  {
    quote:
      "Rashid Iqbal consistently delivers top-quality work and guided our team on brand implementation. His strategy workshop was engaging and results-driven, and his process was seamless and flexible throughout.",
    author: "Gabriela Gocheva",
    title: "CEO of Autism Spectrum Reach",
    avatarUrl:
      "https://framerusercontent.com/images/yjif4EYgLCuorC0sfgXev92mAMA.jpeg?width=800&height=800",
    accent: "bg-fuchsia-600",
    rating: 5,
    sortOrder: 260,
  },
  {
    quote:
      "Rashid Iqbal's brand workshop was remarkably enjoyable and exactly what we needed. The result was a clearly defined strategic direction and a brand identity, and website that positioned us as a leading productivity platform.",
    author: "Malte Scholz",
    title: "Founder of airfocus",
    avatarUrl:
      "https://framerusercontent.com/images/q7YvovqgBlsqf28YT5SIBlImo.webp?width=400&height=400",
    accent: "bg-teal-600",
    rating: 5,
    sortOrder: 270,
  },
  {
    quote:
      "Rashid Iqbal has been a valued contributor to Pharsalus, playing a key role in our brand building and content creation, particularly with our logo, website, and early decks. Personable and easy to work with, we highly recommend him.",
    author: "Anthony Ghosn",
    title: "Managing Partner at Pharsalus",
    avatarUrl:
      "https://framerusercontent.com/images/EMzCU3Dl7SEaGsvsOse0gkf9Do.png?width=849&height=867",
    accent: "bg-zinc-700",
    rating: 5,
    sortOrder: 280,
  },
];

async function main() {
  console.log("\n→ Seeding canvas testimonials\n");

  const existing = await db
    .select({
      author: schema.cmsTestimonials.author,
      quote: schema.cmsTestimonials.quote,
    })
    .from(schema.cmsTestimonials);
  const seen = new Set(
    existing.map((r) => `${r.author}::${r.quote.slice(0, 50)}`)
  );

  const fresh = NEW_TESTIMONIALS.filter(
    (t) => !seen.has(`${t.author}::${t.quote.slice(0, 50)}`)
  ).map((t) => ({ ...t, publishedAt: new Date() }));

  if (fresh.length === 0) {
    console.log("  · all 9 already present, nothing inserted");
  } else {
    await db.insert(schema.cmsTestimonials).values(fresh);
    console.log(`  ✓ inserted ${fresh.length}`);
  }

  console.log("\n✓ Done.\n");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
