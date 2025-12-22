"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  // Mock metrics; replace with API wiring later
  const metrics = useMemo(
    () => ({
      todayOrders: 12,
      todayReceives: 9,
      monthOrderAmount: 12400000,
      monthReceiveAmount: 11850000,
      totalUsers: 1283,
      pendingApprovals: 3,
      newMembersToday: 4,
    }),
    []
  );

  const recentOrders = useMemo(
    () => [
      { id: "O-25012", shop: "채플꽃화", product: "축하3단", amount: 38000, status: "접수" },
      { id: "O-25013", shop: "앨로플라워", product: "근조3단(대)", amount: 70000, status: "확인대기" },
      { id: "O-25014", shop: "윤플라워샵", product: "꽃바구니", amount: 60000, status: "배정완료" },
      { id: "O-25015", shop: "상신플라워", product: "동양란", amount: 90000, status: "접수" },
      { id: "O-25016", shop: "플라워드림", product: "근조5단", amount: 120000, status: "확인대기" },
    ],
    []
  );

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n) + "원";

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">운영자 대시보드</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          role="button"
          onClick={() => router.push("/admin-dashboard/insights/today-orders")}
          className="rounded-xl p-5 bg-white shadow border cursor-pointer hover:shadow-md transition-shadow"
          aria-label="오늘 발주 건수 상세 보기"
        >
          <div className="text-sm text-gray-500">오늘 발주 건수</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{metrics.todayOrders}</div>
        </div>
        <div
          role="button"
          onClick={() => router.push("/admin-dashboard/insights/today-receives")}
          className="rounded-xl p-5 bg-white shadow border cursor-pointer hover:shadow-md transition-shadow"
          aria-label="오늘 수주 건수 상세 보기"
        >
          <div className="text-sm text-gray-500">오늘 수주 건수</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{metrics.todayReceives}</div>
        </div>
        <div
          role="button"
          onClick={() => router.push("/admin-dashboard/insights/month-order-amount")}
          className="rounded-xl p-5 bg-white shadow border cursor-pointer hover:shadow-md transition-shadow"
          aria-label="이번 달 발주 금액 상세 보기"
        >
          <div className="text-sm text-gray-500">이번 달 발주 금액</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{formatWon(metrics.monthOrderAmount)}</div>
        </div>
        <div
          role="button"
          onClick={() => router.push("/admin-dashboard/insights/month-receive-amount")}
          className="rounded-xl p-5 bg-white shadow border cursor-pointer hover:shadow-md transition-shadow"
          aria-label="이번 달 수주 금액 상세 보기"
        >
          <div className="text-sm text-gray-500">이번 달 수주 금액</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{formatWon(metrics.monthReceiveAmount)}</div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl p-5 bg-white shadow border flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">회원 리스트</div>
            <div className="mt-1 text-3xl font-bold text-indigo-600">{metrics.totalUsers}</div>
          </div>
          <button onClick={() => router.push("/admin-dashboard/users")} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700">목록 보기</button>
        </div>
        <div className="rounded-xl p-5 bg-white shadow border flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">가입 승인 대기</div>
            <div className="mt-1 text-3xl font-bold text-emerald-600">{metrics.pendingApprovals}</div>
          </div>
          <button onClick={() => router.push("/admin-dashboard/members/approvals") } className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm shadow hover:bg-emerald-700">목록 보기</button>
        </div>
      </div>

      {/* Bottom: Recent orders + Action Required */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white shadow border">
            <div className="px-5 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">최근 발주 리스트</h2>
              <p className="text-xs text-gray-500">최근 5~10건 요약</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="px-5 py-3">주문번호</th>
                    <th className="px-5 py-3">화원명</th>
                    <th className="px-5 py-3">상품</th>
                    <th className="px-5 py-3">금액</th>
                    <th className="px-5 py-3">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="px-5 py-3 font-mono text-gray-800">{o.id}</td>
                      <td className="px-5 py-3">{o.shop}</td>
                      <td className="px-5 py-3">{o.product}</td>
                      <td className="px-5 py-3">{formatWon(o.amount)}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white shadow border">
            <div className="px-5 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">처리 필요</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">가입 승인 대기</div>
                <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  {metrics.pendingApprovals}건
                </span>
              </div>
              <div className="pt-2">
                <button onClick={() => router.push("/admin-dashboard/users")} className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white text-sm shadow hover:bg-gray-700">회원 관리로 이동</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
