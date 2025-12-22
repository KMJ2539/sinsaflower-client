import { NextRequest } from "next/server";

type InvoiceItem = {
  id: number;
  type: "매입 계산서" | "매입 세금 계산서" | "매출 계산서" | "매출 세금 계산서";
  itemName: string;
  issuedDate: string; // YYYY-MM-DD
  partnerName: string;
  businessNumber: string;
  amount: number;
  printUrl: string;
  printedAt: string | null; // YYYY-MM-DD or null
};

function generateMock(year: number): InvoiceItem[] {
  const types: InvoiceItem["type"][] = [
    "매입 계산서",
    "매입 세금 계산서",
    "매출 계산서",
    "매출 세금 계산서",
  ];

  const items: InvoiceItem[] = [];
  let id = 1;
  for (let m = 1; m <= 12; m++) {
    for (let k = 0; k < 3; k++) {
      const type = types[(m + k) % types.length];
      const month = String(m).padStart(2, "0");
      const day = String(25 + (k % 5)).padStart(2, "0");
      items.push({
        id: id++,
        type,
        itemName: `${year}년 ${month}월 ${type.includes("매출") ? "매출" : "매입"} 내역`,
        issuedDate: `${year}-${month}-${day}`,
        partnerName: "주식회사 신사플라워",
        businessNumber: "737-86-02900",
        amount: 10000 * (m + k + (type.includes("세금") ? 2 : 1)),
        printUrl: `/invoices/${year}-${month}-${id}/print`,
        printedAt: k % 2 === 0 ? null : `${year}-${month}-${String(28).padStart(2, "0")}`,
      });
    }
  }
  // Sort by id descending to match requested ordering
  return items.sort((a, b) => b.id - a.id);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const now = new Date();
  const year = yearParam ? parseInt(yearParam, 10) : now.getFullYear();
  const data = generateMock(year);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
