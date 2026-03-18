// ============================================================
// バトル関連の定数
// rarity数値: 5=L(LL), 4=E, 3=R, 2=U (1=Commonはゲーム内限定)
// attribute数値: 1=炎, 2=水, 3=樹, 4=雷, 5=光, 6=闇
// ============================================================

export const UNIT_RARITY_MAP: Record<number, string> = {
  5: 'L', 4: 'E', 3: 'R', 2: 'U',
};

export const SPHERE_RARITY_MAP: Record<number, string> = {
  5: 'L', 4: 'E', 3: 'R', 2: 'U', 1: 'C',
};

// NFTメタデータのrarity文字列 → 表示ラベル
export const RARITY_LABEL: Record<string, string> = {
  Legendary: 'L', Epic: 'E', Rare: 'R', Uncommon: 'U', Common: 'C',
};

export const UNIT_ATTR_MAP: Record<number, { label: string; tw: string }> = {
  1: { label: '炎', tw: 'bg-red-100 text-red-700 border-red-300' },
  2: { label: '水', tw: 'bg-sky-100 text-sky-700 border-sky-300' },
  3: { label: '樹', tw: 'bg-green-100 text-green-700 border-green-300' },
  4: { label: '雷', tw: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  5: { label: '光', tw: 'bg-orange-100 text-orange-700 border-orange-300' },
  6: { label: '闇', tw: 'bg-purple-100 text-purple-700 border-purple-300' },
};

export const UNIT_ATTR_IDS = [1, 2, 3, 4, 5, 6] as const;

// フィルターボタン順
export const UNIT_RARITY_FILTERS  = ['L', 'E', 'R', 'U'] as const;
export const SPHERE_RARITY_FILTERS = ['L', 'E', 'R', 'U', 'C'] as const;

// スキルラベル・カラー（行動順表示用）
export const SKILL_LABELS = ['アート', 'スフィア1', 'スフィア2'] as const;
export const SKILL_COLORS = [
  'bg-pink-100 text-pink-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
] as const;
