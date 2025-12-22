"use client";

import React from "react";

interface Province {
  name: string;
  districts: string[];
}

interface Props {
  provinces: Province[];
  selectedProvince: string;
  setSelectedProvince: (p: string) => void;
  selectedDistrict: string | null;
  setSelectedDistrict: (d: string | null) => void;
  onSearch: (province: string, district: string | null) => void;
}

export default function RegionPanel({ provinces, selectedProvince, setSelectedProvince, selectedDistrict, setSelectedDistrict, onSearch }: Props) {
  const current = provinces.find((p) => p.name === selectedProvince) || provinces[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {provinces.map((p) => (
            <button
              key={p.name}
              onClick={() => { setSelectedProvince(p.name); setSelectedDistrict(null); }}
              className={`px-3 py-1 rounded text-sm ${p.name === selectedProvince ? "border-2 border-primary" : "bg-gray-100"}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium mb-2">시/군/구</h4>
          <div className="flex flex-wrap gap-2">
            {current.districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1 rounded text-sm ${selectedDistrict === d ? "border-2 border-primary bg-white" : "bg-gray-50"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSearch(selectedProvince, selectedDistrict)}
              className="sf-btn sf-btn--primary"
            >
              검색
            </button>
            <div className="ml-auto text-xs text-gray-500">도움말: 지도를 참고하세요</div>
          </div>
        </div>

        <div className="mt-4 border-t pt-3 text-xs text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 inline-block"></span>
            신규회원
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-yellow-500 inline-block"></span>
            과일상품 취급
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/daum_logo.png" alt="daum" className="w-16" />
            <img src="/images/naver_logo.png" alt="naver" className="w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
