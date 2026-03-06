'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNearbyToilets } from '@/lib/api';

export function useNearbyToilets(latitude: number | undefined, longitude: number | undefined, radiusKm: number = 1.0) {
  return useQuery({
    queryKey: ['nearbyToilets', latitude, longitude, radiusKm],
    queryFn: () => fetchNearbyToilets(latitude!, longitude!, radiusKm),
    enabled: !!latitude && !!longitude,
  });
}
