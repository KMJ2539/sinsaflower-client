import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const loginId = searchParams.get("loginId") || "";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  if (!loginId || !name || !phone) {
    return new Response(JSON.stringify({ success: false, message: "잘못된 요청입니다." }), { status: 400 });
  }
  // Mock rule: if phone last digit is even -> user exists, else not
  const last = parseInt(phone.slice(-1), 10);
  const exists = !isNaN(last) && last % 2 === 0;
  return new Response(JSON.stringify({ success: true, exists }), {
    headers: { "Content-Type": "application/json" },
  });
}
