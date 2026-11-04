import type { Artwork } from '../data/types';

/** ?teacher=1 일 때만 보이는 작품별 주의 사항과 단서 메모 */
export default function TeacherPanel({ artwork }: { artwork: Artwork }) {
  const notes = artwork.historicalClues.filter((c) => c.teacherNote);
  return (
    <aside className="teacher-panel" aria-label="선생님용 메모">
      <h2>선생님용 메모 · 「{artwork.title}」</h2>
      {artwork.teacherCautions.length > 0 && (
        <>
          <h3>주의 사항</h3>
          <ul>{artwork.teacherCautions.map((c) => <li key={c}>{c}</li>)}</ul>
        </>
      )}
      <h3>작품 정보 확인</h3>
      <ul>
        <li>
          그림 파일 <code>public/{artwork.imagePath}</code>:{' '}
          {artwork.verificationStatus === 'verified' ? '공식 소장품 이미지와 대조 완료' : '공식 소장품 이미지와 대조 필요'}
        </li>
        <li>
          소장품 페이지{artwork.sourceUrlChecked ? '(확인 완료)' : '(확인 필요)'}:{' '}
          <a href={artwork.sourceUrl} target="_blank" rel="noopener noreferrer">{artwork.sourceUrl}</a>
        </li>
        <li>소장품번호: {artwork.museumNumber || '미기재'} · 이용 조건: {artwork.imageLicense || '미기재'}</li>
      </ul>
      <h3>공식 소장품 해설 전문</h3>
      <blockquote className="official-quote">
        {artwork.officialCommentary}
        <footer>
          — <a href={artwork.sourceUrl} target="_blank" rel="noopener noreferrer">국립중앙박물관 소장품 페이지</a>
        </footer>
      </blockquote>
      <h3>단서별 근거</h3>
      <ul>
        {artwork.historicalClues.map((c) => (
          <li key={c.id}>
            <strong>{c.title}</strong> ({c.verificationStatus === 'verified' ? '확인 완료' : '검토 필요'}) — {c.evidence || '근거 원문 미기재'}
          </li>
        ))}
      </ul>
      {notes.length > 0 && (
        <>
          <h3>단서별 메모</h3>
          <ul>{notes.map((c) => <li key={c.id}><strong>{c.title}</strong> — {c.teacherNote}</li>)}</ul>
        </>
      )}
    </aside>
  );
}
