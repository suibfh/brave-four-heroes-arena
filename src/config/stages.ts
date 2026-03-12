// ============================================================
// ステージ設定
// ※ 編集は /admin/stages ページで行い、生成されたコードをここに貼り付けてpushしてください
// ============================================================

export interface DefenderUnit {
  hero_id: number;
  position: number;
  extension_ids: number[];   // スフィアのID（最大2つ）
  skill_orders: number[];    // [0,1,2] など（0=アート, 1=スフィア1, 2=スフィア2）
}

export interface Stage {
  id: number;
  name: string;
  description: string;
  difficulty: number;        // 1〜5（星の数）
  defender_uid: number;
  defender_units: DefenderUnit[];
}

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "Forest of Trials",
    description: "初めての試練。まずはここから。",
    difficulty: 1,
    defender_uid: 100006912,
    defender_units: [
      {
        hero_id: 52200004,
        position: 1,
        extension_ids: [50910004, 50780080],
        skill_orders: [1, 2, 0],
      },
    ],
  },
  {
    id: 2,
    name: "Ancient Ruins",
    description: "廃墟に潜む強敵を倒せ。",
    difficulty: 2,
    defender_uid: 100006912,
    defender_units: [
      {
        hero_id: 52200004,
        position: 1,
        extension_ids: [50910004, 50780080],
        skill_orders: [1, 2, 0],
      },
    ],
  },
  {
    id: 3,
    name: "Storm Peak",
    description: "嵐の山頂で待ち受ける猛者。",
    difficulty: 3,
    defender_uid: 100006912,
    defender_units: [
      {
        hero_id: 52200004,
        position: 1,
        extension_ids: [50910004, 50780080],
        skill_orders: [1, 2, 0],
      },
    ],
  },
  {
    id: 4,
    name: "Shadow Citadel",
    description: "闇の要塞に挑め。",
    difficulty: 4,
    defender_uid: 100006912,
    defender_units: [
      {
        hero_id: 52200004,
        position: 1,
        extension_ids: [50910004, 50780080],
        skill_orders: [1, 2, 0],
      },
    ],
  },
  {
    id: 5,
    name: "Throne of the Gods",
    description: "神々の玉座。最強の敵が待つ。",
    difficulty: 5,
    defender_uid: 100006912,
    defender_units: [
      {
        hero_id: 52200004,
        position: 1,
        extension_ids: [50910004, 50780080],
        skill_orders: [1, 2, 0],
      },
    ],
  },
];
