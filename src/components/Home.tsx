import { artworks } from '../data/artworks';
import { hrefFor } from '../router';
import ArtImage from './ArtImage';
import TeacherOverview from './TeacherOverview';

export default function Home({ teacher }: { teacher: boolean }) {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">김홍도의 풍속화로 만나는 옛사람들의 하루</p>
        <h1>조선 후기 생활 탐구실</h1>
        <p className="hero-sub">그림 속 단서를 따라 옛사람들의 하루를 만나 보아요!</p>
      </section>

      <ul className="card-grid" aria-label="탐구할 풍속화 고르기">
        {artworks.map((a) => {
          const href = hrefFor({ name: 'art', id: a.id, step: 'view' });
          return (
            <li key={a.id} className="art-card">
              <a href={href} className="art-card-thumb" tabIndex={-1} aria-hidden="true">
                <ArtImage artwork={a} alt="" compact loading="lazy" />
              </a>
              <div className="art-card-body">
                <p className="art-card-theme">{a.subtitle}</p>
                <h2 className="art-card-title">{a.title}</h2>
                <a href={href} className="btn-primary">
                  탐구 시작<span className="sr-only"> — 「{a.title}」</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="home-note" aria-label="이용 안내">
        <p>
          이 탐구실의 그림은 모두 국립중앙박물관 소장 김홍도 《단원 풍속도첩》 작품이에요.
          로그인 없이 쓸 수 있고, 여러분이 쓴 내용은 어디에도 저장되거나 전송되지 않아요.
        </p>
      </section>

      {teacher && <TeacherOverview />}
    </>
  );
}
