import type { Artwork } from '../data/types';

export default function Credit({ artwork, overlay }: { artwork: Artwork; overlay?: boolean }) {
  if (overlay) {
    return (
      <p className="credit-overlay">
        김홍도, 「{artwork.title}」 · {artwork.collection} 소장
      </p>
    );
  }
  return (
    <dl className="credit">
      <div><dt>작품명</dt><dd>{artwork.title}</dd></div>
      <div><dt>작가</dt><dd>{artwork.artist}</dd></div>
      <div><dt>소장</dt><dd>{artwork.collection}{artwork.museumNumber && ` (${artwork.museumNumber})`}</dd></div>
      <div><dt>자료 출처</dt><dd>
        <a href={artwork.sourceUrl} target="_blank" rel="noopener noreferrer">
          {artwork.imageCredit}<span className="sr-only"> (새 창)</span>
        </a>
      </dd></div>
      <div><dt>이용 조건</dt><dd>{artwork.imageLicense || '해당 소장품 페이지에 표시된 조건 적용'}</dd></div>
    </dl>
  );
}
