import { useEffect, useRef, useState } from 'react';
import type { Artwork, HistoricalClue } from '../data/types';
import type { TeacherConfig } from '../config';
import { CLUE_KIND_LABEL } from '../data/artworks';
import { hrefFor } from '../router';
import ZoomViewer from './ZoomViewer';
import ClueCrop from './ClueCrop';
import ReviewBadge from './ReviewBadge';

/** 학생 화면에 보여도 되는 단서: 근거를 찾지 못한(unverified) 단서와 출처 없는 단서는 숨김 */
export const visibleClues = (a: Artwork) =>
  a.historicalClues.filter((c) => c.verificationStatus !== 'unverified' && c.sources.length > 0);

/**
 * 그림 위 위치 버튼·부분 확대는 위치까지 확인(verified)된 단서에만 보입니다.
 * 선생님 모드(?teacher=1)에서는 검토용으로 확인 전 위치 초안도 보여 줍니다.
 */
const showRegion = (c: HistoricalClue, teacher: boolean) =>
  c.region !== null && (c.verificationStatus === 'verified' || teacher);

export default function CluesStep({
  artwork,
  config,
  opened,
  setOpened,
  teacher,
}: {
  artwork: Artwork;
  teacher: boolean;
  config: TeacherConfig;
  opened: Set<string>;
  setOpened: (s: Set<string>) => void;
}) {
  const clues = visibleClues(artwork);
  const [lastOpened, setLastOpened] = useState<string | null>(null);
  const refs = useRef(new Map<string, HTMLElement>());

  const open = (id: string) => {
    if (!opened.has(id)) setOpened(new Set(opened).add(id));
    setLastOpened(id);
  };

  useEffect(() => {
    if (!lastOpened) return;
    const el = refs.current.get(lastOpened);
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lastOpened]);

  const hotspots = clues.filter((c) => showRegion(c, teacher));
  const allOpen = clues.every((c) => opened.has(c.id));

  return (
    <>
      <header className="step-header">
        <p className="step-kicker">2단계 · 「{artwork.title}」</p>
        <h1>역사 단서를 열어 볼까요?</h1>
        <p className="step-lead">
          단서 카드를 하나씩 눌러 보세요. {hotspots.length > 0 && '그림 위의 번호를 눌러도 단서가 열려요. '}
          내가 처음 생각한 것과 비교해 보아요.
        </p>
      </header>

      <div className="clues-layout">
        <ZoomViewer artwork={artwork}>
          {hotspots.map((c) => {
            const n = clues.indexOf(c) + 1;
            const r = c.region!;
            return (
              <button
                key={c.id}
                type="button"
                className={`hotspot${opened.has(c.id) ? ' is-open' : ''}`}
                style={{ left: `${(r.x + r.width / 2) * 100}%`, top: `${(r.y + r.height / 2) * 100}%` }}
                onClick={() => open(c.id)}
                aria-label={`그림 속 단서 ${n} 열기`}
              >
                {n}
                {c.verificationStatus !== 'verified' && <span className="hotspot-draft" aria-hidden="true">초안</span>}
              </button>
            );
          })}
        </ZoomViewer>

        <ol className="clue-list">
          {clues.map((c, i) => {
            const isOpen = opened.has(c.id);
            return (
              <li key={c.id} className={`clue-card${isOpen ? ' is-open' : ''}`}>
                {!isOpen ? (
                  <button type="button" className="clue-closed" onClick={() => open(c.id)} aria-expanded="false">
                    <span className="clue-num" aria-hidden="true">{i + 1}</span>
                    <span>
                      <span className="clue-kind">역사 단서 {i + 1} · {CLUE_KIND_LABEL[c.kind]}</span>
                      <span className="clue-open-label">눌러서 단서 열기</span>
                    </span>
                  </button>
                ) : (
                  <article
                    className="clue-open"
                    tabIndex={-1}
                    ref={(el) => {
                      if (el) refs.current.set(c.id, el);
                    }}
                    aria-labelledby={`${c.id}-title`}
                  >
                    <p className="clue-kind">
                      역사 단서 {i + 1} · {CLUE_KIND_LABEL[c.kind]}
                      <ReviewBadge status={c.verificationStatus} show={config.showReviewBadges} />
                    </p>
                    <h2 id={`${c.id}-title`}>{c.title}</h2>
                    <p className="clue-desc">{c.description}</p>
                    <p className={`basis basis-${c.basis}`}>
                      {c.basis === 'observation' ? '👀 그림에서 직접 볼 수 있는 모습' : '🏛️ 박물관 공식 해설에 따른 설명'}
                    </p>
                    {showRegion(c, teacher) && (
                      <>
                        {c.verificationStatus !== 'verified' && (
                          <p className="draft-note">선생님용 미리보기: 확인 전 위치 초안이라 학생 화면에는 보이지 않아요.</p>
                        )}
                        <ClueCrop artwork={artwork} region={c.region!} label={c.title} />
                      </>
                    )}
                    {!showRegion(c, teacher) && c.regionNote && hotspots.length > 0 && (
                      <p className="region-note">📍 {c.regionNote}</p>
                    )}
                    <div className="clue-sources">
                      {c.sources.map((s) => (
                        <a key={s.url + s.label} className="btn-source" href={s.url} target="_blank" rel="noopener noreferrer">
                          자료 출처 확인: {s.label}<span className="sr-only"> (새 창)</span>
                        </a>
                      ))}
                    </div>
                  </article>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="step-actions">
        <a className="btn-ghost" href={hrefFor({ name: 'art', id: artwork.id, step: 'view' })}>← 그림 다시 보기</a>
        <a
          className={allOpen ? 'btn-primary' : 'btn-secondary'}
          href={hrefFor({ name: 'art', id: artwork.id, step: 'check' })}
        >
          {allOpen ? '나의 생각 점검하기 →' : `단서 ${opened.size}/${clues.length}개 열었어요 · 다음으로 →`}
        </a>
      </div>
    </>
  );
}
