"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type OrderRow = {
  id: string;
  date: string; // YYYY-MM-DD
  buyer: string; // 발주자
  seller: string; // 수주자
  region: string;
  orderAmount: number;
  receiveAmount: number;
  status: "접수" | "확인대기" | "배정완료" | "미확인" | "취소";
};

const SAMPLE: OrderRow[] = [
  { id: "O-25012", date: "2025-12-13", buyer: "다경플라워", seller: "채플꽃화", region: "서울특별시 강남구", orderAmount: 38000, receiveAmount: 38000, status: "접수" },
  { id: "O-25013", date: "2025-12-12", buyer: "다경플라워", seller: "앨로플라워", region: "경기도 성남시", orderAmount: 70000, receiveAmount: 70000, status: "확인대기" },
  { id: "O-25014", date: "2025-12-12", buyer: "다경플라워", seller: "윤플라워샵", region: "서울특별시 서초구", orderAmount: 60000, receiveAmount: 60000, status: "배정완료" },
  { id: "O-25015", date: "2025-12-11", buyer: "다경플라워", seller: "상신플라워", region: "서울특별시 강남구", orderAmount: 90000, receiveAmount: 0, status: "미확인" },
  { id: "O-25016", date: "2025-12-10", buyer: "다경플라워", seller: "플라워드림", region: "제주특별자치도 제주시", orderAmount: 120000, receiveAmount: 120000, status: "확인대기" },
  { id: "O-25017", date: "2025-12-09", buyer: "다경플라워", seller: "상신플라워", region: "서울특별시 동작구", orderAmount: 38000, receiveAmount: 38000, status: "취소" },
];

const STATUSES: Array<OrderRow["status"] | "ALL"> = [
  "ALL",
  "접수",
  "확인대기",
  "배정완료",
  "미확인",
  "취소",
];

export default function AdminOrdersPage() {
  const params = useSearchParams();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<OrderRow["status"] | "ALL">("ALL");
  const [region, setRegion] = useState("");
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [selected, setSelected] = useState<OrderRow | null>(null);

  useEffect(() => {
    const s = params.get("status");
    if (s && (STATUSES as string[]).includes(s)) setStatus(s as OrderRow["status"] | "ALL");
  }, [params]);

  const regions = useMemo(
    () => Array.from(new Set(SAMPLE.map((r) => r.region))),
    []
  );

  const filtered = useMemo(() => {
    const fromD = from ? new Date(from) : null;
    const toD = to ? new Date(to) : null;

    return SAMPLE.filter((r) => {
      const d = new Date(r.date);
      if (fromD && d < fromD) return false;
      if (toD && d > toD) return false;
      if (status !== "ALL" && r.status !== status) return false;
      if (region && r.region !== region) return false;
      if (buyer && !r.buyer.includes(buyer)) return false;
      if (seller && !r.seller.includes(seller)) return false;
      return true;
    });
  }, [from, to, status, region, buyer, seller]);

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n) + "원";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b">
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2 flex items-center gap-2">
            <label className="text-xs text-gray-500 w-16">From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" />
            <label className="text-xs text-gray-500 w-10 text-center">To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" />
          </div>
          <div>
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderRow["status"] | "ALL")} className="border rounded px-2 py-1 text-sm w-full">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="border rounded px-2 py-1 text-sm w-full">
              <option value="">전체 지역</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <input placeholder="발주자" value={buyer} onChange={(e) => setBuyer(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" />
          </div>
          <div>
            <input placeholder="수주자" value={seller} onChange={(e) => setSeller(e.target.value)} className="border rounded px-2 py-1 text-sm w-full" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-6">
        <div className="rounded-xl bg-white shadow border overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3">주문번호</th>
                <th className="px-5 py-3">발주자</th>
                <th className="px-5 py-3">수주자</th>
                <th className="px-5 py-3">배송지역</th>
                <th className="px-5 py-3">발주금액</th>
                <th className="px-5 py-3">수주금액</th>
                <th className="px-5 py-3">상태</th>
                <th className="px-5 py-3">일자</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(r)}>
                  <td className="px-5 py-3 font-mono text-gray-800">{r.id}</td>
                  <td className="px-5 py-3">{r.buyer}</td>
                  <td className="px-5 py-3">{r.seller}</td>
                  <td className="px-5 py-3 whitespace-nowrap">{r.region}</td>
                  <td className="px-5 py-3">{formatWon(r.orderAmount)}</td>
                  <td className="px-5 py-3">{formatWon(r.receiveAmount)}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">{r.status}</span>
                  </td>
                  <td className="px-5 py-3">{r.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-500">조건에 해당하는 주문이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {selected && (
        <div className="fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl border-l p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">주문 상세</h3>
              <button className="text-sm text-gray-500" onClick={() => setSelected(null)}>닫기</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">주문번호</span><span className="font-mono">{selected.id}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">일자</span><span>{selected.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">발주자</span><span>{selected.buyer}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">수주자</span><span>{selected.seller}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">배송지역</span><span className="text-right">{selected.region}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">발주금액</span><span>{formatWon(selected.orderAmount)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">수주금액</span><span>{formatWon(selected.receiveAmount)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">상태</span><span>{selected.status}</span></div>
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white text-sm">상세 페이지로 이동</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
