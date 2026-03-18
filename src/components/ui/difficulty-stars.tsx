import { Star } from 'lucide-react';

interface DifficultyStarsProps {
  level: number;
  size?: 'sm' | 'md';
}

export function DifficultyStars({ level, size = 'md' }: DifficultyStarsProps) {
  const cls = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < level ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`}
        />
      ))}
    </div>
  );
}
