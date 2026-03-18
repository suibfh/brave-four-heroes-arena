'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import type { SphereGameData } from '@/src/types/battle';
import { SPHERE_RARITY_MAP } from '@/src/lib/battle/constants';
import { getSphereImageUrl } from '@/src/lib/battle/imageUrl';
import { SphereDetailModal } from '@/src/components/battle/SphereDetailModal';

interface SphereMiniCardProps {
  gameData?: SphereGameData;
  onClick: () => void;
}

export function SphereMiniCard({ gameData, onClick }: SphereMiniCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const imageUrl = getSphereImageUrl(gameData);
  const rarityLabel = gameData ? (SPHERE_RARITY_MAP[gameData.rarity] ?? '') : '';
  const p = gameData?.param;
  const mainStat = p
    ? (p.hp  ?? 0) > 0 ? `HP+${p.hp}`
    : (p.phy ?? 0) > 0 ? `PHY+${p.phy}`
    : (p.int ?? 0) > 0 ? `INT+${p.int}` : ''
    : '';

  return (
    <>
      <div
        className="relative border-2 border-neutral-300 rounded-lg cursor-pointer hover:border-blue-500 bg-white hover:bg-blue-50 transition-all"
        onClick={onClick}
      >
        {rarityLabel && (
          <span className="absolute top-1 left-1 z-10 text-[8px] font-black text-neutral-500 bg-white/90 px-1 rounded">
            {rarityLabel}
          </span>
        )}
        {gameData && (
          <button
            className="absolute top-0 right-0 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-bl-lg rounded-tr-md hover:bg-white active:bg-white"
            onClick={e => { e.stopPropagation(); setShowDetail(true); }}
          >
            <Info className="w-5 h-5 text-neutral-500" />
          </button>
        )}
        {imageUrl
          ? <img src={imageUrl} alt="" loading="lazy" className="w-full aspect-square object-contain p-1" />
          : <div className="w-full aspect-square bg-neutral-100 rounded-t-md animate-pulse" />}
        <div className="px-1.5 py-1">
          <p className="text-[10px] font-bold uppercase leading-tight truncate">
            {gameData?.name_jp || gameData?.name || `#${gameData?.extension_id}`}
          </p>
          {mainStat && <p className="text-[9px] font-mono text-blue-500">{mainStat}</p>}
        </div>
      </div>
      {showDetail && (
        <SphereDetailModal gameData={gameData} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
