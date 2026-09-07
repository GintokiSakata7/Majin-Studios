'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './BootLoader.module.css';
import { useGlobalState } from '../../store/useGlobalState';

export function BootLoader() {
  const { hasBooted, setHasBooted } = useGlobalState();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // If we've already booted in a previous session or hot-reload, don't run again.
    if (hasBooted) return;

    // Show logo animation immediately, hold, then fade out loader
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    const bootTimer = setTimeout(() => {
      setHasBooted(true);
    }, 2600); // 1800ms + 800ms fade out transition

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(bootTimer);
    };
  }, [hasBooted, setHasBooted]);

  if (hasBooted) return null;

  return (
    <div 
      className={styles.container}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto'
      }}
    >
      <div className={styles.grid} />
      <div className={styles.scanline} />
      
      <div className={styles.centralLogo}>
        <Image 
          src="/logo.jpg" 
          alt="Majin Studios" 
          width={400} 
          height={100} 
          className={styles.logoImage}
          priority
        />
        <div className={styles.logoSub}>
          SYSTEM INITIALIZED
        </div>
      </div>
    </div>
  );
}
