"use client";

import React, { useEffect, useMemo, useState } from "react";

type PriceMap = {
  [key: string]: string;
};

type RegionRow = {
  id: string;
  region: string;
  handled: boolean; // true = 취급, false = 미취급
  prices: PriceMap;
  selected?: boolean;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const columns = [
  "축하",
  "근조",
  "오브제",
  "동양",
  "서양",
  "꽃",
  "관엽",
  "쌀",
  "기타",
  "과일",
];

function makeEmptyRow(): RegionRow {
  const prices: PriceMap = {};
  columns.forEach((c) => (prices[c] = ""));
  return {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
    region: "",
    handled: true,
    prices,
    selected: false,
  };
}

export default function DeliveryRegionModal({ isOpen, onClose }: Props) {
  const [rows, setRows] = useState<RegionRow[]>(() => [makeEmptyRow()]);
  const [now, setNow] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setRows((prev) => (prev.length ? prev : [makeEmptyRow()]));
    }
  }, [isOpen]);

  const toggleSelect = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)));
  };

  const addRow = () => setRows((prev) => [...prev, makeEmptyRow()]);

  const deleteSelected = () => setRows((prev) => prev.filter((r) => !r.selected));

  const updateRegion = (id: string, value: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, region: value } : r)));

  const toggleHandled = (id: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, handled: !r.handled } : r)));

  const updatePrice = (id: string, col: string, value: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, prices: { ...r.prices, [col]: value } } : r)));

  const header = useMemo(() => ["", "지역", ...columns], []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📍</div>
            <h2 className="text-lg font-semibold">배송지역 설정</h2>
          </div>
          <div className="text-sm text-gray-500">{now}</div>
        </div>

        <div className="p-4">
          <div className="border rounded">
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    {header.map((h, idx) => (
                      <th
                        key={String(h) + idx}
                        className={`p-2 text-left text-xs font-medium text-gray-600 border-b sticky top-0 bg-gray-50 ${
                          idx === 0 ? "w-6" : idx === 1 ? "w-40" : "w-28"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>

            <div className="max-h-[60vh] overflow-auto">
              <table className="min-w-full table-fixed">
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="p-2 align-top w-6">
                        <input type="checkbox" checked={!!r.selected} onChange={() => toggleSelect(r.id)} />
                      </td>
                      <td className="p-2 align-top w-40">
                        <div className="flex items-center gap-2">
                          <input
                            value={r.region}
                            onChange={(e) => updateRegion(r.id, e.target.value)}
                            placeholder="지역명"
                            className="border rounded px-2 py-1 text-sm w-36"
                          />
                          <label className="text-xs text-gray-500 flex items-center gap-1">
                            <input type="checkbox" checked={!r.handled} onChange={() => toggleHandled(r.id)} />
                            <span>미취급</span>
                          </label>
                        </div>
                      </td>

                      {columns.map((col) => (
                        <td key={col} className="p-2 align-top w-28">
                          {r.handled ? (
                            <input
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={r.prices[col] ?? ""}
                              onChange={(e) => {
                                const v = e.target.value.replace(/[^0-9]/g, "");
                                updatePrice(r.id, col, v);
                              }}
                              className="border rounded px-2 py-1 text-sm w-24"
                              placeholder="0"
                            />
                          ) : (
                            <div className="text-sm text-gray-400 italic">미취급</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t">
          <button
            type="button"
            onClick={addRow}
            className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 text-sm"
          >
            지역 추가
          </button>
          <button
            type="button"
            onClick={deleteSelected}
            className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
          >
            선택 삭제
          </button>
          <button type="button" onClick={onClose} className="px-3 py-2 border rounded text-sm">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
