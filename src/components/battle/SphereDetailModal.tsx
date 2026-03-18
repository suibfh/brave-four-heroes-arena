'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { SphereGameData } from '@/src/types/battle';
import { SPHERE_RARITY_MAP } from '@/src/lib/battle/constants';
import { fetchSkills, getSkill, isSkillsCacheReady } from '@/src/lib/battle/cache';
import { getSphereImageUrl } from '@/src/lib/battle/imageUrl';

interface SphereDetailModalProps {
  gameData?: SphereGameData;
  onClose: () => void;
}

export function SphereDetailModal({ gameData, onClose }: SphereDetailModalProps) {
  const [skillsReady, setSkillsReady] = useState(isSkillsCacheReady());

  useEffect(() => {
    if (!isSkillsCacheReady()) fetchSkills(() => setSkillsReady(true));
  }, []);

  if (!gameData) return null;

  const imageUrl = getSphereImageUrl(gameData);
  const sphereSkill = skillsReady ? getSkill(gameData.active) : null;
  const rarityLabel = SPHERE_RARITY_MAP[gameData.rarity] ?? '';
  const p = gameData.param;
  const PARAM_KEYS: [string, number][] = [
    ['HP',   p.hp  ?? 0],
    ['攻撃', p.phy ?? 0],
    ['魔攻', p.int ?? 0],
    ['防御', p.vit ?? 0],
    ['魔防', p.mnd ?? 0],
    ['敏捷', p.agi ?? 0],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white border-2 border-neutral-900 rounded-xl max-w-xs w-full shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-neutral-50 flex items-center justify-center h-32">
          {imageUrl
            ? <img src={imageUrl} alt="" className="h-full object-contain" />
            : <div className="w-full h-full animate-pulse bg-neutral-200" />}
          <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
            <X className="w-4 h-4" />
          </button>
          {rarityLabel && (
            <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {rarityLabel}
            </span>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-black text-sm uppercase leading-tight">
                {gameData.name_jp || gameData.name}
              </p>
              <p className="text-xs text-neutral-400 font-mono">Lv {gameData.lv}</p>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded flex-shrink-0">
              #{gameData.extension_id}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
            {PARAM_KEYS.map(([k, v]) =>
              v > 0 ? (
                <div key={k} className="bg-blue-50 rounded px-2 py-1 flex justify-between">
                  <span className="text-blue-400 font-bold">{k}</span>
                  <span className="font-bold text-blue-700">+{v}</span>
                </div>
              ) : null
            )}
          </div>
          {sphereSkill && sphereSkill.effects.length > 0 && (
            <div className="text-xs space-y-1">
              <p className="font-black text-blue-700 text-[10px] uppercase">Sphere Skill</p>
              <ul className="space-y-0.5">
                {sphereSkill.effects.map((e, i) => (
                  <li key={i} className="text-neutral-600 leading-snug pl-2 border-l-2 border-blue-200">{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
