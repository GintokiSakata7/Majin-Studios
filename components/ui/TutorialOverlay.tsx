'use client';

import React, { useState, useEffect } from 'react';
import styles from './TutorialOverlay.module.css';
import { useGlobalState } from '../../store/useGlobalState';
import { HUDMarker } from '.';

const HINTS = [
  "HINT: Drag to rotate the universe",
  "HINT: Scroll to explore systems",
  "HINT: Hover elements to analyze"
];

export function TutorialOverlay() {
  const { hasBooted, hasSeenTutorial, setHasSeenTutorial } = useGlobalState();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  useEffect(() => {
    if (hasBooted && !hasSeenTutorial) {
      // Show first hint after boot
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasBooted, hasSeenTutorial]);

  useEffect(() => {
    if (!isVisible || isClosing) return;

    // Cycle through hints every 4 seconds
    const interval = setInterval(() => {
      setCurrentHint((prev) => {
        const next = prev + 1;
        if (next >= HINTS.length) {
          // Finish and auto-dismiss after all hints are shown
          setIsClosing(true);
          setTimeout(() => {
            setHasSeenTutorial(true);
            setIsVisible(false);
          }, 800);
          return prev;
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, isClosing, setHasSeenTutorial]);

  if (!isVisible && !isClosing) return null;

  return (
    <div className={`${styles.container} ${isClosing ? styles.closing : ''}`}>
      <HUDMarker type="corner" top="-1px" left="-1px" />
      <HUDMarker type="corner" bottom="-1px" right="-1px" className="rotate-180" />

      <span className={styles.dot} />
      <span className={styles.message}>
        {HINTS[currentHint]}
      </span>
    </div>
  );
}
