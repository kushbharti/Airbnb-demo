import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session_userid", "", {
    httpOnly: true,
    secure: false, // true in production
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("session_access_token", "", {
    httpOnly: true,
    secure: false,
    maxAge: 0,
    path: "/",
  });

  

  response.cookies.set("session_refresh_token", "", {
    httpOnly: true,
    secure: false,
    maxAge: 0,
    path: "/",
  });

  return response;
}
