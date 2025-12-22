"use client";

import React from "react";
import MemberItem from "@/features/members/components/MemberItem";

interface MemberListProps {
  members: any[];
  onSelect?: (member: any) => void;
}

export default function MemberList({ members, onSelect }: MemberListProps) {
  return (
    <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 pb-4">
      {members.length === 0 ? (
        <div className="p-8 bg-white border border-gray-300 rounded-lg text-center text-gray-500">
          <div className="text-lg font-semibold mb-2">선택된 지역에 대한 회원 정보가 없습니다.</div>
          <div className="text-sm">지역을 선택하고 검색을 클릭해주세요.</div>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 font-semibold px-1 mb-2">
            총 {members.length}명
          </div>
          {members.map((m, idx) => (
            <div key={m.id ?? idx} className="space-y-0">
              <MemberItem member={m} onSelect={onSelect} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
