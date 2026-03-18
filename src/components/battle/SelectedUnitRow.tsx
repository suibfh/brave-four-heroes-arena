'use client';

import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { SelectedUnit, SphereGameData } from '@/src/types/battle';
import { SKILL_LABELS, SKILL_COLORS } from '@/src/lib/battle/constants';
import { toFastUnitImageUrl, getSphereImageUrl } from '@/src/lib/battle/imageUrl';
import { useHeroMeta } from '@/src/components/battle/HeroDetailModal';

type StatKey = 'hp' | 'phy' | 'int' | 'agi' | 'spr' | 'def';
const STAT_KEYS: StatKey[] = ['hp', 'phy', 'int', 'def', 'spr', 'agi'];
const STAT_LABELS: Record<StatKey, string> = {
  hp: 'HP', phy: '攻撃', int: '魔攻', def: '防御', spr: '魔防', agi: '敏捷',
};

interface SelectedUnitRowProps {
  unit: SelectedUnit;
  onSphereClick: (slotIdx: number) => void;
  onSphereRemove: (slotIdx: number) => void;
  onRemove: () => void;
  onSkillOrderChange: (newOrders: [number, number, number]) => void;
  reorderMode: boolean;
  isReorderSelected: boolean;
  onReorderTap: () => void;
  onUnitReselect: () => void;
  sphereGameData?: (SphereGameData | undefined)[];
}

export function SelectedUnitRow({
  unit, onSphereClick, onSphereRemove, onRemove, onSkillOrderChange,
  reorderMode, isReorderSelected, onReorderTap, onUnitReselect, sphereGameData,
}: SelectedUnitRowProps) {
  const meta = useHeroMeta(unit.heroId);
  const sphereMetas = sphereGameData ?? [undefined, undefined];
  const [showSkills, setShowSkills] = useState(false);

  const moveSkill = (idx: number, dir: -1 | 1) => {
    const newOrders = [...unit.skillOrders] as [number, number, number];
    const swap = idx + dir;
    if (swap < 0 || swap > 2) return;
    [newOrders[idx], newOrders[swap]] = [newOrders[swap], newOrders[idx]];
    onSkillOrderChange(newOrders);
  };

  // スフィア合算ステータス計算
  const baseStats = meta?.attributes
    ? {
        hp: meta.attributes.hp, phy: meta.attributes.phy, int: meta.attributes.int,
        agi: meta.attributes.agi, spr: meta.attributes.spr, def: meta.attributes.def,
      }
    : null;

  const sphereBonus = STAT_KEYS.reduce((acc, k) => {
    const gd0 = sphereGameData?.[0];
    const gd1 = sphereGameData?.[1];
    const val = (gd: SphereGameData | undefined) =>
      k === 'hp'  ? (gd?.param?.hp  ?? 0)
      : k === 'phy' ? (gd?.param?.phy ?? 0)
      : k === 'int' ? (gd?.param?.int ?? 0)
      : k === 'agi' ? (gd?.param?.agi ?? 0)
      : k === 'spr' ? (gd?.param?.mnd ?? 0)
      : k === 'def' ? (gd?.param?.vit ?? 0)
      : 0;
    acc[k] = val(gd0) + val(gd1);
    return acc;
  }, {} as Record<StatKey, number>);

  const totalStats = baseStats
    ? STAT_KEYS.reduce((acc, k) => {
        acc[k] = baseStats[k] + sphereBonus[k];
        return acc;
      }, {} as Record<StatKey, number>)
    : null;

  const hasBB  = !!meta?.attributes?.brave_burst;
  const hasArt = !!meta?.attributes?.art_skill;

  return (
    <div
      onClick={reorderMode ? onReorderTap : undefined}
      className={`border-2 rounded-lg bg-white overflow-hidden transition-all ${
        reorderMode
          ? isReorderSelected
            ? 'border-orange-500 ring-2 ring-orange-300 cursor-pointer shadow-md scale-[1.01]'
            : 'border-neutral-400 cursor-pointer hover:border-orange-400 hover:shadow'
          : 'border-neutral-200'
      }`}
    >
      {/* ユニット行 */}
      <div className="flex items-center gap-2 p-2 border-b border-neutral-100">
        <button
          onClick={!reorderMode ? onUnitReselect : undefined}
          className={`w-9 h-9 flex-shrink-0 rounded overflow-hidden bg-neutral-100 relative group ${!reorderMode ? 'cursor-pointer' : ''}`}
        >
          {meta?.image
            ? <img src={toFastUnitImageUrl(meta.image)} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full animate-pulse bg-neutral-200" />}
          {!reorderMode && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded flex items-center justify-center">
              <span className="text-white text-[8px] font-black opacity-0 group-hover:opacity-100">変更</span>
            </div>
          )}
        </button>
        <div
          onClick={!reorderMode ? onUnitReselect : undefined}
          className={`flex-1 min-w-0 ${!reorderMode ? 'cursor-pointer' : ''}`}
        >
          <p className="font-bold text-xs uppercase truncate">
            {meta?.attributes?.type_name ?? `Unit #${unit.heroId}`}
          </p>
          {totalStats ? (
            <div className="grid grid-cols-3 gap-x-2 gap-y-0 mt-0.5">
              {STAT_KEYS.map(k => (
                <div key={k} className="flex items-baseline gap-0.5">
                  <span className="text-[8px] font-black text-neutral-400 w-5 flex-shrink-0">{STAT_LABELS[k]}</span>
                  <span className="text-[9px] font-mono text-neutral-700">{totalStats[k].toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-3 w-20 rounded animate-pulse bg-neutral-100 mt-1" />
          )}
        </div>
        {reorderMode ? (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isReorderSelected ? 'bg-orange-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
            {isReorderSelected ? '選択中' : 'タップ'}
          </span>
        ) : (
          <button onClick={onRemove} className="text-neutral-300 hover:text-red-500 font-bold text-sm px-1 flex-shrink-0">×</button>
        )}
      </div>

      {/* スフィアスロット */}
      <div className="flex gap-1.5 px-2 py-1.5">
        {([
          { label: 'スフィア1', filledCls: 'border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-100', emptyCls: 'border-dashed border-blue-200 text-blue-300 hover:border-blue-400 hover:text-blue-400' },
          { label: 'スフィア2', filledCls: 'border-green-400 text-green-700 bg-green-50 hover:bg-green-100', emptyCls: 'border-dashed border-green-200 text-green-300 hover:border-green-400 hover:text-green-400' },
        ] as const).map(({ label, filledCls, emptyCls }, slotIdx) => {
          const sId = unit.sphereIds[slotIdx];
          return (
            <div key={slotIdx} className="flex items-center gap-1 flex-1 min-w-0">
              <button
                onClick={() => onSphereClick(slotIdx)}
                className={`flex-1 flex items-center gap-1 text-[10px] font-bold px-1.5 py-1 border rounded transition-colors text-left min-w-0 ${sId ? filledCls : emptyCls}`}
              >
                {getSphereImageUrl(sphereMetas[slotIdx])
                  ? <img src={getSphereImageUrl(sphereMetas[slotIdx])!} alt="" className="w-5 h-5 object-contain flex-shrink-0 rounded" />
                  : <span className="text-[9px] font-black flex-shrink-0 opacity-60">{label[0]}{label.slice(-1)}</span>}
                <span className="truncate">
                  {sphereMetas[slotIdx]?.name_jp || sphereMetas[slotIdx]?.name || (sId ? `#${sId}` : label)}
                </span>
              </button>
              {sId && (
                <button onClick={() => onSphereRemove(slotIdx)} className="text-neutral-300 hover:text-red-500 text-xs leading-none flex-shrink-0">×</button>
              )}
            </div>
          );
        })}
      </div>

      {/* スキル行動順 */}
      <div className="px-2 pb-2">
        <p className="text-[9px] text-neutral-400 font-bold uppercase mb-1">行動順</p>
        <div className="space-y-0.5">
          {unit.skillOrders.map((skillIdx, orderIdx) => (
            <div key={orderIdx} className="flex items-center gap-1">
              <span className="text-[9px] font-mono text-neutral-400 w-3">{orderIdx + 1}.</span>
              <span className={`flex-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${SKILL_COLORS[skillIdx]}`}>
                {SKILL_LABELS[skillIdx]}
              </span>
              <button
                onClick={() => moveSkill(orderIdx, -1)}
                disabled={orderIdx === 0}
                className="p-0.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-20"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => moveSkill(orderIdx, 1)}
                disabled={orderIdx === 2}
                className="p-0.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-20"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BB・アートスキル */}
      {(hasBB || hasArt) && !reorderMode && (
        <div className="border-t border-neutral-100">
          <button
            onClick={e => { e.stopPropagation(); setShowSkills(v => !v); }}
            className="w-full flex items-center justify-between px-2 py-1 text-[9px] font-black text-neutral-400 uppercase hover:bg-neutral-50 transition-colors"
          >
            <span>スキル詳細</span>
            <span>{showSkills ? '▲' : '▼'}</span>
          </button>
          {showSkills && (
            <div className="px-2 pb-2 space-y-1.5">
              {hasBB && (
                <div>
                  <p className="text-[8px] font-black text-purple-600 uppercase mb-0.5">Brave Burst</p>
                  <p className="text-[10px] text-neutral-600 leading-snug">{meta!.attributes.brave_burst}</p>
                </div>
              )}
              {hasArt && (
                <div>
                  <p className="text-[8px] font-black text-red-500 uppercase mb-0.5">Art Skill</p>
                  <p className="text-[10px] text-neutral-600 leading-snug">{meta!.attributes.art_skill}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
