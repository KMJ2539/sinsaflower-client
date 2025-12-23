"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import RegionSelector from "@/features/region/components/RegionSelector";

type PriceMap = {
  [key: string]: string;
};

type RegionRow = {
  id: string;
  region: string;
  sido?: string;
  sigungu?: string;
  handled: boolean;
  prices: PriceMap;
  selected?: boolean;
};

interface Props {
  onClose: () => void;
  onSave?: (rows: {
    id: string;
    region: string;
    sido?: string;
    sigungu?: string;
    handled: boolean;
    prices: { [key: string]: number };
    selected?: boolean;
  }[]) => void;
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

export default function DeliveryRegionPopup({ onClose }: Props) {
  const [rows, setRows] = useState<RegionRow[]>(() => [makeEmptyRow()]);
  const [now, setNow] = useState<string>(new Date().toLocaleString());
  const [isOpenRegionModal, setIsOpenRegionModal] = useState<boolean>(false);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleSelect = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)));
  };

  const addRow = () => {cd
    const newRow = makeEmptyRow();
    setRows((prev) => [...prev, newRow]);
    setActiveRowId(newRow.id);
    setIsOpenRegionModal(true);
  };
  const deleteSelected = () => setRows((prev) => prev.filter((r) => !r.selected));
  const updateRegion = (id: string, value: string, sido?: string, sigungu?: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, region: value, sido, sigungu } : r)));
  const toggleHandled = (id: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, handled: !r.handled } : r)));
  const updatePrice = (id: string, col: string, value: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, prices: { ...r.prices, [col]: value } } : r)));

  const header = useMemo(() => ["", "지역", ...columns], []);

  const handleSave = () => {
    const target = rows.some((r) => r.selected) ? rows.filter((r) => r.selected) : rows;
    const payload = target.map((r) => {
      const prices: { [key: string]: number } = {};
      Object.entries(r.prices).forEach(([k, v]) => {
        const num = v === "" ? 0 : Number(v);
        prices[k] = Number.isFinite(num) ? num : 0;
      });
      return {
        id: r.id,
        region: r.region.trim(),
        sido: r.sido,
        sigungu: r.sigungu,
        handled: r.handled,
        prices,
        selected: r.selected,
      };
    });
    if (typeof onSave === "function") {
      onSave(payload);
    } else {
      // Fallback for now: log to console
      console.log("DeliveryRegionPopup save payload", payload);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-[calc(100vw-3rem)] max-w-[1100px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          <div className="text-base">📍</div>
          <div className="font-semibold text-sm">배송지역 설정</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-xs text-gray-500">{now}</div>
          <button onClick={onClose} className="text-xs px-2 py-1 border rounded">닫기</button>
        </div>
      </div>

      <div className="p-2">
        <div className="border rounded">
          <div className="max-h-[60vh] overflow-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {header.map((h, idx) => (
                    <th key={String(h) + idx} className={`p-1 text-left text-xs font-medium text-gray-600 border-b ${
                        idx === 0 ? "w-6" : idx === 1 ? "w-28" : "w-12"
                      }`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="p-2 align-top w-6">
                      <input type="checkbox" checked={!!r.selected} onChange={() => toggleSelect(r.id)} />
                    </td>
                    <td className="p-1 align-top w-28">
                      <div className="flex items-center gap-1">
                        <input
                          value={r.region}
                          readOnly
                          placeholder="지역 선택"
                          className="border rounded px-2 py-1 text-xs w-20"
                        />
                        <button
                          onClick={() => {
                            setActiveRowId(r.id);
                            setIsOpenRegionModal(true);
                          }}
                          className="text-xs px-2 py-1 border rounded"
                        >
                          선택
                        </button>
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                          <input type="checkbox" checked={!r.handled} onChange={() => toggleHandled(r.id)} />
                          <span className="text-xs">미취급</span>
                        </label>
                      </div>
                    </td>

                    {columns.map((col) => (
                      <td key={col} className="p-1 align-top w-12">
                        {r.handled ? (
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={r.prices[col] ?? ""}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^0-9]/g, "");
                              updatePrice(r.id, col, v);
                            }}
                            className="border rounded px-2 py-1 text-xs w-10"
                            placeholder="0"
                          />
                        ) : (
                          <div className="text-xs text-gray-400 italic">미취급</div>
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

      <div className="flex items-center justify-end gap-2 p-2 border-t">
        <button onClick={addRow} className="px-2 py-1 bg-primary text-white rounded text-xs">
          지역 추가
        </button>
        <button onClick={deleteSelected} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
          선택 삭제
        </button>
        <button onClick={handleSave} className="px-2 py-1 bg-green-600 text-white rounded text-xs">
          저장
        </button>
      </div>

      {/* 지역 선택 모달 */}
      <Modal
        isOpen={isOpenRegionModal}
        title="지역 추가"
        hasFooter={false}
        onCancel={() => {
          setIsOpenRegionModal(false);
          setActiveRowId(null);
        }}
        size="lg"
      >
        <RegionSelector
          onRegionSelect={(sido: string, sigungu: string) => {
            if (!activeRowId) return;
            const regionLabel = `${sido} ${sigungu}`;
            updateRegion(activeRowId, regionLabel, sido, sigungu);
            setIsOpenRegionModal(false);
            setActiveRowId(null);
          }}
        />
      </Modal>
    </div>
  );
}
