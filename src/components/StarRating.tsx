'use client';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}

export default function StarRating({ value, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-xl';

  return (
    <div className={`flex gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${readonly ? '' : 'cursor-pointer'} ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => !readonly && onChange?.(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
