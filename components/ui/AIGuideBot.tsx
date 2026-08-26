'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './AIGuideBot.module.css';

interface AIGuideBotProps {
  message?: React.ReactNode;
}

export function AIGuideBot({ 
  message = <>Hi! I'm your Majin Guide.<br/><span className={styles.highlightText}>Click here</span> to preview our work.</>
}: AIGuideBotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the bot's anchor point enters the screen
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50">
      {isVisible && (
        <div className={styles.container}>
          <div className={styles.orb}>
            <div className={styles.orbCore} />
          </div>
          <div className={styles.speechBubble}>
            <p className={styles.message}>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
