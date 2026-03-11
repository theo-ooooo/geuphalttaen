'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '@/lib/api';
import StarRating from '@/components/StarRating';

interface ReviewFormProps {
  toiletId: number;
  onClose: () => void;
}

export default function ReviewForm({ toiletId, onClose }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [hasPaper, setHasPaper] = useState(true);
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: () => createReview(toiletId, { nickname, rating, cleanliness, hasPaper, comment: comment || undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', toiletId] });
      queryClient.invalidateQueries({ queryKey: ['averageRating', toiletId] });
      onClose();
    },
  });

  const isValid = nickname.trim() && rating > 0 && cleanliness > 0;

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-bold text-base">리뷰 작성</h3>

      <div>
        <label className="text-sm text-gray-600 block mb-1">닉네임</label>
        <input
          type="text"
          maxLength={20}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 block mb-1">별점</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="text-sm text-gray-600 block mb-1">청결도</label>
        <StarRating value={cleanliness} onChange={setCleanliness} />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">휴지 있음</label>
        <button
          onClick={() => setHasPaper(!hasPaper)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            hasPaper ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {hasPaper ? 'O' : 'X'}
        </button>
      </div>

      <div>
        <label className="text-sm text-gray-600 block mb-1">한줄평</label>
        <textarea
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
          rows={3}
          placeholder="선택사항"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 border rounded-lg py-2 text-sm">
          취소
        </button>
        <button
          onClick={() => mutation.mutate()}
          disabled={!isValid || mutation.isPending}
          className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm disabled:opacity-50"
        >
          {mutation.isPending ? '등록 중...' : '등록'}
        </button>
      </div>
    </div>
  );
}
