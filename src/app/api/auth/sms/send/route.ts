import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone } = body || {};
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, message: "잘못된 요청입니다." }), { status: 400 });
    }
    // Mock: always succeed; return a token to reference the request
    const token = `mock-${Date.now()}`;
    return new Response(
      JSON.stringify({ success: true, token, expiresIn: 300, resendIn: 60, message: "인증번호가 발송되었습니다." }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: "서버 오류" }), { status: 500 });
  }
}
