'use client';

/**
 * Shared motion/interaction primitives for standalone SEOJack website templates.
 * Canonical copy — the `new-standalone-template.ps1` generator copies this file
 * into each new `template-{slug}/app/primitives.tsx`. Generic, decoupled from any
 * specific template's styling or copy. Edit here to update the starter; existing
 * templates keep their own independent local copy.
 */

import {
    useEffect,
    useRef,
    type CSSProperties,
    type ElementType,
    type ReactNode,
} from 'react';

// ---------------------------------------------------------------------------
// initCursor
// ---------------------------------------------------------------------------

/**
 * Attach a dual-layer custom cursor (dot + ring) to `root`.
 * Expects `.cursor-dot` and `.cursor-ring` child elements.
 * `data-cursor` attributes on interactive elements change the ring class;
 * `data-cursor-label` populates ring text when `data-cursor="label"`.
 * Returns a cleanup function — call it in a useEffect return.
 */
export function initCursor(root: HTMLElement): () => void {
    const dot = root.querySelector<HTMLDivElement>('.cursor-dot');
    const ring = root.querySelector<HTMLDivElement>('.cursor-ring');
    if (!dot || !ring) return () => {};

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null;
        if (target) {
            const k = target.getAttribute('data-cursor') || '';
            ring.className = 'cursor-ring ' + k;
            const label = target.getAttribute('data-cursor-label') || '';
            ring.textContent = k === 'label' && label ? label : '';
        } else {
            ring.className = 'cursor-ring';
            ring.textContent = '';
        }
    };
    const onLeave = () => {
        ring.style.opacity = '0';
        dot.style.opacity = '0';
    };
    const onEnter = () => {
        ring.style.opacity = '1';
        dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let raf = 0;
    const tick = () => {
        dx += (mx - dx) * 0.55;
        dy += (my - dy) * 0.55;
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseleave', onLeave);
        document.removeEventListener('mouseenter', onEnter);
        cancelAnimationFrame(raf);
    };
}

// ---------------------------------------------------------------------------
// Magnetic
// ---------------------------------------------------------------------------

export interface MagneticProps {
    children: ReactNode;
    /** How far the element translates toward the cursor (0–1 scale). Default 0.25. */
    strength?: number;
    /** Distance in px within which the magnetic effect activates. Default 120. */
    radius?: number;
}

/**
 * Wraps children in a `<span class="magnet">` that drifts toward the cursor
 * while within `radius` pixels. The inner first-child element moves at half
 * the outer strength for a parallax feel.
 */
export function Magnetic({ children, strength = 0.25, radius = 120 }: MagneticProps) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const inner = el.firstElementChild as HTMLElement | null;
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const d = Math.hypot(dx, dy);
            if (d < radius) {
                el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
                if (inner) inner.style.transform = `translate(${dx * strength * 0.5}px, ${dy * strength * 0.5}px)`;
            } else {
                el.style.transform = '';
                if (inner) inner.style.transform = '';
            }
        };
        const onLeave = () => {
            el.style.transform = '';
            if (inner) inner.style.transform = '';
        };
        window.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [strength, radius]);
    return (
        <span ref={ref} className="magnet">
            {children}
        </span>
    );
}

// ---------------------------------------------------------------------------
// Reveal
// ---------------------------------------------------------------------------

export interface RevealProps {
    children: ReactNode;
    /** Stagger delay index (0 = no delay). Passed as `data-delay` for CSS targeting. */
    delay?: number;
    /** Render as this element type. Default `"div"`. */
    as?: ElementType;
    className?: string;
    style?: CSSProperties;
    [key: string]: unknown;
}

/**
 * Scroll-reveal wrapper. Adds class `"in"` when the element enters the
 * viewport (12% threshold, 8% bottom root margin). Use CSS to define the
 * initial hidden state and the `.in` transition on the `.reveal` class.
 * Passes through any extra props (e.g. `id`, `aria-*`) to the root element.
 */
export function Reveal({
    children,
    delay = 0,
    as: As = 'div',
    className = '',
    style,
    ...rest
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('in');
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const Component = As as ElementType;
    return (
        <Component ref={ref} className={`reveal ${className}`} data-delay={delay || undefined} style={style} {...rest}>
            {children}
        </Component>
    );
}

// ---------------------------------------------------------------------------
// Headline
// ---------------------------------------------------------------------------

export interface HeadlineProps {
    /** Array of HTML strings — each becomes a masked line. Supports inline HTML (e.g. `<em>`, `<br>`). */
    lines: string[];
    /** Render as this heading element. Default `"h1"`. */
    as?: ElementType;
    className?: string;
    style?: CSSProperties;
}

/**
 * Multi-line heading with per-line mask-reveal animation.
 * Each line renders as `.mask-line > .d{n}` for CSS stagger targeting.
 * Adds class `"in"` when 20% of the element is visible.
 * Lines accept raw HTML via `dangerouslySetInnerHTML` — keep them trusted/static.
 */
export function Headline({ lines, as: As = 'h1', className = '', style }: HeadlineProps) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('in');
                    io.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const Component = As as ElementType;
    return (
        <Component ref={ref} className={`reveal ${className}`} style={style}>
            {lines.map((l, i) => (
                <span key={i} className="mask-line">
                    <span className={`d${i + 1}`} dangerouslySetInnerHTML={{ __html: l }} />
                </span>
            ))}
        </Component>
    );
}

// ---------------------------------------------------------------------------
// Marquee
// ---------------------------------------------------------------------------

export interface MarqueeProps {
    children: ReactNode;
    /** Reverse scroll direction. Default `false`. */
    reverse?: boolean;
    /** Gap between items in pixels. Default 64. */
    gap?: number;
    /** Override animation duration in seconds. Omit to use the CSS default. */
    speed?: number;
}

/**
 * Infinite horizontal marquee. Duplicates `children` for seamless looping.
 * The duplicate receives `aria-hidden` to avoid screen-reader repetition.
 * CSS classes expected: `.marquee`, `.marquee-track`, `.marquee-track-r`.
 */
export function Marquee({ children, reverse = false, gap = 64, speed }: MarqueeProps) {
    const trackStyle: CSSProperties = speed ? { animationDuration: `${speed}s` } : {};
    return (
        <div className="marquee" style={{ width: '100%' }}>
            <div className={`marquee-track ${reverse ? 'marquee-track-r' : ''}`} style={{ gap, ...trackStyle }}>
                <div style={{ display: 'inline-flex', gap }}>{children}</div>
                <div style={{ display: 'inline-flex', gap }} aria-hidden>
                    {children}
                </div>
            </div>
        </div>
    );
}
