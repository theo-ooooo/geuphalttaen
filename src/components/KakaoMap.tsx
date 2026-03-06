'use client';

import { useEffect, useRef, useCallback } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        if (!mapRef.current) return;

        const { kakao } = window;
        const center = new kakao.maps.LatLng(latitude, longitude);
        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: 4,
        });

        mapInstanceRef.current = map;

        // 현재 위치 마커
        new kakao.maps.Marker({
          map,
          position: center,
          image: new kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new kakao.maps.Size(24, 35),
          ),
        });
      })
      .catch((err) => {
        console.error('Kakao Maps load error:', err);
      });
  }, [latitude, longitude]);

  const addMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !toilets.length) return;

    const { kakao } = window;
    const map = mapInstanceRef.current;

    toilets.forEach((toilet) => {
      const position = new kakao.maps.LatLng(toilet.latitude, toilet.longitude);
      const marker = new kakao.maps.Marker({ map, position });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;white-space:nowrap;">${toilet.name}</div>`,
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        onMarkerClickRef.current?.(toilet);
      });
    });
  }, [toilets]);

  useEffect(() => {
    addMarkers();
  }, [addMarkers]);

  return <div ref={mapRef} className="w-full h-full" />;
}
