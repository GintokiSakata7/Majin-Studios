'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './CardPreview.module.css';

const nexusSlides = [
  {
    id: 'mesh',
    label: 'AGENTIC AI MESH',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    url: 'nexusai.cloud/mesh-live',
    badge: 'AGENTIC ORCHESTRATION',
    stat: '120MS STREAMING',
  },
  {
    id: 'clusters',
    label: 'GPU SERVERS',
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85',
    url: 'nexusai.cloud/clusters',
    badge: 'ENTERPRISE COMPUTE',
    stat: 'HIGH-FREQUENCY OPS',
  },
  {
    id: 'neural',
    label: 'NEURAL TOPOLOGY',
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85',
    url: 'nexusai.cloud/vector-memory',
    badge: 'PERSISTENT VECTOR DB',
    stat: 'GUARDRAILS ACTIVE',
  },
];

export function NexusAICardPreview({ className = '' }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = nexusSlides[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % nexusSlides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + nexusSlides.length) % nexusSlides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % nexusSlides.length);
  };

  return (
    <div
      className={`${styles.showcaseWrapper} ${className}`}
      data-cursor="3d"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top HUD Control Bar */}
      <div className={styles.topControlBar}>
        <div className={styles.windowControls}>
          <div className={styles.winDotRed} />
          <div className={styles.winDotYellow} />
          <div className={styles.winDotGreen} />
          <span style={{ fontSize: '0.62rem', color: '#00ff85', fontWeight: 800, marginLeft: '0.4rem', letterSpacing: '0.08em' }}>
            NEXUS AI · LIVE ARCHITECTURE
          </span>
        </div>

        {/* Tab Group */}
        <div className={styles.tabGroup}>
          {nexusSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.tabButton} ${currentIndex === idx ? styles.tabActiveCyan : ''}`}
            >
              {slide.label}
            </button>
          ))}
        </div>

        <div className={styles.urlBar}>{activeSlide.url}</div>
      </div>

      {/* Main Photographic Display Area */}
      <div className={styles.frameViewport} data-project-visual>
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={`Nexus AI ${activeSlide.label}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className={styles.mainScreenshot}
          priority
        />

        <div className={styles.overlayGradient} />

        {/* Navigation Arrows */}
        <button
          className={`${styles.navArrowBtn} ${styles.navArrowPrev}`}
          onClick={handlePrev}
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          className={`${styles.navArrowBtn} ${styles.navArrowNext}`}
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>

        {/* Floating Telemetry Badges */}
        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ top: '15px', right: '15px' }}>
          <div className={styles.pulseDotLime} />
          <span>{activeSlide.badge}</span>
        </div>

        <div className={`${styles.floatingBadge} ${styles.badgeLime}`} style={{ top: '15px', left: '15px' }}>
          <span>{activeSlide.stat}</span>
        </div>

        {/* Miniature Thumbnail Strip Dock */}
        <div className={styles.thumbnailDock} aria-label="Photo gallery navigation">
          {nexusSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.thumbnailItem} ${currentIndex === idx ? styles.thumbnailActive : ''}`}
              aria-label={`View ${slide.label}`}
            >
              <Image
                src={slide.src}
                alt={slide.label}
                width={46}
                height={30}
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className={styles.bottomFooter}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: '#00ff85', fontWeight: 700 }}>ENGINE:</span>
          <span>AUTONOMOUS PLANNER &rarr; WEBSOCKET MESH &rarr; VECTOR RAG</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>LATENCY: 120MS</span>
          <span style={{ color: '#00ff85', fontWeight: 700 }}>STATUS: ENTERPRISE SUITE</span>
        </div>
      </div>
    </div>
  );
}
