"use client";

import type { ShopItem } from "./MemberSearchModal";

interface Props {
  rows: ShopItem[];
  onSelect: (row: ShopItem) => void;
}

export default function MemberTable({ rows, onSelect }: Props) {
  return (
    <div className="px-4 py-3">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">화원명</th>
              <th className="px-3 py-2 text-left">지역</th>
              <th className="px-3 py-2 text-center">축하</th>
              <th className="px-3 py-2 text-center">근조</th>
              <th className="px-3 py-2 text-center">오브제</th>
              <th className="px-3 py-2 text-center">동양</th>
              <th className="px-3 py-2 text-center">서양</th>
              <th className="px-3 py-2 text-center">꽃</th>
              <th className="px-3 py-2 text-center">관엽</th>
              <th className="px-3 py-2 text-center">쌀</th>
              <th className="px-3 py-2 text-center">기타</th>
              <th className="px-3 py-2 text-center">과일</th>
              <th className="px-3 py-2 text-center">선택</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-gray-500" colSpan={13}>
                  지역을 선택하세요.
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={r.shopId ?? idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{r.shopName}</td>
                  <td className="px-3 py-2">{r.region}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.축하 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.근조 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.오브제 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.동양 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.서양 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.꽃 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.관엽 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.쌀 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.기타 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">{r.flags?.과일 ? "●" : ""}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      className="sf-btn sf-btn--primary sf-btn--xs"
                      onClick={() => onSelect(r)}
                    >
                      선택
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
