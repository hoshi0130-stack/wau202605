import { artworks } from '../data/artworks';

const label = { verified: '확인 완료', 'needs-review': '검토 필요', unverified: '근거 없음(숨김)' } as const;

/** ?teacher=1 일 때 메인 화면 아래에 나오는 검토 현황표 */
export default function TeacherOverview() {
  return (
    <section className="teacher-panel" aria-labelledby="teacher-overview-title">
      <h2 id="teacher-overview-title">선생님용 · 콘텐츠 검토 현황</h2>
      <p>
        배포 전, 각 단서 문장을 공식 소장품 해설과 대조하고 <code>src/data/artworks.ts</code>의
        <code>verificationStatus</code>를 바꿔 주세요. 그림 파일은 <code>public/images/</code>에 넣습니다.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">작품</th>
              <th scope="col">작품 정보</th>
              <th scope="col">소장품 URL</th>
              <th scope="col">이용 조건</th>
              <th scope="col">단서 확인</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((a) => {
              const done = a.historicalClues.filter((c) => c.verificationStatus === 'verified').length;
              return (
                <tr key={a.id}>
                  <th scope="row">{a.title}</th>
                  <td>{label[a.verificationStatus]}</td>
                  <td>
                    <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {a.sourceUrlChecked ? '확인됨' : '미확인'}
                    </a>
                  </td>
                  <td>{a.imageLicense || '미기재'}</td>
                  <td>{done} / {a.historicalClues.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
