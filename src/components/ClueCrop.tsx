import { useState } from 'react';
import type { Artwork, ImageRegion } from '../data/types';

/** 확인된 영역만 잘라서 보여 주는 부분 확대 이미지 */
export default function ClueCrop({ artwork, region, label }: { artwork: Artwork; region: ImageRegion; label: string }) {
  const [ratio, setRatio] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const ar = ratio ? (region.width * ratio) / region.height : 4 / 3;
  return (
    <div
      className="clue-crop"
      // 높이가 300px를 넘지 않도록 너비를 비율에 맞춰 줄입니다(그림 비율은 그대로).
      style={{ aspectRatio: `${ar}`, maxWidth: `min(100%, ${Math.round(300 * ar)}px)` }}
    >
      <img
        src={artwork.imagePath}
        alt={`「${artwork.title}」의 부분: ${label}`}
        onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
        onError={() => setFailed(true)}
        style={{
          width: `${100 / region.width}%`,
          height: `${100 / region.height}%`,
          left: `${(-region.x / region.width) * 100}%`,
          top: `${(-region.y / region.height) * 100}%`,
        }}
      />
      <span className="clue-crop-credit">김홍도, 「{artwork.title}」 부분 · {artwork.collection}</span>
    </div>
  );
}
