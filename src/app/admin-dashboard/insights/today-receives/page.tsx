"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodayReceivesInsight() {
  const router = useRouter();

  const items = useMemo(
    () => [
      { id: "R-12031", shop: "라라플라워", title: "축하3단", amount: 50000, date: "2025-12-21" },
      { id: "R-12032", shop: "로즈가든", title: "꽃바구니", amount: 65000, date: "2025-12-22" },
    ],
    []
  );

  const formatWon = (n: number) => new Intl.NumberFormat("ko-KR").format(n) + "원";
  const todayStr = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(todayStr);

  const [sortBy, setSortBy] = useState<"title" | "amount" | "date">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const SortButtons = ({ active, dir, onAsc, onDesc }: { active: boolean; dir: "asc" | "desc"; onAsc: () => void; onDesc: () => void }) => (
    <span className="inline-flex items-center ml-1 gap-0.5 align-middle">
      <button
        type="button"
        className={`leading-none text-[10px] px-1 py-0.5 rounded ${active && dir === "asc" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
        title="오름차순"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAsc(); }}
      >
        ▲
      </button>
      <button
        type="button"
        className={`leading-none text-[10px] px-1 py-0.5 rounded ${active && dir === "desc" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
        title="내림차순"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDesc(); }}
      >
        ▼
      </button>
    </span>
  );

  const filtered = useMemo(() => {
    const s = startDate ? new Date(startDate).getTime() : -Infinity;
    const e = endDate ? new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1 : Infinity;
    const base = items.filter((it) => {
      const t = new Date(it.date).getTime();
      return t >= s && t <= e;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    return [...base].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title, "ko") * dir;
      if (sortBy === "amount") return (a.amount - b.amount) * dir;
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
    });
  }, [items, startDate, endDate, sortBy, sortDir]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">수주 건수</h1>
      <p className="text-sm text-gray-500 mb-6">선택한 기간 기준 수주된 주문 목록과 요약입니다.</p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-2 py-1" />
          <span>~</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs">유형: 수주</span>
      </div>

      <div className="rounded-xl bg-white shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-5 py-3">주문번호</th>
              <th className="px-5 py-3">화원명</th>
              <th className="px-5 py-3 select-none">
                <span className="inline-flex items-center">
                  상품
                  <SortButtons
                    active={sortBy === "title"}
                    dir={sortDir}
                    onAsc={() => { setSortBy("title"); setSortDir("asc"); }}
                    onDesc={() => { setSortBy("title"); setSortDir("desc"); }}
                  />
                </span>
              </th>
              <th className="px-5 py-3 select-none">
                <span className="inline-flex items-center">
                  금액
                  <SortButtons
                    active={sortBy === "amount"}
                    dir={sortDir}
                    onAsc={() => { setSortBy("amount"); setSortDir("asc"); }}
                    onDesc={() => { setSortBy("amount"); setSortDir("desc"); }}
                  />
                </span>
              </th>
              <th className="px-5 py-3 select-none">
                <span className="inline-flex items-center">
                  수주 날짜
                  <SortButtons
                    active={sortBy === "date"}
                    dir={sortDir}
                    onAsc={() => { setSortBy("date"); setSortDir("asc"); }}
                    onDesc={() => { setSortBy("date"); setSortDir("desc"); }}
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-5 py-3 font-mono text-gray-800">{o.id}</td>
                <td className="px-5 py-3">{o.shop}</td>
                <td className="px-5 py-3">{o.title}</td>
                <td className="px-5 py-3">{formatWon(o.amount)}</td>
                <td className="px-5 py-3">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => router.push("/admin-dashboard/orders?preset=today&kind=receive")}
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
