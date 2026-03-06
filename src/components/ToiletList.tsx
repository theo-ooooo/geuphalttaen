'use client';

import { Toilet } from '@/types/toilet';

interface ToiletListProps {
  toilets: Toilet[];
  onSelect: (toilet: Toilet) => void;
}

export default function ToiletList({ toilets, onSelect }: ToiletListProps) {
  if (!toilets.length) {
    return <p className="text-center text-gray-400 py-8">주변에 화장실이 없습니다.</p>;
  }

  return (
    <ul className="divide-y">
      {toilets.map((toilet) => (
        <li
          key={toilet.id}
          className="p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
          onClick={() => onSelect(toilet)}
        >
          <p className="font-medium text-sm">{toilet.name}</p>
          <p className="text-xs text-gray-500 mt-1">{toilet.roadAddress}</p>
          <div className="flex gap-2 text-xs text-gray-400 mt-1">
            {toilet.isDisabledAvailable && <span className="text-blue-500">♿</span>}
            {toilet.openTime && <span>{toilet.openTime} ~ {toilet.closeTime}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
