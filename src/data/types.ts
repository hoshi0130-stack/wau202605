/**
 * 검토 상태
 * - verified     : 선생님(또는 담당자)이 공식 자료와 문장·이미지 위치를 직접 대조함
 * - needs-review : 초안. 아직 공식 자료와 대조하지 않음 → 화면에 "검토 필요" 표시
 * - unverified   : 근거를 찾지 못함 → 학생 화면에 보이지 않음 (scripts/check-content.mjs가 경고)
 */
export type VerificationStatus = 'verified' | 'needs-review' | 'unverified';

/** 그림 속 부분 영역. 원본 이미지 크기에 대한 비율(0~1)로 적습니다. */
export interface ImageRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ClueKind = 'people' | 'tools' | 'background';

export interface HistoricalClue {
  id: string;
  /** 단서 1: 인물과 행동 / 단서 2: 생활 방식과 도구 / 단서 3: 역사적 배경·생활 문화 */
  kind: ClueKind;
  title: string;
  /** 초등 5학년이 읽기 쉬운 1~2문장 */
  description: string;
  /**
   * 이 문장이 무엇에 근거하는지
   * - observation : 그림에서 직접 볼 수 있는 모습
   * - official    : 공식 소장품 해설·공공기관 자료에 따른 설명
   */
  basis: 'observation' | 'official';
  /** 이 단서를 뒷받침하는 출처 (하나 이상) */
  sources: Source[];
  verificationStatus: VerificationStatus;
  /**
   * 부분 확대 영역. 실제 그림에서 위치를 확인(verificationStatus === 'verified')한
   * 경우에만 화면에 표시됩니다. 확인 전에는 null로 둡니다.
   */
  region: ImageRegion | null;
  /** region 이 없을 때 학생에게 보여 줄 이유 (예: 그림 전체에 대한 설명이라서) */
  regionNote?: string;
  /** 근거가 된 공식 해설 원문 (선생님 검토용, 학생 화면에는 보이지 않음) */
  evidence?: string;
  /** 선생님만 보는 메모 (주소 끝에 ?teacher=1 을 붙이면 보임) */
  teacherNote?: string;
}

export interface Source {
  label: string;
  url: string;
  /** 출처 URL을 실제로 열어 내용을 대조했는지 */
  checked: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  /** 탐구 주제 */
  subtitle: string;
  category: string;
  artist: string;
  collection: string;
  /** 소장품 번호 (예: 덕수 ○○○). 확인 전에는 빈 문자열 */
  museumNumber: string;
  /** public/ 폴더 기준 경로 */
  imagePath: string;
  imageCredit: string;
  /** 소장품 페이지에 표시된 이용 조건 (예: 공공누리 제1유형). 확인 전에는 빈 문자열 */
  imageLicense: string;
  /** 공식 소장품 페이지 */
  sourceUrl: string;
  sourceUrlChecked: boolean;
  historicalClues: HistoricalClue[];
  observationQuestions: string[];
  imaginationQuestions: string[];
  /** 공식 소장품 해설 전문 (선생님 검토용) */
  officialCommentary: string;
  /** 작품 전체 검토 상태 (이미지·제목·출처) */
  verificationStatus: VerificationStatus;
  /** 선생님만 보는 주의 사항 */
  teacherCautions: string[];
}
