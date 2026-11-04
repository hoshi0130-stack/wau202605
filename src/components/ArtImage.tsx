import { useState, type ImgHTMLAttributes } from 'react';
import type { Artwork } from '../data/types';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  artwork: Artwork;
  alt?: string;
  compact?: boolean;
}

/** 작품 이미지. 불러오지 못하면 안내 문구와 공식 소장품 페이지 링크를 보여 줍니다. */
export default function ArtImage({ artwork, alt, compact, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`img-fallback${compact ? ' compact' : ''}`} role="img" aria-label={`${artwork.title} 그림을 불러오지 못했습니다`}>
        <p className="img-fallback-title">그림을 불러오지 못했어요</p>
        {!compact && <p>인터넷 연결을 확인하거나, 아래 공식 소장품 페이지에서 그림을 보세요.</p>}
        <a href={artwork.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          국립중앙박물관에서 「{artwork.title}」 보기<span className="sr-only"> (새 창)</span>
        </a>
      </div>
    );
  }
  return (
    <img
      src={artwork.imagePath}
      alt={alt ?? `김홍도, 「${artwork.title}」, ${artwork.collection} 소장`}
      onError={() => setFailed(true)}
      draggable={false}
      {...rest}
    />
  );
}
