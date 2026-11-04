import { useEffect, useState } from 'react';
import { findArtwork } from './data/artworks';
import { hrefFor, isTeacherMode, toggleTeacherHref, useRoute } from './router';
import { useTeacherConfig } from './config';
import Home from './components/Home';
import StepNav from './components/StepNav';
import ViewStep from './components/ViewStep';
import CluesStep from './components/CluesStep';
import CheckStep from './components/CheckStep';
import DiaryStep from './components/DiaryStep';
import TeacherPanel from './components/TeacherPanel';

export default function App() {
  const route = useRoute();
  const config = useTeacherConfig();
  const teacher = isTeacherMode();
  // 연 단서 기록은 이 화면을 보는 동안에만 기억합니다(저장·전송 없음).
  const [opened, setOpened] = useState<Record<string, Set<string>>>({});

  const artwork = route.name === 'art' ? findArtwork(route.id) : undefined;

  useEffect(() => {
    document.title = artwork ? `「${artwork.title}」 · 조선 후기 생활 탐구실` : '조선 후기 생활 탐구실';
  }, [artwork]);

  let main;
  if (route.name === 'home') {
    main = <Home teacher={teacher} />;
  } else if (!artwork) {
    main = (
      <div className="not-found">
        <h1>그림을 찾을 수 없어요</h1>
        <p>주소를 다시 확인하거나 처음 화면에서 그림을 골라 주세요.</p>
        <a className="btn-primary" href={hrefFor({ name: 'home' })}>처음 화면으로</a>
      </div>
    );
  } else {
    const o = opened[artwork.id] ?? new Set<string>();
    const setO = (s: Set<string>) => setOpened((prev) => ({ ...prev, [artwork.id]: s }));
    main = (
      <>
        <StepNav id={artwork.id} step={route.step} />
        {route.step === 'view' && <ViewStep artwork={artwork} config={config} />}
        {route.step === 'clues' && <CluesStep artwork={artwork} config={config} opened={o} setOpened={setO} teacher={teacher} />}
        {route.step === 'check' && <CheckStep artwork={artwork} opened={o} />}
        {route.step === 'diary' && <DiaryStep artwork={artwork} config={config} />}
        {teacher && <TeacherPanel artwork={artwork} />}
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        본문 바로가기
      </a>
      <header className="site-header">
        <a href={hrefFor({ name: 'home' })} className="brand">
          <span className="brand-mark" aria-hidden="true">탐</span>
          조선 후기 생활 탐구실
        </a>
        {artwork && <span className="site-header-art">「{artwork.title}」 탐구 중</span>}
      </header>
      <main id="main" tabIndex={-1} className="container">
        {main}
      </main>
      <footer className="site-footer">
        <p>작품 이미지와 해설 출처: 국립중앙박물관 소장품 검색. 이용 조건은 각 소장품 페이지에 표시된 조건을 따릅니다.</p>
        <p>이 웹페이지는 학생의 개인정보나 활동 내용을 저장·전송하지 않습니다.</p>
        <p>
          <a href={toggleTeacherHref()} className="teacher-toggle">
            {teacher ? '선생님용 검토 화면 끄기' : '선생님용 검토 화면'}
          </a>
        </p>
      </footer>
    </>
  );
}
