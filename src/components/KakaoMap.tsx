'use client';

import { useEffect, useRef } from 'react';
import { loadKakaoMapScript } from '@/lib/kakao';
import { Toilet } from '@/types/toilet';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  toilets: Toilet[];
  onMarkerClick?: (toilet: Toilet) => void;
}

export default function KakaoMap({ latitude, longitude, toilets, onMarkerClick }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    loadKakaoMapScript().then(() => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(latitude, longitude);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 4,
      });

      mapInstanceRef.current = map;

      // 현재 위치 마커
      new window.kakao.maps.Marker({
        map,
        position: center,
        image: new window.kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          new window.kakao.maps.Size(24, 35),
        ),
      });
    });
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapInstanceRef.current || !toilets.length) return;

    const map = mapInstanceRef.current;

    toilets.forEach((toilet) => {
      const position = new window.kakao.maps.LatLng(toilet.latitude, toilet.longitude);
      const marker = new window.kakao.maps.Marker({ map, position });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;white-space:nowrap;">${toilet.name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });
      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        onMarkerClick?.(toilet);
      });
    });
  }, [toilets, onMarkerClick]);

  return <div ref={mapRef} className="w-full h-full" />;
}
