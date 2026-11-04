import type { Artwork } from '../data/types';
import type { TeacherConfig } from '../config';
import { hrefFor } from '../router';
import ZoomViewer from './ZoomViewer';
import Credit from './Credit';

export default function ViewStep({ artwork, config }: { artwork: Artwork; config: TeacherConfig }) {
  return (
    <>
      <header className="step-header">
        <p className="step-kicker">1단계 · 「{artwork.title}」</p>
        <h1>그림 속에는 어떤 생활 모습이 담겨 있을까요?</h1>
      </header>

      <div className="view-layout">
        <ZoomViewer artwork={artwork} />
        <div className="view-side">
          <Credit artwork={artwork} />
          <section className="question-box" aria-labelledby="obs-q">
            <h2 id="obs-q">자세히 살펴보고 생각해 봐요</h2>
            <ol>
              {artwork.observationQuestions.map((q) => <li key={q}>{q}</li>)}
            </ol>
            <p className="question-tip">
              역사 단서를 열기 전에, 먼저 내가 본 것과 짐작한 것을 기록해 두세요.
            </p>
            {config.padletUrl && (
              <a className="btn-secondary btn-block" href={config.padletUrl} target="_blank" rel="noopener noreferrer">
                {config.padletLabel}<span className="sr-only"> (새 창)</span>
              </a>
            )}
          </section>
        </div>
      </div>

      <div className="step-actions">
        <a className="btn-ghost" href={hrefFor({ name: 'home' })}>← 그림 다시 고르기</a>
        <a className="btn-primary" href={hrefFor({ name: 'art', id: artwork.id, step: 'clues' })}>
          기록했어요! 역사 단서 보기 →
        </a>
      </div>
    </>
  );
}
