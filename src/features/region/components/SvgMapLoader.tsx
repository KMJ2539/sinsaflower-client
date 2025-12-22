import React from "react";

interface SvgMapLoaderProps {
  region?: string;
  district?: string;
  onRegionClick?: (region: string) => void;
  onDistrictClick?: (district: string) => void;
}

// 동적으로 SVG 파일을 불러와서 렌더링하는 컴포넌트
const SvgMapLoader: React.FC<SvgMapLoaderProps> = ({ region, district, onRegionClick, onDistrictClick }) => {
  // 전국 지도 SVG 경로
  const nationwideSvg = "/maps_all/korea.svg";
  // 시도별 SVG 경로
  const regionSvg = region ? `/maps_all/${region}/${region}-gu.svg` : null;

  // district가 선택된 경우 district SVG 경로
  const districtSvg = region && district ? `/maps_all/${region}/${district}.svg` : null;

  // 렌더링 우선순위: district > region > nationwide
  const svgPath = districtSvg || regionSvg || nationwideSvg;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {svgPath ? (
        <object
          type="image/svg+xml"
          data={svgPath}
          style={{ width: "100%", height: "100%" }}
          aria-label="지도"
        />
      ) : (
        <div>지도를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default SvgMapLoader;
