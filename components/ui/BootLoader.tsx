'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './BootLoader.module.css';
import { useGlobalState } from '../../store/useGlobalState';

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "MOUNTING NEURAL VOLUMES...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING AI AGENT SUBSYSTEMS...",
  "SYNCING GLOBAL STATE...",
  "BYPASSING SECURITY PROTOCOLS...",
  "MAJIN CORE ONLINE."
];

export function BootLoader() {
  const { hasBooted, setHasBooted } = useGlobalState();
  
  const [lines, setLines] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // If we've already booted in a previous session or hot-reload, don't run again.
    if (hasBooted) return;

    let currentLine = 0;
    
    // Type out lines one by one
    const typeInterval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(typeInterval);
        
        // Sequence finished printing
        setTimeout(() => {
          setShowLogo(true);
          
          // Wait for logo to reveal, then fade out the whole loader
          setTimeout(() => {
            setIsFadingOut(true);
            
            // Wait for fade out animation to finish, then unmount and let system proceed
            setTimeout(() => {
              setHasBooted(true);
            }, 800); // match CSS fade out duration
            
          }, 2000); // show logo for 2 seconds
          
        }, 500); // pause before showing logo
      }
    }, 150); // fast typing speed for each line

    return () => clearInterval(typeInterval);
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
      
      {showLogo && (
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
      )}

      <div 
        className={styles.terminal}
        style={{
          opacity: showLogo ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
          pointerEvents: showLogo ? 'none' : 'auto'
        }}
      >
        <div className={styles.linesContainer}>
          {lines.map((line, i) => (
            <div key={i} className={styles.line}>
              <span className={styles.prefix}>&gt;</span>
              {line}
            </div>
          ))}
          {!showLogo && (
            <div className={styles.line}>
              <span className={styles.prefix}>&gt;</span>
              <span className={styles.cursor} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
