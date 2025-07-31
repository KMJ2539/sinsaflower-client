import { cookies } from "next/headers";

// 서버 사이드용 getUser 함수
export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // 중요: SSR에서 최신 정보 받아오도록 캐시 비활성화
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("getUser 실패:", error);
    return null;
  }
}
