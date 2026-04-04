'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ServiceCardProps {
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export default function ServiceCard({
  tag,
  title,
  description,
  icon,
  className = '',
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-card border border-[#e0e0e8] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-mid hover:shadow-[0_12px_40px_rgba(0,87,255,0.12)] ${className}`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[rgba(0,87,255,0.04)] opacity-0 blur-3xl transition-opacity duration-mid group-hover:opacity-100" />

      <div>
        {/* Tag */}
        <span className="text-xs font-[500] uppercase tracking-widest text-[#FF7A00]">
          {tag}
        </span>

        {/* Icon */}
        <div className="mt-6 text-[rgba(10,10,15,0.64)]">{icon}</div>

        {/* Title */}
        <h3 className="mt-6 font-display text-2xl font-[700] leading-tight text-[#0a0a0f] md:text-3xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-[rgba(10,10,15,0.60)] md:text-base">
          {description}
        </p>
      </div>

      {/* Arrow button */}
      <div className="mt-8 flex justify-end">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white transition-all duration-mid group-hover:bg-[#FF7A00] group-hover:scale-[0.92]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13L13 5M13 5H6M13 5V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
