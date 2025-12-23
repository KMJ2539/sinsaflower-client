"use client";

import React, { useMemo, useState, useEffect } from "react";
import { clientRequest } from "@/shared/lib/http/client";

type UserStatus = "ACTIVE" | "SUSPENDED" | "DORMANT";
type UserRole = "USER" | "ADMIN";

type AdminUser = {
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

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await clientRequest<{
          code: number;
          message: string;
          data: {
            content: AdminUser[];
          };
          timestamp: string;
        }>({
          method: "GET",
          url: "/api/admin/members/all",
        });
        console.log("users isArray:", Array.isArray(res.data.content));
        console.log("first user:", res.data.content?.[0]);
        setUsers(res.data.content); // ⭐ 핵심
      } catch (err) {
        setError("데이터 로드 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
  const [rowStates, setRowStates] =
    useState<Record<string, { status: UserStatus; memo: string }>>(
      initialRowStates
    );
  const initialSavedMemo = useMemo(
    () =>
      Object.fromEntries(users.map((u) => [u.id, u.memo || ""])) as Record<
        string,
        string
      >,
    [users]
  );
  const [savedMemo, setSavedMemo] =
    useState<Record<string, string>>(initialSavedMemo);

  // Tabs: 회원정보 / 내역정보(히스토리)
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

  // Small helper for header sort buttons
  const SortButtons = ({
    active,
    dir,
    onAsc,
    onDesc,
  }: {
    active: boolean;
    dir: "asc" | "desc";
    onAsc: () => void;
    onDesc: () => void;
  }) => (
    <span className="inline-flex items-center ml-1 gap-0.5 align-middle">
      <button
        type="button"
        className={`leading-none text-[10px] px-1 py-0.5 rounded ${
          active && dir === "asc"
            ? "bg-gray-900 text-white"
            : "text-gray-500 hover:text-gray-700"
        }`}
        title="오름차순"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAsc();
        }}
      >
        ▲
      </button>
      <button
        type="button"
        className={`leading-none text-[10px] px-1 py-0.5 rounded ${
          active && dir === "desc"
            ? "bg-gray-900 text-white"
            : "text-gray-500 hover:text-gray-700"
        }`}
        title="내림차순"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDesc();
        }}
      >
        ▼
      </button>
    </span>
  );

  type HistoryItemBase = {
    loginId: string;
    shopName: string;
    phone: string;
    date: string;
  };
  type HistoryItem = HistoryItemBase & { status: UserStatus };
  const baseHistory = useMemo<HistoryItemBase[]>(
    () => [
      {
        loginId: "chapel",
        shopName: "채플꽃화",
        phone: "010-1234-5678",
        date: "2025-12-20",
      },
      {
        loginId: "aloe",
        shopName: "앨로플라워",
        phone: "010-2222-3333",
        date: "2025-12-18",
      },
      {
        loginId: "ruby",
        shopName: "루비플라워",
        phone: "010-9876-5432",
        date: "2025-12-17",
      },
      {
        loginId: "chapel",
        shopName: "채플꽃화",
        phone: "010-1234-5678",
        date: "2025-12-15",
      },
    ],
    []
  );
  const userStatusByLogin = useMemo(() => {
    const map: Record<string, UserStatus> = {};
    for (const u of users) {
      const effective = rowStates[u.id]?.status ?? u.status;
      map[u.loginId] = effective;
    }
    return map;
  }, [users, rowStates]);
  const historyItems = useMemo<HistoryItem[]>(
    () =>
      baseHistory.map((h) => ({
        ...h,
        status: userStatusByLogin[h.loginId] ?? "ACTIVE",
      })),
    [baseHistory, userStatusByLogin]
  );
  const [historySortBy, setHistorySortBy] = useState<
    "loginId" | "shopName" | "date"
  >("date");
  const [historySortDir, setHistorySortDir] = useState<"asc" | "desc">("desc");
  const toggleHistorySort = (key: "loginId" | "shopName" | "date") => {
    if (historySortBy === key) {
      setHistorySortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setHistorySortBy(key);
      setHistorySortDir("asc");
    }
  };
  const filteredHistory = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = historyItems.filter(
      (h) =>
        !q ||
        h.shopName.toLowerCase().includes(q) ||
        h.loginId.toLowerCase().includes(q) ||
        h.phone.includes(q)
    );
    const dir = historySortDir === "asc" ? 1 : -1;
    return [...base].sort((a, b) => {
      if (historySortBy === "loginId")
        return a.loginId.localeCompare(b.loginId) * dir;
      if (historySortBy === "shopName")
        return a.shopName.localeCompare(b.shopName, "ko") * dir;
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
    });
  }, [historyItems, historySortBy, historySortDir, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const f = users.filter((u) => {
      if (!q) return true;
      return (
        u.businessProfile?.corpName?.toLowerCase().includes(q) ||
        u.businessProfile?.ceoName?.toLowerCase().includes(q) ||
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
      // status sort: ACTIVE(0) -> SUSPENDED(1) -> DORMANT(2) for asc
      const toOrder = (s: UserStatus) =>
        s === "ACTIVE" ? 0 : s === "SUSPENDED" ? 1 : 2;
      const sa = toOrder(rowStates[a.id]?.status || a.status);
      const sb = toOrder(rowStates[b.id]?.status || b.status);
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
          <p className="text-sm text-gray-500 mt-1">
            회원 정보를 검색하고 행을 클릭하면 상세정보가 표시됩니다.
          </p>
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
        <div className="text-xs text-gray-500">
          {activeTab === "info"
            ? `총 ${filtered.length}명`
            : `총 ${filteredHistory.length}건`}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-2">
        <button
          className={`px-3 py-2 rounded-lg text-sm font-medium border ${
            activeTab === "info"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setActiveTab("info")}
        >
          회원정보
        </button>
        <button
          className={`px-3 py-2 rounded-lg text-sm font-medium border ${
            activeTab === "history"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          내역정보 (히스토리)
        </button>
      </div>

      <div className="relative">
        {activeTab === "info" ? (
          <div className="rounded-xl bg-white shadow border overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3">회원ID</th>
                  <th className="px-5 py-3">상호명</th>
                  <th className="px-5 py-3">대표자</th>
                  <th className="px-5 py-3">연락처</th>
                  <th className="px-5 py-3">지역</th>
                  <th className="px-5 py-3 select-none">
                    <span className="inline-flex items-center">
                      가입일
                      <SortButtons
                        active={sortBy === "createdAt"}
                        dir={sortDir}
                        onAsc={() => {
                          setSortBy("createdAt");
                          setSortDir("asc");
                        }}
                        onDesc={() => {
                          setSortBy("createdAt");
                          setSortDir("desc");
                        }}
                      />
                    </span>
                  </th>
                  <th className="px-5 py-3 select-none">
                    <span className="inline-flex items-center">
                      상태
                      <SortButtons
                        active={sortBy === "status"}
                        dir={sortDir}
                        onAsc={() => {
                          setSortBy("status");
                          setSortDir("asc");
                        }}
                        onDesc={() => {
                          setSortBy("status");
                          setSortDir("desc");
                        }}
                      />
                    </span>
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
                    <td className="px-5 py-3 font-mono text-gray-800">
                      {u.loginId}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {u.businessProfile?.corpName}
                    </td>
                    <td className="px-5 py-3">{u.businessProfile?.ceoName}</td>
                    <td className="px-5 py-3">{u.mobile}</td>
                    <td className="px-5 py-3">{u.region}</td>
                    <td className="px-5 py-3 text-gray-500">{u.createdAt}</td>
                    <td
                      className="px-5 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={rowStates[u.id]?.status || u.status}
                        onChange={(e) => {
                          const next = e.target.value as UserStatus;
                          setRowStates((prev) => {
                            const current = prev[u.id] || {
                              status: u.status,
                              memo: u.memo || "",
                            };
                            const nextMemo =
                              next === "DORMANT" && !current.memo
                                ? "장기 미사용 고객"
                                : current.memo;
                            return {
                              ...prev,
                              [u.id]: { status: next, memo: nextMemo },
                            };
                          });
                        }}
                        className="rounded-lg border px-2 py-1 text-xs bg-white"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                        <option value="DORMANT">DORMANT</option>
                      </select>
                    </td>
                    <td
                      className="px-5 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {rowStates[u.id]?.status === "SUSPENDED" ||
                      rowStates[u.id]?.status === "DORMANT" ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={rowStates[u.id]?.memo || ""}
                            onChange={(e) =>
                              setRowStates((prev) => ({
                                ...prev,
                                [u.id]: {
                                  status: prev[u.id].status,
                                  memo: e.target.value,
                                },
                              }))
                            }
                            placeholder={
                              rowStates[u.id]?.status === "DORMANT"
                                ? "장기 미사용 고객"
                                : "거부/정지 사유 입력"
                            }
                            className="w-full rounded-lg border p-2 text-xs"
                          />
                          <button
                            className="px-2 py-1 rounded bg-gray-900 text-white text-xs hover:bg-gray-700"
                            title="메모 저장"
                            onClick={() => {
                              setSavedMemo((prev) => ({
                                ...prev,
                                [u.id]: rowStates[u.id]?.memo || "",
                              }));
                              console.log(
                                "SAVE MEMO",
                                u.id,
                                rowStates[u.id]?.memo || ""
                              );
                            }}
                          >
                            저장
                          </button>
                          {savedMemo[u.id] ===
                            (rowStates[u.id]?.memo || "") && (
                            <span className="text-[10px] text-gray-500">
                              저장됨
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">
                          {rowStates[u.id]?.memo || u.memo || "-"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl bg-white shadow border overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-5 py-3 select-none">
                    <span className="inline-flex items-center">
                      회원ID
                      <SortButtons
                        active={historySortBy === "loginId"}
                        dir={historySortDir}
                        onAsc={() => {
                          setHistorySortBy("loginId");
                          setHistorySortDir("asc");
                        }}
                        onDesc={() => {
                          setHistorySortBy("loginId");
                          setHistorySortDir("desc");
                        }}
                      />
                    </span>
                  </th>
                  <th className="px-5 py-3 select-none">
                    <span className="inline-flex items-center">
                      상호명
                      <SortButtons
                        active={historySortBy === "shopName"}
                        dir={historySortDir}
                        onAsc={() => {
                          setHistorySortBy("shopName");
                          setHistorySortDir("asc");
                        }}
                        onDesc={() => {
                          setHistorySortBy("shopName");
                          setHistorySortDir("desc");
                        }}
                      />
                    </span>
                  </th>
                  <th className="px-5 py-3">연락처</th>
                  <th className="px-5 py-3">상태</th>
                  <th className="px-5 py-3 select-none">
                    <span className="inline-flex items-center">
                      날짜
                      <SortButtons
                        active={historySortBy === "date"}
                        dir={historySortDir}
                        onAsc={() => {
                          setHistorySortBy("date");
                          setHistorySortDir("asc");
                        }}
                        onDesc={() => {
                          setHistorySortBy("date");
                          setHistorySortDir("desc");
                        }}
                      />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((h, idx) => (
                  <tr key={`${h.loginId}-${idx}`} className="border-t">
                    <td className="px-5 py-3 font-mono text-gray-800">
                      {h.loginId}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">
                      {h.shopName}
                    </td>
                    <td className="px-5 py-3">{h.phone}</td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          "inline-flex items-center px-2 py-0.5 text-xs rounded " +
                          (h.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : h.status === "SUSPENDED"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-700")
                        }
                      >
                        {h.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Drawer */}
        {activeTab === "info" && selected && (
          <div className="fixed inset-0 z-20">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSelected(null)}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl border-l flex flex-col">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    회원 상세
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selected.businessProfile?.corpName} ·{" "}
                    {selected.businessProfile?.ceoName}
                  </p>
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
                          ((rowStates[selected.id]?.status ||
                            selected.status) === "ACTIVE"
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
                    <div className="mt-1 text-gray-700">
                      {selected.createdAt}
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">이메일</div>
                    <div className="mt-1">{selected.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">연락처</div>
                    <div className="mt-1">{selected.mobile}</div>
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
                    <div className="mt-1">
                      {selected.businessProfile?.businessNumber || "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">최근 로그인</div>
                    <div className="mt-1">{selected.lastLogin || "-"}</div>
                  </div>
                </section>

                <section>
                  <div className="text-xs text-gray-500 mb-2">
                    사업자등록증 이미지
                  </div>
                  <div className="rounded-lg border bg-gray-50 overflow-hidden">
                    {selected.bizCertImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selected.bizCertImageUrl}
                        alt="사업자등록증"
                        className="w-full h-56 object-contain bg-white"
                      />
                    ) : (
                      <div className="h-56 flex items-center justify-center text-gray-400 text-sm">
                        이미지 없음
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="text-xs text-gray-500 mb-1">메모(사유)</div>
                  {(rowStates[selected.id]?.status || selected.status) ===
                    "SUSPENDED" ||
                  (rowStates[selected.id]?.status || selected.status) ===
                    "DORMANT" ? (
                    <>
                      <textarea
                        value={rowStates[selected.id]?.memo || ""}
                        onChange={(e) =>
                          setRowStates((prev) => ({
                            ...prev,
                            [selected.id]: {
                              status: prev[selected.id].status,
                              memo: e.target.value,
                            },
                          }))
                        }
                        placeholder={
                          (rowStates[selected.id]?.status ||
                            selected.status) === "DORMANT"
                            ? "장기 미사용 고객"
                            : "정지 사유를 입력하세요"
                        }
                        className="w-full h-24 rounded-lg border p-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="px-3 py-1.5 rounded bg-gray-900 text-white text-xs hover:bg-gray-700"
                          onClick={() =>
                            setSavedMemo((prev) => ({
                              ...prev,
                              [selected.id]: rowStates[selected.id]?.memo || "",
                            }))
                          }
                        >
                          메모 저장
                        </button>
                        {savedMemo[selected.id] ===
                          (rowStates[selected.id]?.memo || "") && (
                          <span className="text-[11px] text-gray-500">
                            저장됨
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {rowStates[selected.id]?.memo || selected.memo || "-"}
                    </div>
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
