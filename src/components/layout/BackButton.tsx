'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface BackButtonProps {
  href?: string; // 指定しない場合は router.back()
  className?: string;
}

export function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={`cyber-button border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white flex-shrink-0 ${className ?? ''}`}
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );
}
