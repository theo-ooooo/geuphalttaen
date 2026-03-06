import { Toilet } from '@/types/toilet';
import { Review, ReviewRequest } from '@/types/review';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchNearbyToilets(
  latitude: number,
  longitude: number,
  radiusKm: number = 1.0,
): Promise<Toilet[]> {
  const res = await fetch(
    `${API_BASE}/api/toilets/nearby?latitude=${latitude}&longitude=${longitude}&radiusKm=${radiusKm}`,
  );
  if (!res.ok) throw new Error('Failed to fetch nearby toilets');
  return res.json();
}

export async function fetchToilet(id: number): Promise<Toilet> {
  const res = await fetch(`${API_BASE}/api/toilets/${id}`);
  if (!res.ok) throw new Error('Failed to fetch toilet');
  return res.json();
}

export async function fetchReviews(toiletId: number): Promise<Review[]> {
  const res = await fetch(`${API_BASE}/api/toilets/${toiletId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function fetchAverageRating(toiletId: number): Promise<number> {
  const res = await fetch(`${API_BASE}/api/toilets/${toiletId}/reviews/rating`);
  if (!res.ok) throw new Error('Failed to fetch rating');
  const data = await res.json();
  return data.averageRating;
}

export async function createReview(toiletId: number, request: ReviewRequest): Promise<Review> {
  const res = await fetch(`${API_BASE}/api/toilets/${toiletId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) throw new Error('Failed to create review');
  return res.json();
}
