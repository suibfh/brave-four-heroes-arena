'use client';

import { useState, useEffect } from 'react';
import type { DeckTemplate } from '@/src/types/battle';
import { heroMetaCache, fetchHeroMeta } from '@/src/lib/battle/cache';
import { toFastUnitImageUrl } from '@/src/lib/battle/imageUrl';

// ---- DeckUnitIcon ----
// useHeroMeta はマウント時の初期値を使うため、キャッシュが埋まっても
// 再レンダリングされない。ポーリングで強制再評価する。
function DeckUnitIcon({ heroId }: { heroId: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (heroMetaCache[heroId]) return;
    // まだキャッシュがなければ fetch を起動しつつポーリング
    fetchHeroMeta(heroId, () => setTick(v => v + 1));
    const t = setInterval(() => {
      if (heroMetaCache[heroId]) { setTick(v => v + 1); clearInterval(t); }
    }, 200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroId]);

  // tick を依存させることで再評価を強制
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const meta = heroMetaCache[heroId] ?? null;
  void tick; // suppress unused warning

  return (
    <div className="w-7 h-7 rounded overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
      {meta?.image
        ? <img src={toFastUnitImageUrl(meta.image)} alt="" className="w-full h-full object-cover" />
        : <div className="w-full h-full animate-pulse bg-neutral-200" />}
    </div>
  );
}

// ---- DeckCard ----
interface DeckCardProps {
  deck: DeckTemplate;
  label: string;
  onLoad: (deck: DeckTemplate) => void;
}

export function DeckCard({ deck, label, onLoad }: DeckCardProps) {
  const sorted = [...deck.units].sort((a, b) => a.position - b.position);
  return (
    <button
      onClick={() => onLoad(deck)}
      className="w-full text-left border-2 border-neutral-200 hover:border-red-400 hover:bg-red-50 rounded-lg p-2 transition-all group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-black text-neutral-500 uppercase">{label}</span>
        <span className="text-[9px] font-mono text-neutral-400">{sorted.length}体</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {sorted.map((u, i) => (
          <DeckUnitIcon key={i} heroId={String(u.hero_id)} />
        ))}
      </div>
      <p className="text-[9px] text-red-500 font-black mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        ▶ タップして編成に反映
      </p>
    </button>
  );
}

// ---- DeckTemplateList ----
interface DeckTemplateListProps {
  deckTemplates: DeckTemplate[];
  questDeckTemplates: DeckTemplate[];
  onLoad: (deck: DeckTemplate) => void;
}

export function DeckTemplateList({ deckTemplates, questDeckTemplates, onLoad }: DeckTemplateListProps) {
  if (deckTemplates.length === 0 && questDeckTemplates.length === 0) {
    return (
      <p className="text-[10px] text-neutral-400 font-mono py-4 text-center">
        パーティテンプレートがありません
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {deckTemplates.length > 0 && (
        <div className="space-y-2">
          <p className="text-[9px] font-black text-neutral-400 uppercase">通常パーティ</p>
          {deckTemplates.map((deck, i) => (
            <DeckCard key={deck.jin_id} deck={deck} label={`パーティ ${i + 1}`} onLoad={onLoad} />
          ))}
        </div>
      )}
      {questDeckTemplates.length > 0 && (
        <div className="space-y-2">
          <p className="text-[9px] font-black text-neutral-400 uppercase">クエストパーティ</p>
          {questDeckTemplates.map((deck, i) => (
            <DeckCard key={deck.jin_id} deck={deck} label={`クエストパーティ ${i + 1}`} onLoad={onLoad} />
          ))}
        </div>
      )}
    </div>
  );
}
