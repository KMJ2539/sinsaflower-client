"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PendingMember = {
  id: string;
  shopName: string;
  ownerName: string;
  businessNumber: string;
  region: string;
  phone?: string;
  createdAt: string;
  bizCertImageUrl?: string;
};

export default function MemberApprovalsPage() {
  const router = useRouter();
  const initialList = useMemo<PendingMember[]>(
    () => [
      {
        id: "M-10021",
        shopName: "채플꽃화",
        ownerName: "김채플",
        businessNumber: "123-45-67890",
        region: "서울 강남구",
        phone: "010-1234-5678",
        createdAt: "2025-12-18 09:20",
        bizCertImageUrl: "/images/sample-bizcert.png",
      },
      {
        id: "M-10022",
        shopName: "앨로플라워",
        ownerName: "이앨로",
        businessNumber: "210-33-99887",
        region: "부산 해운대구",
        phone: "010-2222-3333",
        createdAt: "2025-12-18 10:05",
        bizCertImageUrl: "/images/sample-bizcert.png",
      },
      {
        id: "M-10023",
        shopName: "루비플라워",
        ownerName: "박루비",
        businessNumber: "119-77-66554",
        region: "대전 유성구",
        phone: "010-9876-5432",
        createdAt: "2025-12-18 10:30",
        bizCertImageUrl: "/images/sample-bizcert.png",
      },
    ],
    []
  );

  const [list, setList] = useState<PendingMember[]>(initialList);
  const [selected, setSelected] = useState<PendingMember | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [fixNote, setFixNote] = useState("");
  const [fixRequested, setFixRequested] = useState(false);
  const [error, setError] = useState("");

  const approve = () => {
    if (!selected) return;
    console.log("APPROVE", selected.id);
    setList((prev) => prev.filter((m) => m.id !== selected.id));
    setSelected(null);
  };

  const reject = () => {
    if (!selected) return;
    if (!rejectReason.trim()) {
      setError("거부 사유를 입력하세요.");
      return;
    }
    console.log("REJECT", selected.id, rejectReason);
    setList((prev) => prev.filter((m) => m.id !== selected.id));
    setSelected(null);
    setRejectReason("");
    setError("");
  };

  const requestFix = () => {
    if (!selected) return;
    if (!fixNote.trim()) {
      setError("보완 필요 내용을 입력하세요.");
      return;
    }
    console.log("REQUEST_FIX", selected.id, fixNote);
    setFixRequested(true);
    setTimeout(() => setFixRequested(false), 2000);
    setError("");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원가입 승인 · 회원관리</h1>
          <p className="text-sm text-gray-500 mt-1">가입요청 리스트와 상세 검토 · 승인/보완 필요/거부 처리</p>
          
        </div>
        <button
          onClick={() => router.push("/admin-dashboard")}
          className="px-4 py-2 rounded-lg bg-white border text-sm shadow-sm hover:bg-gray-50"
        >
          대시보드로 돌아가기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 rounded-xl bg-white shadow border overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">가입요청 리스트</h2>
              <p className="text-xs text-gray-500">상호명 / 대표자 / 사업자번호 / 지역</p>
            </div>
            <div className="text-xs text-gray-500">총 {list.length}건</div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3">상호명</th>
                  <th className="px-5 py-3">대표자</th>
                  <th className="px-5 py-3">사업자번호</th>
                  <th className="px-5 py-3">지역</th>
                  <th className="px-5 py-3">요청시각</th>
                </tr>
              </thead>
              <tbody>
                {list.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-t hover:bg-gray-50 cursor-pointer ${
                      selected?.id === m.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelected(m)}
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">{m.shopName}</td>
                    <td className="px-5 py-3">{m.ownerName}</td>
                    <td className="px-5 py-3">{m.businessNumber}</td>
                    <td className="px-5 py-3">{m.region}</td>
                    <td className="px-5 py-3 text-gray-500">{m.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail / Actions */}
        <div className="rounded-xl bg-white shadow border">
          <div className="px-5 py-4 border-b">
            <h2 className="text-base font-semibold text-gray-900">상세 검토</h2>
          </div>
          {selected ? (
            <div className="p-5 space-y-5">
              <div>
                <div className="text-sm text-gray-500">상호명</div>
                <div className="mt-1 font-semibold">{selected.shopName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">대표자</div>
                  <div className="mt-1">{selected.ownerName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">연락처</div>
                  <div className="mt-1">{selected.phone || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">사업자번호</div>
                  <div className="mt-1">{selected.businessNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">지역</div>
                  <div className="mt-1">{selected.region}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-2">사업자등록증 이미지 미리보기</div>
                <div className="rounded-lg border bg-gray-50 overflow-hidden">
                  {selected.bizCertImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selected.bizCertImageUrl}
                      alt="사업자등록증"
                      className="w-full h-64 object-contain bg-white"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                      이미지가 없습니다
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">보완 필요</label>
                <textarea
                  value={fixNote}
                  onChange={(e) => {
                    setFixNote(e.target.value);
                    setError("");
                  }}
                  placeholder="보완 필요 사항을 입력하세요 (서류 누락, 정보 수정 등)"
                  className="mt-2 w-full h-20 rounded-lg border p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">거부 사유</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    setError("");
                  }}
                  placeholder="거부 시 사유를 반드시 입력하세요"
                  className="mt-2 w-full h-24 rounded-lg border p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={approve}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm shadow hover:bg-emerald-700"
                >
                  승인
                </button>
                <button
                  onClick={requestFix}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow hover:bg-indigo-700"
                >
                  보완 요청
                </button>
                {fixRequested && (
                  <span className="text-xs text-gray-500">요청됨</span>
                )}
                <button
                  onClick={reject}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm shadow hover:bg-amber-600"
                >
                  거부
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 text-sm text-gray-500">왼쪽 목록에서 가입 요청을 선택하세요.</div>
          )}
        </div>
      </div>
    </div>
  );
}
