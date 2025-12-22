"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function MonthOrderAmountInsight() {
  const router = useRouter();

  const summary = useMemo(
    () => ({ total: 12400000, count: 142 }),
    []
  );

  const topShops = useMemo(
    () => [
      { name: "채플꽃화", amount: 1200000 },
      { name: "앨로플라워", amount: 980000 },
      { name: "루비플라워", amount: 870000 },
    ],
    []
  );

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n) + "원";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">이번 달 발주 금액</h1>
      <p className="text-sm text-gray-500 mb-6">현 월 기준 발주 합계 및 상위 화원</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-white shadow border p-5">
          <div className="text-sm text-gray-500">월간 합계</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{formatWon(summary.total)}</div>
        </div>
        <div className="rounded-xl bg-white shadow border p-5">
          <div className="text-sm text-gray-500">주문 건수</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{summary.count}건</div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow border">
        <div className="px-5 py-4 border-b">
          <h2 className="text-base font-semibold text-gray-900">상위 발주 화원</h2>
        </div>
        <ul className="divide-y">
          {topShops.map((s) => (
            <li key={s.name} className="flex items-center justify-between px-5 py-3">
              <span className="text-gray-800">{s.name}</span>
              <span className="font-medium">{formatWon(s.amount)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => router.push("/admin-dashboard/orders?preset=this-month&kind=order&aggregate=amount")}
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
