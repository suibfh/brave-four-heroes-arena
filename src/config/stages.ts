export type StageUnit = {
  hero_id: number;
  position: number;
  extension_ids: number[];
  skill_orders: number[];
};

export type Stage = {
  id: number;
  name: string;
  description: string;
  difficulty: number; // 1〜5
  defender_uid: number;
  defender_units: StageUnit[];
};

export const STAGES: Stage[] = [
  {
    id: 1,
    name: "Forest of Trials",
    description: "古の森に潜む試練の番人",
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
    name: "Ruins of Despair",
    description: "絶望の廃墟に宿る古の魔力",
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
    name: "Dragon's Peak",
    description: "竜の頂に君臨する炎の覇者",
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
    name: "Shadow Sanctum",
    description: "闇の聖域に潜む影の支配者",
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
    description: "神々の玉座に座する最強の敵",
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
