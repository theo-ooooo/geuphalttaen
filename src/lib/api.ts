import { Toilet } from '@/types/toilet';

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
