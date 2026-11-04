import type { Artwork } from '../data/types';
import type { TeacherConfig } from '../config';
import { artworks } from '../data/artworks';
import { hrefFor } from '../router';
import ArtImage from './ArtImage';

export default function DiaryStep({ artwork, config }: { artwork: Artwork; config: TeacherConfig }) {
  const others = artworks.filter((a) => a.id !== artwork.id);
  return (
    <>
      <header className="step-header">
        <p className="step-kicker">4단계 · 「{artwork.title}」</p>
        <h1>이제 그림 속 인물의 하루를 기록해 볼까요?</h1>
      </header>

      <section className="question-box" aria-labelledby="diary-q">
        <h2 id="diary-q">일기를 쓰기 전에 확인해요</h2>
        <ul className="checklist">
          <li>그림과 역사 자료에서 확인한 생활 모습은 무엇인가요?</li>
          <li>어떤 인물이 되어 일기를 쓰고 싶나요?</li>
          <li>그 인물은 어떤 생각과 감정을 느꼈을까요?</li>
          <li>내 일기 속 내용이 확인한 역사적 사실과 어긋나지는 않나요?</li>
        </ul>
        {artwork.imaginationQuestions.length > 0 && (
          <div className="imagine-q">
            <h3>「{artwork.title}」 상상 질문</h3>
            <ul>{artwork.imaginationQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
        )}
      </section>

      <p className="closing">역사적 사실을 바탕으로, 그림 속 인물의 하루를 상상해 보세요!</p>

      {config.diaryUrl && (
        <div className="center">
          <a className="btn-primary btn-large" href={config.diaryUrl} target="_blank" rel="noopener noreferrer">
            {config.diaryLabel}<span className="sr-only"> (새 창)</span>
          </a>
        </div>
      )}

      <div className="step-actions">
        <a className="btn-secondary" href={hrefFor({ name: 'home' })}>처음 화면으로</a>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            const el = document.getElementById('other-art');
            el?.scrollIntoView({ behavior: 'smooth' });
            el?.focus({ preventScroll: true });
          }}
        >
          다른 그림 탐구하기 ↓
        </button>
      </div>

      <section id="other-art" className="other-art" aria-labelledby="other-title" tabIndex={-1}>
        <h2 id="other-title" className="section-title">다른 그림 탐구하기</h2>
        <ul className="mini-grid">
          {others.map((a) => (
            <li key={a.id}>
              <a href={hrefFor({ name: 'art', id: a.id, step: 'view' })} className="mini-card">
                <ArtImage artwork={a} alt="" compact loading="lazy" />
                <span><strong>{a.title}</strong><small>{a.subtitle}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
