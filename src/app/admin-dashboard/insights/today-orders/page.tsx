"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function TodayOrdersInsight() {
  const router = useRouter();

  const items = useMemo(
    () => [
      { id: "O-25021", shop: "메리플라워", title: "축하3단", amount: 45000 },
      { id: "O-25022", shop: "봄꽃화원", title: "근조3단", amount: 70000 },
      { id: "O-25023", shop: "루비플라워", title: "꽃바구니", amount: 60000 },
    ],
    []
  );

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n) + "원";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">오늘 발주 건수</h1>
      <p className="text-sm text-gray-500 mb-6">오늘 날짜 기준 발주된 주문 목록과 요약입니다.</p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">필터: 오늘</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs">유형: 발주</span>
      </div>

      <div className="rounded-xl bg-white shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-5 py-3">주문번호</th>
              <th className="px-5 py-3">화원명</th>
              <th className="px-5 py-3">상품</th>
              <th className="px-5 py-3">금액</th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-5 py-3 font-mono text-gray-800">{o.id}</td>
                <td className="px-5 py-3">{o.shop}</td>
                <td className="px-5 py-3">{o.title}</td>
                <td className="px-5 py-3">{formatWon(o.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => router.push("/admin-dashboard/orders?preset=today&kind=order")}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm shadow hover:bg-gray-700"
        >
          통합 주문 리스트로 이동
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-white border text-sm shadow-sm hover:bg-gray-50"
        >
          대시보드로 돌아가기
        </button>
      </div>
    </div>
  );
}
