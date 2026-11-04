import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Artwork } from '../data/types';
import ArtImage from './ArtImage';
import Credit from './Credit';

const MIN = 1;
const MAX = 5;
const STEP = 1.25;

interface View {
  scale: number;
  x: number;
  y: number;
}

interface Props {
  artwork: Artwork;
  /** 그림 위에 겹쳐 그릴 요소(단서 위치 버튼 등). 그림과 함께 확대·이동됩니다. */
  children?: ReactNode;
}

/**
 * 확대·축소·이동이 되는 그림 보기.
 * 마우스: 휠로 확대, 끌어서 이동 / 터치: 두 손가락으로 확대, 한 손가락으로 이동
 * 키보드: + / - 확대·축소, 방향키 이동, 0 원래 크기
 */
export default function ZoomViewer({ artwork, children }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const [announce, setAnnounce] = useState('');

  const clamp = useCallback((v: View): View => {
    const frame = frameRef.current;
    const content = contentRef.current;
    const scale = Math.min(MAX, Math.max(MIN, v.scale));
    if (!frame || !content) return { scale, x: v.x, y: v.y };
    // 확대된 그림의 가장자리가 화면 안쪽으로 들어오지 않을 만큼만 이동할 수 있게 합니다.
    const maxX = Math.max(0, (scale * content.offsetWidth - frame.clientWidth) / 2);
    const maxY = Math.max(0, (scale * content.offsetHeight - frame.clientHeight) / 2);
    return {
      scale,
      x: Math.min(maxX, Math.max(-maxX, v.x)),
      y: Math.min(maxY, Math.max(-maxY, v.y)),
    };
  }, []);

  const zoomBy = useCallback(
    (factor: number) =>
      setView((v) => {
        const next = clamp({ scale: v.scale * factor, x: v.x * factor, y: v.y * factor });
        setAnnounce(`${Math.round(next.scale * 100)}퍼센트`);
        return next;
      }),
    [clamp],
  );
  const pan = (dx: number, dy: number) => setView((v) => clamp({ ...v, x: v.x + dx, y: v.y + dy }));
  const reset = () => {
    setView({ scale: 1, x: 0, y: 0 });
    setAnnounce('원래 크기');
  };

  // 휠 확대 (passive: false 가 필요해서 직접 등록)
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && view.scale === 1 && e.deltaY > 0) return; // 페이지 스크롤 방해하지 않기
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomBy, view.scale]);

  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.scale };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const start = pinchStart.current;
      setView((v) => {
        const scale = (start.scale * dist) / start.dist;
        const f = scale / v.scale;
        return clamp({ scale, x: v.x * f, y: v.y * f });
      });
    } else if (pointers.current.size === 1) {
      pan(cur.x - prev.x, cur.y - prev.y);
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const d = 40;
    const map: Record<string, () => void> = {
      '+': () => zoomBy(STEP),
      '=': () => zoomBy(STEP),
      '-': () => zoomBy(1 / STEP),
      '0': reset,
      ArrowLeft: () => pan(d, 0),
      ArrowRight: () => pan(-d, 0),
      ArrowUp: () => pan(0, d),
      ArrowDown: () => pan(0, -d),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  return (
    <div ref={wrapRef} className={`viewer${fullscreen ? ' is-fullscreen' : ''}`}>
      <div
        ref={frameRef}
        className={`viewer-frame${view.scale > 1 ? ' can-pan' : ''}`}
        tabIndex={0}
        role="group"
        aria-roledescription="확대 가능한 그림"
        aria-label={`「${artwork.title}」 그림. 더하기·빼기 키로 확대·축소, 방향키로 이동, 0 키로 원래 크기.`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => (view.scale > 1 ? reset() : zoomBy(2))}
      >
        <div
          ref={contentRef}
          className="viewer-content"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <ArtImage artwork={artwork} />
          {children}
        </div>
        <Credit artwork={artwork} overlay />
      </div>

      <div className="viewer-controls" role="toolbar" aria-label="그림 확대 도구">
        <button type="button" className="btn-icon" onClick={() => zoomBy(STEP)} disabled={view.scale >= MAX} aria-label="확대">
          <span aria-hidden="true">＋</span>
        </button>
        <button type="button" className="btn-icon" onClick={() => zoomBy(1 / STEP)} disabled={view.scale <= MIN} aria-label="축소">
          <span aria-hidden="true">－</span>
        </button>
        <span className="zoom-level" aria-hidden="true">{Math.round(view.scale * 100)}%</span>
        <button type="button" className="btn-secondary" onClick={reset} disabled={view.scale === 1 && view.x === 0 && view.y === 0}>
          원래 크기
        </button>
        {document.fullscreenEnabled && (
          <button type="button" className="btn-secondary" onClick={toggleFullscreen}>
            {fullscreen ? '전체 화면 끄기' : '전체 화면'}
          </button>
        )}
      </div>
      <p className="viewer-hint">그림을 끌어서 옮길 수 있어요. 두 번 누르면 크게 보거나 원래대로 돌아가요.</p>
      <span className="sr-only" aria-live="polite">{announce}</span>
    </div>
  );
}
