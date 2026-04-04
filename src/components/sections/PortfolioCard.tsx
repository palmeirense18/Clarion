'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioCardProps {
  title: string;
  tag: string;
  gradient: string;
  videoSrc?: string;
  span2?: boolean;
}

export default function PortfolioCard({
  title,
  tag,
  gradient,
  videoSrc,
  span2 = false,
}: PortfolioCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`group relative overflow-hidden rounded-card border border-lines ${
        span2 ? 'md:col-span-2' : ''
      }`}
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setHovered(false);
        videoRef.current?.pause();
      }}
    >
      {/* Image / gradient placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ background: gradient }}
        />

        {/* Optional video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-blue-dark/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="flex items-center gap-3 text-white"
              >
                <span className="text-lg font-medium">Ver case</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info bar */}
      <div className="bg-white p-5">
        <span className="text-xs font-medium uppercase tracking-widest text-orange">
          {tag}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold text-text-100 md:text-xl">
          {title}
        </h3>
      </div>
    </div>
  );
}
