// features/auth/server/auth.server.ts
import { serverRequest } from "@/shared/lib/http/server";
import type { User } from "@/shared/types/user";

export async function getUser(): Promise<User | null> {
  try {
    // Authorization 헤더와 Cookie 헤더는 serverRequest가 자동 처리
    const res = await serverRequest<User>("/api/auth/me");
    console.log("getUser 성공:", res);
    return res.data;
  } catch (e: any) {
    if (e?.status === 401) return null;
    console.error("getUser 실패:", e);
    return null;
  }
}
