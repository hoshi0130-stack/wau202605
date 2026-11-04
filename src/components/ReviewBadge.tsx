import type { VerificationStatus } from '../data/types';

export default function ReviewBadge({ status, show }: { status: VerificationStatus; show: boolean }) {
  if (!show || status === 'verified') return null;
  return (
    <span className="badge badge-review" title="선생님이 공식 자료와 아직 대조하고 있는 내용이에요">
      검토 필요
    </span>
  );
}
