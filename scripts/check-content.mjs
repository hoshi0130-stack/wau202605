// 콘텐츠 점검: npm run check-content
// 오류(배포 중단): 출처 없는 단서, 6개 작품 ID 불일치, 허용되지 않은 출처 도메인
// 경고: 이미지 파일 없음, 검토 필요 상태, 미확인 URL
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ts = await import('typescript').then((m) => m.default);
const src = readFileSync(join(root, 'src/data/artworks.ts'), 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { artworks } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

const ALLOWED = [/(^|\.)museum\.go\.kr$/, /(^|\.)emuseum\.go\.kr$/, /(^|\.)heritage\.go\.kr$/, /(^|\.)khs\.go\.kr$/, /(^|\.)aks\.ac\.kr$/, /(^|\.)history\.go\.kr$/, /\.go\.kr$/, /\.or\.kr$/];
const EXPECTED = ['ssireum', 'seodang', 'matweaving', 'threshing', 'tavern', 'gonu'];
let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log('❌ ' + m); };
const warn = (m) => { warnings++; console.log('⚠️  ' + m); };
const okHost = (u) => { try { const h = new URL(u).hostname; return new URL(u).protocol === 'https:' && ALLOWED.some((r) => r.test(h)); } catch { return false; } };

const ids = artworks.map((a) => a.id);
if (ids.join() !== EXPECTED.join()) err(`작품 ID가 명세와 다릅니다: ${ids.join(', ')}`);
for (const a of artworks) {
  if (!okHost(a.sourceUrl)) err(`[${a.title}] 소장품 URL이 공공기관 주소가 아닙니다: ${a.sourceUrl}`);
  if (!a.sourceUrlChecked) warn(`[${a.title}] 소장품 URL을 아직 확인하지 않았습니다 (sourceUrlChecked: false)`);
  if (!existsSync(join(root, 'public', a.imagePath))) warn(`[${a.title}] 그림 파일이 없습니다: public/${a.imagePath}`);
  if (!a.imageLicense) warn(`[${a.title}] 이용 조건(imageLicense)이 비어 있습니다`);
  for (const c of a.historicalClues) {
    if (!c.sources?.length) err(`[${a.title}] 단서 "${c.title}"에 출처가 없습니다`);
    for (const s of c.sources ?? []) if (!okHost(s.url)) err(`[${a.title}] 단서 "${c.title}"의 출처가 허용 기관이 아닙니다: ${s.url}`);
    if (c.verificationStatus === 'needs-review') warn(`[${a.title}] 단서 "${c.title}" 검토 필요`);
    if (c.verificationStatus === 'unverified') warn(`[${a.title}] 단서 "${c.title}" 근거 없음 → 학생 화면에서 숨김`);
    if (c.verificationStatus === 'verified' && !c.evidence) warn(`[${a.title}] 단서 "${c.title}"는 확인 완료지만 근거 원문(evidence)이 없습니다`);
    if (c.region && c.verificationStatus !== 'verified') warn(`[${a.title}] 단서 "${c.title}"의 확대 영역은 verified가 되어야 표시됩니다`);
  }
}
console.log(`\n오류 ${errors}개, 경고 ${warnings}개`);
process.exit(errors ? 1 : 0);
