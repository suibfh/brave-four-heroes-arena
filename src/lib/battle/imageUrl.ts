// ============================================================
// 画像URL変換ユーティリティ
// ============================================================

import type { SphereGameData } from '@/src/types/battle';

/**
 * NFTメタデータの画像URLを高速CDN URLに変換する
 * 例: .../rsc/unit/2000/unit_ills_thum_4002024.png
 *  →  .../rsc/unit/4002024/unit_ills_thum_4002024.png
 */
export function toFastUnitImageUrl(url: string): string {
  if (!url) return url;
  const m = url.match(/unit_ills_thum_(\d+)\.png/);
  if (!m) return url;
  const id = m[1];
  return `https://rsc.bravefrontierheroes.com/rsc/unit/${id}/unit_ills_thum_${id}.png`;
}

/**
 * SphereGameDataからスフィア画像URLを生成する
 */
export function getSphereImageUrl(gameData?: SphereGameData): string | null {
  if (gameData?.extension_type) {
    return `https://rsc.bravefrontierheroes.com/rsc/sphere/${gameData.extension_type}.png`;
  }
  return null;
}
