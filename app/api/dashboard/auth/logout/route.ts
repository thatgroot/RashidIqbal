import { NextRequest, NextResponse } from "next/server";
import { destroySession, SESSION_COOKIE } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const jwt = req.cookies.get(SESSION_COOKIE)?.value;
  await destroySession(jwt);
  const res = NextResponse.json({ success: true, redirect: "/dashboard/login" });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return res;
}
