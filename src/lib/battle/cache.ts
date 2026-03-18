// ============================================================
// バトル用グローバルキャッシュ
// モジュールスコープで保持し、再マウント時も再fetchしない
// ============================================================

import type { HeroMetadata, SkillEntry } from '@/src/types/battle';

// ---- ヒーローNFTメタデータキャッシュ ----
export const heroMetaCache: Record<string, HeroMetadata> = {};
const heroMetaFetching = new Set<string>();

/**
 * ヒーローNFTメタデータを取得してキャッシュする
 * すでにキャッシュ済みの場合は即座にコールバックを呼ぶ
 */
export function fetchHeroMeta(heroId: string, cb: (d: HeroMetadata) => void): void {
  if (heroMetaCache[heroId]) {
    cb(heroMetaCache[heroId]);
    return;
  }
  if (heroMetaFetching.has(heroId)) return;
  heroMetaFetching.add(heroId);
  fetch(`/api/hero/metadata/${heroId}`)
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      if (d) {
        heroMetaCache[heroId] = d;
        cb(d);
      }
    })
    .catch(() => {})
    .finally(() => heroMetaFetching.delete(heroId));
}

// ---- スキルキャッシュ ----
// 構造: [{skill_id, name:{ja,...}, description:{ja:{condition?,effects:[]}}}]
// → skill_id をキーにしたマップに変換して使う
let skillsCache: Record<string, SkillEntry> | null = null;
let skillsFetching = false;
let skillsCallbacks: (() => void)[] = [];

/**
 * skills_v2.json を取得してキャッシュする
 * すでにキャッシュ済みの場合は即座にコールバックを呼ぶ
 */
export function fetchSkills(cb: () => void): void {
  if (skillsCache) {
    cb();
    return;
  }
  skillsCallbacks.push(cb);
  if (skillsFetching) return;
  skillsFetching = true;
  fetch('https://rsc.bravefrontierheroes.com/data/skills_v2.json')
    .then(r => r.ok ? r.json() : null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((arr: any[]) => {
      const map: Record<string, SkillEntry> = {};
      if (Array.isArray(arr)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arr.forEach((s: any) => {
          const ja = s?.description?.ja;
          if (s?.skill_id != null) {
            map[String(s.skill_id)] = {
              condition: ja?.condition,
              effects: ja?.effects ?? [],
            };
          }
        });
      }
      skillsCache = map;
      skillsCallbacks.forEach(fn => fn());
      skillsCallbacks = [];
    })
    .catch(() => {
      skillsCache = {};
      skillsCallbacks.forEach(fn => fn());
      skillsCallbacks = [];
    })
    .finally(() => {
      skillsFetching = false;
    });
}

/**
 * キャッシュからスキルエントリを取得する
 * キャッシュ未ロードの場合は null を返す
 */
export function getSkill(id?: number): SkillEntry | null {
  if (!id || !skillsCache) return null;
  return skillsCache[String(id)] ?? null;
}

/**
 * スキルキャッシュがロード済みか確認する
 */
export function isSkillsCacheReady(): boolean {
  return skillsCache !== null;
}
