'use client';

import { useEffect, useRef } from 'react';

export default function FooterDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    const SPACING = 32;
    const MOUSE_RADIUS = 120;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cols = Math.ceil(canvas!.width / SPACING);
      const rows = Math.ceil(canvas!.height / SPACING);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING + SPACING / 2;
          const y = row * SPACING + SPACING / 2;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const influence = Math.max(0, 1 - dist / MOUSE_RADIUS);
          const alpha = 0.12 - influence * 0.1;
          const radius = 1.2 - influence * 0.8;

          if (alpha > 0.01 && radius > 0.1) {
            ctx!.beginPath();
            ctx!.arc(x, y, Math.max(0.2, radius), 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx!.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
