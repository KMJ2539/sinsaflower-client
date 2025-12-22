"use client";

import React, { useState } from "react";
import styles from "./MapView.module.css";

interface MapViewProps {
  onRegionSelect?: (sido: string | null, sigungu: string | null) => void;
  // when true, start at province list; otherwise can start at a specific province
  initialSido?: string | null;
}

// Minimal SVG-based prototype. Uses simplified shapes for demo only.
export default function MapView({ onRegionSelect, initialSido = null }: MapViewProps) {
  const [mode, setMode] = useState<'sido' | 'sigungu'>(initialSido ? 'sigungu' : 'sido');
  const [selectedSido, setSelectedSido] = useState<string | null>(initialSido);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [hover, setHover] = useState<{text: string; x: number; y: number} | null>(null);

  // Minimal mock structure: provinces and for 서울 a few districts
  const provinces = [
    { id: 'seoul', name: '서울특별시' },
    { id: 'gyeonggi', name: '경기도' },
    { id: 'gangwon', name: '강원도' },
  ];

  const seoulDistricts = [
    { id: 'gangnam', name: '강남구' },
    { id: 'gangseo', name: '강서구' },
    { id: 'gangbuk', name: '강북구' },
  ];

  function handleSidoClick(id: string, name: string, ev?: React.MouseEvent) {
    setSelectedSido(name);
    setSelectedSigungu(null);
    // switch to sigungu view if we have data for the province
    if (id === 'seoul') {
      setMode('sigungu');
    }
    if (onRegionSelect) onRegionSelect(name, null);
    if (ev) {
      setHover({ text: name, x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY });
      setTimeout(() => setHover(null), 800);
    }
  }

  function handleSigunguClick(id: string, name: string, ev?: React.MouseEvent) {
    setSelectedSigungu(name);
    if (onRegionSelect) onRegionSelect(selectedSido, name);
    if (ev) {
      setHover({ text: name, x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY });
      setTimeout(() => setHover(null), 900);
    }
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div className={styles.label}>{mode === 'sido' ? '전국 시/도 선택' : `${selectedSido} - 구/군 선택`}</div>
        <div>
          {mode === 'sigungu' && (
            <button
              className={styles.backBtn}
              onClick={() => { setMode('sido'); setSelectedSido(null); setSelectedSigungu(null); if (onRegionSelect) onRegionSelect(null, null); }}
            >
              ◀ 전국 보기
            </button>
          )}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg className={styles.svgRoot} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gradProvince" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id="gradProvinceActive" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="gradDistrict" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="100%" stopColor="#ffedd5" />
              </linearGradient>
            </defs>

            {/* background */}
            <rect x="0" y="0" width="300" height="160" fill="#ffffff" rx="6" ry="6" />

            {/* Provinces (stylized shapes) */}
            <g>
              <rect
                x="30"
                y="20"
                width="60"
                height="40"
                rx="8"
                ry="8"
                className={styles.region}
                style={{ fill: selectedSido === '서울특별시' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('seoul', '서울특별시', e)}
                onMouseMove={(e) => setHover({ text: '서울특별시', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="60" y="45" textAnchor="middle" fontSize="10" fill={selectedSido === '서울특별시' ? '#fff' : '#0f172a'}>서울특별시</text>
            </g>

            <g>
              <rect
                x="110"
                y="40"
                width="90"
                height="60"
                rx="10"
                ry="10"
                className={styles.region}
                style={{ fill: selectedSido === '경기도' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('gyeonggi', '경기도', e)}
                onMouseMove={(e) => setHover({ text: '경기도', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="155" y="70" textAnchor="middle" fontSize="10" fill={selectedSido === '경기도' ? '#fff' : '#0f172a'}>경기도</text>
            </g>

            <g>
              <rect
                x="210"
                y="20"
                width="60"
                height="100"
                rx="10"
                ry="10"
                className={styles.region}
                style={{ fill: selectedSido === '강원도' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('gangwon', '강원도', e)}
                onMouseMove={(e) => setHover({ text: '강원도', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="240" y="70" textAnchor="middle" fontSize="10" fill={selectedSido === '강원도' ? '#fff' : '#0f172a'}>강원도</text>
            </g>

            {/* Seoul district mock shapes when in drill mode */}
            {mode === 'sigungu' && selectedSido === '서울특별시' && (
              <g>
                <rect
                  x="36"
                  y="26"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강남구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangnam', '강남구', e)}
                  onMouseMove={(e) => setHover({ text: '강남구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="46" y="36" fontSize="8" fill={selectedSigungu === '강남구' ? '#fff' : '#1f2937'}>강남구</text>

                <rect
                  x="58"
                  y="26"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강서구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangseo', '강서구', e)}
                  onMouseMove={(e) => setHover({ text: '강서구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="68" y="36" fontSize="8" fill={selectedSigungu === '강서구' ? '#fff' : '#1f2937'}>강서구</text>

                <rect
                  x="36"
                  y="40"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강북구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangbuk', '강북구', e)}
                  onMouseMove={(e) => setHover({ text: '강북구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="46" y="50" fontSize="8" fill={selectedSigungu === '강북구' ? '#fff' : '#1f2937'}>강북구</text>
              </g>
            )}
          </svg>

          {hover && (
            <div className={styles.tooltip} style={{ left: hover.x, top: hover.y }}>
              {hover.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import styles from "./MapView.module.css";

interface MapViewProps {
  onRegionSelect?: (sido: string | null, sigungu: string | null) => void;
  // when true, start at province list; otherwise can start at a specific province
  initialSido?: string | null;
}

// Minimal SVG-based prototype. Uses simplified shapes for demo only.
export default function MapView({ onRegionSelect, initialSido = null }: MapViewProps) {
  const [mode, setMode] = useState<'sido' | 'sigungu'>(initialSido ? 'sigungu' : 'sido');
  const [selectedSido, setSelectedSido] = useState<string | null>(initialSido);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [hover, setHover] = useState<{text: string; x: number; y: number} | null>(null);

  // Minimal mock structure: provinces and for 서울 a few districts
  const provinces = [
    { id: 'seoul', name: '서울특별시' },
    { id: 'gyeonggi', name: '경기도' },
    { id: 'gangwon', name: '강원도' },
  ];

  const seoulDistricts = [
    { id: 'gangnam', name: '강남구' },
    { id: 'gangseo', name: '강서구' },
    { id: 'gangbuk', name: '강북구' },
  ];

  function handleSidoClick(id: string, name: string, ev?: React.MouseEvent) {
    setSelectedSido(name);
    setSelectedSigungu(null);
    // switch to sigungu view if we have data for the province
    if (id === 'seoul') {
      setMode('sigungu');
    }
    if (onRegionSelect) onRegionSelect(name, null);
    if (ev) {
      setHover({ text: name, x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY });
      setTimeout(() => setHover(null), 800);
    }
  }

  function handleSigunguClick(id: string, name: string, ev?: React.MouseEvent) {
    setSelectedSigungu(name);
    if (onRegionSelect) onRegionSelect(selectedSido, name);
    if (ev) {
      setHover({ text: name, x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY });
      setTimeout(() => setHover(null), 900);
    }
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div className={styles.label}>{mode === 'sido' ? '전국 시/도 선택' : `${selectedSido} - 구/군 선택`}</div>
        <div>
          {mode === 'sigungu' && (
            <button
              className={styles.backBtn}
              onClick={() => { setMode('sido'); setSelectedSido(null); setSelectedSigungu(null); if (onRegionSelect) onRegionSelect(null, null); }}
            >
              ◀ 전국 보기
            </button>
          )}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg className={styles.svgRoot} viewBox="0 0 300 160" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gradProvince" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id="gradProvinceActive" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="gradDistrict" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="100%" stopColor="#ffedd5" />
              </linearGradient>
            </defs>

            {/* background */}
            <rect x="0" y="0" width="300" height="160" fill="#ffffff" rx="6" ry="6" />

            {/* Provinces (stylized shapes) */}
            <g>
              <rect
                x="30"
                y="20"
                width="60"
                height="40"
                rx="8"
                ry="8"
                className={styles.region}
                style={{ fill: selectedSido === '서울특별시' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('seoul', '서울특별시', e)}
                onMouseMove={(e) => setHover({ text: '서울특별시', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="60" y="45" textAnchor="middle" fontSize="10" fill={selectedSido === '서울특별시' ? '#fff' : '#0f172a'}>서울특별시</text>
            </g>

            <g>
              <rect
                x="110"
                y="40"
                width="90"
                height="60"
                rx="10"
                ry="10"
                className={styles.region}
                style={{ fill: selectedSido === '경기도' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('gyeonggi', '경기도', e)}
                onMouseMove={(e) => setHover({ text: '경기도', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="155" y="70" textAnchor="middle" fontSize="10" fill={selectedSido === '경기도' ? '#fff' : '#0f172a'}>경기도</text>
            </g>

            <g>
              <rect
                x="210"
                y="20"
                width="60"
                height="100"
                rx="10"
                ry="10"
                className={styles.region}
                style={{ fill: selectedSido === '강원도' ? 'url(#gradProvinceActive)' : 'url(#gradProvince)' }}
                onClick={(e) => handleSidoClick('gangwon', '강원도', e)}
                onMouseMove={(e) => setHover({ text: '강원도', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                onMouseLeave={() => setHover(null)}
              />
              <text x="240" y="70" textAnchor="middle" fontSize="10" fill={selectedSido === '강원도' ? '#fff' : '#0f172a'}>강원도</text>
            </g>

            {/* Seoul district mock shapes when in drill mode */}
            {mode === 'sigungu' && selectedSido === '서울특별시' && (
              <g>
                <rect
                  x="36"
                  y="26"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강남구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangnam', '강남구', e)}
                  onMouseMove={(e) => setHover({ text: '강남구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="46" y="36" fontSize="8" fill={selectedSigungu === '강남구' ? '#fff' : '#1f2937'}>강남구</text>

                <rect
                  x="58"
                  y="26"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강서구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangseo', '강서구', e)}
                  onMouseMove={(e) => setHover({ text: '강서구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="68" y="36" fontSize="8" fill={selectedSigungu === '강서구' ? '#fff' : '#1f2937'}>강서구</text>

                <rect
                  x="36"
                  y="40"
                  width="20"
                  height="14"
                  rx="3"
                  className={styles.district}
                  style={{ fill: selectedSigungu === '강북구' ? 'url(#gradProvinceActive)' : 'url(#gradDistrict)' }}
                  onClick={(e) => handleSigunguClick('gangbuk', '강북구', e)}
                  onMouseMove={(e) => setHover({ text: '강북구', x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
                  onMouseLeave={() => setHover(null)}
                />
                <text x="46" y="50" fontSize="8" fill={selectedSigungu === '강북구' ? '#fff' : '#1f2937'}>강북구</text>
              </g>
            )}
          </svg>

          {hover && (
            <div className={styles.tooltip} style={{ left: hover.x, top: hover.y }}>
              {hover.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
