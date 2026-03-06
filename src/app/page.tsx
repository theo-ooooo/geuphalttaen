'use client';

import { useState } from 'react';
import KakaoMap from '@/components/KakaoMap';
import ToiletDetail from '@/components/ToiletDetail';
import ToiletList from '@/components/ToiletList';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useNearbyToilets } from '@/hooks/useNearbyToilets';
import { Toilet } from '@/types/toilet';

export default function Home() {
  const { location } = useCurrentLocation();
  const { data: toilets = [], isLoading } = useNearbyToilets(location?.latitude, location?.longitude);
  const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
  const [showList, setShowList] = useState(false);

  if (!location) {
    return (
      <div className="flex h-[calc(100vh-53px)] items-center justify-center">
        <p className="text-gray-500">위치 정보를 가져오는 중...</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-53px)]">
      {/* 지도 */}
      <KakaoMap
        latitude={location.latitude}
        longitude={location.longitude}
        toilets={toilets}
        onMarkerClick={setSelectedToilet}
      />

      {/* 목록 토글 버튼 */}
      <button
        onClick={() => setShowList(!showList)}
        className="absolute top-4 right-4 z-40 bg-white shadow-md rounded-lg px-4 py-2 text-sm font-medium"
      >
        {showList ? '지도 보기' : '목록 보기'}
      </button>

      {/* 로딩 */}
      {isLoading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-white shadow-md rounded-lg px-4 py-2 text-sm">
          주변 화장실 검색 중...
        </div>
      )}

      {/* 목록 패널 */}
      {showList && (
        <div className="absolute inset-0 z-30 bg-white overflow-y-auto">
          <ToiletList toilets={toilets} onSelect={(t) => { setSelectedToilet(t); setShowList(false); }} />
        </div>
      )}

      {/* 상세 패널 */}
      {selectedToilet && (
        <ToiletDetail toilet={selectedToilet} onClose={() => setSelectedToilet(null)} />
      )}
    </div>
  );
}
