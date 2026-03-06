'use client';

import { useState } from 'react';
import { Toilet } from '@/types/toilet';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';

interface ToiletDetailProps {
  toilet: Toilet;
  onClose: () => void;
}

export default function ToiletDetail({ toilet, onClose }: ToiletDetailProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

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
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 max-h-[70vh] overflow-y-auto">
      <div className="p-5">
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

        <div className="flex gap-2 mb-4">
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

      <div className="border-t">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-bold text-sm">리뷰</h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-sm text-blue-500 font-medium"
          >
            {showReviewForm ? '취소' : '리뷰 쓰기'}
          </button>
        </div>

        {showReviewForm ? (
          <ReviewForm toiletId={toilet.id} onClose={() => setShowReviewForm(false)} />
        ) : (
          <ReviewList toiletId={toilet.id} />
        )}
      </div>
    </div>
  );
}
