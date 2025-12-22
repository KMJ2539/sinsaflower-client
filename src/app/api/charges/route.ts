import { NextRequest } from "next/server";

type ChargeItem = {
  id: number;
  type: "가상계좌 입금" | "카드 충전" | "관리자 조정";
  requestedAt: string; // YYYY-MM-DDTHH:mm:ss
  requestedAmount: number;
  chargedAmount: number;
  status: "요청" | "완료" | "실패";
};

function generateMock(year: number, month?: number, status?: string): ChargeItem[] {
  const items: ChargeItem[] = [];
  let id = 1;
  for (let m = 1; m <= 12; m++) {
    for (let k = 0; k < 6; k++) {
      const day = 3 + k;
      const types: ChargeItem["type"][] = ["가상계좌 입금", "카드 충전", "관리자 조정"];
      const type = types[(m + k) % types.length];
      const statuses: ChargeItem["status"][] = ["요청", "완료", "실패"];
      const st = statuses[(k + m) % statuses.length];
      const mm = String(m).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      const amountBase = 50000 + (m * 10000) + k * 5000;
      items.push({
        id: id++,
        type,
        requestedAt: `${year}-${mm}-${dd}T11:20:00`,
        requestedAmount: amountBase,
        chargedAmount: st === "완료" ? amountBase : amountBase - (st === "실패" ? 5000 : 0),
        status: st,
      });
    }
  }

  let filtered = items.filter((x) => true);
  if (month && month >= 1 && month <= 12) {
    filtered = filtered.filter((x) => parseInt(x.requestedAt.slice(5, 7), 10) === month);
  }
  if (status && status !== "ALL") {
    filtered = filtered.filter((x) => x.status === status);
  }

  // Sort latest first by requestedAt then id desc
  filtered.sort((a, b) => (a.requestedAt < b.requestedAt ? 1 : a.requestedAt > b.requestedAt ? -1 : b.id - a.id));
  return filtered;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const now = new Date();
  const year = parseInt(searchParams.get("year") || String(now.getFullYear()), 10);
  const month = searchParams.get("month") ? parseInt(searchParams.get("month")!, 10) : undefined;
  const status = searchParams.get("status") || "ALL";

  const data = generateMock(year, month, status);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
