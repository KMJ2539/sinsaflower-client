"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type InvoiceItem = {
  id: number;
  type: string;
  itemName: string;
  issuedDate: string; // YYYY-MM-DD
  partnerName: string;
  businessNumber: string;
  amount: number;
  printUrl: string;
  printedAt: string | null;
};

const yearsOptions = (range = 5) => {
  const current = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => current - i);
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

function toYYMMDD(dateStr: string) {
  if (!dateStr) return "-";
  const [y, m, d] = dateStr.split("-");
  return `${String(y).slice(2)}-${m}-${d}`;
}

export default function InvoiceHistoryPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InvoiceItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const yearLabel = useMemo(() => `${year}년`, [year]);

  const fetchData = async (y: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices?year=${y}`);
      const json = await res.json();
      setData(json as InvoiceItem[]);
      setCurrentPage(1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year);
    // Fetch whenever year changes to keep data in sync
  }, [year]);

  const resetToCurrent = () => {
    const current = new Date().getFullYear();
    setYear(current);
    fetchData(current);
  };

  const onSearch = () => fetchData(year);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / pageSize));
  }, [data.length]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">계산서 발행내역</h1>

      {/* 상단 필터 영역 */}
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
        <button
          onClick={onSearch}
          className="sf-btn sf-btn--primary sf-btn--sm"
        >
          검색
        </button>
        <button
          onClick={resetToCurrent}
          className="sf-btn sf-btn--gray sf-btn--sm"
        >
          초기화
        </button>
      </div>

      {/* 제목/부가 영역 */}
      <div className="text-center space-y-2">
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link href="#" className="text-primary hover:underline">
            [{yearLabel} 매출 계산서 일괄 저장]
          </Link>
          <Link href="#" className="text-primary hover:underline">
            [{yearLabel} 매입 계산서 일괄 저장]
          </Link>
          <Link href="#" className="text-primary hover:underline">
            [{yearLabel} 매출 세금 계산서 일괄 저장]
          </Link>
          <Link href="#" className="text-primary hover:underline">
            [{yearLabel} 매입 세금 계산서 일괄 저장]
          </Link>
        </div>
        <div className="text-gray-700">
          <Link href="#" className="hover:underline">
           {year}년도계산서일괄출력
          </Link>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">순번</th>
                <th className="px-3 py-2 text-left">구분</th>
                <th className="px-3 py-2 text-left">품목</th>
                <th className="px-3 py-2 text-left">발행일</th>
                <th className="px-3 py-2 text-left">거래처명</th>
                <th className="px-3 py-2 text-left">사업자번호</th>
                <th className="px-3 py-2 text-right">발행금액</th>
                <th className="px-3 py-2 text-center">출력</th>
                <th className="px-3 py-2 text-left">출력일시</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-3 py-4" colSpan={9}>불러오는 중…</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td className="px-3 py-4" colSpan={9}>데이터가 없습니다.</td>
                </tr>
              ) : (
                paginatedData.map((row) => {
                  const seq = row.id; // already desc sorted by API
                  const isSales = row.type.includes("매출");
                  const typeClass = isSales ? "text-red-600" : "text-blue-600";
                  return (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{seq}</td>
                      <td className={`px-3 py-2 ${typeClass}`}>{row.type}</td>
                      <td className="px-3 py-2">{row.itemName}</td>
                      <td className="px-3 py-2">{toYYMMDD(row.issuedDate)}</td>
                      <td className="px-3 py-2">{row.partnerName}</td>
                      <td className="px-3 py-2">{row.businessNumber}</td>
                      <td className="px-3 py-2 text-right">{formatCurrency(row.amount)}</td>
                      <td className="px-3 py-2 text-center">
                        <a
                          className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                          href={row.printUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          출력
                        </a>
                      </td>
                      <td className="px-3 py-2">{row.printedAt || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        <div className="p-3 border-t border-gray-200 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            총 {data.length}개 • 페이지 {currentPage}/{totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`px-2 py-1 rounded border ${p === currentPage ? "bg-primary text-white border-primary" : "bg-white hover:bg-gray-50"}`}
                onClick={() => setCurrentPage(p)}
              >
                Page {p}
              </button>
            ))}
            <button
              className="px-2 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
