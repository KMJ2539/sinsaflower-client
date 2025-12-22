"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type ChargeItem = {
  id: number;
  type: string;
  requestedAt: string;
  requestedAmount: number;
  chargedAmount: number;
  status: "요청" | "완료" | "실패";
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

function yearsOptions(range = 5) {
  const current = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => current - i);
}

export default function ChargesPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [status, setStatus] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ChargeItem[]>([]);

  const bankName = "국민";
  const accountNumber = "123456-01-234567";
  const accountHolder = "신사플라워·강민규";

  const fetchData = async (y: number, m: number, s: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/charges?year=${y}&month=${m}&status=${s}`);
      const json = await res.json();
      setData(json as ChargeItem[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year, month, status);
  }, [year, month, status]);

  const onSearch = () => fetchData(year, month, status);
  const onReset = () => {
    const n = new Date();
    setYear(n.getFullYear());
    setMonth(n.getMonth() + 1);
    setStatus("ALL");
  };

  const statusClass = (s: ChargeItem["status"]) => {
    if (s === "완료") return "text-green-600";
    if (s === "실패") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">충전하기</h1>

      {/* 상단 영역 – 충전 계좌 정보 + 카드충전 버튼 */}
     <div className="bg-green-50 border border-green-200 rounded-xl p-4 relative">
  <div className="flex justify-between items-start gap-4">
    {/* 계좌 정보 */}
    <div>
      <h2 className="font-semibold text-lg text-gray-800 mb-2">충전계좌</h2>
      <p className="text-gray-700 mb-1">
        {bankName} {accountNumber}
      </p>
      <p className="text-gray-700">예금주 : {accountHolder}</p>
    </div>

    {/* 버튼 세로 배치 */}
    <div className="flex flex-col gap-3 min-w-[220px]">
      <Link
        href="#"
        className="group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3
                   bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold tracking-tight
                   shadow-sm ring-1 ring-inset ring-emerald-500/20 transition
                   hover:from-emerald-600 hover:to-green-700 hover:shadow-md
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
      >
        <span aria-hidden className="text-lg">💳</span>
        <span>카드충전하기</span>
      </Link>

      <Link
        href="#"
        className="group inline-flex items-center justify-center gap-2 w-full rounded-xl px-6 py-3
                   bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold tracking-tight
                   shadow-sm ring-1 ring-inset ring-emerald-500/20 transition
                   hover:from-emerald-600 hover:to-green-700 hover:shadow-md
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
      >
        <span aria-hidden className="text-lg">🏦</span>
        <span>무통장 입금 충전하기</span>
      </Link>
    </div>
  </div>
</div>
      {/* 안내 문구 영역 */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
        <ul className="space-y-2 text-sm">
          <li className="text-red-600">
            가상계좌 [{bankName} {accountNumber} 예금주: 신사플라워·강민규] 으로 충전금액을 입금합니다.
          </li>
          <li className="text-gray-700">가상계좌로 입금 즉시 자동으로 충전 됩니다.</li>
          <li className="text-gray-700">입금 금액은 만원 단위로 입금 됩니다.</li>
        </ul>
      </div>

      {/* 검색/필터 영역 */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex flex-wrap items-center gap-3">
        <label className="font-medium text-gray-700">년도</label>
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
        >
          {yearsOptions(5).map((y) => (
            <option key={y} value={y}>{y} 년</option>
          ))}
        </select>

        <label className="font-medium text-gray-700 ml-2">월</label>
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m} 월</option>
          ))}
        </select>

        <label className="font-medium text-gray-700 ml-2">처리상태</label>
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">전체</option>
          <option value="요청">충전요청</option>
          <option value="완료">충전완료</option>
          <option value="실패">충전실패</option>
        </select>

        <button onClick={onSearch} className="sf-btn sf-btn--primary sf-btn--sm">검색</button>
        <button onClick={onReset} className="sf-btn sf-btn--gray sf-btn--sm">초기화</button>
      </div>

      {/* 충전 내역 테이블 */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">순번</th>
                <th className="px-3 py-2 text-left">내용</th>
                <th className="px-3 py-2 text-left">충전일</th>
                <th className="px-3 py-2 text-right">충전요청액</th>
                <th className="px-3 py-2 text-right">실제충전금액</th>
                <th className="px-3 py-2 text-left">상태</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-3 py-4" colSpan={6}>불러오는 중…</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td className="px-3 py-8 text-center" colSpan={6}>검색된 결과가 없습니다.</td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{row.id}</td>
                    <td className="px-3 py-2">{row.type}</td>
                    <td className="px-3 py-2">{row.requestedAt.slice(0, 10)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.requestedAmount)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(row.chargedAmount)}</td>
                    <td className={`px-3 py-2 ${statusClass(row.status)}`}>{row.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
