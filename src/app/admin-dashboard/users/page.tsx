"use client";

import React, { useMemo, useState } from "react";

type UserStatus = "ACTIVE" | "SUSPENDED";
type UserRole = "USER" | "ADMIN";

type AdminUser = {
  id: string;
  loginId: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  region: string;
  businessNumber?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
  address?: string;
  bizCertImageUrl?: string;
  memo?: string;
};

export default function AdminUsersPage() {
  const users = useMemo<AdminUser[]>(
    () => [
      {
        id: "U-101",
        loginId: "chapel",
        shopName: "채플꽃화",
        ownerName: "김채플",
        email: "chapel@example.com",
        phone: "010-1234-5678",
        region: "서울 강남구",
        businessNumber: "123-45-67890",
        role: "USER",
        status: "ACTIVE",
        createdAt: "2024-01-08",
        lastLogin: "2025-12-18 09:01",
        address: "서울 강남구 테헤란로 123",
        bizCertImageUrl: "/images/sample-bizcert.png",
        memo: "프리미엄 회원 예정",
      },
      {
        id: "U-102",
        loginId: "aloe",
        shopName: "앨로플라워",
        ownerName: "이앨로",
        email: "aloe@example.com",
        phone: "010-2222-3333",
        region: "부산 해운대구",
        businessNumber: "210-33-99887",
        role: "USER",
        status: "SUSPENDED",
        createdAt: "2024-03-14",
        lastLogin: "2025-12-17 22:11",
        address: "부산 해운대구 센텀서로 45",
        bizCertImageUrl: "/images/sample-bizcert.png",
      },
      {
        id: "U-103",
        loginId: "ruby",
        shopName: "루비플라워",
        ownerName: "박루비",
        email: "ruby@example.com",
        phone: "010-9876-5432",
        region: "대전 유성구",
        businessNumber: "119-77-66554",
        role: "USER",
        status: "ACTIVE",
        createdAt: "2024-05-22",
        address: "대전 유성구 대학로 23",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [sortBy, setSortBy] = useState<"createdAt" | "status" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const initialRowStates = useMemo(
    () =>
      Object.fromEntries(
        users.map((u) => [u.id, { status: u.status, memo: u.memo || "" }])
      ) as Record<string, { status: UserStatus; memo: string }>,
    [users]
  );
  const [rowStates, setRowStates] = useState<Record<string, { status: UserStatus; memo: string }>>(
    initialRowStates
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const f = users.filter((u) => {
      if (!q) return true;
      return (
        u.shopName.toLowerCase().includes(q) ||
        u.ownerName.toLowerCase().includes(q) ||
        u.loginId.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.region.toLowerCase().includes(q)
      );
    });

    if (!sortBy) return f;

    const dir = sortDir === "asc" ? 1 : -1;
    return [...f].sort((a, b) => {
      if (sortBy === "createdAt") {
        const da = new Date(a.createdAt).getTime();
        const db = new Date(b.createdAt).getTime();
        return (da - db) * dir;
      }
      // status sort: ACTIVE(0) -> SUSPENDED(1) for asc
      const sa = (rowStates[a.id]?.status || a.status) === "ACTIVE" ? 0 : 1;
      const sb = (rowStates[b.id]?.status || b.status) === "ACTIVE" ? 0 : 1;
      return (sa - sb) * dir;
    });
  }, [users, query, sortBy, sortDir, rowStates]);

  const toggleCreatedSort = () => {
    setSortBy("createdAt");
    setSortDir((d) => (sortBy === "createdAt" && d === "asc" ? "desc" : "asc"));
  };

  const toggleStatusSort = () => {
    setSortBy("status");
    setSortDir((d) => (sortBy === "status" && d === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 리스트</h1>
          <p className="text-sm text-gray-500 mt-1">회원 정보를 검색하고 행을 클릭하면 상세정보가 표시됩니다.</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-0 z-10 mb-4 rounded-xl bg-white shadow border p-4 flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상호/대표자/아이디/이메일/연락처/지역 검색"
          className="flex-1 rounded-lg border p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
        />
        <div className="text-xs text-gray-500">총 {filtered.length}명</div>
      </div>

      <div className="relative">
        <div className="rounded-xl bg-white shadow border overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-5 py-3">회원ID</th>
                <th className="px-5 py-3">상호명</th>
                <th className="px-5 py-3">대표자</th>
                <th className="px-5 py-3">연락처</th>
                <th className="px-5 py-3">지역</th>
                <th
                  className="px-5 py-3 cursor-pointer select-none"
                  onClick={toggleCreatedSort}
                  title="가입일 정렬 토글"
                >
                  가입일
                  {sortBy === "createdAt" && (
                    <span className="ml-1 text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-5 py-3 cursor-pointer select-none"
                  onClick={toggleStatusSort}
                  title="상태 정렬 토글"
                >
                  상태
                  {sortBy === "status" && (
                    <span className="ml-1 text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th className="px-5 py-3">메모(사유)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelected(u)}
                >
                  <td className="px-5 py-3 font-mono text-gray-800">{u.loginId}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{u.shopName}</td>
                  <td className="px-5 py-3">{u.ownerName}</td>
                  <td className="px-5 py-3">{u.phone}</td>
                  <td className="px-5 py-3">{u.region}</td>
                  <td className="px-5 py-3 text-gray-500">{u.createdAt}</td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={rowStates[u.id]?.status || u.status}
                      onChange={(e) =>
                        setRowStates((prev) => ({
                          ...prev,
                          [u.id]: { status: e.target.value as UserStatus, memo: prev[u.id]?.memo || "" },
                        }))
                      }
                      className="rounded-lg border px-2 py-1 text-xs bg-white"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                  </td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    {rowStates[u.id]?.status === "SUSPENDED" ? (
                      <input
                        type="text"
                        value={rowStates[u.id]?.memo || ""}
                        onChange={(e) =>
                          setRowStates((prev) => ({
                            ...prev,
                            [u.id]: { status: prev[u.id].status, memo: e.target.value },
                          }))
                        }
                        placeholder="거부/정지 사유 입력"
                        className="w-full rounded-lg border p-2 text-xs"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">{rowStates[u.id]?.memo || u.memo || "-"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drawer */}
        {selected && (
          <div className="fixed inset-0 z-20">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSelected(null)}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl border-l flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">회원 상세</h3>
                  <p className="text-xs text-gray-500">{selected.shopName} · {selected.ownerName}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  닫기
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto">
                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">회원ID</div>
                    <div className="mt-1 font-medium">{selected.loginId}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">역할</div>
                    <div className="mt-1">{selected.role}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">상태</div>
                    <div className="mt-1">
                      <span
                        className={
                          "inline-flex items-center px-2 py-0.5 text-xs rounded " +
                          ((rowStates[selected.id]?.status || selected.status) === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700")
                        }
                      >
                        {rowStates[selected.id]?.status || selected.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">가입일</div>
                    <div className="mt-1 text-gray-700">{selected.createdAt}</div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">이메일</div>
                    <div className="mt-1">{selected.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">연락처</div>
                    <div className="mt-1">{selected.phone}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">주소</div>
                    <div className="mt-1">{selected.address || "-"}</div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">지역</div>
                    <div className="mt-1">{selected.region}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">사업자번호</div>
                    <div className="mt-1">{selected.businessNumber || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">최근 로그인</div>
                    <div className="mt-1">{selected.lastLogin || "-"}</div>
                  </div>
                </section>

                <section>
                  <div className="text-xs text-gray-500 mb-2">사업자등록증 이미지</div>
                  <div className="rounded-lg border bg-gray-50 overflow-hidden">
                    {selected.bizCertImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selected.bizCertImageUrl}
                        alt="사업자등록증"
                        className="w-full h-56 object-contain bg-white"
                      />
                    ) : (
                      <div className="h-56 flex items-center justify-center text-gray-400 text-sm">이미지 없음</div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="text-xs text-gray-500 mb-1">메모(사유)</div>
                  { (rowStates[selected.id]?.status || selected.status) === "SUSPENDED" ? (
                    <textarea
                      value={rowStates[selected.id]?.memo || ""}
                      onChange={(e) =>
                        setRowStates((prev) => ({
                          ...prev,
                          [selected.id]: { status: prev[selected.id].status, memo: e.target.value },
                        }))
                      }
                      placeholder="정지 사유를 입력하세요"
                      className="w-full h-24 rounded-lg border p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    />
                  ) : (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">{rowStates[selected.id]?.memo || selected.memo || "-"}</div>
                  )}
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
