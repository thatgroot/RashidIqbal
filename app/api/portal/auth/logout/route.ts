import { NextRequest, NextResponse } from "next/server";
import { destroyClientSession, PORTAL_COOKIE } from "@/lib/portal/auth";

export async function POST(req: NextRequest) {
  const jwt = req.cookies.get(PORTAL_COOKIE)?.value;
  await destroyClientSession(jwt);
  const res = NextResponse.json({ success: true, redirect: "/portal/login" });
  res.cookies.set({
    name: PORTAL_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return res;
}
