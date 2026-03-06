'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchReviews, fetchAverageRating } from '@/lib/api';
import StarRating from '@/components/StarRating';

interface ReviewListProps {
  toiletId: number;
}

export default function ReviewList({ toiletId }: ReviewListProps) {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', toiletId],
    queryFn: () => fetchReviews(toiletId),
  });

  const { data: avgRating = 0 } = useQuery({
    queryKey: ['averageRating', toiletId],
    queryFn: () => fetchAverageRating(toiletId),
  });

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <StarRating value={Math.round(avgRating)} readonly size="sm" />
        <span className="text-sm text-gray-500">{avgRating.toFixed(1)} ({reviews.length}개)</span>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-400">아직 리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{review.nickname}</span>
                <StarRating value={review.rating} readonly size="sm" />
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mt-1">
                <span>청결 {review.cleanliness}/5</span>
                <span>휴지 {review.hasPaper ? 'O' : 'X'}</span>
              </div>
              {review.comment && <p className="text-sm text-gray-700 mt-1">{review.comment}</p>}
              <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString('ko-KR')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
