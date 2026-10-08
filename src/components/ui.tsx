/**
 * The Incipe Workspace primitives this site needs, rebuilt on the SAME classes
 * (styles/ui.css is the workspace's file, verbatim): `inc-btn` and its ladder,
 * `inc-tip`, and the clip fade. The look, the hover lift and the 0.98 press dip
 * all come from that stylesheet — nothing here restyles them.
 */
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

export type ButtonVariant = 'default' | 'accent' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

interface Look {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square icon-only button (31×31, or 24×24 at `size="sm"`). */
  icon?: boolean;
}

export function buttonClass({ variant = 'default', size = 'md', icon = false }: Look, extra?: string) {
  return [
    'inc-btn',
    variant !== 'default' ? `inc-btn--${variant}` : '',
    size === 'sm' ? 'inc-btn--sm' : '',
    icon ? 'inc-btn--icon' : '',
    extra ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button = forwardRef<HTMLButtonElement, Look & ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ variant, size, icon, className, ...rest }, ref) {
    return <button ref={ref} type="button" className={buttonClass({ variant, size, icon }, className)} {...rest} />;
  },
);

/** A button that navigates — the same box, as an `<a>`. */
export function ButtonAnchor({ variant, size, icon, className, ...rest }: Look & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size, icon }, className)} {...rest} />;
}

export function ButtonLink({ variant, size, icon, className, ...rest }: Look & LinkProps) {
  return <Link className={buttonClass({ variant, size, icon }, className)} {...rest} />;
}

/**
 * Hover label, portalled to <body> with `position: fixed` so a clipping pane
 * cannot crop it — the workspace Tooltip's contract.
 */
export function Tooltip({ label, below = false, children }: { label: string; below?: boolean; children: ReactElement }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();

  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      setPos({ x: r.left + r.width / 2, y: below ? r.bottom + 6 : r.top - 6 });
      setVisible(true);
    }, 350);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setVisible(false);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span ref={wrap} className="inc-tip-wrap" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} onMouseDown={hide}>
      {children}
      {pos &&
        createPortal(
          <span
            role="tooltip"
            className={visible ? 'inc-tip inc-tip--show' : 'inc-tip'}
            style={{ left: pos.x, top: pos.y, transform: `translate(-50%, ${below ? '0' : '-100%'})` }}
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}

/** Sets `data-clipped` when the text overflows, so `.inc-fade-out` masks the tail. */
export function useClipFade<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [clipped, setClipped] = useState(false);
  const measure = useCallback(() => {
    const el = ref.current;
    if (el) setClipped(el.scrollWidth > el.clientWidth + 1);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    ro?.observe(el);
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [measure]);
  return { ref, clipped };
}

export function ClipText({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, clipped } = useClipFade<HTMLSpanElement>();
  return (
    <span ref={ref} className={['inc-fade-out', className ?? ''].join(' ')} data-clipped={clipped || undefined}>
      {children}
    </span>
  );
}

export function GrainOverlay() {
  return <div className="inc-grain" aria-hidden="true" />;
}
