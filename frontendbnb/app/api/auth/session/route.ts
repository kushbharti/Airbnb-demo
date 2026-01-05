import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, accessToken, refreshToken } = await req.json();

  if (!userId || !accessToken || !refreshToken) {
    return NextResponse.json(
      { error: "Invalid session payload" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("session_userid", String(userId), {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  response.cookies.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  response.cookies.set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
