import { useEffect, useState } from 'react';

/**
 * GitHub Pages에서도 새로고침·직접 접속이 되도록 해시(#) 주소를 씁니다.
 *   #/                       메인
 *   #/art/ssireum            씨름 - 자세히 보기 (작품별 개별 링크)
 *   #/art/ssireum/clues      역사 단서
 *   #/art/ssireum/check      나의 생각 점검
 *   #/art/ssireum/diary      역사 일기 준비
 */
export const STEPS = ['view', 'clues', 'check', 'diary'] as const;
export type Step = (typeof STEPS)[number];

export type Route = { name: 'home' } | { name: 'art'; id: string; step: Step };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean);
  if (parts[0] === 'art' && parts[1]) {
    const step = (STEPS as readonly string[]).includes(parts[2]) ? (parts[2] as Step) : 'view';
    return { name: 'art', id: parts[1], step };
  }
  return { name: 'home' };
}

const teacherInHash = () => /[?&]teacher=1/.test(window.location.hash);

/** 선생님 모드가 주소(#…?teacher=1)로 켜져 있으면 이동해도 유지합니다. */
export const hrefFor = (r: Route) =>
  (r.name === 'home' ? '#/' : `#/art/${r.id}${r.step === 'view' ? '' : '/' + r.step}`) +
  (teacherInHash() ? '?teacher=1' : '');

/** 현재 화면에서 선생님 모드를 켜고 끄는 주소 */
export const toggleTeacherHref = () => {
  const base = window.location.hash.replace(/[?&]teacher=1/, '') || '#/';
  return teacherInHash() ? base : `${base}?teacher=1`;
};

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

/** 주소에 ?teacher=1 이 있으면 선생님 메모를 보여 줍니다. */
export const isTeacherMode = () =>
  new URLSearchParams(window.location.search).get('teacher') === '1' || teacherInHash();
