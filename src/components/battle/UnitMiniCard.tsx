'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import type { HeroGameData } from '@/src/types/battle';
import { RARITY_LABEL, UNIT_ATTR_MAP } from '@/src/lib/battle/constants';
import { toFastUnitImageUrl } from '@/src/lib/battle/imageUrl';
import { useHeroMeta } from '@/src/components/battle/HeroDetailModal';
import { HeroDetailModal } from '@/src/components/battle/HeroDetailModal';

interface UnitMiniCardProps {
  heroId: string;
  isSelected: boolean;
  isDisabled: boolean;
  gameData?: HeroGameData;
  onClick: () => void;
}

export function UnitMiniCard({ heroId, isSelected, isDisabled, gameData, onClick }: UnitMiniCardProps) {
  const meta = useHeroMeta(heroId);
  const [showDetail, setShowDetail] = useState(false);
  const attrInfo = gameData ? UNIT_ATTR_MAP[gameData.attribute] : null;
  const rarityLabel = meta ? (RARITY_LABEL[meta.attributes.rarity] ?? '') : '';

  return (
    <>
      <div
        className={`relative border-2 rounded-lg cursor-pointer transition-all select-none ${
          isSelected
            ? 'border-red-600 bg-red-50'
            : isDisabled
              ? 'border-neutral-200 opacity-40 cursor-not-allowed'
              : 'border-neutral-300 hover:border-red-400 bg-white hover:bg-neutral-50'
        }`}
        onClick={() => !isDisabled && onClick()}
      >
        {/* 属性バッジ */}
        {attrInfo && (
          <span className={`absolute top-1 left-1 z-10 text-[8px] font-black px-1 rounded border ${attrInfo.tw}`}>
            {attrInfo.label}
          </span>
        )}
        {/* 詳細ボタン */}
        {meta && (
          <button
            className="absolute top-0 right-0 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-bl-lg rounded-tr-md hover:bg-white active:bg-white"
            onClick={e => { e.stopPropagation(); setShowDetail(true); }}
          >
            <Info className="w-5 h-5 text-neutral-500" />
          </button>
        )}
        {meta?.image ? (
          <img
            src={toFastUnitImageUrl(meta.image)}
            alt=""
            loading="lazy"
            className="w-full aspect-square object-cover rounded-t-md"
          />
        ) : (
          <div className="w-full aspect-square bg-neutral-100 rounded-t-md animate-pulse" />
        )}
        <div className="px-1.5 py-1">
          <div className="flex items-center gap-1 mb-0.5">
            {rarityLabel && (
              <span className="text-[8px] font-black text-neutral-400 uppercase">{rarityLabel}</span>
            )}
            <p className="text-[10px] font-bold uppercase leading-tight truncate flex-1">
              {meta?.attributes?.type_name ?? `#${heroId}`}
            </p>
          </div>
          {meta?.attributes && (
            <p className="text-[9px] font-mono text-neutral-400">
              HP {(meta.attributes.hp ?? 0).toLocaleString()}
            </p>
          )}
        </div>
        {isSelected && (
          <div className="absolute inset-0 rounded-lg pointer-events-none flex items-start justify-start p-1">
            <span className="text-white font-black text-[9px] bg-red-600 px-1 rounded">✓</span>
          </div>
        )}
      </div>
      {showDetail && (
        <HeroDetailModal heroId={heroId} gameData={gameData} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
