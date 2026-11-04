import { useEffect, useState } from 'react';

export interface TeacherConfig {
  padletUrl: string;
  padletLabel: string;
  diaryUrl: string;
  diaryLabel: string;
  showReviewBadges: boolean;
}

const DEFAULTS: TeacherConfig = {
  padletUrl: '',
  padletLabel: '패들렛에 관찰·추론 기록하기',
  diaryUrl: '',
  diaryLabel: '역사 일기 쓰러 가기',
  showReviewBadges: true,
};

const isSafeUrl = (u: unknown): u is string =>
  typeof u === 'string' && /^https:\/\//i.test(u.trim());

/** public/teacher-config.json 을 읽습니다. 학생 정보는 어디에도 보내지 않습니다. */
export function useTeacherConfig(): TeacherConfig {
  const [config, setConfig] = useState(DEFAULTS);
  useEffect(() => {
    fetch('teacher-config.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : {}))
      .then((raw: Partial<TeacherConfig>) =>
        setConfig({
          ...DEFAULTS,
          ...raw,
          padletUrl: isSafeUrl(raw.padletUrl) ? raw.padletUrl.trim() : '',
          diaryUrl: isSafeUrl(raw.diaryUrl) ? raw.diaryUrl.trim() : '',
          showReviewBadges: raw.showReviewBadges !== false,
        }),
      )
      .catch(() => setConfig(DEFAULTS));
  }, []);
  return config;
}
