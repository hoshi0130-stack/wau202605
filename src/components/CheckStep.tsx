import type { Artwork } from '../data/types';
import { hrefFor } from '../router';
import { visibleClues } from './CluesStep';

const CONCEPTS = [
  {
    key: 'observe',
    name: '관찰',
    desc: '그림에서 직접 확인할 수 있는 내용',
    starter: '“그림에서 ○○이 보여요.”',
  },
  {
    key: 'infer',
    name: '추론',
    desc: '그림 속 단서와 역사 자료를 바탕으로 짐작한 내용',
    starter: '“○○을 보니, ○○였을 것 같아요. 왜냐하면 자료에서 ○○라고 했기 때문이에요.”',
  },
  {
    key: 'imagine',
    name: '상상',
    desc: '인물의 입장에서 생각해 본 마음이나 이야기',
    starter: '“내가 이 사람이라면 ○○한 마음이었을 거예요.”',
  },
];

export default function CheckStep({ artwork, opened }: { artwork: Artwork; opened: Set<string> }) {
  const seen = visibleClues(artwork).filter((c) => opened.has(c.id));
  return (
    <>
      <header className="step-header">
        <p className="step-kicker">3단계 · 「{artwork.title}」</p>
        <h1>내가 생각한 모습과 역사 자료를 비교해 봅시다.</h1>
      </header>

      <section aria-labelledby="concepts-title">
        <h2 id="concepts-title" className="section-title">관찰 · 추론 · 상상은 서로 달라요</h2>
        <ol className="concept-row">
          {CONCEPTS.map((c, i) => (
            <li key={c.key} className={`concept concept-${c.key}`}>
              <p className="concept-step" aria-hidden="true">{i + 1}</p>
              <h3>{c.name}</h3>
              <p className="concept-desc">{c.desc}</p>
              <p className="concept-starter">{c.starter}</p>
            </li>
          ))}
        </ol>
        <p className="concept-note">
          관찰은 그림에서 누구나 확인할 수 있어요. 추론과 상상은 근거가 있어야 하고,
          <strong> 확인된 사실과는 구분해서</strong> 말해야 해요.
        </p>
      </section>

      <section className="question-box" aria-labelledby="check-q">
        <h2 id="check-q">모둠에서 이야기해 봐요</h2>
        <ol>
          <li>역사 자료를 통해 확인한 사실은 무엇인가요?</li>
          <li>처음 생각한 내용과 같거나 다른 부분은 무엇인가요?</li>
          <li>그림 속 인물의 마음은 어디까지 짐작할 수 있을까요?</li>
        </ol>
      </section>

      {seen.length > 0 && (
        <details className="recap">
          <summary>내가 연 역사 단서 다시 보기 ({seen.length}개)</summary>
          <ul>
            {seen.map((c) => (
              <li key={c.id}><strong>{c.title}</strong> — {c.description}</li>
            ))}
          </ul>
        </details>
      )}

      <div className="step-actions">
        <a className="btn-ghost" href={hrefFor({ name: 'art', id: artwork.id, step: 'clues' })}>← 역사 단서 다시 보기</a>
        <a className="btn-primary" href={hrefFor({ name: 'art', id: artwork.id, step: 'diary' })}>역사 일기 준비하기 →</a>
      </div>
    </>
  );
}
