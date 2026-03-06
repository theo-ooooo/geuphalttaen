'use client';

import { Toilet } from '@/types/toilet';

interface ToiletDetailProps {
  toilet: Toilet;
  onClose: () => void;
}

export default function ToiletDetail({ toilet, onClose }: ToiletDetailProps) {
  const openNaverMap = () => {
    window.open(
      `nmap://route/walk?dlat=${toilet.latitude}&dlng=${toilet.longitude}&dname=${encodeURIComponent(toilet.name)}`,
    );
  };

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent(toilet.name)},${toilet.latitude},${toilet.longitude}`,
    );
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-5 z-50">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold">{toilet.name}</h2>
        <button onClick={onClose} className="text-gray-400 text-xl leading-none">
          &times;
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-1">{toilet.roadAddress}</p>

      {toilet.openTime && toilet.closeTime && (
        <p className="text-sm text-gray-500 mb-2">
          운영시간: {toilet.openTime} ~ {toilet.closeTime}
        </p>
      )}

      <div className="flex gap-2 text-xs text-gray-500 mb-4">
        <span>남 {toilet.maleToiletCount}칸</span>
        <span>여 {toilet.femaleToiletCount}칸</span>
        {toilet.isDisabledAvailable && <span className="text-blue-600">♿ 장애인 화장실</span>}
      </div>

      {toilet.phoneNumber && (
        <p className="text-xs text-gray-400 mb-4">전화: {toilet.phoneNumber}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={openKakaoMap}
          className="flex-1 bg-yellow-400 text-black py-2 rounded-lg text-sm font-medium"
        >
          카카오맵 길찾기
        </button>
        <button
          onClick={openNaverMap}
          className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
        >
          네이버맵 길찾기
        </button>
      </div>
    </div>
  );
}
