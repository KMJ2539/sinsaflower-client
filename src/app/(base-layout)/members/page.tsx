"use client";

import React, { useEffect, useState } from "react";
import RegionSelector from "@/features/region/components/RegionSelector";
import InteractiveSvgMap from "@/features/region/components/InteractiveSvgMap";
import MemberList from "@/features/members/components/MemberList";
import { useRouter } from "next/navigation";

// const sampleProvinces = [
//   { name: "서울특별시", districts: ["강남구", "관악구", "구로구", "동작구"] },
//   { name: "경기도", districts: ["수원시", "성남시", "용인시"] },
//   { name: "강원도", districts: ["춘천시", "원주시"] },
// ];

const sampleMembers = [
  {
    id: "m1",
    name: "채플꽃화",
    phone: "02-123-4567",
    region: "서울특별시 강남구",
    memo: "더채플꽃화 장례, 플로팅, 마리나파크 근조; 5단 가능 / 근조꽃화환 고급판만 가능",
    tags: ["신규회원", "과일취급", "야간배송"],
    prices: { 축하: 38, 근조: 38, 동양: 70, 서양: 70, 꽃: 70, 관엽: 80 },
  },
  {
    id: "m2",
    name: "앨로플라워",
    phone: "010-5555-6666",
    region: "경기도 성남시",
    memo: "",
    tags: ["프리미엄"],
    prices: { 축하: 38 },
  },
  {
    id: "m3",
    name: "윤플라워샵",
    phone: "010-2222-3333",
    region: "서울특별시 서초구",
    memo: "jw웨딩홀, 더리버… 각종 행사",
    tags: ["유일가든"],
    prices: { 축하: 38, 근조: 38, 꽃: 70, 관엽: 80 },
  },
  {
    id: "m4",
    name: "상신플라워",
    memo: "",
    tags: [],
    prices: { 축하: 38 },
  },
  {
    id: "m5",
    name: "플라워드림",
    memo: "강남역 역사 내 위치, 대량 주문 가능, 당일 배송 지원",
    tags: ["4단/5단", "야간배송"],
    prices: { 축하: 40, 근조: 45, 동양: 75, 서양: 80, 꽃: 70, 관엽: 85, 쌀: 50 },
  },
  {
    id: "m6",
    name: "더플라워",
    memo: "프리미엄 생화 전문점, 수입 꽃 취급",
    tags: ["프리미엄", "오브제1단"],
    prices: { 축하: 50, 근조: 55, 동양: 90, 서양: 100, 꽃: 85, 관엽: 100, 기타: 60 },
  },
  {
    id: "m7",
    name: "순꽃아",
    memo: "서초동 위치, 신혼집 및 회사 오픈 화환 전문",
    tags: ["신규회원"],
    prices: { 축하: 35, 근조: 35, 동양: 65, 서양: 70 },
  },
  {
    id: "m8",
    name: "플라워로드",
    memo: "과일꾸러미 고급 마감 전문, 명절 판매량 높음",
    tags: ["과일취급"],
    prices: { 축하: 38, 근조: 38, 과일: 100 },
  },
];

export default function MembersPage() {
  const router = useRouter();
  const [now, setNow] = useState<string>(new Date().toLocaleString());
  // const [provinces] = useState(sampleProvinces);
  // 전국 초기 진입: 시/도 미선택 상태로 시작
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [memberType, setMemberType] = useState<"partners" | "premium">("partners");
  const [members, setMembers] = useState<Array<{id?: string; name?: string; phone?: string; region?: string; memo?: string; tags?: string[]; prices?: Record<string, number | string> }>>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  
  // 시/도 → 시/군/구 SVG 매핑 (사용자 요구 형식)
  const SIDO_SVG_MAP: Record<string, string> = {
    "서울특별시": "/maps_all/seoul/seoul-gu.svg",
    "부산광역시": "/maps_all/busan/busan-gu.svg",
    "대구광역시": "/maps_all/daegu/daegu-gu.svg",
    "인천광역시": "/maps_all/incheon/incheon-gu.svg",
    "광주광역시": "/maps_all/gwangju/gwangju-gu.svg",
    "대전광역시": "/maps_all/daejeon/daejeon-gu.svg",
    "울산광역시": "/maps_all/ulsan/ulsan-gu.svg",
    "세종특별자치시": "/maps_all/sejong/sejong-gu.svg",
    "경기도": "/maps_all/gyeonggi/gyeonggi-gu.svg",
    "강원도": "/maps_all/gangwon/gangwon-gu.svg",
    "강원특별자치도": "/maps_all/gangwon/gangwon-gu.svg",
    "강원도특별자치도": "/maps_all/gangwon/gangwon-gu.svg",
    "충청북도": "/maps_all/chungbuk/chungbuk-gu.svg",
    "충청남도": "/maps_all/chungnam/chungnam-gu.svg",
    "전라북도": "/maps_all/jeonbuk/jeonbuk-gu.svg",
    "전북특별자치도": "/maps_all/jeonbuk/jeonbuk-gu.svg",
    "전라북특별자치도": "/maps_all/jeonbuk/jeonbuk-gu.svg",
    "전라남도": "/maps_all/jeonnam/jeonnam-gu.svg",
    "경상북도": "/maps_all/gyeongbuk/gyeongbuk-gu.svg",
    "경상남도": "/maps_all/gyeongnam/gyeongnam-gu.svg",
    "제주특별자치도": "/maps_all/jeju/jeju-gu.svg",
  };

  // id가 영문 슬러그(seoul 등)로 올 수도 있어 한글명으로 해석
  const SLUG_TO_SIDO: Record<string, string> = {
    seoul: "서울특별시",
    busan: "부산광역시",
    daegu: "대구광역시",
    incheon: "인천광역시",
    gwangju: "광주광역시",
    daejeon: "대전광역시",
    ulsan: "울산광역시",
    sejong: "세종특별자치시",
    gyeonggi: "경기도",
    gangwon: "강원도",
    "강원도특별자치도": "강원도",
    "강원": "강원도",
    chungbuk: "충청북도",
    chungnam: "충청남도",
    jeonbuk: "전라북도",
    "전북특별자치도": "전라북도",
    "전북": "전라북도",
    jeonnam: "전라남도",
    gyeongbuk: "경상북도",
    gyeongnam: "경상남도",
    jeju: "제주특별자치도",
  };

  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // 초기엔 빈 목록 (영역 선택 후 조회)
    setMembers([]);
  }, []);

  const onSearch = async (prov: string, district: string | null) => {
    // 실제 API 연결 (실패 시 샘플데이터 fallback)
    try {
      const qs = new URLSearchParams({ region: prov, district: district || "", type: memberType });
      const res = await fetch(`/api/members?${qs.toString()}`);
      if (res.ok) {
        const data = await res.json();
        let filtered = Array.isArray(data) ? data : [];
        if (searchKeyword.trim()) {
          filtered = filtered.filter((m) => m.name?.includes(searchKeyword.trim()));
        }
        setMembers(filtered);
      } else {
        let filtered = sampleMembers.filter((m) => (memberType === "premium" ? (m.tags || []).includes("프리미엄") : true));
        if (searchKeyword.trim()) {
          filtered = filtered.filter((m) => m.name?.includes(searchKeyword.trim()));
        }
        setMembers(filtered);
      }
    } catch {
      let filtered = sampleMembers.filter((m) => (memberType === "premium" ? (m.tags || []).includes("프리미엄") : true));
      if (searchKeyword.trim()) {
        filtered = filtered.filter((m) => m.name?.includes(searchKeyword.trim()));
      }
      setMembers(filtered);
    }
    setSelectedProvince(prov);
    setSelectedDistrict(district);
  };

  const titleRegion = selectedProvince + (selectedDistrict ? ` ${selectedDistrict}` : "");

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-lg">▾</span>
          <span className="font-semibold">회원검색</span>
        </div>
        <div className="text-xs text-gray-500">{now}</div>
      </div>

      {/* Main layout: left panel + right list */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <div className="bg-white/90 p-4 rounded-lg shadow space-y-4">
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded-md border text-sm ${viewMode === "map" ? "bg-primary text-white" : "bg-white"}`}
                onClick={() => setViewMode("map")}
              >
                지도보기
              </button>
              <button
                className={`flex-1 py-2 rounded-md border text-sm ${viewMode === "list" ? "bg-primary text-white" : "bg-white"}`}
                onClick={() => setViewMode("list")}
              >
                목록보기
              </button>
            </div>

            {viewMode === 'map' ? (
              <div>
                {!selectedProvince ? (
                  <div>
                    <div className="mb-3 text-sm text-gray-700 font-semibold">1. 시/도 선택</div>
                    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                      <div className="w-full aspect-[3/2]" style={{minHeight: '550px'}}>
                        <InteractiveSvgMap
                          svgPath="/maps_all/korea-sido.svg"
                          onRegionClick={(region) => {
                            // id가 한글이면 그대로, 영문 슬러그면 변환
                            const sido = SLUG_TO_SIDO[region] || region;
                            if (SIDO_SVG_MAP[sido]) {
                              setViewMode("map"); // 지도 모드 유지
                              setSelectedProvince(sido);
                              setSelectedDistrict(null);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      className="mb-3 text-sm px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 transition font-medium"
                      onClick={() => {
                        setSelectedProvince("");
                        setSelectedDistrict(null);
                      }}
                    >
                      ◀ 전국 지도로 돌아가기
                    </button>
                    <div className="mb-3 text-sm text-gray-700 font-semibold">2. 시·군·구 선택 ({selectedProvince})</div>
                    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                      <div className="w-full aspect-[3/2]" style={{minHeight: '550px'}}>
                        <InteractiveSvgMap
                          svgPath={SIDO_SVG_MAP[selectedProvince] || SIDO_SVG_MAP["서울특별시"]}
                          highlightId={selectedDistrict || undefined}
                          onRegionClick={(region) => {
                            setSelectedDistrict(region);
                            onSearch(selectedProvince, region);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <RegionSelector
                onRegionSelect={(sido, sigungu) => {
                  // only set local selection here; search runs on button click
                  setSelectedProvince(sido);
                  setSelectedDistrict(sigungu);
                }}
              />
            )}

            <div className="space-y-2">
              <input
                type="text"
                placeholder="회원 이름 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              className="w-full bg-primary text-white py-2 rounded-md mt-2"
              onClick={() => onSearch(selectedProvince, selectedDistrict)}
            >
              검색
            </button>

            <div className="border p-3 text-xs rounded text-gray-700">
              <p>
                발주금액과상품 변동없이 고정일 경우 본부에서 수정 후 중계 진행하며,
                <br /> 본부로 거래, 취소요청 주문시는 발주회원 통보없이 본부에서 재발주 처리 합니다.
              </p>
              <div className="flex gap-2 mt-2">
                <div className="w-10 h-6 bg-gray-200 flex items-center justify-center text-xs">Daum</div>
                <div className="w-10 h-6 bg-gray-200 flex items-center justify-center text-xs">Naver</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-700">지역 : {titleRegion}</div>
            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1 rounded ${memberType === "partners" ? "bg-primary text-white" : "bg-gray-100"}`}
                onClick={() => setMemberType("partners")}
              >
                파트너스회원
              </button>
              <button
                className={`px-3 py-1 rounded ${memberType === "premium" ? "bg-primary text-white" : "bg-gray-100"}`}
                onClick={() => setMemberType("premium")}
              >
                프리미엄회원
              </button>
            </div>
          </div>

          <MemberList
            members={members}
            onSelect={(m: { id?: string; name?: string; phone?: string; region?: string }) => {
              const qs = new URLSearchParams({
                floristId: String(m.id || ""),
                shopName: String(m.name || ""),
                phone: String(m.phone || ""),
                region: String(m.region || ""),
              });
              router.push(`/orders/create?${qs.toString()}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
/* 회원 검색 페이지 */
