/**
 * The 3D model at the top of a Wiki page. The still thumbnail shows at once;
 * three.js (src/three/scene.ts) loads behind it and the live model fades in
 * over it when it has drawn. Drag to turn it.
 */
import { useEffect, useRef, useState } from 'react';
import { Rotate3d } from 'lucide-react';

export function ModelViewer({ src, poster, label }: { src: string; poster: string | null; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let dispose: (() => void) | null = null;
    let cancelled = false;
    setState('loading');
    import('../three/scene')
      .then(({ mountModel }) => {
        if (cancelled || !host.current) return;
        dispose = mountModel(host.current, src, {
          onReady: () => !cancelled && setState('ready'),
          onError: () => !cancelled && setState('error'),
        });
      })
      .catch(() => !cancelled && setState('error'));
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [src]);

  return (
    <figure className="wk-model" data-state={state} aria-label={`${label} — 3D model`}>
      {poster && <img className="wk-model-poster" src={poster} alt="" aria-hidden="true" />}
      <div ref={host} className="wk-model-stage" />
      {state === 'ready' && (
        <figcaption className="wk-model-hint">
          <Rotate3d size={12} strokeWidth={1.75} aria-hidden="true" />
          Drag to turn
        </figcaption>
      )}
    </figure>
  );
}
