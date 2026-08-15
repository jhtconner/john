import { useEffect, useRef } from 'react';
import styles from './AsciiPortrait.module.css';

const ASCII_RAMP = '.:-=+*#%@';
const COLS = 100;
const CHAR_ASPECT = 0.6;
const LINE_HEIGHT = 0.6;
const GLYPH_SCALE = 0.65;
const CONTRAST = 2.5;
const REPEL_RADIUS = 40;
const REPEL_FORCE = 2.2;
const SPRING = 0.08;
const FRICTION = 0.82;
const ALPHA_THRESHOLD = 20;

interface Particle {
    ox: number;
    oy: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
}

interface AsciiPortraitProps {
    src: string;
    alt: string;
}

export function AsciiPortrait({ src, alt }: AsciiPortraitProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const frameIdRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        const boxWidth = container.clientWidth;
        const boxHeight = container.clientHeight;
        if (!boxWidth || !boxHeight) return;

        canvas.width = boxWidth * dpr;
        canvas.height = boxHeight * dpr;
        canvas.style.width = `${boxWidth}px`;
        canvas.style.height = `${boxHeight}px`;
        ctx.scale(dpr, dpr);

        const cssVars = getComputedStyle(document.documentElement);
        const bg = cssVars.getPropertyValue('--color-surface').trim() || '#3B4252';
        const fg = cssVars.getPropertyValue('--color-accent').trim() || '#88C0D0';
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let cancelled = false;
        const img = new Image();
        img.src = src;

        img.onload = () => {
            if (cancelled) return;

            const charWidth = boxWidth / COLS;
            const fontSize = charWidth / CHAR_ASPECT;
            const rowPitch = fontSize * LINE_HEIGHT;
            const rows = Math.max(1, Math.round(boxHeight / rowPitch));

            const sample = document.createElement('canvas');
            sample.width = COLS;
            sample.height = rows;
            const sctx = sample.getContext('2d')!;

            const imgAspect = img.width / img.height;
            const boxAspect = COLS / rows;
            let sw = img.width, sh = img.height, sx = 0, sy = 0;
            if (imgAspect > boxAspect) {
                sw = img.height * boxAspect;
                sx = (img.width - sw) / 2;
            } else {
                sh = img.width / boxAspect;
                sy = (img.height - sh) / 2;
            }
            sctx.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, rows);
            const { data } = sctx.getImageData(0, 0, COLS, rows);

            const yOffset = (boxHeight - rows * rowPitch) / 2;
            const particles: Particle[] = [];

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < COLS; x++) {
                    const i = (y * COLS + x) * 4;
                    const alpha = data[i + 3];
                    if (alpha < ALPHA_THRESHOLD) continue;

                    let brightness = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
                    brightness = Math.min(1, Math.max(0, (brightness - 0.5) * CONTRAST + 0.5));
                    const charIndex = Math.round((1 - brightness) * (ASCII_RAMP.length - 1));
                    const char = ASCII_RAMP[charIndex];
                    if (char === ' ') continue;

                    const ox = x * charWidth;
                    const oy = yOffset + y * rowPitch;
                    particles.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, char });
                }
            }

            particlesRef.current = particles;

            function render() {
                ctx.clearRect(0, 0, boxWidth, boxHeight);
                ctx.font = `bold ${fontSize * GLYPH_SCALE}px "JetBrains Mono", monospace`;
                ctx.textBaseline = 'top';
                ctx.fillStyle = fg;
                for (const p of particlesRef.current) {
                    ctx.fillText(p.char, p.x, p.y);
                }
            }

            if (reducedMotion) {
                render();
                return;
            }

            function tick() {
                if (cancelled) return;
                const mouse = mouseRef.current;

                for (const p of particlesRef.current) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < REPEL_RADIUS) {
                        const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
                        const angle = Math.atan2(dy, dx);
                        p.vx += Math.cos(angle) * force;
                        p.vy += Math.sin(angle) * force;
                    }

                    p.vx += (p.ox - p.x) * SPRING;
                    p.vy += (p.oy - p.y) * SPRING;
                    p.vx *= FRICTION;
                    p.vy *= FRICTION;
                    p.x += p.vx;
                    p.y += p.vy;
                }

                render();
                frameIdRef.current = requestAnimationFrame(tick);
            }

            frameIdRef.current = requestAnimationFrame(tick);
        };

        function handleMouseMove(e: MouseEvent) {
            const rect = container!.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
        function handleMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelled = true;
            cancelAnimationFrame(frameIdRef.current);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [src]);

    return (
        <div className={styles.frame} ref={containerRef} aria-label={`Interactive ASCII portrait of ${alt}`}>
            <canvas ref={canvasRef} aria-hidden="true" />
        </div>
    );
}