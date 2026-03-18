// ============================================================
// バトル関連の型定義
// battle/[id] および simulator で共通使用
// ============================================================

// NFTメタデータ（/api/hero/metadata/[id] から取得）
export interface HeroMetadata {
  name: string;
  image: string;
  attributes: {
    type_name: string;
    rarity: string; // "Legendary" / "Epic" / "Rare" / "Uncommon"
    lv: number;
    hp: number;
    phy: number;
    int: number;
    agi: number;
    spr: number;
    def: number;
    brave_burst?: string;
    art_skill?: string;
  };
}

// /v1/heroes のゲームデータ（attribute はここだけにある）
export interface HeroGameData {
  hero_id: number;
  rarity: number;
  attribute: number; // 1=炎, 2=水, 3=樹, 4=雷, 5=光, 6=闇
  name: string;
  name_jp: string;
  lv: number;
  param: {
    hp: number;
    phy: number;
    int: number;
    vit: number;
    mnd: number;
    agi: number;
  };
  active?: number;  // BBスキルID → skills_v2.json で引く
  passive?: number; // アートスキルID → skills_v2.json で引く
}

// /v1/spheres のゲームデータ
export interface SphereGameData {
  extension_id: number;
  extension_type: number; // 画像番号 → https://rsc.bravefrontierheroes.com/rsc/sphere/{extension_type}.png
  rarity: number;
  name: string;
  name_jp: string;
  lv: number;
  param: {
    hp: number;
    phy: number;
    int: number;
    vit: number;
    mnd: number;
    agi: number;
  };
  sphere_skill?: string;
  active?: number; // スフィアスキルID → skills_v2.json で引く
}

// パーティ内の選択済みユニット
export type SelectedUnit = {
  heroId: string;
  skillOrders: [number, number, number]; // [first, second, third] 各値は 0=アート, 1=スフィア1, 2=スフィア2
  sphereIds: (string | null)[];
};

// バトル結果
export type BattleResult = {
  result: number;
  battle_key: string;
  attacker_taken_damage: number;
  defender_taken_damage: number;
  action_counts: number;
  player_name: string;
  opponent_name: string;
};

// デッキテンプレート
export interface DeckUnit {
  hero_id: number;
  extension_ids: number[];
  position: number;
  skill_orders: number[];
}

export interface DeckTemplate {
  jin_id: number;
  units: DeckUnit[];
}

// skills_v2.json のエントリ
export interface SkillEntry {
  condition?: string;
  effects: string[];
}
