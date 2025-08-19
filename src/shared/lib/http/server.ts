import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

/** ─────────────────────────
 *  서버 전용 쿠키 유틸 (get/set/delete)
 *  - next/headers의 cookies() 사용
 *  - 클라이언트의 document.cookie와 API가 다르므로 별도 제공
 *  ───────────────────────── */
export type ServerCookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

export async function getServerCookie(name: string): Promise<string | null> {
  const store = await cookies();
  return store.get(name)?.value ?? null;
}

export async function setServerCookie(
  name: string,
  value: string,
  options: ServerCookieOptions = {}
) {
  const store = await cookies();
  store.set({
    name,
    value,
    path: options.path ?? "/",
    expires: options.expires,
    maxAge: options.maxAge,
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
  });
}

export async function deleteServerCookie(
  name: string,
  options: { path?: string } = {}
) {
  const store = await cookies();
  // cookies().delete는 path 지정이 안 되므로 path가 있으면 만료로 덮어쓰기
  if (options.path) {
    store.set({ name, value: "", path: options.path, expires: new Date(0) });
  } else {
    store.delete(name);
  }
}

/** ─────────────────────────
 *  내부 헬퍼: 요청자 쿠키를 외부 API로 전달하기 위해 Cookie 헤더 직렬화
 *  ───────────────────────── */
function buildCookieHeader(all: { name: string; value: string }[]): string {
  return all.map((c) => `${c.name}=${c.value}`).join("; ");
}

/** ─────────────────────────
 *  서버 전용 HTTP 요청 래퍼 (fetch)
 *  - 호출자의 쿠키를 Cookie 헤더로 전달
 *  - accessToken 쿠키가 있으면 Authorization 자동 부착
 *  - 기본 cache: "no-store"
 *  - 실패 시 status, details를 가진 Error throw
 *  ───────────────────────── */
export async function serverRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
  opts?: { cache?: RequestCache }
): Promise<T> {
  const store = await cookies();

  const token = store.get("accessToken")?.value;
  const cookieHeader = buildCookieHeader(store.getAll());

  const headers: HeadersInit = {
    ...(init.headers || {}),
    ...(cookieHeader ? { cookie: cookieHeader } : {}),
  };

  // 호출부에서 이미 Authorization을 지정하지 않았다면 accessToken으로 넣어줌
  if (token && !("Authorization" in (init.headers || {}))) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: opts?.cache ?? "no-store",
    credentials: "include",
    headers,
  });

  if (!res.ok) {
    let text = "";
    try {
      text = await res.text();
    } catch {}
    let body: any = text;
    try {
      body = text ? JSON.parse(text) : text;
    } catch {}
    const err: any = new Error(
      body?.message || res.statusText || "Request failed"
    );
    err.status = res.status;
    err.details = body;
    throw err;
  }

  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}
