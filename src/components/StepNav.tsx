import { hrefFor, STEPS, type Step } from '../router';

const LABELS: Record<Step, string> = {
  view: '자세히 보기',
  clues: '역사 단서',
  check: '생각 점검',
  diary: '일기 준비',
};

export default function StepNav({ id, step }: { id: string; step: Step }) {
  const current = STEPS.indexOf(step);
  return (
    <nav className="step-nav" aria-label="탐구 단계">
      <ol>
        {STEPS.map((s, i) => (
          <li key={s} className={i === current ? 'is-current' : i < current ? 'is-done' : ''}>
            <a href={hrefFor({ name: 'art', id, step: s })} aria-current={i === current ? 'step' : undefined}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <span className="step-label">{LABELS[s]}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
