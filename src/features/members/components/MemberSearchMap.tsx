"use client";

interface Props {
  selectedRegion?: string;
  onSelectRegion: (region: string) => void;
  variant?: "map" | "list";
}

const SIDO_LIST = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

export default function MemberSearchMap({ selectedRegion, onSelectRegion, variant = "map" }: Props) {
  if (variant === "list") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {SIDO_LIST.map((s) => (
          <button
            key={s}
            className={`text-left px-3 py-2 rounded-md border text-sm ${
              selectedRegion === s ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectRegion(s)}
          >
            {s}
          </button>
        ))}
      </div>
    );
  }

  // Simple placeholder for map MVP: a styled list with a "map-like" grid
  return (
    <div className="grid grid-cols-3 gap-2">
      {SIDO_LIST.map((s) => (
        <button
          key={s}
          className={`px-3 py-4 rounded-xl text-sm font-medium shadow-sm border ${
            selectedRegion === s
              ? "bg-emerald-500/90 text-white border-emerald-500"
              : "bg-white hover:bg-emerald-50 border-gray-200"
          }`}
          onClick={() => onSelectRegion(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
