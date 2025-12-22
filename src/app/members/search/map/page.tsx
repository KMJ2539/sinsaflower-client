"use client";

import { useEffect, useState } from "react";
import MemberList from "@/features/members/components/MemberList";
import InteractiveSvgMap from "@/features/region/components/InteractiveSvgMap";

export default function MemberSearchMapPage() {
  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [memberList, setMemberList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (selectedSido && selectedSigungu) {
      setLoading(true);
      fetch(`/api/members?region=${encodeURIComponent(selectedSido)}&district=${encodeURIComponent(selectedSigungu)}`)
        .then((res) => res.json())
        .then((data) => setMemberList(data))
        .finally(() => setLoading(false));
    }
  }, [selectedSido, selectedSigungu]);

  const handleSidoClick = (sido: string) => {
    setSelectedSido(sido);
    setSelectedSigungu(null);
  };

  const handleSigunguClick = (sigungu: string) => {
    setSelectedSigungu(sigungu);
  };

  const handleBack = () => {
    setFade(false);
    setTimeout(() => {
      setSelectedSido(null);
      setSelectedSigungu(null);
      setFade(true);
    }, 200);
  };

  return (
    <div className="flex w-full min-h-[80vh] bg-gray-50 p-6 gap-6">
      <section className="w-full max-w-[520px] flex-shrink-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">지역 선택</h2>
          {selectedSido && (
            <button
              className="text-xs px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 transition"
              onClick={handleBack}
            >
              전국 지도 보기
            </button>
          )}
        </div>
        <div className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
          {!selectedSido ? (
            <InteractiveSvgMap svgPath="/maps_all/korea.svg" onRegionClick={handleSidoClick} />
          ) : !selectedSigungu ? (
            <InteractiveSvgMap
              svgPath={`/maps_all/${selectedSido}/${selectedSido}-gu.svg`}
              onRegionClick={handleSigunguClick}
              highlightId={selectedSido}
            />
          ) : (
            <InteractiveSvgMap
              svgPath={`/maps_all/${selectedSido}/${selectedSigungu}.svg`}
              highlightId={selectedSigungu}
            />
          )}
        </div>
      </section>
      <section className="flex-1">
        <div className="mb-4">
          <h3 className="font-bold text-lg">
            {selectedSido && selectedSigungu ? `지역: ${selectedSido} ${selectedSigungu}` : "지역을 선택하세요"}
          </h3>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-400">회원 정보를 불러오는 중...</div>
        ) : (
          <MemberList members={memberList} />
        )}
      </section>
    </div>
  );
}
