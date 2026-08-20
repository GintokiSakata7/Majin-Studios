'use client';

import React, {
  useLayoutEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const barRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container =
      containerRef.current;

    const bar =
      barRef.current;

    if (!container || !bar) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    const context =
      gsap.context(() => {
        if (reducedMotion) {
          gsap.set(bar, {
            width: '100%',
            opacity: 0.35,
          });

          return;
        }

        ScrollTrigger.create({
          start: 'top top',
          end: 'max',
          onUpdate: (self) => {
            gsap.set(bar, {
              width: `${self.progress * 100}%`,
            });
          },
        });
      }, container);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className={styles.bar}
      />
    </div>
  );
}
