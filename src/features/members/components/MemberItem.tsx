"use client";

import React from "react";

const columns = ["축하", "근조", "오브제", "동양", "서양", "꽃", "관엽", "쌀", "기타", "과일"];

// 태그별 색상 및 아이콘 맵핑
const TAG_COLOR_MAP: { [key: string]: { bg: string; text: string; border: string } } = {
  "신규회원": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "4단/5단": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "과일상품 취급": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "과일취급": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "오브제1단": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  "유일가든": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "야간배송": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "프리미엄": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
};

export type Member = {
  id?: string;
  name?: string;
  memo?: string;
  tags?: string[];
  prices?: Record<string, number | string>;
};

interface Props {
  member: Member;
  onSelect?: (member: Member) => void;
}

export default function MemberItem({ member, onSelect }: Props) {
  const getTagStyle = (tag: string) => TAG_COLOR_MAP[tag] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  const [showTooltip, setShowTooltip] = React.useState(false);
  const hoverTimer = React.useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setShowTooltip(true), 250);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    setShowTooltip(false);
  };

  const handleDoubleClick = () => {
    if (onSelect) onSelect(member);
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${onSelect ? "hover:shadow-md transition-shadow" : ""}`}
      onDoubleClick={onSelect ? handleDoubleClick : undefined}
    >
      {/* (1) 회원 상단 정보 영역 - 이름/아이콘/취급품목 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-800 rounded-sm flex-shrink-0"></div>
          <div
            className="font-bold text-lg text-gray-900 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-describedby={showTooltip ? `member-tooltip-${member.id || member.name}` : undefined}
          >
            {member.name}
            {showTooltip && (
              <div
                id={`member-tooltip-${member.id || member.name}`}
                role="tooltip"
                className="absolute top-full left-0 mt-1 z-20 w-max max-w-xs px-3 py-2 bg-white border rounded shadow text-xs text-gray-700"
              >
                <div><span className="font-semibold">화원명:</span> {member.name}</div>
                {member.phone && (
                  <div><span className="font-semibold">전화번호:</span> {member.phone}</div>
                )}
              </div>
            )}
          </div>
          {onSelect && (
            <span className="ml-auto text-xs text-emerald-600 font-semibold">더블클릭하여 선택</span>
          )}
        </div>

        {/* 태그/속성들 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(member.tags || []).map((tag: string, i: number) => {
            const style = getTagStyle(tag);
            return (
              <span
                key={i}
                className={`inline-block px-2.5 py-1.5 rounded-md text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
              >
                {tag}
              </span>
            );
          })}
          {(member.tags || []).length === 0 && (
            <span className="text-xs text-gray-400 italic">태그 없음</span>
          )}
        </div>

        {/* 가격표 헤더 */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="grid gap-0.5 text-xs text-center text-gray-500" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(50px, 1fr))`, minWidth: '600px' }}>
            {columns.map((col) => (
              <div key={col} className="py-1 px-0.5 truncate text-[11px] font-semibold">
                {col}
              </div>
            ))}
          </div>
          <div className="grid gap-0.5 text-xs" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(50px, 1fr))`, minWidth: '600px' }}>
            {columns.map((col) => {
              const price = member.prices?.[col];
              const hasPrice = price !== undefined && price !== null && price !== "";
              return (
                <div key={col} className="text-center">
                  <div
                    className={`border rounded px-1 py-2 min-h-[32px] flex items-center justify-center text-sm font-medium ${
                      hasPrice
                        ? "bg-gray-50 border-gray-300 text-gray-800"
                        : "bg-gray-100 border-gray-200 text-gray-300"
                    }`}
                  >
                    {hasPrice ? price : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* (2) 회원 상세 메모 영역 */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white min-h-[50px]">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {member.memo && member.memo.trim() ? (
            <span className="text-gray-800">{member.memo}</span>
          ) : (
            <span className="text-gray-400 italic">등록된 메모가 없습니다.</span>
          )}
        </p>
      </div>

      {/* (3) 회원 속성/태그 표시 (2번과 중복이므로 선택적) - 생략 또는 요약 버전 */}

      {/* (4) 구분선은 MemberList에서 처리 */}
    </div>
  );
}
