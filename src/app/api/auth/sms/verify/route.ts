import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { phone, code, token } = await req.json();
    if (!phone || !code || !token) {
      return new Response(JSON.stringify({ success: false, message: "잘못된 요청입니다." }), { status: 400 });
    }
    // Mock policy: accept code '123456'
    const ok = String(code) === "123456";
    if (!ok) {
      return new Response(JSON.stringify({ success: false, message: "인증번호가 올바르지 않습니다." }), { status: 400 });
    }
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: "서버 오류" }), { status: 500 });
  }
}
