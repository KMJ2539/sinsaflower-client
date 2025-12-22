

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.css';

interface MapGeoViewProps {
  onRegionSelect?: (sido: string, sigungu: string) => void;
}

export default function MapGeoView({ onRegionSelect }: MapGeoViewProps) {
  const [provinceData, setProvinceData] = useState<any>(null);
  const [districtData, setDistrictData] = useState<any>(null);
  const [mode, setMode] = useState<'sido' | 'sigungu'>('sido');
  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const provinceLayerRef = useRef<L.GeoJSON | null>(null);
  const districtLayerRef = useRef<L.GeoJSON | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    const loadGeoData = async () => {
      try {
        console.log('MapGeoView: Starting to load GeoJSON files...');
        const [provResponse, distResponse] = await Promise.all([
          fetch('/geo/ctprvn_new.geojson'),
          fetch('/geo/sig_new.geojson')
        ]);
        
        const prov = await provResponse.json();
        const dist = await distResponse.json();
        
        console.log('MapGeoView: GeoJSON loaded successfully', { 
          provinceFeatures: prov.features?.length,
          districtFeatures: dist.features?.length 
        });
        setProvinceData(prov);
        setDistrictData(dist);
      } catch (error) {
        console.error('Failed to load GeoJSON data:', error);
      }
    };
    loadGeoData();
  }, []);

  // Get province name from feature
  const getProvinceName = (feature: any): string => {
    return feature.properties?.CTP_ENG_NM || 'Unknown';
  };

  // Get province code from feature
  const getProvinceCode = (feature: any): string => {
    return feature.properties?.CTPRVN_CD || '';
  };

  // Get district name from feature
  const getDistrictName = (feature: any): string => {
    return feature.properties?.SIG_ENG_NM || 'Unknown';
  };

  // Get district code from feature
  const getDistrictCode = (feature: any): string => {
    return feature.properties?.SIG_CD || '';
  };

  // Handle province click - zoom and switch to district view
  const handleProvinceClick = (feature: any) => {
    const provinceName = getProvinceName(feature);
    const provinceCode = getProvinceCode(feature);
    console.log('MapGeoView: Province clicked', { provinceName, provinceCode });
    setSelectedSido(provinceCode);
    setSelectedProvinceName(provinceName);
    setMode('sigungu');

    // Zoom to bounds
    if (mapRef.current) {
      const bounds = L.geoJSON(feature).getBounds();
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }
  };

  // Handle district click - select and callback
  const handleDistrictClick = (feature: any) => {
    const districtName = getDistrictName(feature);
    const districtCode = getDistrictCode(feature);
    console.log('MapGeoView: District clicked', { districtName, districtCode, provinceName: selectedProvinceName });
    setSelectedSigungu(districtCode);
    
    if (selectedProvinceName && onRegionSelect) {
      console.log('MapGeoView: Calling onRegionSelect', { selectedProvinceName, districtName });
      onRegionSelect(selectedProvinceName, districtName);
    }
  };

  // Style for province features
  const getProvinceStyle = (feature: any) => {
    const isSelected = getProvinceCode(feature) === selectedSido;
    return {
      color: isSelected ? '#ff0000' : '#999',
      weight: isSelected ? 2.5 : 1.5,
      opacity: isSelected ? 1 : 0.6,
      fillColor: isSelected ? '#ff8888' : '#e8e8e8',
      fillOpacity: isSelected ? 0.5 : 0.2,
    };
  };

  // Style for district features
  const getDistrictStyle = (feature: any) => {
    const districtCode = getDistrictCode(feature);
    const isSelected = districtCode === selectedSigungu;
    
    return {
      color: isSelected ? '#ff0000' : '#666',
      weight: isSelected ? 2.5 : 1,
      opacity: isSelected ? 1 : 0.5,
      fillColor: isSelected ? '#ff6666' : '#f0f0f0',
      fillOpacity: isSelected ? 0.6 : 0.15,
    };
  };

  // Add province layer to map
  useEffect(() => {
    if (!mapRef.current || !provinceData || mode !== 'sido') return;

    // Remove existing layer
    if (provinceLayerRef.current) {
      mapRef.current.removeLayer(provinceLayerRef.current);
    }

    const provinceLayer = L.geoJSON(provinceData, {
      style: getProvinceStyle,
      onEachFeature: (feature: any, layer: L.Layer) => {
        layer.on('click', () => handleProvinceClick(feature));
        layer.on('mouseover', function() {
          (this as any).setStyle({
            weight: 2.5,
            opacity: 0.8,
            fillOpacity: 0.4,
          });
          (this as any).bringToFront();
        });
        layer.on('mouseout', function() {
          if (getProvinceCode(feature) !== selectedSido) {
            provinceLayer.resetStyle(layer);
          }
        });
        
        const provinceName = getProvinceName(feature);
        layer.bindPopup(`<div style="font-size: 13px; padding: 5px; font-weight: bold;">${provinceName}</div>`);
      }
    });

    provinceLayer.addTo(mapRef.current);
    provinceLayerRef.current = provinceLayer;

    return () => {
      if (provinceLayerRef.current && mapRef.current) {
        mapRef.current.removeLayer(provinceLayerRef.current);
      }
    };
  }, [provinceData, mode, selectedSido]);

  // Add district layer to map
  useEffect(() => {
    if (!mapRef.current || !districtData || mode !== 'sigungu' || !selectedSido) return;

    // Remove existing layer
    if (districtLayerRef.current) {
      mapRef.current.removeLayer(districtLayerRef.current);
    }

    // Filter districts that belong to the selected province
    const filteredFeatures = districtData.features.filter((feature: any) => {
      const sigCode = getDistrictCode(feature);
      return sigCode.startsWith(selectedSido);
    });

    console.log(`Filtered ${filteredFeatures.length} districts for province ${selectedSido}`);

    const filteredData = { type: 'FeatureCollection', features: filteredFeatures };

    const districtLayer = L.geoJSON(filteredData, {
      style: getDistrictStyle,
      onEachFeature: (feature: any, layer: L.Layer) => {
        layer.on('click', () => handleDistrictClick(feature));
        layer.on('mouseover', function() {
          (this as any).setStyle({
            weight: 2.5,
            opacity: 0.9,
            fillOpacity: 0.4,
          });
          (this as any).bringToFront();
        });
        layer.on('mouseout', function() {
          if (getDistrictCode(feature) !== selectedSigungu) {
            districtLayer.resetStyle(layer);
          }
        });
        
        const districtName = getDistrictName(feature);
        layer.bindPopup(`<div style="font-size: 13px; padding: 5px; font-weight: bold;">${districtName}</div>`);
      }
    });

    districtLayer.addTo(mapRef.current);
    districtLayerRef.current = districtLayer;

    return () => {
      if (districtLayerRef.current && mapRef.current) {
        mapRef.current.removeLayer(districtLayerRef.current);
      }
    };
  }, [districtData, mode, selectedSido, selectedSigungu]);

  const handleBack = () => {
    setMode('sido');
    setSelectedSido(null);
    setSelectedProvinceName(null);
    setSelectedSigungu(null);
    if (mapRef.current) {
      mapRef.current.setView([36.5, 127.5], 7);
    }
  };

  return (
    <div className={styles.mapContainer} style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
      {/* Header with title and back button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fafafa',
        flexShrink: 0
      }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
          {mode === 'sido' ? '1. 시/도 선택' : `2. 시·군·구 선택 (${selectedProvinceName})`}
        </div>
        {mode === 'sigungu' && (
          <button
            onClick={handleBack}
            style={{
              background: '#f0f0f0',
              border: '1px solid #ccc',
              fontSize: '12px',
              cursor: 'pointer',
              color: '#555',
              padding: '4px 8px',
              borderRadius: '3px',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
          >
            ← 뒤로
          </button>
        )}
      </div>

      {/* Map - compact size */}
      <MapContainer
        ref={mapRef}
        center={[36.5, 127.5]}
        zoom={7}
        style={{ 
          flex: 1, 
          width: '100%', 
          height: '300px', 
          minHeight: '300px',
          backgroundColor: '#f5f5f5'
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
          opacity={0.8}
        />
      </MapContainer>
    </div>
  );
}
