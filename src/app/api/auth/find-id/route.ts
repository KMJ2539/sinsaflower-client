import { NextRequest } from "next/server";

type Account = { id: string; createdAt: string };

function maskId(id: string) {
  if (id.length <= 3) return id[0] + "**";
  const head = id.slice(0, 3);
  const tail = id.slice(-3);
  return `${head}***${tail}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  if (!name || !phone) {
    return new Response(JSON.stringify({ success: false, message: "잘못된 요청입니다." }), { status: 400 });
  }

  // Mock behavior: choose result by phone last digit
  const last = parseInt(phone.slice(-1), 10);
  let accounts: Account[] = [];
  if (!isNaN(last)) {
    if (last % 3 === 0) {
      accounts = [];
    } else if (last % 3 === 1) {
      accounts = [
        { id: "sinsaflower", createdAt: "2024-01-03" },
      ];
    } else {
      accounts = [
        { id: "sinsaflower", createdAt: "2024-01-03" },
        { id: "testuser111", createdAt: "2023-06-20" },
      ];
    }
  }

  const masked = accounts.map((a) => ({ id: maskId(a.id), createdAt: a.createdAt }));
  return new Response(JSON.stringify({ success: true, accounts: masked }), {
    headers: { "Content-Type": "application/json" },
  });
}
