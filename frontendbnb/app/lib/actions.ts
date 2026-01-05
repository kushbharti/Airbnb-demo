"use server";
import { cookies } from "next/headers";

export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore
    .getAll()
    .find((c) => c.name === "session_userid");
  const userId = userCookie?.value;

  return userId ?? null;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("session_access_token")?.value || null;
  return accessToken;
}
