import bcrypt from "bcryptjs";
import { db } from "@/db/client";
import { authOtpCodes } from "@/db/schema";
import { and, eq, gt, isNull } from "drizzle-orm";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const BCRYPT_ROUNDS = 10;

export function generateCode(): string {
  // 6-digit, zero-padded. crypto.getRandomValues for unbiased entropy.
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const n = buf[0]! % 1_000_000;
  return n.toString().padStart(6, "0");
}

export async function createOtpCode(opts: { email: string; ip?: string | undefined }) {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, BCRYPT_ROUNDS);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await db.insert(authOtpCodes).values({
    email: opts.email.toLowerCase().trim(),
    codeHash,
    expiresAt,
    ip: opts.ip ?? null,
  });

  return { code, expiresAt };
}

export async function verifyOtpCode(opts: { email: string; code: string }): Promise<boolean> {
  const email = opts.email.toLowerCase().trim();
  const now = new Date();

  // Pull every active (unused, non-expired) code for this email. There may
  // be multiple if the user requested several — bcrypt-compare each until
  // we find a match.
  const rows = await db
    .select()
    .from(authOtpCodes)
    .where(
      and(
        eq(authOtpCodes.email, email),
        gt(authOtpCodes.expiresAt, now),
        isNull(authOtpCodes.usedAt)
      )
    );

  for (const row of rows) {
    const ok = await bcrypt.compare(opts.code, row.codeHash);
    if (ok) {
      await db
        .update(authOtpCodes)
        .set({ usedAt: now })
        .where(eq(authOtpCodes.id, row.id));
      return true;
    }
  }
  return false;
}
