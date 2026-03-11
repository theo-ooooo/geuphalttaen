'use client';

import { useEffect, useState, useCallback } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
        // 서울시청 기본 좌표
        setLocation({ latitude: 37.5666805, longitude: 126.9784147 });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return { location, error, refresh: getPosition };
}
