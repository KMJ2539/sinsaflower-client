"use client";
import React, { useMemo, useState, useEffect } from "react";
import { clientRequest } from "@/shared/lib/http/client";
import { useRouter } from "next/navigation";

type UserStatus = "ACTIVE" | "SUSPENDED";
type UserRole = "USER" | "ADMIN";

type PendingMember = {
  id: string;
  loginId: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  region: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
  address?: string;
  bizCertImageUrl?: string;
  memo?: string;
  mobile?: string;
  nickname?: string;
  name?: string;

  businessProfile?: {
    approvalStatus?: string;
    businessNumber?: string;
    corpName?: string;
    ceoName?: string;
    businessType?: string;
    businessItem?: string;
  };

  officeAddress?: {
    sido?: string;
    sigungu?: string;
    detail?: string;
    zipcode?: string;
  };
};

export default function MemberApprovalsPage() {
  const router = useRouter();
  const [list, setList] = useState<PendingMember[]>([]);
  const [selected, setSelected] = useState<PendingMember | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [fixNote, setFixNote] = useState("");
  const [fixRequested, setFixRequested] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await clientRequest<{
        code: number;
        message: string;
        data: {
          content: PendingMember[];
        };
        timestamp: string;
      }>({
        method: "GET",
        url: "/api/admin/members/pending",
      });
      console.log("users data:", res);
      console.log("users isArray:", Array.isArray(res.data));
      console.log("first user:", res.data?.[0]);
      setList(res.data); // ⭐ 핵심
    } catch (err) {
      setError("데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approve = async () => {
    if (!selected) return;

    try {
      const res = await clientRequest({
        method: "POST",
        url: `/api/admin/members/${selected.id}/approve`,
      });
      alert(res.message || "승인하였습니다.");
      await fetchUsers();
    } catch (err) {
      setError("승인 처리 실패");
    } finally {
      setSelected(null);
    }
  };

  const reject = async () => {
    if (!selected) return;
    if (!rejectReason.trim()) {
      setError("거부 사유를 입력하세요.");
      return;
    }
    console.log("REJECT", selected.id, rejectReason);
    if (!selected) return;

    try {
      await clientRequest({
        method: "POST",
        url: `/api/admin/members/${selected.id}/reject`,
        data: {
          reason: rejectReason,
        },
      });
      alert(res.message || "거절하였습니다.");
      await fetchUsers();
    } catch (err) {
      setError("거부 처리 실패");
    } finally {
      setSelected(null);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">
            회원가입 승인 · 회원관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            가입요청 리스트와 상세 검토 · 승인/보완 필요/거부 처리
          </p>
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
              <h2 className="text-base font-semibold text-gray-900">
                가입요청 리스트
              </h2>
              <p className="text-xs text-gray-500">
                상호명 / 대표자 / 사업자번호 / 지역
              </p>
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
                  <th className="px-5 py-3">승인여부</th>
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
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {m.businessProfile?.corpName}
                    </td>
                    <td className="px-5 py-3">{m.businessProfile?.ceoName}</td>
                    <td className="px-5 py-3">
                      {m.businessProfile?.businessNumber}
                    </td>
                    <td className="px-5 py-3">{m.region}</td>
                    <td className="px-5 py-3 text-gray-500">{m.createdAt}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {m.businessProfile?.approvalStatus}
                    </td>
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
                <div className="mt-1 font-semibold">
                  {selected.businessProfile?.corpName}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">대표자</div>
                  <div className="mt-1">
                    {selected.businessProfile?.ceoName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">연락처</div>
                  <div className="mt-1">{selected.mobile || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">사업자번호</div>
                  <div className="mt-1">
                    {selected.businessProfile?.businessNumber}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">지역</div>
                  <div className="mt-1">{selected.region}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-2">
                  사업자등록증 이미지 미리보기
                </div>
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
                <label className="text-sm font-medium text-gray-700">
                  보완 필요
                </label>
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
                <label className="text-sm font-medium text-gray-700">
                  거부 사유
                </label>
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
            <div className="p-5 text-sm text-gray-500">
              왼쪽 목록에서 가입 요청을 선택하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
