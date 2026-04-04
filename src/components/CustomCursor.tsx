'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovered = useRef(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window === 'undefined') return;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        cursor!.style.opacity = '1';
      }
    }

    function onMouseLeave() {
      visible.current = false;
      cursor!.style.opacity = '0';
    }

    function checkHover(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive =
        el.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]') !== null;
      if (isInteractive !== hovered.current) {
        hovered.current = isInteractive;
        cursor!.classList.toggle('cursor-hover', isInteractive);
      }
    }

    function loop() {
      const lerp = 0.15;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      cursor!.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full border border-white/60 opacity-0 mix-blend-difference transition-[width,height,border-color] duration-200 will-change-transform"
      aria-hidden="true"
    />
  );
}
