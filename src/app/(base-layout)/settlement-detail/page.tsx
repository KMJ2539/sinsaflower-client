"use client";

import React, { useEffect, useMemo, useState } from "react";
// import Link from "next/link";

function formatCurrency(n: number) {
  return n.toLocaleString();
}

export default function SettlementDetailPage() {
  const nowDate = new Date();
  const [now, setNow] = useState<string>(new Date().toLocaleString());
  // Range: start (year, month) ~ end (year, month)
  const [startYear, setStartYear] = useState<number>(nowDate.getFullYear());
  const [startMonth, setStartMonth] = useState<number>(nowDate.getMonth() + 1);
  const [endYear, setEndYear] = useState<number>(nowDate.getFullYear());
  const [endMonth, setEndMonth] = useState<number>(nowDate.getMonth() + 1);

  type Summary = {
    totalOrder: number;
    canceledOrder: number;
    totalReceive: number;
    originalAmount: number;
    canceledReceive: number;
    commission: number;
    withdrawFee: number;
    deduction: number;
    carryOver: number;
    finalTotal: number;
  };

  const [summary, setSummary] = useState<Summary>({
    totalOrder: 0,
    canceledOrder: 0,
    totalReceive: 0,
    originalAmount: 0,
    canceledReceive: 0,
    commission: 0,
    withdrawFee: 0,
    deduction: 0,
    carryOver: 0,
    finalTotal: 0,
  });

  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(t);
  }, []);

  const onSearch = () => {
    // Dummy range aggregator — replace with API call using start/end
    const startKey = startYear * 12 + (startMonth - 1);
    const endKey = endYear * 12 + (endMonth - 1);
    const monthsCount = Math.max(1, endKey - startKey + 1);

    const base: Summary = {
      totalOrder: 125000,
      canceledOrder: 5000,
      totalReceive: 140000,
      originalAmount: 120000,
      canceledReceive: 2000,
      commission: 4200,
      withdrawFee: 800,
      deduction: -8400,
      carryOver: 8400,
      finalTotal: 0,
    };

    // Scale numbers by monthsCount to simulate range aggregation
    const sample: Summary = {
      totalOrder: base.totalOrder * monthsCount,
      canceledOrder: base.canceledOrder * monthsCount,
      totalReceive: base.totalReceive * monthsCount,
      originalAmount: base.originalAmount * monthsCount,
      canceledReceive: base.canceledReceive * monthsCount,
      commission: base.commission * monthsCount,
      withdrawFee: base.withdrawFee * monthsCount,
      deduction: base.deduction * monthsCount,
      carryOver: base.carryOver * monthsCount,
      finalTotal: 0,
    };
    sample.finalTotal = sample.totalReceive - sample.commission - Math.abs(sample.deduction) - sample.totalOrder;
    setSummary(sample);
  };

  const years = Array.from({ length: 6 }).map((_, i) => nowDate.getFullYear() - i);

  type Transaction = {
    id: string;
    type: string; // 구분
    orderNo: string;
    detail: string;
    date: string; // "YYYY-MM-DD HH:mm"
    amount: number;
  };

  const [transactions] = useState<Transaction[]>([
    { id: "T-001", type: "발주", orderNo: "ORD-1001", detail: "상품A 발주", date: "2025-12-01 09:30", amount: 125000 },
    { id: "T-002", type: "수주", orderNo: "ORD-1002", detail: "상품B 수주", date: "2025-12-02 14:10", amount: 98000 },
    { id: "T-003", type: "발주", orderNo: "ORD-1003", detail: "상품C 발주", date: "2025-12-03 11:05", amount: 152000 },
    { id: "T-004", type: "수주", orderNo: "ORD-1004", detail: "상품D 수주", date: "2025-12-04 16:45", amount: 73000 },
    { id: "T-005", type: "발주", orderNo: "ORD-1005", detail: "상품E 발주", date: "2025-12-05 08:20", amount: 204000 },
    { id: "T-006", type: "수주", orderNo: "ORD-1006", detail: "상품F 수주", date: "2025-12-06 13:35", amount: 119000 },
    { id: "T-007", type: "발주", orderNo: "ORD-1007", detail: "상품G 발주", date: "2025-12-07 10:00", amount: 87000 },
    { id: "T-008", type: "수주", orderNo: "ORD-1008", detail: "상품H 수주", date: "2025-12-08 17:25", amount: 143000 },
    { id: "T-009", type: "발주", orderNo: "ORD-1009", detail: "상품I 발주", date: "2025-12-09 12:15", amount: 96000 },
    { id: "T-010", type: "수주", orderNo: "ORD-1010", detail: "상품J 수주", date: "2025-12-10 15:50", amount: 158000 },
  ]);

  const [sortBy, setSortBy] = useState<"type" | "date" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleSort = (key: "type" | "date") => {
    setSortBy(key);
    setSortDir((d) => (sortBy === key && d === "asc" ? "desc" : "asc"));
  };

  const sortedTransactions = useMemo(() => {
    if (!sortBy) return transactions;
    const dir = sortDir === "asc" ? 1 : -1;
    const parseDate = (s: string) => new Date(s.replace(" ", "T")).getTime();
    return [...transactions].sort((a, b) => {
      if (sortBy === "type") return a.type.localeCompare(b.type) * dir;
      return (parseDate(a.date) - parseDate(b.date)) * dir;
    });
  }, [transactions, sortBy, sortDir]);

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-lg">▾</span>
          <span className="font-semibold">정산조회</span>
        </div>
        <div className="text-xs text-gray-500">{now}</div>
      </div>

      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">{startYear} 년 {startMonth}월 ~ {endYear} 년 {endMonth}월</h1>
      </div>

      {/* Account info */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="text-sm text-gray-700">
          ● 본부계좌: 국민은행 123-456-789 예금주: 본부예금주&nbsp;&nbsp; ● 회원계좌: 농협 352-1961-156673 예금주: 노광택
        </div>
        <div>
          <a href="#" target="_blank" rel="noreferrer" className="text-xs inline-block bg-gray-100 px-2 py-1 rounded border">플라워뱅크</a>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <table className="w-full text-sm table-fixed border-collapse">
          <tbody>
            {/* 정산범위 */}
            <tr className="border-b">
              <td className="w-48 font-medium py-3">정산범위</td>
              <td className="py-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="border px-2 py-1 text-sm rounded">
                      {years.map((y) => (
                        <option key={y} value={y}>{y} 년</option>
                      ))}
                    </select>
                    <select value={startMonth} onChange={(e) => setStartMonth(Number(e.target.value))} className="border px-2 py-1 text-sm rounded">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} 월</option>
                      ))}
                    </select>
                  </div>
                  <span className="text-gray-600">~</span>
                  <div className="flex items-center gap-2">
                    <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className="border px-2 py-1 text-sm rounded">
                      {years.map((y) => (
                        <option key={y} value={y}>{y} 년</option>
                      ))}
                    </select>
                    <select value={endMonth} onChange={(e) => setEndMonth(Number(e.target.value))} className="border px-2 py-1 text-sm rounded">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} 월</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={onSearch} className="ml-2 sf-btn sf-btn--primary text-sm">검색</button>
                </div>
              </td>
            </tr>

            {/* 총발주금액 */}
            <tr className="border-b">
              <td className="font-medium py-3">총발주금액</td>
              <td className="py-3">{formatCurrency(summary.totalOrder)} (취소금액: {formatCurrency(summary.canceledOrder)})</td>
            </tr>

            {/* 총수주금액 */}
            <tr className="border-b">
              <td className="font-medium py-3">총수주금액</td>
              <td className="py-3">{formatCurrency(summary.totalReceive)} (원청금액: {formatCurrency(summary.originalAmount)}) (취소금액: {formatCurrency(summary.canceledReceive)})</td>
            </tr>

            {/* 수주수수료 */}
            <tr className="border-b">
              <td className="font-medium py-3">수주수수료</td>
              <td className="py-3">{formatCurrency(summary.commission)}</td>
            </tr>

            {/* 출금수수료 */}
            <tr className="border-b">
              <td className="font-medium py-3">출금수수료</td>
              <td className="py-3">{formatCurrency(summary.withdrawFee)}</td>
            </tr>

            {/* 기타공제금액 */}
            <tr className="border-b">
              <td className="font-medium py-3">기타공제금액</td>
              <td className={`py-3 ${summary.deduction < 0 ? 'text-red-600' : ''}`}>{summary.deduction < 0 ? `-${formatCurrency(Math.abs(summary.deduction))}` : formatCurrency(summary.deduction)}</td>
            </tr>

            {/* 계산식 */}
            <tr className="border-b">
              <td className="font-medium py-3">계산식</td>
              <td className="py-3">
                (수주금액) {formatCurrency(summary.totalReceive)} - (수주수수료) {formatCurrency(summary.commission)} - (공제금액) <span className="text-red-600">{summary.deduction < 0 ? `-${formatCurrency(Math.abs(summary.deduction))}` : formatCurrency(summary.deduction)}</span> - (발주금액) {formatCurrency(summary.totalOrder)} = <span className="text-red-600 font-bold">{formatCurrency(summary.finalTotal)}</span>
              </td>
            </tr>

            {/* 입금내역 */}
            <tr className="border-b">
              <td className="font-medium py-3">입금내역</td>
              <td className="py-3">(상세 거래 리스트에서 확인)</td>
            </tr>

            {/* 총정산금 */}
            <tr>
              <td className="font-medium py-3">총정산금</td>
              <td className="py-3"><span className="text-red-600 font-bold">{formatCurrency(summary.finalTotal)}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 거래 내역 리스트 테이블 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">거래 내역</h3>
        <table className="w-full text-sm table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-2 text-left w-12">순번</th>
              <th
                className="py-2 text-left w-24 cursor-pointer select-none"
                onClick={() => toggleSort("type")}
                title="구분 정렬 토글"
              >
                구분
                <span className={`ml-1 text-xs ${sortBy === "type" ? "" : "text-gray-400"}`}>
                  {sortBy === "type" ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
                </span>
              </th>
              <th className="py-2 text-left">주문번호</th>
              <th className="py-2 text-left">내역</th>
              <th
                className="py-2 text-left w-40 cursor-pointer select-none"
                onClick={() => toggleSort("date")}
                title="거래일 정렬 토글"
              >
                거래일
                <span className={`ml-1 text-xs ${sortBy === "date" ? "" : "text-gray-400"}`}>
                  {sortBy === "date" ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
                </span>
              </th>
              <th className="py-2 text-right w-36">금액</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((t, idx) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{t.type}</td>
                <td className="py-2">{t.orderNo}</td>
                <td className="py-2">{t.detail}</td>
                <td className="py-2">{t.date}</td>
                <td className="py-2 text-right">{formatCurrency(t.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
